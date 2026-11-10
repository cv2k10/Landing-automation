// Scenes for "Which hosting should you pick for your client?" (portrait, 1080x1920)
import { C, A, logo, icon, browser, wireframe, cloudShape } from "../_tools/kit.mjs";

export const meta = {
  title: "Which Hosting For Your Client",
  series: "WEB BUILDER BASICS",
  glowA: C.purple,
  glowB: C.cyan,
  variables: [{ id: "series", type: "string", label: "Series label", default: "WEB BUILDER BASICS" }],
};

const topic = (id, text) => `<div id="${id}-topic" class="topic"><b>${text}</b></div>`;

// House used by "shared" and "noisy": a grid of windows, one of them yours.
function house(id, cols, rows, x, y, w, h, mine) {
  const roofH = 150;
  const pad = 40, gap = 18;
  const cw = (w - pad * 2 - gap * (cols - 1)) / cols;
  const ch = (h - roofH - pad * 2 - gap * (rows - 1)) / rows;
  let win = "";
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const k = r * cols + c;
      const isMine = k === mine;
      win += `<div id="${id}-win${k}" class="abs" style="left:${pad + c * (cw + gap)}px;top:${roofH + pad + r * (ch + gap)}px;width:${cw}px;height:${ch}px;border-radius:12px;background:${isMine ? C.yellow : C.panel2};border:3px solid ${isMine ? C.yellow : C.line}"></div>`;
    }
  return `<div id="${id}-house" class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
    <svg class="abs" style="left:0;top:0" width="${w}" height="${roofH + 6}" viewBox="0 0 ${w} ${roofH + 6}"><path d="M10 ${roofH + 4} L${w / 2} 6 L${w - 10} ${roofH + 4}Z" fill="${C.panel2}" stroke="${C.line}" stroke-width="5" stroke-linejoin="round"/></svg>
    <div class="abs" style="left:0;top:${roofH}px;width:${w}px;height:${h - roofH}px;border-radius:0 0 24px 24px;background:${C.panel};border:4px solid ${C.line}"></div>
    ${win}</div>`;
}

export const scenes = {
  hook: ({ T, dur }) => ({
    html: `
      <div id="hook-title" class="h1" style="top:250px">Where should it <span class="y">live?</span></div>
      ${browser({ id: "hook-browser", x: 130, y: 500, w: 820, h: 560, url: "yourclient.com", body: wireframe(820) })}
      <div id="hook-done" class="pill" style="left:640px;top:450px;width:330px;background:${C.green};border-color:${C.green};color:${C.ground}">${icon.check(46, C.ground, C.green)} DONE</div>
      <div id="hook-timer" class="pill" style="left:110px;top:960px;width:300px;background:${C.yellow};border-color:${C.yellow};color:${C.ground}">1 MINUTE</div>`,
    js: [
      A.float("#hook-browser", 0, dur, -18),
      A.pop("#hook-done", T("finished"), { from: 1.6 }),
      A.to("#hook-title .y", { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, T("live?")),
      A.pop("#hook-timer", T("minute.")),
    ].join("\n"),
    sfx: [{ name: "pop", at: T("finished"), vol: 0.4 }],
  }),

  shared: ({ T, dur }) => ({
    html: `
      ${topic("shared", "OPTION 1 · SHARED HOSTING")}
      ${house("shared", 3, 3, 250, 320, 580, 560, 4)}
      <div id="shared-you" class="pill" style="left:700px;top:470px;width:300px;height:80px;font-size:32px;background:${C.yellow};border-color:${C.yellow};color:${C.ground}">YOUR SITE</div>
      <div id="shared-p1" class="pill" style="left:70px;top:950px;width:280px">Cheap</div>
      <div id="shared-p2" class="pill" style="left:380px;top:950px;width:250px">Easy</div>
      <div id="shared-p3" class="pill" style="left:660px;top:950px;width:350px">${logo("wordpress", 46, C.cyan)} WordPress</div>`,
    js: [
      A.fade("#shared-house", 0.02, { d: 0.35 }),
      A.fade("#shared-win4", T("room"), { from: 0.25 }),
      A.pop("#shared-you", T("room") + 0.1),
      A.pop("#shared-p1", T("cheap,")),
      A.pop("#shared-p2", T("easy,")),
      A.pop("#shared-p3", T("WordPress")),
      A.float("#shared-house", 1, dur - 1, -12),
    ].join("\n"),
    sfx: [{ name: "pop", at: T("cheap,"), vol: 0.3 }],
  }),

  noisy: ({ T, dur }) => {
    let js = [A.fade("#noisy-house", 0, { d: 0.2 })];
    // neighbours light up across "hundreds of neighbors"
    const order = [0, 7, 13, 3, 18, 9, 22, 1, 15, 5, 20, 11, 2, 17, 8, 23, 6, 19, 10, 4, 16, 21, 12];
    order.forEach((k, i) => {
      const col = [C.cyan, C.purple, C.green, C.orange][i % 4];
      js.push(A.to(`#noisy-win${k}`, { backgroundColor: col, borderColor: col, duration: 0.12 }, T("hundreds") + i * 0.05));
    });
    js.push(A.to("#noisy-win13", { backgroundColor: C.red, borderColor: C.red, scale: 1.2, duration: 0.15 }, T("spike")));
    js.push(A.pop("#noisy-spike", T("spike")));
    js.push(A.fade("#noisy-bar", T("slow")));
    js.push(`tl.fromTo("#noisy-fill",{width:0},{width:150,duration:${(dur - T("slow") - 0.3).toFixed(2)},ease:"power4.out"},${T("slow").toFixed(3)});`);
    js.push(A.to("#noisy-win14", { opacity: 0.35, duration: 0.3 }, T("slow")));
    return {
      html: `
      ${topic("noisy", "THE CATCH")}
      ${house("noisy", 6, 4, 140, 320, 800, 600, 14)}
      <div id="noisy-spike" class="pill" style="left:640px;top:345px;width:360px;height:80px;font-size:32px;background:${C.red};border-color:${C.red};color:${C.ground}">TRAFFIC SPIKE</div>
      <div id="noisy-bar" class="card" style="left:140px;top:950px;width:800px;height:110px;border-radius:24px;display:flex;align-items:center;gap:24px;padding:0 30px">
        <span style="font:800 34px Montserrat;color:${C.yellow};white-space:nowrap">Your site</span>
        <div style="position:relative;flex:1;height:26px;border-radius:13px;background:${C.ground};overflow:hidden"><div id="noisy-fill" style="position:absolute;left:0;top:0;height:26px;width:0;border-radius:13px;background:${C.red}"></div></div>
        <span style="font:800 34px Montserrat;color:${C.red}">SLOW</span>
      </div>`,
      js: js.join("\n"),
    };
  },

  static: ({ T, dur }) => {
    const nodes = [[540, 420], [380, 540], [700, 520], [330, 700], [760, 690], [470, 800], [620, 790], [540, 600]];
    const files = ["HTML", "CSS", "JS", "IMG"];
    let html = `
      ${topic("static", "OPTION 2 · STATIC HOSTING")}
      <svg id="static-globe" class="abs" style="left:290px;top:340px" width="500" height="500" viewBox="0 0 500 500">
        <circle cx="250" cy="250" r="240" fill="${C.panel}" stroke="${C.cyan}" stroke-width="4"/>
        <ellipse cx="250" cy="250" rx="110" ry="240" fill="none" stroke="${C.line}" stroke-width="3"/>
        <ellipse cx="250" cy="250" rx="200" ry="240" fill="none" stroke="${C.line}" stroke-width="3"/>
        <path d="M10 250h480M40 130h420M40 370h420" stroke="${C.line}" stroke-width="3"/>
      </svg>`;
    nodes.forEach(([x, y], i) => (html += `<div id="static-n${i}" class="abs" style="left:${x - 16}px;top:${y - 16}px;width:32px;height:32px;border-radius:50%;background:${C.cyan};box-shadow:0 0 30px ${C.cyan}"></div>`));
    files.forEach((t, i) => (html += `<div id="static-f${i}" class="abs mono" style="left:${490}px;top:${565}px;width:100px;height:70px;border-radius:12px;background:${C.yellow};color:${C.ground};font:800 30px/70px 'JetBrains Mono';text-align:center">${t}</div>`));
    html += `
      <div id="static-l1" class="pill" style="left:40px;top:880px;width:300px;height:86px;font-size:34px">${logo("netlify", 40, "#32E6E2")} Netlify</div>
      <div id="static-l2" class="pill" style="left:360px;top:880px;width:280px;height:86px;font-size:34px">${logo("vercel", 36, C.ink)} Vercel</div>
      <div id="static-l3" class="pill" style="left:660px;top:880px;width:380px;height:86px;font-size:32px">${logo("github", 40, C.ink)} GitHub Pages</div>
      <div id="static-free" class="pill" style="left:180px;top:990px;width:320px;height:86px;font-size:34px;background:${C.green};border-color:${C.green};color:${C.ground}">OFTEN FREE</div>
      <div id="static-fast" class="pill" style="left:540px;top:990px;width:360px;height:86px;font-size:34px;background:${C.yellow};border-color:${C.yellow};color:${C.ground}">${icon.bolt(40, C.ground)} SUPER FAST</div>`;
    const js = [A.pop("#static-globe", 0.05, { from: 0.8, d: 0.5 })];
    js.push(A.pop("#static-l1", T("Netlify,")), A.pop("#static-l2", T("Vercel,")), A.pop("#static-l3", T("GitHub")));
    js.push(`tl.fromTo("#static-globe",{rotation:0},{rotation:12,duration:${dur.toFixed(2)},ease:"none"},0);`);
    const t0 = T("files");
    nodes.forEach(([x, y], i) => js.push(A.pop(`#static-n${i}`, T("global") + i * 0.06, { from: 0 })));
    files.forEach((_, i) => {
      const [x, y] = nodes[[1, 2, 3, 4][i]];
      js.push(`tl.fromTo("#static-f${i}",{opacity:0,x:0,y:0,scale:0.5},{opacity:1,x:${x - 540},y:${y - 600},scale:1,duration:0.6,ease:"power3.out"},${(t0 + i * 0.12).toFixed(3)});`);
      js.push(A.to(`#static-f${i}`, { opacity: 0, scale: 0.4, duration: 0.25 }, T("free,") - 0.3 + i * 0.03));
    });
    js.push(A.pop("#static-free", T("free,")), A.pop("#static-fast", T("fast.")));
    return { html, js: js.join("\n"), sfx: [{ name: "pop", at: T("free,"), vol: 0.3 }] };
  },

  fit: ({ T }) => {
    const rows = [
      ["fit-r1", "Landing pages", true, T("landing")],
      ["fit-r2", "Portfolios", true, T("portfolios.")],
      ["fit-r3", "PHP", false, T("PHP")],
      ["fit-r4", "Database", false, T("database")],
    ];
    let html = `${topic("fit", "STATIC HOSTING · BEST FOR")}`;
    rows.forEach(([id, label, ok], i) => {
      html += `<div id="${id}" class="card" style="left:110px;top:${330 + i * 180}px;width:860px;height:150px;display:flex;align-items:center;gap:36px;padding:0 44px;border-color:${ok ? C.green : C.red}">
        ${ok ? icon.check(84) : icon.cross(84)}<span style="font:900 60px Montserrat;color:${ok ? C.ink : C.muted};${ok ? "" : "text-decoration:line-through;text-decoration-thickness:6px"}">${label}</span></div>`;
    });
    const js = rows.map(([id, , , t]) => A.slideX(`#${id}`, t - 0.1, -120)).join("\n");
    return { html, js, sfx: [{ name: "pop", at: T("PHP"), vol: 0.25 }] };
  },

  vps: ({ T, dur }) => ({
    html: `
      ${topic("vps", "OPTION 3 · VPS")}
      <div id="vps-full" class="h2" style="top:300px"><span class="c">V</span>irtual <span class="c">P</span>rivate <span class="c">S</span>erver</div>
      <svg id="vps-bldg" class="abs" style="left:90px;top:420px" width="360" height="460" viewBox="0 0 360 460">
        <rect x="20" y="20" width="320" height="440" rx="18" fill="${C.panel}" stroke="${C.line}" stroke-width="5"/>
        ${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${55 + c * 95}" y="${55 + r * 85}" width="62" height="54" rx="8" fill="${r === 1 && c === 1 ? C.cyan : C.panel2}"/>`).join("")).join("")}
        <rect x="140" y="380" width="80" height="80" rx="8" fill="${C.panel2}"/>
      </svg>
      <div id="vps-key" class="abs" style="left:250px;top:370px">${icon.key(110, C.yellow)}</div>
      <div id="vps-term" class="card" style="left:480px;top:470px;width:520px;height:360px;background:#070B17;padding:32px">
        <div class="mono" style="font-size:30px;line-height:1.6;color:${C.green}"><span id="vps-cmd"></span></div>
        <div class="mono" style="font-size:30px;line-height:1.6;color:${C.ink}" id="vps-out1"></div>
        <div class="mono" style="font-size:30px;line-height:1.6;color:${C.yellow}" id="vps-out2"></div>
      </div>
      <div id="vps-p1" class="pill" style="left:110px;top:940px;width:380px">${logo("laravel", 48, "#FF2D20")} Laravel</div>
      <div id="vps-p2" class="pill" style="left:520px;top:940px;width:450px">Custom apps</div>`,
    js: [
      A.rise("#vps-bldg", 0.05, { y: 80, d: 0.55 }),
      A.pop("#vps-key", T("own"), { from: 0.3 }),
      A.rise("#vps-full", T("private"), { y: 30 }),
      A.slideX("#vps-term", T("virtual") - 0.1, 120),
      A.type("#vps-cmd", "$ ssh root@my-vps", T("virtual") + 0.2, 24),
      A.set("#vps-out1", { textContent: "Full control: ON" }, T("control.")),
      A.set("#vps-out2", { textContent: "root@vps:~# _" }, T("control.") + 0.25),
      A.pop("#vps-p1", T("Laravel")),
      A.pop("#vps-p2", T("custom")),
    ].join("\n"),
  }),

  duty: ({ T }) => {
    const tasks = [["duty-t1", "Updates", icon.refresh(70, C.cyan), T("Updates,")], ["duty-t2", "Security", icon.lock(70, C.cyan), T("security,")], ["duty-t3", "Backups", icon.cloud(70, C.cyan), T("backups")]];
    let html = `${topic("duty", "THE CATCH")}
      <div id="duty-title" class="h1" style="top:290px">You're the <span class="y">landlord</span></div>`;
    tasks.forEach(([id, label, ic], i) => {
      html += `<div id="${id}" class="card" style="left:130px;top:${520 + i * 170}px;width:820px;height:140px;display:flex;align-items:center;gap:34px;padding:0 40px">${ic}<span style="font:900 56px Montserrat">${label}</span>
        <span id="${id}-stamp" style="margin-left:auto;padding:10px 22px;border:5px solid ${C.red};border-radius:14px;color:${C.red};font:900 34px Montserrat;letter-spacing:0.06em">ON YOU</span></div>`;
    });
    const js = [A.rise("#duty-title", T("landlord.") - 0.4, { y: 30 })];
    tasks.forEach(([id, , , t]) => js.push(A.slideX(`#${id}`, t - 0.08, 140)));
    tasks.forEach(([id], i) => js.push(A.pop(`#${id}-stamp`, T("all") + i * 0.12, { from: 1.8 })));
    return { html, js: js.join("\n"), sfx: [{ name: "pop", at: T("all"), vol: 0.3 }] };
  },

  managed: ({ T }) => {
    const rows = [["managed-r1", "Speed", icon.gauge(64, C.yellow), T("speed,")], ["managed-r2", "Backups", icon.cloud(64, C.cyan), T("backups,")], ["managed-r3", "Security", icon.shield(64, C.green), T("security,")]];
    let html = `${topic("managed", "OPTION 4 · MANAGED WORDPRESS")}
      <div id="managed-head" class="abs" style="left:110px;top:310px;width:860px;height:170px;display:flex;align-items:center;justify-content:center;gap:34px">
        ${logo("wordpress", 120, C.cyan)}<span id="managed-price" style="font:900 96px Montserrat;color:${C.yellow}">$$$</span></div>
      <div id="managed-by" class="label" style="left:60px;top:500px;width:960px;font-size:34px">Experts take care of:</div>`;
    rows.forEach(([id, label, ic], i) => {
      html += `<div id="${id}" class="card" style="left:150px;top:${560 + i * 140}px;width:780px;height:116px;display:flex;align-items:center;gap:30px;padding:0 36px">${ic}<span style="font:900 50px Montserrat">${label}</span><span style="margin-left:auto">${icon.check(62)}</span></div>`;
    });
    html += `<div id="managed-relax" class="pill" style="left:200px;top:990px;width:680px;height:90px;font-size:36px;background:${C.green};border-color:${C.green};color:${C.ground}">CLIENT CAN RELAX</div>`;
    const js = [A.pop("#managed-head", 0.05, { from: 0.8 }), A.pop("#managed-price", T("costs"), { from: 1.8 }), A.fade("#managed-by", T("experts"))];
    rows.forEach(([id, , , t]) => js.push(A.slideX(`#${id}`, t - 0.1, -120)));
    js.push(A.pop("#managed-relax", T("client") - 0.1));
    return { html, js: js.join("\n"), sfx: [{ name: "pop", at: T("client") - 0.1, vol: 0.3 }] };
  },

  cloud: ({ T, dur }) => {
    const bars = [40, 70, 110, 170, 250, 340];
    let html = `${topic("cloud", "OPTION 5 · CLOUD PLATFORMS")}
      ${cloudShape({ id: "cloud-shape", x: 190, y: 270, w: 700, inner: `<span style="font:900 58px Montserrat;color:${C.orange}">AWS</span><span style="font:900 46px Montserrat;color:${C.muted}">·</span>${logo("googlecloud", 52, C.ink)}<span style="font:800 38px Montserrat;white-space:nowrap">Google Cloud</span>` })}
      <div id="cloud-chart" class="card" style="left:130px;top:700px;width:820px;height:380px;padding:30px">
        <div class="label" style="position:static;text-align:left;font-size:30px">Visitors</div>
        <div id="cloud-num" style="font:900 72px Montserrat;color:${C.cyan}">0</div>
      </div>`;
    bars.forEach((h, i) => (html += `<div id="cloud-b${i}" class="abs" style="left:${520 + i * 66}px;top:${1050 - h}px;width:48px;height:${h}px;border-radius:10px 10px 4px 4px;background:${C.cyan}"></div>`));
    html += `<div id="cloud-complex" class="pill" style="left:160px;top:930px;width:340px;height:86px;font-size:30px;background:${C.orange};border-color:${C.orange};color:${C.ground}">COMPLEX SETUP</div>`;
    const js = [A.pop("#cloud-shape", 0.05, { from: 0.8, d: 0.5 }), A.rise("#cloud-chart", T("scale") - 0.5, { y: 60 })];
    bars.forEach((_, i) => js.push(`tl.fromTo("#cloud-b${i}",{scaleY:0,transformOrigin:"50% 100%"},{scaleY:1,duration:0.4,ease:"power3.out"},${(T("scale") + i * 0.12).toFixed(3)});`));
    js.push(A.count("#cloud-num", 0, 1000000, T("scale"), T("visitors.") - T("scale") + 0.3));
    js.push(A.pop("#cloud-complex", T("complex")));
    js.push(A.float("#cloud-shape", 0.6, dur - 0.9, -14));
    return { html, js: js.join("\n"), sfx: [{ name: "pop", at: T("complex"), vol: 0.3 }] };
  },

  guide: ({ T }) => {
    const rows = [
      ["Landing page", "Static", C.cyan, T("Landing"), T("static.")],
      ["WordPress", "Shared / Managed", C.green, T("Small"), T("Shared")],
      ["Custom app", "VPS", C.purple, T("Custom"), T("VPS.")],
      ["Huge traffic", "Cloud", C.orange, T("Huge"), T("Cloud.")],
    ];
    let html = `${topic("guide", "QUICK GUIDE")}`;
    const js = [];
    rows.forEach(([q, a, col, tq, ta], i) => {
      const y = 320 + i * 190;
      html += `<div id="guide-q${i}" class="card" style="left:60px;top:${y}px;width:420px;height:160px;display:flex;align-items:center;justify-content:center;font:800 42px/1.1 Montserrat;text-align:center;padding:0 20px">${q}</div>
        <svg id="guide-a${i}" class="abs" style="left:490px;top:${y + 55}px" width="70" height="50" viewBox="0 0 70 50"><path d="M4 25h52M40 8l18 17-18 17" fill="none" stroke="${C.muted}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div id="guide-r${i}" class="card" style="left:570px;top:${y}px;width:450px;height:160px;display:flex;align-items:center;justify-content:center;background:${col};border-color:${col};color:${C.ground};font:900 ${a.length > 8 ? 42 : 58}px/1.05 Montserrat;text-align:center;padding:0 16px">${a}</div>`;
      js.push(A.slideX(`#guide-q${i}`, tq - 0.08, -100), A.fade(`#guide-a${i}`, tq + 0.15), A.pop(`#guide-r${i}`, ta - 0.05));
    });
    return { html, js: js.join("\n"), sfx: rows.map((r) => ({ name: "pop", at: r[4] - 0.05, vol: 0.22 })) };
  },

  outro: ({ T, dur }) => ({
    html: `
      <div id="outro-l1" class="h1" style="top:420px">Match the hosting to the</div>
      <div id="outro-l2" class="h1" style="top:620px;font-size:120px"><span class="y">PROJECT</span></div>
      <div id="outro-l3" class="h2" style="top:790px">not the <span id="outro-hype" style="position:relative;display:inline-block">hype<i id="outro-strike" style="position:absolute;left:-8px;top:52%;width:calc(100% + 16px);height:10px;border-radius:5px;background:${C.red}"></i></span></div>
      <div id="outro-follow" class="pill" style="left:240px;top:960px;width:600px;background:${C.yellow};border-color:${C.yellow};color:${C.ground}">FOLLOW FOR MORE</div>`,
    js: [
      A.rise("#outro-l1", 0.02, { y: 40 }),
      A.pop("#outro-l2", T("project,") - 0.1, { from: 1.4 }),
      A.rise("#outro-l3", T("not") - 0.1, { y: 30 }),
      `tl.fromTo("#outro-strike",{scaleX:0,transformOrigin:"0% 50%"},{scaleX:1,duration:0.3,ease:"power2.out"},${(T("hype.") + 0.2).toFixed(3)});`,
      A.pop("#outro-follow", T("Follow")),
      A.to("#outro-follow", { scale: 1.06, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, T("Follow") + 0.6),
    ].join("\n"),
    noExit: true,
    sfx: [{ name: "impact-bass-1", at: T("project,") - 0.1, vol: 0.35 }],
  }),
};
