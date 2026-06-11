// ============================================================
// Witten 英靈 · 浮游 + 名言
// ------------------------------------------------------------
// 半透明金色光靈在視窗內漂移，每抵達一個落點停下「說」一句名言（從 i18n
// 字典 spirit.quotes 取，隨語言切換）。點光靈本體可立即換下一句。
// 開關存 localStorage（witten-spirit，預設 on），開關 bar 注入既有
// #switchers。捲動 / 展廳兩種模式都會出現。尊重 prefers-reduced-motion。
// ============================================================
(function () {
  const STORE = "witten-spirit";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let enabled = readEnabled();
  let root, wisp, bubble, sbText, sbAttr;
  let qi = 0, moveT = null, speakT = null, built = false;

  function readEnabled() {
    try { const v = localStorage.getItem(STORE); if (v === "off") return false; if (v === "on") return true; } catch (e) {}
    return true; // 預設開啟
  }
  function dict() { return (window.I18nState && window.I18nState.dict()) || {}; }
  function spirit() { return dict().spirit || {}; }
  function quotes() { return spirit().quotes || []; }

  // ---------- Q 版 Witten 粒子畫像（手工參數化 SVG）----------
  // 用發光粒子 + 淡金連線勾出辨識特徵：高額禿頂、兩側留髮、眼鏡、微笑、小身體。
  // viewBox 0 0 120 156；JS 算點，CSS 負責閃爍與半透明發光。
  function genFigure() {
    const dots = [], lines = [];
    const D = (x, y, s) => dots.push([+x.toFixed(1), +y.toFixed(1), s || 1]);
    const L = (a, b) => lines.push([+a[0].toFixed(1), +a[1].toFixed(1), +b[0].toFixed(1), +b[1].toFixed(1)]);
    const rad = d => d * Math.PI / 180;
    function arc(cx, cy, rx, ry, a0, a1, n, o) {
      o = o || {}; const pts = [];
      for (let i = 0; i < n; i++) {
        const t = a0 + (a1 - a0) * (n === 1 ? 0 : i / (n - 1));
        const x = cx + rx * Math.cos(rad(t)), y = cy + ry * Math.sin(rad(t));
        pts.push([x, y]); D(x, y, o.s);
      }
      if (o.link) { for (let i = 0; i < pts.length - 1; i++) L(pts[i], pts[i + 1]); if (o.close) L(pts[pts.length - 1], pts[0]); }
      return pts;
    }
    function seg(x1, y1, x2, y2, n, o) {
      o = o || {}; const pts = [];
      for (let i = 0; i < n; i++) { const t = i / (n - 1); const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t; pts.push([x, y]); D(x, y, o.s); }
      if (o.link) for (let i = 0; i < pts.length - 1; i++) L(pts[i], pts[i + 1]);
      return pts;
    }
    // 頭部輪廓（橢圓）
    arc(60, 50, 34, 37, 0, 360, 26, { link: true, close: true, s: 1 });
    // 兩側 / 後下方頭髮（頂部留空 = 禿頂高額）
    arc(60, 52, 38.5, 40, 118, 242, 9, { s: 1.15 });
    arc(60, 52, 38.5, 40, -62, 62, 9, { s: 1.15 });
    // 眼鏡兩鏡片 + 鏡橋 + 鏡腳
    arc(47, 53, 10, 9, 0, 360, 11, { link: true, close: true, s: .85 });
    arc(73, 53, 10, 9, 0, 360, 11, { link: true, close: true, s: .85 });
    seg(57, 53, 63, 53, 2, { s: .7, link: true });
    seg(37, 53, 30, 51, 2, { s: .7, link: true });
    seg(83, 53, 90, 51, 2, { s: .7, link: true });
    // 眼睛 / 眉 / 鼻
    D(47, 54, 1.5); D(73, 54, 1.5);
    seg(40, 41, 54, 42, 3, { s: .7 }); seg(66, 42, 80, 41, 3, { s: .7 });
    seg(60, 58, 60, 65, 2, { s: .7 });
    // 微笑（下弧）
    arc(60, 66, 13, 11, 30, 150, 7, { link: true, s: .9 });
    // 耳
    D(27, 54, 1.2); D(93, 54, 1.2);
    // 脖子 + V 領
    seg(54, 87, 54, 95, 2, { s: .8, link: true }); seg(66, 87, 66, 95, 2, { s: .8, link: true });
    seg(54, 95, 60, 104, 3, { s: .9, link: true }); seg(66, 95, 60, 104, 3, { s: .9, link: true });
    // 肩 + chibi 小身體輪廓
    arc(60, 109, 26, 8, 180, 360, 9, { s: 1, link: true });
    seg(36, 109, 41, 148, 8, { s: 1, link: true });
    seg(84, 109, 79, 148, 8, { s: 1, link: true });
    seg(41, 148, 79, 148, 7, { s: 1, link: true });
    return { dots, lines };
  }
  function figureSVG() {
    const f = genFigure();
    const ln = f.lines.map(l => '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '"/>').join("");
    const dt = f.dots.map((d, i) =>
      '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + (1.5 * d[2]).toFixed(2) +
      '" style="--d:' + ((i % 13) * 0.26).toFixed(2) + 's"/>').join("");
    return '<svg class="spirit-fig" viewBox="0 0 120 156" aria-hidden="true">' +
      '<defs><filter id="figGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6"/></filter></defs>' +
      '<ellipse class="fig-aura" cx="60" cy="64" rx="40" ry="60" filter="url(#figGlow)"/>' +
      '<g class="fig-lines">' + ln + '</g>' +
      '<g class="fig-dots">' + dt + '</g>' +
      '</svg>';
  }

  // ---------- 建立 DOM ----------
  function build() {
    root = document.createElement("div");
    root.id = "spirit";
    root.innerHTML =
      '<div class="spirit-bubble" role="status" aria-live="polite">' +
        '<span class="sb-text"></span><span class="sb-attr"></span></div>' +
      '<div class="spirit-wisp" role="img">' + figureSVG() + '</div>' +
      '<div class="spirit-name">E. Witten</div>';
    document.body.appendChild(root);
    wisp = root.querySelector(".spirit-wisp");
    bubble = root.querySelector(".spirit-bubble");
    sbText = root.querySelector(".sb-text");
    sbAttr = root.querySelector(".sb-attr");
    wisp.setAttribute("aria-label", spirit().aria || "Edward Witten");
    wisp.addEventListener("click", speakNow);
    built = true;
    // 起始落點（畫面中上區）
    place(rndPos(), 0);
  }

  // ---------- 漂移 ----------
  function rndPos() {
    const m = 80;
    const w = innerWidth, h = innerHeight;
    const x = m + Math.random() * Math.max(1, w - 2 * m);
    const y = m + Math.random() * Math.max(1, h - 2 * m - 130); // 底部留給切換器
    return { x, y };
  }
  function place(p, dur) {
    cur = p;
    root.style.transition = (reduce || !dur) ? "none" : "transform " + dur + "ms cubic-bezier(.45,.05,.55,.95)";
    root.style.transform = "translate(" + p.x + "px," + p.y + "px)";
    orientBubble(p);
  }
  let cur = { x: innerWidth / 2, y: innerHeight * 0.4 };

  function orientBubble(p) {
    // 靠近頂端 → 氣泡往下開；用 flip-y 切換尾巴方向
    bubble.classList.toggle("flip-y", p.y < 150);
    // 水平夾擠：氣泡置中於光靈，但別超出視窗左右邊界（光靈中心約 +50px）
    const half = (bubble.offsetWidth || 282) / 2;
    const wispCx = p.x + 50;
    const center = Math.max(half + 8, Math.min(wispCx, innerWidth - half - 8));
    bubble.style.left = (center - p.x) + "px";
  }

  // ---------- 名言循環 ----------
  function cycle() {
    if (!enabled || !built) return;
    const dur = reduce ? 0 : 8000 + Math.random() * 4500;
    place(rndPos(), dur);
    clearTimeout(speakT);
    speakT = setTimeout(() => { if (enabled) speak(); }, reduce ? 600 : dur);
  }
  function speak() {
    const qs = quotes();
    if (!qs.length) { scheduleNext(); return; }
    const q = qs[qi % qs.length];
    qi = (qi + 1) % qs.length;
    sbText.textContent = q.text;
    sbAttr.textContent = q.attr || "";
    orientBubble(cur);
    bubble.classList.add("show");
    scheduleNext();
  }
  function scheduleNext() {
    clearTimeout(moveT);
    moveT = setTimeout(() => { bubble.classList.remove("show"); setTimeout(cycle, 700); }, 7200);
  }
  function speakNow() {
    if (!enabled) return;
    clearTimeout(moveT); clearTimeout(speakT);
    speak();
  }

  // ---------- 開 / 關 ----------
  function setEnabled(v) {
    enabled = v;
    try { localStorage.setItem(STORE, v ? "on" : "off"); } catch (e) {}
    if (v) {
      if (!built) build();
      root.style.display = "";
      cycle();
    } else {
      clearTimeout(moveT); clearTimeout(speakT);
      if (root) { bubble.classList.remove("show"); root.style.display = "none"; }
    }
    syncBar();
  }

  // ---------- 開關 bar（注入 #switchers）----------
  let bar;
  function ensureBar() {
    const host = document.getElementById("switchers");
    if (!host) return;
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "switch-bar sw-spirit";
      bar.setAttribute("role", "group");
      bar.innerHTML =
        '<span class="sw-ico"><i data-lucide="sparkles"></i></span>' +
        '<span class="sw-label" data-role="spirit-label"></span>';
      [["on"], ["off"]].forEach(([v]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.dataset.spirit = v;
        b.addEventListener("click", () => setEnabled(v === "on"));
        bar.appendChild(b);
      });
      host.appendChild(bar);
      if (window.lucide && lucide.createIcons) lucide.createIcons();
    }
    syncBar();
  }
  function syncBar() {
    if (!bar) return;
    const s = spirit();
    const ll = bar.querySelector('[data-role="spirit-label"]');
    if (ll) ll.textContent = s.label || "Spirit";
    bar.querySelectorAll("button").forEach(b => {
      b.textContent = b.dataset.spirit === "on" ? (s.on || "On") : (s.off || "Off");
      b.classList.toggle("on", (b.dataset.spirit === "on") === enabled);
    });
  }

  // ---------- 與 i18n 連動 ----------
  document.addEventListener("i18n:rendered", () => {
    ensureBar();
    if (built) {
      wisp.setAttribute("aria-label", spirit().aria || "Edward Witten");
      // 若氣泡正顯示，立即換成當前語言的對應名言
      if (bubble.classList.contains("show")) {
        const qs = quotes();
        if (qs.length) {
          const q = qs[(qi - 1 + qs.length) % qs.length];
          sbText.textContent = q.text; sbAttr.textContent = q.attr || "";
        }
      }
    }
  });

  // 首次：等 i18n 第一次渲染後，依記憶決定是否啟動
  let firstRender = false;
  document.addEventListener("i18n:rendered", function once() {
    if (firstRender) return; firstRender = true;
    document.removeEventListener("i18n:rendered", once);
    if (enabled) setEnabled(true);
  });

  // 視窗縮放：把光靈拉回安全範圍，避免卡在邊界外
  addEventListener("resize", () => {
    if (!built || !enabled) return;
    const x = Math.min(cur.x, innerWidth - 80), y = Math.min(cur.y, innerHeight - 130);
    place({ x: Math.max(80, x), y: Math.max(80, y) }, 0);
  }, { passive: true });
})();
