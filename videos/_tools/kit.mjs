// Shared visual kit for the portrait explainer series (1080x1920).
// Scene files call these helpers to emit HTML strings and GSAP lines.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const C = {
  ground: "#0B1020",
  panel: "#141B33",
  panel2: "#1C2547",
  line: "#2A3563",
  ink: "#F5F7FF",
  muted: "#9AA4C7",
  yellow: "#FFD23F",
  cyan: "#3DDCFF",
  green: "#39E58C",
  red: "#FF5A6A",
  purple: "#A68BFF",
  orange: "#FF9F43",
};

// Brand marks from the simple-icons package (copied into _tools/logos).
export function logo(name, size = 40, color = C.ink) {
  const svg = fs.readFileSync(path.join(here, "logos", `${name}.svg`), "utf8");
  const d = svg.match(/ d="([^"]+)"/)[1];
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path fill="${color}" d="${d}"/></svg>`;
}

export const icon = {
  check: (s = 40, c = C.green, k = C.ground) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="${c}"/><path d="M11 20.5l6 6 12-13" fill="none" stroke="${k}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cross: (s = 40, c = C.red) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="${c}"/><path d="M13 13l14 14M27 13L13 27" fill="none" stroke="${C.ground}" stroke-width="4.5" stroke-linecap="round"/></svg>`,
  bolt: (s = 40, c = C.yellow) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="${c}" d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>`,
  lock: (s = 40, c = C.cyan) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="12" rx="3" fill="${c}"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="${c}" stroke-width="2.6"/></svg>`,
  cloud: (s = 40, c = C.cyan) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="${c}" d="M7 19a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 19 9.5a4.75 4.75 0 0 1-.25 9.5z"/></svg>`,
  gauge: (s = 40, c = C.yellow) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M3 16a9 9 0 0 1 18 0" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><path d="M12 16l5-6" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="16" r="2" fill="${c}"/></svg>`,
  key: (s = 40, c = C.yellow) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><circle cx="7.5" cy="12" r="4.5" fill="none" stroke="${c}" stroke-width="2.6"/><path d="M12 12h10M18 12v4M21 12v3" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  refresh: (s = 40, c = C.cyan) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.6" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><path d="M20 3v5h-5" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shield: (s = 40, c = C.green) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="${c}" d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"/></svg>`,
};

// Base CSS shared by every scene (scene roots are transparent; ground lives in index.html).
export const BASE_CSS = `
#root { position: absolute; inset: 0; font-family: Inter, sans-serif; color: ${C.ink}; }
.stage { position: absolute; inset: 0; }
.abs { position: absolute; }
.topic { position: absolute; left: 0; top: 196px; width: 1080px; text-align: center; }
.topic b { display: inline-block; padding: 14px 32px; border-radius: 999px; background: rgba(255,210,63,0.12);
  border: 2px solid rgba(255,210,63,0.55); color: ${C.yellow}; font: 800 32px/1 Montserrat, sans-serif; letter-spacing: 0.08em; }
.h1 { position: absolute; left: 60px; width: 960px; text-align: center; font: 900 88px/1.04 Montserrat, sans-serif; letter-spacing: -0.02em; }
.h2 { position: absolute; left: 60px; width: 960px; text-align: center; font: 800 56px/1.1 Montserrat, sans-serif; letter-spacing: -0.01em; }
.y { color: ${C.yellow}; } .c { color: ${C.cyan}; } .g { color: ${C.green}; } .r { color: ${C.red}; } .p { color: ${C.purple}; } .m { color: ${C.muted}; }
.card { position: absolute; background: ${C.panel}; border: 3px solid ${C.line}; border-radius: 28px; box-shadow: 0 30px 80px rgba(0,0,0,0.45); }
.pill { position: absolute; display: flex; align-items: center; justify-content: center; gap: 16px; height: 96px; border-radius: 999px;
  background: ${C.panel2}; border: 3px solid ${C.line}; font: 800 40px/1 Montserrat, sans-serif; color: ${C.ink}; white-space: nowrap; }
.mono { font-family: "JetBrains Mono", monospace; }
.label { position: absolute; font: 700 30px/1.2 Inter, sans-serif; color: ${C.muted}; text-align: center; }
`;

// ---------- reusable HTML pieces ----------
export function browser({ id, x, y, w, h, url, body = "" }) {
  return `<div id="${id}" class="card" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;overflow:hidden">
  <div style="height:72px;background:${C.panel2};display:flex;align-items:center;gap:14px;padding:0 26px;border-bottom:3px solid ${C.line}">
    <i style="width:20px;height:20px;border-radius:50%;background:${C.red}"></i><i style="width:20px;height:20px;border-radius:50%;background:${C.yellow}"></i><i style="width:20px;height:20px;border-radius:50%;background:${C.green}"></i>
    <span class="mono" style="margin-left:18px;flex:1;height:44px;border-radius:22px;background:${C.ground};color:${C.muted};font-size:28px;display:flex;align-items:center;padding-left:22px">${url}</span>
  </div>${body}</div>`;
}

// A simple website wireframe to sit inside a browser card.
export function wireframe(w, accent = C.cyan) {
  const iw = w - 80;
  return `<div style="padding:34px 40px">
  <div style="height:150px;border-radius:18px;background:linear-gradient(120deg, ${accent}33, ${C.purple}33);display:flex;flex-direction:column;justify-content:center;gap:16px;padding-left:34px">
    <i style="display:block;width:${Math.round(iw * 0.55)}px;height:22px;border-radius:11px;background:${C.ink}"></i>
    <i style="display:block;width:${Math.round(iw * 0.35)}px;height:16px;border-radius:8px;background:${C.muted}"></i>
    <i style="display:block;width:150px;height:36px;border-radius:18px;background:${accent}"></i>
  </div>
  <div style="display:flex;gap:22px;margin-top:26px">
    ${[0, 1, 2].map(() => `<div style="flex:1;height:110px;border-radius:16px;background:${C.panel2}"></div>`).join("")}
  </div></div>`;
}

export function laptop({ id, x, y, w = 320, screen = "", tint = C.panel2 }) {
  const h = Math.round(w * 0.62);
  return `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h + 30}px">
  <div style="position:absolute;left:${Math.round(w * 0.08)}px;top:0;width:${Math.round(w * 0.84)}px;height:${h}px;border-radius:16px;background:${tint};border:5px solid ${C.line};overflow:hidden;display:flex;align-items:center;justify-content:center">${screen}</div>
  <div style="position:absolute;left:0;top:${h - 4}px;width:${w}px;height:28px;border-radius:0 0 18px 18px;background:${C.line}"></div></div>`;
}

export function folder({ id, x, y, w = 300, color = C.yellow, inner = "" }) {
  const h = Math.round(w * 0.74);
  return `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
  <svg width="${w}" height="${h}" viewBox="0 0 100 74" style="position:absolute;left:0;top:0"><path d="M4 10a6 6 0 0 1 6-6h24l8 8h48a6 6 0 0 1 6 6v46a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" fill="${color}"/><path d="M4 22h92v42a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" fill="${color}" opacity="0.82"/></svg>
  <div style="position:absolute;left:0;top:${Math.round(h * 0.3)}px;width:${w}px;height:${Math.round(h * 0.6)}px;display:flex;align-items:center;justify-content:center">${inner}</div></div>`;
}

export function avatar({ id, x, y, s = 90, letter, color }) {
  return `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:50%;background:${color};color:${C.ground};display:flex;align-items:center;justify-content:center;font:900 ${Math.round(s * 0.46)}px/1 Montserrat">${letter}</div>`;
}

export function cloudShape({ id, x, y, w = 520, color = C.panel2, stroke = C.cyan, inner = "" }) {
  const h = Math.round(w * 0.7);
  return `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
  <svg width="${w}" height="${h}" viewBox="1.4 2.4 23 16.1" preserveAspectRatio="none" style="position:absolute;left:0;top:0"><path d="M7 18a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 19 8.5a4.75 4.75 0 0 1-.25 9.5z" fill="${color}" stroke="${stroke}" stroke-width="0.22"/></svg>
  <div style="position:absolute;left:${Math.round(w * 0.12)}px;top:${Math.round(h * 0.42)}px;width:${Math.round(w * 0.78)}px;height:${Math.round(h * 0.5)}px;display:flex;align-items:center;justify-content:center;gap:16px">${inner}</div></div>`;
}

// ---------- GSAP line helpers (return JS source) ----------
const f = (n) => (+n).toFixed(3);
export const A = {
  pop: (sel, t, o = {}) => `tl.fromTo("${sel}",{opacity:0,scale:${o.from ?? 0.6}},{opacity:1,scale:1,duration:${o.d ?? 0.38},ease:"back.out(2)"},${f(t)});`,
  rise: (sel, t, o = {}) => `tl.fromTo("${sel}",{opacity:0,y:${o.y ?? 50}},{opacity:1,y:0,duration:${o.d ?? 0.45},ease:"power3.out"${o.stagger ? `,stagger:${o.stagger}` : ""}},${f(t)});`,
  slideX: (sel, t, x, o = {}) => `tl.fromTo("${sel}",{opacity:0,x:${x}},{opacity:1,x:0,duration:${o.d ?? 0.45},ease:"power3.out"${o.stagger ? `,stagger:${o.stagger}` : ""}},${f(t)});`,
  fade: (sel, t, o = {}) => `tl.fromTo("${sel}",{opacity:${o.from ?? 0}},{opacity:${o.to ?? 1},duration:${o.d ?? 0.3},ease:"none"},${f(t)});`,
  to: (sel, vars, t) => `tl.to("${sel}",${JSON.stringify(vars)},${f(t)});`,
  set: (sel, vars, t) => `tl.set("${sel}",${JSON.stringify(vars)},${f(t)});`,
  // stroke draw-on for an SVG path with pathLength="100" stroke-dasharray="100 120"
  draw: (sel, t, d = 0.6) => `tl.fromTo("${sel}",{strokeDashoffset:110},{strokeDashoffset:0,duration:${d},ease:"power2.inOut"},${f(t)});`,
  // idle drift so a held frame keeps breathing
  float: (sel, t, d, y = -14) => `tl.fromTo("${sel}",{y:0},{y:${y},duration:${f(d)},ease:"sine.inOut"},${f(t)});`,
  type: (sel, text, t, cps = 26) => {
    const steps = text.length;
    let s = "";
    for (let i = 1; i <= steps; i++) s += `tl.set("${sel}",{textContent:${JSON.stringify(text.slice(0, i))}},${f(t + i / cps)});`;
    return s;
  },
  count: (sel, from, to, t, d = 1.4, steps = 28) => {
    let s = "";
    for (let i = 1; i <= steps; i++) {
      const k = 1 - Math.pow(1 - i / steps, 2);
      s += `tl.set("${sel}",{textContent:${JSON.stringify(Math.round(from + (to - from) * k).toLocaleString("en-US"))}},${f(t + (d * i) / steps)});`;
    }
    return s;
  },
};

// Cover card shown before the narration: series chip, emblem, title, description.
// Everything is already on screen at frame 0 (it doubles as the reel thumbnail);
// only gentle motion runs while it holds.
export function cover({ series, emblem, emblemH = 300, title, desc, dur }) {
  const titleTop = 330 + emblemH + 50;
  const html = `
      <div id="cover-chip" class="topic" style="top:220px"><b>${series}</b></div>
      <div id="cover-emblem" class="abs" style="left:0;top:330px;width:1080px;height:${emblemH}px;display:flex;align-items:center;justify-content:center;gap:24px">${emblem}</div>
      <div class="abs" style="left:60px;top:${titleTop}px;width:960px;display:flex;flex-direction:column;align-items:center;gap:36px">
        <div id="cover-title" style="width:960px;text-align:center;font:900 96px/1.02 Montserrat, sans-serif;letter-spacing:-0.02em">${title}</div>
        <div id="cover-rule" style="width:200px;height:12px;border-radius:6px;background:${C.yellow}"></div>
        <div id="cover-desc" style="width:860px;text-align:center;font:700 42px/1.3 Inter, sans-serif;color:${C.muted}">${desc}</div>
      </div>`;
  const js = [
    `tl.fromTo("#cover-title",{scale:1},{scale:1.035,duration:${(dur - 0.3).toFixed(2)},ease:"sine.inOut"},0);`,
    `tl.fromTo("#cover-emblem",{y:0},{y:-16,duration:${(dur - 0.3).toFixed(2)},ease:"sine.inOut"},0);`,
    `tl.fromTo("#cover-rule",{scaleX:0.55},{scaleX:1,duration:0.9,ease:"power3.out"},0);`,
  ].join("\n");
  return { html, js };
}
