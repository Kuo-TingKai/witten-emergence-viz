// ============================================================
// i18n 渲染引擎 + 語言 / 解釋深度切換器
// 內容存於 window.I18N[lang]（assets/i18n/<lang>.js，懶載入）。
// 骨架以 data-i18n="dotted.key" 標出插槽：
//   值為字串 → 直接填入；值為 {pro,hard,soft} → 依當前深度挑選。
// 深度回退順序：選定 → pro → hard → soft（缺項不會破版）。
// ============================================================
(function () {
  // 可選語言（之後新增語言時在此加一行即可）
  const LANGS = [
    { code: "zh-Hant", label: "繁中" },
    { code: "en",      label: "EN" },
  ];
  const DEPTHS = ["pro", "hard", "soft"];
  const L_STORE = "witten-lang";
  const D_STORE = "witten-mode";
  const FALLBACK = "zh-Hant";

  let curLang = readLang();
  let curDepth = readDepth();

  function readLang() {
    let v;
    try { v = localStorage.getItem(L_STORE); } catch (e) {}
    if (v && LANGS.some(l => l.code === v)) return v;
    // 依瀏覽器語言猜測
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("en")) return "en";
    if (nav.startsWith("zh")) return "zh-Hant";
    return FALLBACK;
  }
  function readDepth() {
    let v;
    try { v = localStorage.getItem(D_STORE); } catch (e) {}
    return DEPTHS.indexOf(v) >= 0 ? v : "pro";
  }

  function getKey(dict, path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), dict);
  }
  function pickDepth(v) {
    if (v && typeof v === "object") return v[curDepth] ?? v.pro ?? v.hard ?? v.soft;
    return v;
  }

  // ---- 懶載入語言檔 ----
  const loading = {};
  function ensureLang(code) {
    return new Promise((resolve) => {
      if (window.I18N && window.I18N[code]) return resolve(true);
      if (loading[code]) return loading[code].then(resolve);
      const p = new Promise((res) => {
        const s = document.createElement("script");
        s.src = "assets/i18n/" + code + ".js";
        s.onload = () => res(true);
        s.onerror = () => res(false);
        document.head.appendChild(s);
      });
      loading[code] = p;
      p.then(resolve);
    });
  }

  // ---- 渲染 ----
  function render() {
    const dict = (window.I18N && window.I18N[curLang]) || (window.I18N && window.I18N[FALLBACK]);
    if (!dict) return;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = pickDepth(getKey(dict, el.dataset.i18n));
      if (v != null) el.innerHTML = v;
    });
    // 文件語言屬性 + body 深度 class（供 modal 停用等 CSS 使用）
    const meta = dict.meta || {};
    document.documentElement.lang = meta.htmlLang || curLang;
    document.documentElement.dir = meta.dir || "ltr";
    document.body.classList.remove("m-pro", "m-hard", "m-soft");
    document.body.classList.add("m-" + curDepth);
    // 插入內容含 lucide 圖示與公式，需重繪
    if (window.lucide && lucide.createIcons) lucide.createIcons();
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise().catch(() => {});
    // 通知其他模組（如 modal）內容已換語言
    document.dispatchEvent(new CustomEvent("i18n:rendered", { detail: { lang: curLang, depth: curDepth, dict } }));
    syncButtons();
  }

  // ---- 切換器 UI ----
  let langBar, depthBar;
  function buildSwitchers() {
    const dict = (window.I18N && window.I18N[curLang]) || {};
    const ui = dict.ui || { langLabel: "Language", depthLabel: "Depth", pro: "Pro", hard: "Sci", soft: "Lite" };

    const wrap = document.createElement("div");
    wrap.id = "switchers";

    // 語言
    langBar = document.createElement("div");
    langBar.className = "switch-bar";
    langBar.setAttribute("role", "group");
    langBar.setAttribute("aria-label", ui.langLabel || "Language");
    langBar.innerHTML = '<span class="sw-label" data-role="lang-label"></span>';
    LANGS.forEach((l) => {
      const b = document.createElement("button");
      b.textContent = l.label;
      b.dataset.lang = l.code;
      b.addEventListener("click", () => setLang(l.code));
      langBar.appendChild(b);
    });

    // 深度
    depthBar = document.createElement("div");
    depthBar.className = "switch-bar";
    depthBar.setAttribute("role", "group");
    depthBar.setAttribute("aria-label", ui.depthLabel || "Depth");
    depthBar.innerHTML = '<span class="sw-label" data-role="depth-label"></span>';
    DEPTHS.forEach((d) => {
      const b = document.createElement("button");
      b.dataset.depth = d;
      b.addEventListener("click", () => setDepth(d));
      depthBar.appendChild(b);
    });

    wrap.appendChild(langBar);
    wrap.appendChild(depthBar);
    document.body.appendChild(wrap);
  }

  function syncButtons() {
    const dict = (window.I18N && window.I18N[curLang]) || {};
    const ui = dict.ui || {};
    if (langBar) {
      const ll = langBar.querySelector('[data-role="lang-label"]');
      if (ll) ll.textContent = ui.langLabel || "Language";
      langBar.querySelectorAll("button").forEach((b) =>
        b.classList.toggle("on", b.dataset.lang === curLang));
    }
    if (depthBar) {
      const dl = depthBar.querySelector('[data-role="depth-label"]');
      if (dl) dl.textContent = ui.depthLabel || "Depth";
      depthBar.querySelectorAll("button").forEach((b) => {
        b.textContent = ui[b.dataset.depth] || b.dataset.depth;
        b.classList.toggle("on", b.dataset.depth === curDepth);
      });
    }
  }

  function setLang(code) {
    curLang = code;
    try { localStorage.setItem(L_STORE, code); } catch (e) {}
    ensureLang(code).then(render);
  }
  function setDepth(d) {
    curDepth = d;
    try { localStorage.setItem(D_STORE, d); } catch (e) {}
    render();
  }

  // 對外提供給 modal 取當前字典
  window.I18nState = {
    get lang() { return curLang; },
    get depth() { return curDepth; },
    dict() { return (window.I18N && window.I18N[curLang]) || (window.I18N && window.I18N[FALLBACK]); },
  };

  // ---- 啟動 ----
  function start() {
    buildSwitchers();
    ensureLang(curLang).then((ok) => {
      if (!ok && curLang !== FALLBACK) { curLang = FALLBACK; return ensureLang(FALLBACK).then(render); }
      render();
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
