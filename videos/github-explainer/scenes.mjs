// Scenes for "What is GitHub and a repository?" (portrait, 1080x1920)
import { C, A, logo, icon, browser, laptop, folder, avatar, cloudShape } from "../_tools/kit.mjs";

export const meta = {
  title: "What Is GitHub",
  series: "WEB BUILDER BASICS",
  glowA: C.purple,
  glowB: C.green,
  variables: [{ id: "series", type: "string", label: "Series label", default: "WEB BUILDER BASICS" }],
};

const topic = (id, text) => `<div id="${id}-topic" class="topic"><b>${text}</b></div>`;
const dot = (id, x, y, col, s = 44) => `<div id="${id}" class="abs" style="left:${x - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s}px;border-radius:50%;background:${C.ground};border:9px solid ${col}"></div>`;
const hline = (id, x, y, w, col, t = 10) => `<div id="${id}" class="abs" style="left:${x}px;top:${y - t / 2}px;width:${w}px;height:${t}px;border-radius:${t / 2}px;background:${col}"></div>`;
const grow = (sel, t, d = 0.5) => `tl.fromTo("${sel}",{scaleX:0,transformOrigin:"0% 50%"},{scaleX:1,duration:${d},ease:"power2.inOut"},${(+t).toFixed(3)});`;
const codeLines = (rows) =>
  rows.map(([ind, w, col]) => `<div style="height:22px;margin:0 0 22px ${ind * 44}px;width:${w}px;border-radius:11px;background:${col}"></div>`).join("");

export const scenes = {
  hook: ({ T, dur }) => ({
    html: `
      <div id="hook-title" class="h1" style="top:250px">Wish you could hit <span class="y">undo?</span></div>
      ${browser({
        id: "hook-browser", x: 130, y: 500, w: 820, h: 460, url: "yourclient.com",
        body: `<div style="height:384px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px">
          <div style="font:900 120px/1 Montserrat;color:${C.red}">500</div>
          <div style="font:800 40px Montserrat;color:${C.muted}">Something broke</div></div>`,
      })}
      <div id="hook-key" class="abs" style="left:700px;top:880px;width:240px;height:150px;border-radius:26px;background:${C.panel2};border:4px solid ${C.line};border-bottom-width:14px;display:flex;align-items:center;justify-content:center;font:900 56px Montserrat;color:${C.ink}">Ctrl+Z</div>
      <div id="hook-gh" class="pill" style="left:120px;top:900px;width:420px;height:110px;font-size:46px;background:${C.ink};border-color:${C.ink};color:${C.ground}">${logo("github", 62, C.ground)} GitHub</div>`,
    js: [
      `tl.fromTo("#hook-browser",{x:-6},{x:6,duration:0.06,ease:"none",yoyo:true,repeat:7},0.15);`,
      A.float("#hook-browser", 0.7, dur - 0.7, -14),
      A.pop("#hook-key", T("undo?") - 0.25, { from: 1.5 }),
      A.to("#hook-key", { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, T("undo?") + 0.3),
      A.pop("#hook-gh", T("GitHub") - 0.1, { from: 0.4 }),
    ].join("\n"),
    sfx: [{ name: "click", at: T("undo?") + 0.3, vol: 0.4 }],
  }),

  commit: ({ T }) => ({
    html: `
      ${topic("commit", "VERSION CONTROL")}
      <div id="commit-file" class="card" style="left:150px;top:310px;width:780px;height:420px;padding:40px 44px">
        <div class="mono" style="font-size:30px;color:${C.muted};margin-bottom:28px">index.html</div>
        ${codeLines([[0, 380, C.purple], [1, 460, C.cyan], [2, 300, C.ink], [2, 420, C.ink], [1, 260, C.cyan], [0, 200, C.purple]])}
      </div>
      <div id="commit-flash" class="abs" style="left:150px;top:310px;width:780px;height:420px;border-radius:28px;background:#fff;opacity:0"></div>
      <div id="commit-git" class="pill" style="left:640px;top:270px;width:260px;height:90px;background:${C.panel2};border-color:#F05032">${logo("git", 50, "#F05032")} Git</div>
      <div id="commit-snap" class="card" style="left:380px;top:790px;width:320px;height:200px;padding:24px 26px;border-color:${C.yellow}">
        ${codeLines([[0, 160, C.purple], [1, 190, C.cyan], [1, 130, C.ink]]).replace(/22px/g, "14px")}
      </div>
      ${dot("commit-dot", 230, 890, C.green, 70)}
      <div id="commit-label" class="pill" style="left:740px;top:845px;width:280px;height:90px;font-size:38px;background:${C.green};border-color:${C.green};color:${C.ground}">commit</div>
      <div id="commit-hash" class="label mono" style="left:700px;top:950px;width:360px;font-size:30px">a1b2c3d</div>`,
    js: [
      A.rise("#commit-file", 0.05, { y: 60 }),
      A.pop("#commit-git", T("Git") - 0.1),
      `tl.fromTo("#commit-flash",{opacity:0},{opacity:0.85,duration:0.06,ease:"none"},${T("snapshot").toFixed(3)});`,
      A.to("#commit-flash", { opacity: 0, duration: 0.35, ease: "power2.out" }, T("snapshot") + 0.07),
      `tl.fromTo("#commit-snap",{opacity:0,y:-300,scale:1.6,rotation:-8},{opacity:1,y:0,scale:1,rotation:-3,duration:0.6,ease:"power3.out"},${(T("snapshot") + 0.1).toFixed(3)});`,
      A.pop("#commit-dot", T("change.") - 0.2, { from: 0 }),
      A.pop("#commit-label", T("commit.") - 0.1),
      A.fade("#commit-hash", T("commit.") + 0.1),
    ].join("\n"),
    sfx: [{ name: "click-soft", at: T("snapshot"), vol: 0.5 }, { name: "pop", at: T("commit.") - 0.1, vol: 0.3 }],
  }),

  history: ({ T }) => {
    const rows = [
      ["Add homepage", "A", C.cyan, "Mon 9:12"],
      ["New hero image", "B", C.purple, "Tue 14:40"],
      ["Fix menu on mobile", "A", C.cyan, "Wed 10:05"],
      ["Add contact form", "C", C.orange, "Today 11:30"],
    ];
    let html = `${topic("history", "HISTORY")}
      <div id="history-rail" class="abs" style="left:126px;top:350px;width:10px;height:690px;border-radius:5px;background:${C.line}"></div>`;
    rows.forEach(([msg, who, col, when], i) => {
      const y = 350 + i * 175;
      html += `${dot(`history-d${i}`, 131, y + 70, C.green, 52)}
        <div id="history-r${i}" class="card" style="left:200px;top:${y}px;width:820px;height:140px;display:flex;align-items:center;gap:26px;padding:0 30px">
          <div id="history-a${i}" style="width:76px;height:76px;flex:none;border-radius:50%;background:${col};color:${C.ground};display:flex;align-items:center;justify-content:center;font:900 38px Montserrat">${who}</div>
          <div style="flex:1"><div id="history-m${i}" style="font:800 38px/1.15 Montserrat">${msg}</div>
          <div id="history-t${i}" class="mono" style="font-size:28px;color:${C.muted};margin-top:8px">${when}</div></div></div>`;
    });
    const js = [A.fade("#history-rail", 0.02)];
    rows.forEach((_, i) => js.push(A.pop(`#history-d${i}`, 0.1 + i * 0.32, { from: 0 }), A.slideX(`#history-r${i}`, 0.1 + i * 0.32, 80)));
    rows.forEach((_, i) => {
      js.push(A.to(`#history-a${i}`, { scale: 1.2, duration: 0.15, yoyo: true, repeat: 1 }, T("who") + i * 0.05));
      js.push(A.to(`#history-m${i}`, { color: C.yellow, duration: 0.15 }, T("what")));
      js.push(A.to(`#history-t${i}`, { color: C.cyan, duration: 0.15 }, T("when.")));
    });
    return { html, js: js.join("\n") };
  },

  repo: ({ T, dur }) => ({
    html: `
      ${topic("repo", "REPOSITORY = REPO")}
      ${cloudShape({ id: "repo-cloud", x: 300, y: 290, w: 480, inner: `${logo("github", 70, C.ink)}<span style="font:900 46px Montserrat">GitHub</span>` })}
      <svg id="repo-arrow" class="abs" style="left:500px;top:640px" width="80" height="110" viewBox="0 0 80 110"><path d="M40 104V12M12 40l28-28 28 28" fill="none" stroke="${C.green}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div id="repo-h3" class="abs" style="left:360px;top:760px;width:400px;height:290px;border-radius:24px;background:${C.panel2};opacity:0.45"></div>
      <div id="repo-h2" class="abs" style="left:345px;top:775px;width:400px;height:290px;border-radius:24px;background:${C.panel2};opacity:0.7"></div>
      ${folder({ id: "repo-folder", x: 330, y: 790, w: 400, color: C.yellow, inner: `<span style="font:900 44px Montserrat;color:${C.ground}">client-site</span>` })}
      <div id="repo-plus" class="pill" style="left:740px;top:850px;width:290px;height:86px;font-size:34px">+ history</div>`,
    js: [
      A.pop("#repo-folder", T("repository,") - 0.1, { from: 0.6 }),
      A.slideX("#repo-h2", T("history.") - 0.25, 60),
      A.slideX("#repo-h3", T("history.") - 0.15, 90),
      A.pop("#repo-plus", T("history.") - 0.1),
      A.pop("#repo-cloud", T("GitHub") - 0.1, { from: 0.7 }),
      `tl.fromTo("#repo-arrow",{opacity:0,y:40},{opacity:1,y:0,duration:0.4,ease:"power3.out"},${(T("safe") - 0.1).toFixed(3)});`,
      A.float("#repo-cloud", T("GitHub") + 0.4, dur - T("GitHub") - 0.7, -12),
    ].join("\n"),
    sfx: [{ name: "pop", at: T("GitHub") - 0.1, vol: 0.3 }],
  }),

  backup: ({ T }) => ({
    html: `
      ${topic("backup", "BACKUP")}
      ${cloudShape({ id: "backup-cloud", x: 330, y: 290, w: 420, inner: logo("github", 80, C.ink) })}
      ${laptop({ id: "backup-old", x: 90, y: 700, w: 380, screen: `<div id="backup-x">${icon.cross(110)}</div>` })}
      ${laptop({ id: "backup-new", x: 610, y: 700, w: 380, screen: `<div id="backup-ok">${icon.check(110)}</div>` })}
      <svg id="backup-arrow" class="abs" style="left:700px;top:540px" width="120" height="140" viewBox="0 0 120 140"><path d="M20 10c50 10 75 50 70 120M64 104l26 26 22-30" fill="none" stroke="${C.green}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div id="backup-l1" class="label" style="left:90px;top:970px;width:380px">Old laptop</div>
      <div id="backup-l2" class="label" style="left:610px;top:970px;width:380px">Any computer</div>`,
    js: [
      A.rise("#backup-old", 0.05, { y: 40 }),
      A.fade("#backup-l1", 0.1),
      A.pop("#backup-x", T("died?") - 0.1, { from: 2 }),
      A.to("#backup-old", { opacity: 0.45, duration: 0.3 }, T("died?") + 0.2),
      A.pop("#backup-cloud", T("backed") - 0.15, { from: 0.6 }),
      `tl.fromTo("#backup-arrow",{opacity:0,y:-30},{opacity:1,y:0,duration:0.4,ease:"power3.out"},${(T("download") - 0.15).toFixed(3)});`,
      A.rise("#backup-new", T("download"), { y: 40 }),
      A.fade("#backup-l2", T("download") + 0.1),
      A.pop("#backup-ok", T("again.") - 0.05, { from: 0 }),
    ].join("\n"),
    sfx: [{ name: "pop", at: T("again.") - 0.05, vol: 0.3 }],
  }),

  recover: ({ T }) => {
    const pts = [[150, "Mon"], [390, "Tue"], [630, "Yesterday"], [880, "Today"]];
    let html = `${topic("recover", "RECOVER")}
      ${browser({
        id: "recover-site", x: 190, y: 300, w: 700, h: 380, url: "yourclient.com",
        body: `<div style="position:relative;height:304px"><div id="recover-bad" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:20px;font:900 52px Montserrat;color:${C.red}">${icon.cross(70)} Bug on live</div>
        <div id="recover-good" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:20px;font:900 52px Montserrat;color:${C.green};opacity:0">${icon.check(70)} Working again</div></div>`,
      })}
      ${hline("recover-line", 150, 860, 730, C.line, 12)}`;
    pts.forEach(([x, lab], i) => {
      html += dot(`recover-d${i}`, x, 860, i === 3 ? C.red : C.green, 56);
      html += `<div id="recover-l${i}" class="label" style="left:${x - 110}px;top:910px;width:220px;${i === 2 ? `color:${C.green};font-weight:800` : ""}">${lab}</div>`;
    });
    html += `<div id="recover-head" class="pill" style="left:${880 - 100}px;top:730px;width:200px;height:76px;font-size:32px;background:${C.yellow};border-color:${C.yellow};color:${C.ground}">LIVE</div>`;
    const js = [A.rise("#recover-site", 0.02, { y: 40 }), grow("#recover-line", 0.1, 0.5)];
    pts.forEach((_, i) => js.push(A.pop(`#recover-d${i}`, 0.15 + i * 0.12, { from: 0 }), A.fade(`#recover-l${i}`, 0.2 + i * 0.12)));
    js.push(A.pop("#recover-head", 0.7));
    js.push(`tl.fromTo("#recover-head",{x:0},{x:-250,duration:0.6,ease:"power3.inOut"},${(T("Roll") + 0.05).toFixed(3)});`);
    js.push(A.to("#recover-bad", { opacity: 0, duration: 0.2 }, T("Roll") + 0.6));
    js.push(A.to("#recover-good", { opacity: 1, duration: 0.25 }, T("Roll") + 0.65));
    js.push(A.to("#recover-d3", { opacity: 0.3, duration: 0.3 }, T("Roll") + 0.6));
    return { html, js: js.join("\n"), sfx: [{ name: "whoosh-short", at: T("Roll"), vol: 0.3 }, { name: "pop", at: T("Roll") + 0.65, vol: 0.3 }] };
  },

  clone: ({ T }) => {
    const cmd = "$ git clone github.com/you/client-site";
    const devs = [[70, "New laptop"], [395, "Teammate"], [720, "Office PC"]];
    let html = `${topic("clone", "CLONE")}
      <div id="clone-term" class="card" style="left:70px;top:300px;width:940px;height:200px;background:#070B17;padding:36px 36px">
        <div class="mono" style="font-size:31px;color:${C.green};white-space:nowrap" id="clone-cmd">$</div>
        <div class="mono" style="font-size:30px;color:${C.muted};margin-top:16px" id="clone-out"></div>
      </div>`;
    devs.forEach(([x, lab], i) => {
      html += laptop({ id: `clone-pc${i}`, x, y: 700, w: 290, screen: `<div id="clone-f${i}"><svg width="120" height="89" viewBox="0 0 100 74"><path d="M4 10a6 6 0 0 1 6-6h24l8 8h48a6 6 0 0 1 6 6v46a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" fill="${C.yellow}"/></svg></div>` });
      html += `<div id="clone-l${i}" class="label" style="left:${x}px;top:920px;width:290px">${lab}</div>`;
    });
    html += `<div id="clone-same" class="pill" style="left:240px;top:990px;width:600px;height:86px;font-size:36px;background:${C.green};border-color:${C.green};color:${C.ground}">SAME PROJECT</div>`;
    const js = [A.rise("#clone-term", 0.02, { y: 40 }), A.type("#clone-cmd", cmd, 0.25, 34), A.set("#clone-out", { textContent: "Cloning into 'client-site'... done." }, T("command.") - 0.1)];
    const keys = ["laptop,", "teammate,", "same"];
    devs.forEach((_, i) => {
      js.push(A.rise(`#clone-pc${i}`, T(keys[i]) - 0.25, { y: 50 }), A.fade(`#clone-l${i}`, T(keys[i]) - 0.1));
      js.push(`tl.fromTo("#clone-f${i}",{opacity:0,y:-120},{opacity:1,y:0,duration:0.45,ease:"bounce.out"},${(T(keys[i]) + 0.05).toFixed(3)});`);
    });
    js.push(A.pop("#clone-same", T("project.") - 0.1));
    return { html, js: js.join("\n"), sfx: [{ name: "key-press", at: 0.3, vol: 0.25 }] };
  },

  branch: ({ T }) => ({
    html: `
      ${topic("branch", "FEATURE BRANCH")}
      <div id="branch-site" class="pill" style="left:110px;top:330px;width:440px;height:86px;font-size:34px">${icon.lock(40)} main = live site</div>
      ${hline("branch-main", 80, 520, 920, C.green, 14)}
      ${[200, 420, 860].map((x, i) => dot(`branch-m${i}`, x, 520, C.green, 54)).join("")}
      <svg class="abs" style="left:420px;top:520px" width="260" height="290" viewBox="0 0 260 290"><path id="branch-curve" d="M0 0C0 150 120 250 250 250" pathLength="100" stroke-dasharray="100 120" stroke-dashoffset="110" fill="none" stroke="${C.purple}" stroke-width="14" stroke-linecap="round"/></svg>
      ${hline("branch-feat", 670, 770, 330, C.purple, 14)}
      ${[740, 900].map((x, i) => dot(`branch-f${i}`, x, 770, C.purple, 54)).join("")}
      <div id="branch-name" class="pill mono" style="left:300px;top:860px;width:640px;height:90px;font:800 36px 'JetBrains Mono';color:${C.purple};border-color:${C.purple}">feature/contact-form</div>
      <div id="branch-safe" class="pill" style="left:560px;top:330px;width:420px;height:86px;font-size:34px;background:${C.green};border-color:${C.green};color:${C.ground}">${icon.check(40, C.ground, C.green)} UNTOUCHED</div>`,
    js: [
      grow("#branch-main", 0.05, 0.6),
      A.pop("#branch-m0", 0.2, { from: 0 }), A.pop("#branch-m1", 0.35, { from: 0 }), A.pop("#branch-m2", 0.5, { from: 0 }),
      A.rise("#branch-site", 0.3, { y: 20 }),
      A.draw("#branch-curve", T("branch.") - 0.2, 0.5),
      grow("#branch-feat", T("branch.") + 0.25, 0.4),
      A.pop("#branch-name", T("branch.") + 0.3),
      A.pop("#branch-f0", T("experiment") - 0.1, { from: 0 }),
      A.pop("#branch-f1", T("experiment") + 0.25, { from: 0 }),
      A.pop("#branch-safe", T("touching") - 0.05),
    ].join("\n"),
    sfx: [{ name: "pop", at: T("touching") - 0.05, vol: 0.3 }],
  }),

  pr: ({ T }) => ({
    html: `
      ${topic("pr", "PULL REQUEST")}
      <div id="pr-card" class="card" style="left:70px;top:300px;width:940px;height:560px;padding:36px 40px">
        <div style="display:flex;align-items:center;gap:22px">
          <span id="pr-state" style="padding:10px 24px;border-radius:999px;background:${C.green};color:${C.ground};font:900 32px Montserrat">Open</span>
          <span id="pr-merged" style="padding:10px 24px;border-radius:999px;background:${C.purple};color:${C.ground};font:900 32px Montserrat;opacity:0">Merged</span>
        </div>
        <div style="font:900 52px/1.15 Montserrat;margin-top:22px">Add contact form <span class="m">#12</span></div>
        <div class="mono" style="font-size:28px;color:${C.muted};margin-top:10px">feature/contact-form → main</div>
        <div id="pr-review" style="display:flex;align-items:center;gap:16px;margin-top:30px">
          <div id="pr-av1" style="width:76px;height:76px;border-radius:50%;background:${C.cyan};color:${C.ground};display:flex;align-items:center;justify-content:center;font:900 36px Montserrat">B</div>
          <div id="pr-av2" style="width:76px;height:76px;border-radius:50%;background:${C.orange};color:${C.ground};display:flex;align-items:center;justify-content:center;font:900 36px Montserrat">C</div>
          <span style="font:800 34px Montserrat;color:${C.muted};margin-left:8px">reviewing…</span>
        </div>
        <div id="pr-comment" style="margin-top:26px;padding:22px 28px;border-radius:20px;background:${C.panel2};font:700 34px Inter;color:${C.ink};width:640px">“Looks great, ship it!”</div>
      </div>
      <div id="pr-btn" class="pill" style="left:200px;top:900px;width:680px;height:120px;font-size:44px;background:${C.purple};border-color:${C.purple};color:${C.ground}">Merge into main</div>`,
    js: [
      A.rise("#pr-card", T("open") - 0.2, { y: 60 }),
      A.pop("#pr-av1", T("Teammates") - 0.05, { from: 0 }),
      A.pop("#pr-av2", T("Teammates") + 0.15, { from: 0 }),
      A.slideX("#pr-comment", T("comments,") - 0.2, -60),
      A.pop("#pr-btn", T("merge") - 0.35),
      A.to("#pr-btn", { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 }, T("main.") - 0.1),
      A.to("#pr-state", { opacity: 0, duration: 0.1 }, T("main.")),
      `tl.fromTo("#pr-merged",{opacity:0,x:-140,scale:0.6},{opacity:1,x:-140,scale:1,duration:0.35,ease:"back.out(2)"},${(T("main.") + 0.05).toFixed(3)});`,
    ].join("\n"),
    sfx: [{ name: "click", at: T("main.") - 0.05, vol: 0.45 }],
  }),

  team: ({ T }) => {
    const devs = [["A", C.cyan, 380], ["B", C.purple, 600], ["C", C.orange, 820]];
    let html = `${topic("team", "TEAMWORK")}
      <div id="team-site" class="card" style="left:620px;top:470px;width:380px;height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">
        <div style="font:900 44px Montserrat">One website</div><div class="mono" style="font-size:28px;color:${C.green}">main</div></div>
      <svg class="abs" style="left:0;top:0" width="1080" height="1100" viewBox="0 0 1080 1100">`;
    devs.forEach(([, col, y], i) => {
      html += `<path id="team-p${i}" d="M200 ${y} C420 ${y} 420 600 610 600" pathLength="100" stroke-dasharray="100 120" stroke-dashoffset="110" fill="none" stroke="${col}" stroke-width="12" stroke-linecap="round"/>`;
    });
    html += `</svg>`;
    devs.forEach(([l, col, y], i) => (html += avatar({ id: `team-a${i}`, x: 90, y: y - 55, s: 110, letter: l, color: col })));
    html += `<div id="team-ok" class="pill" style="left:200px;top:960px;width:680px;height:96px;font-size:38px;background:${C.green};border-color:${C.green};color:${C.ground}">${icon.check(44, C.ground, C.green)} NO OVERWRITES</div>`;
    const js = [A.pop("#team-site", 0.05, { from: 0.7 })];
    devs.forEach((_, i) => js.push(A.pop(`#team-a${i}`, T("developers") - 0.2 + i * 0.15, { from: 0 })));
    devs.forEach((_, i) => js.push(A.draw(`#team-p${i}`, T("same") - 0.2 + i * 0.08, 0.7)));
    js.push(A.to("#team-site", { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 }, T("time,")));
    js.push(A.pop("#team-ok", T("overwriting")));
    return { html, js: js.join("\n"), sfx: [{ name: "pop", at: T("overwriting"), vol: 0.3 }] };
  },

  outro: ({ T }) => {
    const words = [["Commit.", C.green, "Commit,"], ["Push.", C.cyan, "push,"], ["Branch.", C.purple, "branch,"], ["Merge.", C.yellow, "merge."]];
    let html = "";
    words.forEach(([w, col], i) => (html += `<div id="outro-w${i}" class="h1" style="top:${300 + i * 125}px;font-size:110px;color:${col}">${w}</div>`));
    html += `<div id="outro-line" class="h2" style="top:830px">Learn GitHub once.<br/><span class="m" style="font-size:44px">Every client project gets safer.</span></div>
      <div id="outro-follow" class="pill" style="left:240px;top:1010px;width:600px;height:96px;background:${C.yellow};border-color:${C.yellow};color:${C.ground}">FOLLOW FOR MORE</div>`;
    const js = words.map(([, , k], i) => A.pop(`#outro-w${i}`, T(k) - 0.05, { from: 1.5, d: 0.3 }));
    js.push(A.rise("#outro-line", T("Learn") - 0.1, { y: 30 }));
    js.push(A.pop("#outro-follow", T("safer.") - 0.2));
    js.push(A.to("#outro-follow", { scale: 1.06, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, T("Follow")));
    return { html, js: js.join("\n"), noExit: true, sfx: [{ name: "impact-bass-1", at: T("merge.") - 0.05, vol: 0.35 }] };
  },
};
