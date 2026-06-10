// ============================================================
// 卡片「展開數學細節」modal 互動
// 內容改由 i18n 字典提供：window.I18nState.dict().modal[key]
// （各語言檔在 assets/i18n/<lang>.js，結構見 zh-Hant.js）。
// ============================================================
(function () {
  function dict() {
    return (window.I18nState && window.I18nState.dict()) ||
           (window.I18N && (window.I18N["zh-Hant"] || window.I18N.en)) || {};
  }
  function ui() { return (dict().ui) || {}; }
  // modal 內容鍵集合（由任何已載入字典取得；各語言一致）
  function modalKeys() {
    const m = (dict().modal) || {};
    return Object.keys(m);
  }

  // ---- modal DOM ----
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.innerHTML = `
    <div id="modal" role="dialog" aria-modal="true">
      <button id="modal-close" aria-label="close">✕</button>
      <div class="modal-sub" id="modal-sub"></div>
      <h3 id="modal-title"></h3>
      <div id="modal-body"></div>
    </div>`;
  document.body.appendChild(overlay);

  const elTitle = overlay.querySelector("#modal-title");
  const elSub = overlay.querySelector("#modal-sub");
  const elBody = overlay.querySelector("#modal-body");
  const elClose = overlay.querySelector("#modal-close");

  function open(key) {
    const d = (dict().modal || {})[key];
    if (!d) return;
    elSub.textContent = d.sub;
    elTitle.textContent = d.title;
    elBody.innerHTML = d.html;
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([elBody]);
  }
  function close() {
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  elClose.addEventListener("click", close);
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  // ---- 把可點卡片接上 modal ----
  const keys = modalKeys();
  document.querySelectorAll(".emerge").forEach(card => {
    const k = card.getAttribute("data-k");
    if (keys.indexOf(k) < 0) return;
    card.classList.add("clickable");
    const hint = document.createElement("div");
    hint.className = "expand-hint";
    hint.textContent = ui().expandHint || "→";
    card.appendChild(hint);
    card.addEventListener("click", () => open(k));
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(k); }
    });
  });

  // ---- 隨語言更新提示與關閉鍵文字 ----
  function localize() {
    const u = ui();
    document.querySelectorAll(".expand-hint").forEach(h => { h.textContent = u.expandHint || "→"; });
    elClose.setAttribute("aria-label", u.modalClose || "close");
  }
  document.addEventListener("i18n:rendered", localize);
  localize();
})();
