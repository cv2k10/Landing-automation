// Generate per-scene TTS (Kokoro via hyperframes), word timings (whisper),
// align them to the script words, and join into one voiceover track.
// Usage: node ../_tools/voice.mjs   (run inside a project folder)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const HF = ["--yes", "hyperframes@0.9.27"];
const LEAD = 0.35, GAP = 0.32, TAIL = 0.9;
const script = JSON.parse(fs.readFileSync("script.json", "utf8"));
const vdir = "assets/voice";
fs.mkdirSync(vdir, { recursive: true });
const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR || "/tmp", "vo-"));

const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, "");
const dur = (f) => parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());

function align(scriptWords, heard) {
  // Levenshtein alignment on normalized tokens; returns times per script word.
  const a = scriptWords.map(norm), b = heard.map((h) => norm(h.text));
  const n = a.length, m = b.length;
  const D = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: m + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++)
    D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  const map = new Array(n).fill(null);
  let i = n, j = m;
  while (i > 0 && j > 0) {
    if (D[i][j] === D[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) { map[i - 1] = j - 1; i--; j--; }
    else if (D[i][j] === D[i - 1][j] + 1) i--;
    else j--;
  }
  const out = scriptWords.map((t, k) => (map[k] != null ? { text: t, start: heard[map[k]].start, end: heard[map[k]].end } : { text: t, start: null, end: null }));
  // interpolate gaps
  for (let k = 0; k < out.length; k++) {
    if (out[k].start != null) continue;
    let p = k - 1; while (p >= 0 && out[p].start == null) p--;
    let q = k + 1; while (q < out.length && out[q].start == null) q++;
    const t0 = p >= 0 ? out[p].end : 0, t1 = q < out.length ? out[q].start : (heard.at(-1)?.end ?? t0 + 0.4);
    const cnt = q - p - 1, step = (t1 - t0) / cnt;
    for (let r = p + 1; r < q; r++) { out[r].start = t0 + step * (r - p - 1); out[r].end = out[r].start + step; }
  }
  return out;
}

let t = LEAD;
const scenes = [], inputs = [];
for (const [idx, sc] of script.scenes.entries()) {
  const wav = path.join(vdir, `${String(idx + 1).padStart(2, "0")}-${sc.id}.wav`);
  if (!fs.existsSync(wav)) execFileSync("npx", [...HF, "tts", sc.text, "-v", script.voice, "-s", String(script.speed), "-o", wav], { stdio: "ignore" });
  const d = dur(wav);
  const out = execFileSync("npx", [...HF, "transcribe", path.resolve(wav), "--model", "small.en", "--json"], { cwd: tmp, stdio: ["ignore", "pipe", "ignore"] }).toString();
  const res = out.trim().split("\n").map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter((o) => o && o.transcriptPath).at(-1);
  const tj = JSON.parse(fs.readFileSync(res.transcriptPath, "utf8"));
  fs.rmSync(res.transcriptPath);
  const heard = (Array.isArray(tj) ? tj : tj.words).filter((w) => /[a-z0-9]/i.test(w.text));
  const words = align(sc.text.split(/\s+/), heard).map((w) => ({ text: w.text, start: +(w.start + t).toFixed(3), end: +(Math.min(w.end, d) + t).toFixed(3) }));
  const mapped = heard.length;
  scenes.push({ id: sc.id, voiceStart: +t.toFixed(3), voiceEnd: +(t + d).toFixed(3), words });
  console.log(`${sc.id}: ${d.toFixed(2)}s, script ${words.length} words, heard ${mapped}`);
  inputs.push(wav);
  t += d + GAP;
}
const total = +(t - GAP + TAIL).toFixed(3);
// scene slots: each scene runs from its voice start (first scene from 0) to the next scene's voice start
scenes.forEach((s, k) => {
  s.start = k === 0 ? 0 : +(s.voiceStart - 0.12).toFixed(3);
});
scenes.forEach((s, k) => { s.end = k < scenes.length - 1 ? scenes[k + 1].start : total; s.duration = +(s.end - s.start).toFixed(3); });

// join: lead silence + clips separated by gaps
const parts = [];
const filt = [];
let n = 0;
const args = ["-y", "-f", "lavfi", "-t", String(LEAD), "-i", "anullsrc=r=24000:cl=mono"];
filt.push(`[0:a]`);
inputs.forEach((f, k) => {
  args.push("-i", f); n++;
  filt.push(`[${n}:a]`);
  if (k < inputs.length - 1) { args.push("-f", "lavfi", "-t", String(GAP), "-i", "anullsrc=r=24000:cl=mono"); n++; filt.push(`[${n}:a]`); }
});
args.push("-filter_complex", `${filt.map((x) => x).join("")}concat=n=${filt.length}:v=0:a=1,aresample=48000[o]`, "-map", "[o]", "-ar", "48000", "-ac", "1", path.join(vdir, "voiceover.wav"));
execFileSync("ffmpeg", args, { stdio: "ignore" });
fs.writeFileSync("timing.json", JSON.stringify({ total, scenes }, null, 2));
console.log("total", total, "s; joined", dur(path.join(vdir, "voiceover.wav")).toFixed(2));
