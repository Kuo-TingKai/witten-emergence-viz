// ============================================================
// 展廳模式 · 3D 旋轉木馬卡片瀏覽
// ------------------------------------------------------------
// 不改動既有 DOM / details.js：把 main 內所有 .emerge「複製」成環上的
// 面（face），中央卡點擊時觸發原卡的 .click()（→ details.js 既有 modal）。
// 視圖狀態 'scroll'(預設) / 'showcase' 存於 localStorage，並在既有
// #switchers 列注入一個「視圖」切換 bar（沿用 i18n 與金色樣式）。
// ============================================================
(function () {
  const VIEW_STORE = "witten-view";
  const STEP_SENS = 0.32;     // 拖曳靈敏度：每 px 旋轉度數
  let view = readView();
  let built = false;
  let stage, ring, faces = [], cards = [], idx = 0, N = 0, rotDeg = 0, step = 36;

  function readView() {
    try { const v = localStorage.getItem(VIEW_STORE); if (v === "showcase" || v === "scroll") return v; } catch (e) {}
    return "scroll";
  }
  function ui() {
    const d = (window.I18nState && window.I18nState.dict()) || {};
    return d.ui || {};
  }
  function softMode() { return document.body.classList.contains("m-soft"); }

  // ---------- 建立舞台（首次進入展廳時惰性建立）----------
  function build() {
    cards = Array.from(document.querySelectorAll("main .emerge"));
    N = cards.length;
    step = 360 / N;

    stage = document.createElement("div");
    stage.id = "showcase";
    stage.innerHTML =
      '<button class="sc-exit" type="button" aria-label="exit">✕</button>' +
      '<div class="sc-stage"><div class="sc-ring"></div></div>' +
      '<button class="sc-nav sc-prev" type="button" aria-label="previous">‹</button>' +
      '<button class="sc-nav sc-next" type="button" aria-label="next">›</button>' +
      '<div class="sc-dots" role="tablist"></div>' +
      '<div class="sc-hint"></div>';
    document.body.appendChild(stage);

    ring = stage.querySelector(".sc-ring");
    ring.style.setProperty("--n", N);
    ring.style.setProperty("--step", step + "deg");

    buildFaces();
    buildDots();
    layout();
    wire();
    built = true;
  }

  // 由原卡複製內容到環上的面（隨 i18n 可重建）
  function buildFaces() {
    ring.innerHTML = "";
    faces = [];
    cards.forEach((card, i) => {
      const f = document.createElement("div");
      f.className = "sc-face";
      f.style.setProperty("--i", i);
      const k = card.getAttribute("data-k");
      if (k) f.setAttribute("data-k", k);

      const inner = document.createElement("div");
      inner.className = "sc-card";
      inner.innerHTML = card.innerHTML;          // 已是 i18n 渲染後的內容
      inner.querySelectorAll(".expand-hint").forEach(e => e.remove());
      f.appendChild(inner);

      // 中央卡的「展開」提示（僅原卡可點時顯示）
      const open = document.createElement("div");
      open.className = "sc-open";
      open.textContent = ui().expandHint || "→";
      f.appendChild(open);

      f.addEventListener("click", () => onFaceClick(i));
      ring.appendChild(f);
      faces.push(f);
    });
    refreshOpenable();
    if (window.lucide && lucide.createIcons) lucide.createIcons();
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([ring]).catch(() => {});
  }

  // 中央可點 = 原卡有 .clickable 且非軟科普模式
  function refreshOpenable() {
    faces.forEach((f, i) => {
      const ok = cards[i].classList.contains("clickable") && !softMode();
      f.classList.toggle("openable", ok);
    });
  }

  function buildDots() {
    const wrap = stage.querySelector(".sc-dots");
    wrap.innerHTML = "";
    cards.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      const k = c.getAttribute("data-k") || ("card-" + (i + 1));
      b.setAttribute("aria-label", k);
      b.addEventListener("click", () => jump(i));
      wrap.appendChild(b);
    });
  }

  // 依視窗大小算卡身尺寸與環半徑（側卡才不會互相穿插）
  function layout() {
    const vw = innerWidth, vh = innerHeight;
    const cw = Math.max(220, Math.min(360, vw * 0.78));
    const ch = Math.max(300, Math.min(460, vh * 0.6));
    const radius = (cw / 2) / Math.tan(Math.PI / N) + 44;
    ring.style.setProperty("--cardw", cw + "px");
    ring.style.setProperty("--cardh", ch + "px");
    ring.style.setProperty("--radius", radius + "px");
  }

  // ---------- 旋轉控制 ----------
  function applyRot() { ring.style.setProperty("--rot", rotDeg + "deg"); }
  function setActive() {
    faces.forEach((f, i) => f.classList.toggle("is-front", i === idx));
    stage.querySelectorAll(".sc-dots button").forEach((b, i) => b.classList.toggle("on", i === idx));
    updateHint();
  }
  function next() { idx = (idx + 1) % N; rotDeg -= step; applyRot(); setActive(); }
  function prev() { idx = (idx - 1 + N) % N; rotDeg += step; applyRot(); setActive(); }
  function jump(t) {
    if (t === idx) return;
    let d = ((t - idx) % N + N) % N;       // 0..N-1
    if (d > N / 2) d -= N;                  // 走最短路徑
    rotDeg -= d * step; idx = t; applyRot(); setActive();
  }
  // 拖曳鬆手後吸附到最近一張（保持連續角度，不跳動）
  function snap() {
    const r = Math.round(-rotDeg / step);
    rotDeg = -r * step;
    idx = ((r % N) + N) % N;
    applyRot(); setActive();
  }

  function onFaceClick(i) {
    if (i !== idx) { jump(i); return; }
    // 已在中央：可點則觸發原卡 → 既有 modal
    if (cards[i].classList.contains("clickable") && !softMode()) cards[i].click();
  }

  function updateHint() {
    const u = ui();
    const tip = u.scHint || "Drag or arrow keys to rotate · click the center card for details";
    stage.querySelector(".sc-hint").textContent = tip;
  }

  // ---------- 事件接線 ----------
  let wired = false;
  function wire() {
    if (wired) return; wired = true;

    stage.querySelector(".sc-exit").addEventListener("click", () => setView("scroll"));
    stage.querySelector(".sc-prev").addEventListener("click", prev);
    stage.querySelector(".sc-next").addEventListener("click", next);

    // 指標拖曳（滑鼠 + 觸控統一走 Pointer Events）
    // 注意：pointerdown 時「不」立即 setPointerCapture —— 否則單純點按會被
    // 捕獲、click 事件改落在 stage 而非中央卡，導致打不開 modal。僅在實際
    // 移動超過閾值後才捕獲，啟動拖曳旋轉。
    let dragging = false, captured = false, startX = 0, startRot = 0, moved = false, ptrId = null;
    const stageEl = stage.querySelector(".sc-stage");
    stageEl.addEventListener("pointerdown", e => {
      dragging = true; captured = false; moved = false; startX = e.clientX; startRot = rotDeg; ptrId = e.pointerId;
    });
    stageEl.addEventListener("pointermove", e => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) {
        moved = true; captured = true;
        ring.classList.add("dragging");
        try { stageEl.setPointerCapture(ptrId); } catch (err) {}
      }
      if (moved) { rotDeg = startRot + dx * STEP_SENS; applyRot(); }
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false; ring.classList.remove("dragging");
      if (captured) { try { stageEl.releasePointerCapture(ptrId); } catch (err) {} }
      if (moved) snap();
    }
    stageEl.addEventListener("pointerup", endDrag);
    stageEl.addEventListener("pointercancel", endDrag);
    // 拖曳後抑制誤觸點擊（tap 時 moved=false，click 正常落在中央卡）
    stageEl.addEventListener("click", e => { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);

    // 滾輪切換（節流）
    let wheelLock = 0;
    stage.addEventListener("wheel", e => {
      e.preventDefault();
      const now = e.timeStamp || 0;
      if (now - wheelLock < 320) return;
      wheelLock = now;
      (e.deltaY > 0 || e.deltaX > 0) ? next() : prev();
    }, { passive: false });

    // 鍵盤（僅展廳啟用時）。用 capture 階段，搶在 details.js 的 modal Escape
    // 監聽器（bubble）之前判斷：modal 開著時放手讓 modal 自己關，方向鍵也不
    // 轉動背景的環；modal 關著時 Escape 才退出展廳。
    addEventListener("keydown", e => {
      if (view !== "showcase") return;
      const modalOpen = !!document.querySelector("#modal-overlay.show");
      if (modalOpen) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
      else if (e.key === "Escape") setView("scroll");
    }, true);

    addEventListener("resize", () => { if (built) layout(); }, { passive: true });
  }

  // ---------- 視圖切換 ----------
  function setView(v) {
    view = v;
    try { localStorage.setItem(VIEW_STORE, v); } catch (e) {}
    if (v === "showcase") {
      if (!built) build();
      buildFaces();                 // 反映當前語言 / 深度
      idx = 0; rotDeg = 0; applyRot(); setActive();
      document.body.classList.add("v-showcase");
    } else {
      document.body.classList.remove("v-showcase");
    }
    syncViewBar();
  }

  // ---------- 在既有 #switchers 注入「視圖」切換 bar ----------
  let viewBar;
  function ensureViewBar() {
    const host = document.getElementById("switchers");
    if (!host) return;
    if (!viewBar) {
      viewBar = document.createElement("div");
      viewBar.className = "switch-bar sw-view";
      viewBar.setAttribute("role", "group");
      viewBar.innerHTML = '<span class="sw-label" data-role="view-label"></span>';
      [["scroll"], ["showcase"]].forEach(([v]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.dataset.view = v;
        b.addEventListener("click", () => setView(v));
        viewBar.appendChild(b);
      });
      host.insertBefore(viewBar, host.firstChild);   // 置於語言 / 深度之上
    }
    syncViewBar();
  }
  function syncViewBar() {
    if (!viewBar) return;
    const u = ui();
    const ll = viewBar.querySelector('[data-role="view-label"]');
    if (ll) ll.textContent = u.viewLabel || "View";
    viewBar.querySelectorAll("button").forEach(b => {
      b.textContent = b.dataset.view === "scroll"
        ? (u.viewScroll || "Scroll")
        : (u.viewShowcase || "Gallery");
      b.classList.toggle("on", b.dataset.view === view);
    });
  }

  // ---------- 與 i18n 連動 ----------
  document.addEventListener("i18n:rendered", () => {
    ensureViewBar();
    if (view === "showcase" && built) {   // 語言 / 深度改變 → 重建面內容
      buildFaces();
      applyRot(); setActive();
    }
  });

  // 首次：若記憶為展廳，等 i18n 第一次渲染後啟動
  let firstRender = false;
  document.addEventListener("i18n:rendered", function once() {
    if (firstRender) return; firstRender = true;
    document.removeEventListener("i18n:rendered", once);
    if (view === "showcase") setView("showcase");
  });
})();
