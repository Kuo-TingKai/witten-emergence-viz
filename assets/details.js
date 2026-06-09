// ============================================================
// 湧現卡片的「展開數學細節」內容 + modal 互動
// 重點：模交叉積 (Crossed Product) 與 Tomita–Takesaki → 霍金溫度
// ============================================================

const DETAILS = {

  heat: {
    title: "模交叉積 · Type III → Type II 與廣義熵",
    sub: "Crossed Product",
    html: `
      <p>設 Type III₁ 代數 $\\mathcal{A}$ 作用於 $\\mathcal{H}$，真空 $|\\Omega\\rangle$ 透過 Tomita–Takesaki 誘導出模自同構流 $\\sigma_t$，其生成元為模哈密頓量（在 Rindler 中即 boost 能量）$h=-\\ln\\Delta$。</p>

      <h4>1. 把觀測者的時鐘 / 能量併進代數</h4>
      <p>交叉積 $\\mathcal{A}\\rtimes_\\sigma\\mathbb{R}$ 是把模流本身「升級」為代數的內部自由度：在 $\\mathcal{H}\\otimes L^2(\\mathbb{R})$ 上，由下列算符生成 ——</p>
      <div class="eqbox">$$\\hat a = e^{ipX}\\,a\\,e^{-ipX}\\ (a\\in\\mathcal{A}),\\qquad X\\ (\\text{觀測者能量}),$$</div>
      <p>其中 $X$ 是與觀測者哈密頓量共軛的算符，$p$ 是模流的生成元。物理上這就是 Witten 所謂的<strong>重力著裝 (gravitational dressing)</strong>：微分同胚不變性逼你把能量約束 $\\hat H = h + X$ 一起帶上。</p>

      <h4>2. Takesaki 對偶：交叉積把 III₁ 變成 II∞</h4>
      <div class="eqbox big">$$\\mathcal{A}\\ (\\text{III}_1)\\ \\rtimes_\\sigma\\mathbb{R}\\ \\;\\cong\\;\\ \\mathcal{A}\\otimes B(L^2\\mathbb{R})\\ \\text{的 II}_\\infty\\ \\text{因子}$$</div>
      <p>關鍵在於：交叉積代數上存在一個半有限<strong>跡</strong> $\\mathrm{Tr}$（在 de Sitter 的有界情形則為 II₁、跡有限）。跡一旦回來，密度矩陣 $\\rho$ 與 von Neumann 熵就重新有定義。</p>

      <h4>3. 代數熵 = 廣義熵</h4>
      <p>對著裝後的態 $\\hat\\rho$ 計算 $S=-\\mathrm{Tr}(\\hat\\rho\\ln\\hat\\rho)$，Witten 證明其展開正是</p>
      <div class="eqbox big">$$S=\\langle \\hat H\\rangle + S_{\\text{rel}} + \\text{const} \\;\\longrightarrow\\; S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div>
      <p>面積項 $\\frac{A}{4G_N}$ 來自觀測者能量 $X$ 的歸一化常數（$\\sim 1/G_N$），$S_{\\text{out}}$ 來自場的相對熵。<strong>結論：黑洞熵不是微觀態計數，而是 Type III → Type II 過渡時跡重現所付出的代數代價。</strong></p>
    `
  },

  time: {
    title: "Tomita–Takesaki · 從真空唯一導出時間流",
    sub: "Modular Flow",
    html: `
      <p>取循環且分離的真空向量 $|\\Omega\\rangle$。定義反線性算符 $S$：</p>
      <div class="eqbox">$$S\\,a|\\Omega\\rangle = a^\\dagger|\\Omega\\rangle,\\qquad a\\in\\mathcal{A}$$</div>
      <h4>極分解</h4>
      <div class="eqbox big">$$S=J\\,\\Delta^{1/2}$$</div>
      <p>$\\Delta$ 為正定的<strong>模算符</strong>，$J$ 為反幺正的<strong>模共軛</strong>。Tomita 定理保證它們唯一存在，且：</p>
      <div class="eqbox">$$\\Delta^{it}\\mathcal{A}\\Delta^{-it}=\\mathcal{A},\\qquad J\\mathcal{A}J=\\mathcal{A}'$$</div>
      <p>於是<strong>單靠一個狀態 $\\omega$</strong>就生成一參數自同構群 $\\sigma_t^\\omega(a)=\\Delta^{it}a\\Delta^{-it}$。參數 $t$ 沒有先驗的「時間」意義 —— 但 Connes–Rovelli 熱時假說指出，它<strong>就是</strong>局域觀測者感知到的固有時間流向。時間是代數為維持統計平衡而自激的演化，而非背景舞台。</p>
    `
  },

  energy: {
    title: "Tomita–Takesaki → 視界上的霍金溫度",
    sub: "KMS · Bisognano–Wichmann · Unruh",
    html: `
      <p>真空對模流是一個熱平衡態。Tomita–Takesaki 直接蘊含 <strong>KMS 條件</strong>：</p>
      <div class="eqbox big">$$\\omega\\big(a\\,\\sigma_t(b)\\big)=\\omega\\big(\\sigma_{t-i}(b)\\,a\\big)$$</div>
      <p>即真空在模時間 $t$ 下是逆溫 $\\beta=1$ 的吉布斯態。</p>

      <h4>1. 模流 = boost（Bisognano–Wichmann）</h4>
      <p>對 Rindler 楔形，模流恰為 Lorentz boost：$\\Delta^{it}=e^{-2\\pi i K t}$，$K$ 為 boost 生成元。換算到觀測者的物理 boost 參數 $s$，KMS 週期變為 $2\\pi$。</p>

      <h4>2. 為何是 $2\\pi$？歐氏正則性</h4>
      <p>把時間做 Wick 轉動，Rindler 楔變成極座標平面，boost 變成轉角 $\\theta$。要在原點不出現圓錐奇點，$\\theta$ 必須以 $2\\pi$ 為週期 → 逆溫 $\\beta=2\\pi/\\kappa$。</p>

      <h4>3. Unruh / Hawking 溫度</h4>
      <div class="eqbox big">$$T_{\\text{Unruh}}=\\frac{a}{2\\pi},\\qquad T_{\\text{Hawking}}=\\frac{\\kappa}{2\\pi}\\xrightarrow{\\text{Schwarzschild}}\\frac{1}{8\\pi G M}$$</div>
      <p>$\\kappa$ 為視界面重力。<strong>霍金溫度不是外加假設，而是 Tomita–Takesaki 模流在視界上的 KMS 週期 $2\\pi$ 的直接後果。</strong></p>
      <p>同一個 $K$ 也給出能量的湧現：擾動糾纏態時 $\\Delta S=\\Delta\\langle K\\rangle$，在 AdS/CFT 對應 Ryu–Takayanagi 曲面的面積變化 —— 幾何對糾纏擾動的阻力即能量。</p>
    `
  },

  space: {
    title: "子代數對偶 · 從糾纏網絡長出幾何",
    sub: "Subregion–Subalgebra Duality",
    html: `
      <p>空間區域 $U$ 對應邊界算符子代數 $\\mathcal{A}(U)$，幾何的包含關係映成代數的包含關係：</p>
      <div class="eqbox big">$$A\\subset B\\;\\Longleftrightarrow\\;\\mathcal{A}(A)\\subset\\mathcal{A}(B),\\qquad A,B\\ \\text{類空} \\Rightarrow [\\mathcal{A}(A),\\mathcal{A}(B)]=0$$</div>
      <h4>糾纏楔重構</h4>
      <p>用 Type II 代數算出的廣義熵極小化，給出 RT/HRT 曲面 $\\gamma$：</p>
      <div class="eqbox">$$S(\\mathcal{A}(U))=\\min_\\gamma\\ \\mathrm{ext}\\left[\\frac{\\text{Area}(\\gamma)}{4G_N}+S_{\\text{bulk}}\\right]$$</div>
      <p>$\\gamma$ 所圍的體積 = 子代數可重構的範疇。<strong>糾纏越強 → 宏觀距離越近；糾纏切斷（熵→0）→ 空間結構斷裂。</strong>幾何的連通性就是糾纏的連通性。</p>
    `
  },

  mass: {
    title: "質量 · Type II 自由度的邊界凝聚",
    sub: "Nambu–Goto",
    html: `
      <p>質量是局域能量的凝聚 $E=mc^2$。當能量在宏觀時空高度聚集形成時空缺陷（激發態 / 黑洞邊界），一維弦或高維膜的世界面動力學由 Nambu–Goto 作用量主導：</p>
      <div class="eqbox big">$$S_{\\text{NG}}=-T\\!\\int d^2\\sigma\\,\\sqrt{-\\det h_{ab}},\\qquad T=\\frac{1}{2\\pi\\alpha'}$$</div>
      <p>$h_{ab}=\\partial_a X^\\mu\\partial_b X^\\nu g_{\\mu\\nu}$ 為誘導度規，$T$ 為弦張力。在代數底層，這代表大量 Type II 自由度被「緊緻化／凝聚」在特定時空邊界上 —— 弦張力、原子質量，皆是這些代數自由度在邊界凝聚後，被宏觀觀測者測得的靜止質量。</p>
    `
  }
};

// ---------------- modal ----------------
(function () {
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.innerHTML = `
    <div id="modal" role="dialog" aria-modal="true">
      <button id="modal-close" aria-label="關閉">✕</button>
      <div class="modal-sub" id="modal-sub"></div>
      <h3 id="modal-title"></h3>
      <div id="modal-body"></div>
    </div>`;
  document.body.appendChild(overlay);

  const elTitle = overlay.querySelector("#modal-title");
  const elSub = overlay.querySelector("#modal-sub");
  const elBody = overlay.querySelector("#modal-body");

  function open(key) {
    const d = DETAILS[key];
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
  overlay.querySelector("#modal-close").addEventListener("click", close);
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  document.querySelectorAll(".emerge").forEach(card => {
    const k = card.getAttribute("data-k");
    if (!DETAILS[k]) return;
    card.classList.add("clickable");
    const hint = document.createElement("div");
    hint.className = "expand-hint";
    hint.textContent = "點擊展開數學細節 →";
    card.appendChild(hint);
    card.addEventListener("click", () => open(k));
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(k); }
    });
  });
})();
