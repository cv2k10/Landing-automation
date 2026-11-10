// Assemble a HyperFrames project from script timing + scene definitions.
// Usage (inside a project folder): node ../_tools/build.mjs
// Reads timing.json (from voice.mjs) and scenes.mjs, writes index.html,
// compositions/<scene>.html and compositions/captions.html.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { BASE_CSS, C } from "./kit.mjs";

const W = 1080, H = 1920;
const proj = process.cwd();
const timing = JSON.parse(fs.readFileSync("timing.json", "utf8"));
const { meta, scenes: defs } = await import(pathToFileURL(path.join(proj, "scenes.mjs")).href + `?t=${Date.now()}`);
fs.mkdirSync("compositions", { recursive: true });
fs.mkdirSync("assets/sfx", { recursive: true });
const SFX_SRC = "/root/.claude/skills/media-use/audio/assets/sfx";
const f = (n) => (+n).toFixed(3);
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

const sfxClips = [];
const whooshes = ["whoosh-short", "whoosh", "whoosh-short"];

timing.scenes.forEach((s, idx) => {
  const def = defs[s.id];
  if (!def) throw new Error(`no scene definition for ${s.id}`);
  const local = s.words.map((w) => ({ ...w, start: w.start - s.start, end: w.end - s.start }));
  // T("word", n) -> local start time of the nth occurrence of that word
  const T = (word, n = 1, which = "start") => {
    const key = norm(word);
    let k = 0;
    for (const w of local) if (norm(w.text) === key && ++k === n) return +w[which].toFixed(3);
    throw new Error(`${s.id}: word "${word}" #${n} not found`);
  };
  const E = (word, n = 1) => T(word, n, "end");
  const out = def({ T, E, dur: s.duration, id: s.id, words: local });
  const id = s.id;
  const exit = out.noExit ? "" : `tl.to("#${id}-stage",{opacity:0,y:-36,duration:0.22,ease:"power2.in"},${f(s.duration - 0.26)});`;
  const html = `<template>
  <style>${BASE_CSS}${out.css || ""}</style>
  <div id="root" data-composition-id="${id}" data-width="${W}" data-height="${H}">
    <div class="stage" id="${id}-stage">
${out.html}
    </div>
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      ${out.js}
      ${exit}
      window.__timelines["${id}"] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, html);
  if (idx > 0) sfxClips.push({ name: whooshes[idx % whooshes.length], at: s.start - 0.06, vol: 0.32 });
  for (const x of out.sfx || []) sfxClips.push({ ...x, at: s.start + x.at });
});

// ---------- captions ----------
const all = timing.scenes.flatMap((s) => s.words);
const groups = [];
let cur = [];
const MAXW = 4, MAXCH = 22;
all.forEach((w, i) => {
  cur.push({ ...w, i });
  const next = all[i + 1];
  const chars = cur.map((x) => x.text).join(" ").length;
  const endSentence = /[.?!:]$/.test(w.text);
  const comma = /,$/.test(w.text) && cur.length >= 2;
  const pause = next && next.start - w.end >= 0.15;
  const nextChars = next ? chars + 1 + next.text.length : 0;
  if (!next || endSentence || comma || pause || cur.length >= MAXW || nextChars > MAXCH) { groups.push(cur); cur = []; }
});
let capHtml = "", capJs = "";
groups.forEach((g, gi) => {
  const gid = `cap-g${gi}`;
  const start = g[0].start - 0.08;
  const nextStart = groups[gi + 1] ? groups[gi + 1][0].start - 0.08 : timing.total;
  const end = Math.min(nextStart, Math.max(g.at(-1).end + 0.6, start + 0.4));
  const inD = Math.min(0.14, (end - start) / 3);
  const fadeAt = Math.max(end - 0.1, start + inD + 0.01);
  capJs += `tl.set("#${gid}",{visibility:"visible"},${f(start)});tl.fromTo("#${gid}",{opacity:0,y:18},{opacity:1,y:0,duration:${f(inD)},ease:"power2.out"},${f(start)});`;
  capHtml += `      <div id="${gid}" class="cg">${g.map((w) => `<span id="cap-w${w.i}" class="cw">${w.text.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`).join(" ")}</div>\n`;

  g.forEach((w, k) => {
    const wEnd = k < g.length - 1 ? g[k + 1].start : w.end + 0.08;
    capJs += `tl.set("#cap-w${w.i}",{color:"${C.ground}",backgroundColor:"${C.yellow}",opacity:1},${f(w.start)});`;
    capJs += `tl.fromTo("#cap-w${w.i}",{scale:1},{scale:1.1,duration:0.08,ease:"power2.out"},${f(w.start)});`;
    capJs += `tl.to("#cap-w${w.i}",{scale:1,duration:0.08,ease:"power2.in"},${f(Math.max(w.start + 0.09, wEnd - 0.08))});`;
    capJs += `tl.set("#cap-w${w.i}",{color:"${C.ink}",backgroundColor:"rgba(255,210,63,0)"},${f(wEnd)});`;
  });
  capJs += `tl.to("#${gid}",{opacity:0,duration:${f(Math.max(0.03, Math.min(0.1, end - fadeAt)))},ease:"power2.in"},${f(fadeAt)});tl.set("#${gid}",{opacity:0,visibility:"hidden"},${f(end)});`;
});
fs.writeFileSync("compositions/captions.html", `<template>
  <style>
    #root { position: absolute; inset: 0; }
    .cg { position: absolute; left: 70px; top: 1150px; width: 940px; text-align: center; visibility: hidden; opacity: 0;
      font: 900 70px/1.32 Montserrat, sans-serif; letter-spacing: -0.01em; color: ${C.ink}; overflow: visible; }
    .cw { display: inline-block; padding: 0 14px; margin: 4px 0; border-radius: 16px; color: rgba(245,247,255,0.55);
      background-color: rgba(255,210,63,0); text-shadow: 0 4px 18px rgba(0,0,0,0.45); }
  </style>
  <div id="root" data-composition-id="captions" data-width="${W}" data-height="${H}">
${capHtml}  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      ${capJs}
      window.__timelines["captions"] = tl;
    })();
  </script>
</template>
`);

// ---------- root ----------
const used = new Set(sfxClips.map((x) => x.name));
for (const n of used) fs.copyFileSync(path.join(SFX_SRC, `${n}.mp3`), `assets/sfx/${n}.mp3`);
const hosts = timing.scenes.map((s, i) => `      <div id="${s.id}" data-composition-id="${s.id}" data-composition-src="compositions/${s.id}.html" data-start="${f(s.start)}" data-duration="${f(s.duration)}" data-track-index="1" data-track-kind="graphics" data-width="${W}" data-height="${H}" style="z-index:${2}"></div>`).join("\n");
const sdur = (n) => parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `assets/sfx/${n}.mp3`]).toString());
const sfx = sfxClips.map((x, i) => `      <audio id="sfx-${i + 1}" class="clip" src="assets/sfx/${x.name}.mp3" data-start="${f(Math.max(0, x.at))}" data-duration="${f(Math.min(sdur(x.name), timing.total - Math.max(0, x.at)))}" data-track-index="${4 + (i % 3)}" data-volume="${x.vol ?? 0.35}"></audio>`).join("\n");

fs.writeFileSync("index.html", `<!doctype html>
<html lang="en" data-composition-variables='${JSON.stringify(meta.variables || [])}'>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <title>${meta.title}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: ${C.ground}; }
      #bg { position: absolute; inset: 0; background: radial-gradient(1200px 900px at 50% 30%, #18224a 0%, ${C.ground} 70%); }
      #bg-grid { position: absolute; inset: 0; opacity: 0.35;
        background-image: linear-gradient(rgba(122,140,220,0.10) 2px, transparent 2px), linear-gradient(90deg, rgba(122,140,220,0.10) 2px, transparent 2px);
        background-size: 90px 90px; }
      #bg-glow-a, #bg-glow-b { position: absolute; width: 900px; height: 900px; border-radius: 50%; filter: blur(120px); opacity: 0.35; }
      #bg-glow-a { left: -300px; top: 200px; background: ${meta.glowA || C.purple}; }
      #bg-glow-b { left: 480px; top: 1100px; background: ${meta.glowB || C.cyan}; }
      #brand { position: absolute; left: 0; top: 1360px; width: ${W}px; text-align: center; font: 800 28px/1 Montserrat, sans-serif; letter-spacing: 0.18em; color: rgba(154,164,199,0.55); }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="${f(timing.total)}" data-width="${W}" data-height="${H}">
      <div id="bg" data-layout-ignore></div>
      <div id="bg-glow-a" data-layout-ignore></div>
      <div id="bg-glow-b" data-layout-ignore></div>
      <div id="bg-grid" data-layout-ignore></div>
      <div id="brand" data-layout-ignore data-var-text="series">${meta.series}</div>
${hosts}
      <div id="captions" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="${f(timing.total)}" data-track-index="2" data-track-kind="captions" data-width="${W}" data-height="${H}" style="z-index:5"></div>
      <audio id="voiceover" class="clip" src="assets/voice/voiceover.wav" data-start="0" data-track-index="3" data-volume="1"></audio>
${sfx}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      tl.fromTo("#bg-glow-a", { x: 0, y: 0 }, { x: 260, y: -160, duration: ${f(timing.total / 2)}, ease: "sine.inOut" }, 0);
      tl.to("#bg-glow-a", { x: 40, y: 120, duration: ${f(timing.total / 2)}, ease: "sine.inOut" }, ${f(timing.total / 2)});
      tl.fromTo("#bg-glow-b", { x: 0, y: 0 }, { x: -320, y: -240, duration: ${f(timing.total)}, ease: "sine.inOut" }, 0);
      tl.fromTo("#bg-grid", { y: 0 }, { y: 90, duration: ${f(timing.total)}, ease: "none" }, 0);
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`built ${timing.scenes.length} scenes, ${groups.length} caption groups, ${sfxClips.length} sfx; total ${timing.total}s`);
