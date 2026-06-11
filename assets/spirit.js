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

  // ---------- 建立 DOM ----------
  function build() {
    root = document.createElement("div");
    root.id = "spirit";
    root.innerHTML =
      '<div class="spirit-bubble" role="status" aria-live="polite">' +
        '<span class="sb-text"></span><span class="sb-attr"></span></div>' +
      '<div class="spirit-wisp" role="img">' +
        '<span class="sw-halo"></span><span class="sw-core"></span>' +
        '<i class="sw-spark s1"></i><i class="sw-spark s2"></i><i class="sw-spark s3"></i>' +
      '</div>' +
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
    // 水平夾擠：氣泡置中於光靈，但別超出視窗左右邊界（光靈中心約 +31px）
    const half = (bubble.offsetWidth || 282) / 2;
    const wispCx = p.x + 31;
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
