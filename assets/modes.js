// ============================================================
// 解釋模式切換：專業 / 硬科普 / 軟科普
// body class m-pro / m-hard / m-soft，記在 localStorage。
// 初始 class 由 index.html 內嵌的小腳本先設好（避免閃爍），
// 這支只負責建切換器 UI 與互動。
// ============================================================
(function () {
  const MODES = [
    { key: "pro",  label: "專業" },
    { key: "hard", label: "硬科普" },
    { key: "soft", label: "軟科普" },
  ];
  const STORE = "witten-mode";

  function current() {
    const c = document.body.className.match(/\bm-(pro|hard|soft)\b/);
    return c ? c[1] : "pro";
  }

  function apply(key) {
    document.body.classList.remove("m-pro", "m-hard", "m-soft");
    document.body.classList.add("m-" + key);
    try { localStorage.setItem(STORE, key); } catch (e) {}
    bar.querySelectorAll("button").forEach(b =>
      b.classList.toggle("on", b.dataset.mode === key));
    // 切換後若有新顯示的公式尚未排版，補一次 MathJax
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise().catch(() => {});
    }
  }

  // 建切換器
  const bar = document.createElement("div");
  bar.id = "mode-switch";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", "解釋深度");
  bar.innerHTML = '<span class="ms-label">解釋深度</span>';
  MODES.forEach(m => {
    const b = document.createElement("button");
    b.textContent = m.label;
    b.dataset.mode = m.key;
    b.addEventListener("click", () => apply(m.key));
    bar.appendChild(b);
  });
  document.body.appendChild(bar);

  apply(current());
})();
