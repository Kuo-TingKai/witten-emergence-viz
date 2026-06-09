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
  },

  rt: {
    title: "Ryu–Takayanagi · 幾何面積 = 糾纏熵",
    sub: "It from Qubit · RT Formula",
    html: `
      <p>RT 公式是 <span class="mono">"It from Qubit"</span> 最著名的數學橋樑：它把<strong>內部（Bulk）的幾何面積</strong>，與<strong>邊界（Boundary）的糾纏熵</strong>直接畫上等號。</p>
      <div class="eqbox big">$$S(A)=\\frac{\\text{Area}(\\gamma_A)}{4G_N}$$</div>

      <h4>1. 公式拆解</h4>
      <ul>
        <li>$S(A)$：邊界區域 $A$ 與其互補區域的<strong>馮紐曼糾纏熵</strong> $-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$ —— 完全是純資訊論、純量子位元層面的度量。</li>
        <li>$\\gamma_A$：內部延伸進去、且以 $A$ 為邊界的<strong>極小曲面 (Minimal Surface)</strong>。</li>
        <li>$\\text{Area}(\\gamma_A)$：這個極小曲面的<strong>幾何面積</strong>。</li>
        <li>$G_N$：Bulk 的牛頓重力常數。</li>
      </ul>

      <h4>2. 玩味點 · 時空是糾纏拉出來的</h4>
      <p>你改變邊界量子位元之間的糾纏狀態（改變 $S(A)$），為了維持等式，內部的幾何度規 (Metric) 就必須跟著改變，進而改變極小曲面的面積。當邊界沒有糾纏（$S(A)=0$），對應的內部曲面面積就是 $0$ —— 代表時空直接<strong>「斷開」或消失</strong>。時空的連續性，在數學上就是由糾纏硬生生「拉」出來的。</p>
      <p class="fine">這是上節〈空間〉卡 $S=\\min_\\gamma\\mathrm{ext}[\\frac{\\text{Area}}{4G_N}+S_{\\text{bulk}}]$ 的經典極限版本（忽略 bulk 熵項），換成 QEC 視角的入口。</p>
    `
  },

  jlms: {
    title: "子系統 QEC · 體形重構與代碼子空間投射",
    sub: "JLMS · Almheiri–Dong–Harlow",
    html: `
      <p>全像原理的 QEC 視角由 Almheiri, Dong, Harlow (ADH) 等人奠定：他們發現 Bulk 的局部物理算子，其實是被<strong>「加密」</strong>在 Boundary 的子區域中。其數學核心是 JLMS 公式：</p>
      <div class="eqbox big">$$\\hat H_{\\text{mod}}^{\\text{boundary}}=\\frac{\\hat{\\text{Area}}(\\gamma_A)}{4G_N}+\\hat H_{\\text{mod}}^{\\text{bulk}}$$</div>

      <h4>1. 糾錯碼結構</h4>
      <p>在量子錯誤糾正碼中，我們有一個物理大空間 $\\mathcal{H}_{\\text{physical}}$（邊界 CFT）和一個代碼子空間 $\\mathcal{H}_{\\text{code}}$（內部的低能有效物理）。定義一個<strong>等距同構映射 (Isometry)</strong> $V:\\mathcal{H}_{\\text{code}}\\to\\mathcal{H}_{\\text{physical}}$。</p>
      <p>若內部 Bulk 算子 $\\phi_b$ 想在邊界區域 $A$ 被讀取，數學上必須滿足：</p>
      <div class="eqbox">$$V\\,\\phi_b\\,P_{\\text{code}}=O_A\\,V\\,P_{\\text{code}}$$</div>
      <p>其中 $P_{\\text{code}}=VV^\\dagger$ 是代碼子空間的投射算子，$O_A$ 是只作用在邊界區域 $A$ 的算子。</p>

      <h4>2. 玩味點 · 內部 = 抗抹除碼</h4>
      <p>這意味著：Bulk 內部的某個時空點 $b$，若落在由區域 $A$ 決定的<strong>糾纏楔 (Entanglement Wedge)</strong> 之內，那麼即使邊界其餘部分（$A$ 的補集）遭到嚴重的量子噪聲破壞（<strong>抹除錯誤 Erasure Error</strong>），我們依然能單憑區域 $A$ 的算子 $O_A$ 把內部的時空資訊完整還原。時空的「內部」，在數學上就是一個對抗邊界抹除錯誤的物理 <strong>Code Subspace</strong>。</p>
    `
  },

  tqft: {
    title: "低能極限 · TQFT 不變量 = 量子化函子的突現",
    sub: "Chern–Simons · V: Bord → Vec",
    html: `
      <p>當我們把 Bulk 的重力理論推進到<strong>低能極限</strong>、或考慮拓撲不變量時，重力的動力學（幾何度規）被凍結，留下來的正是 TQFT。數學上體現在 Bulk 配分函數對幾何微擾的<strong>不敏感性</strong>。</p>

      <h4>1. 從高度糾纏的真空到拓撲項</h4>
      <p>邊界 CFT 的真空態 $|0\\rangle$ 可用張量網絡（如 MERA）或路徑積分準備。邊界高度糾纏時，這個路徑積分在 Bulk 中等價於對作用量 $S_{\\text{bulk}}[g,\\dots]$ 進行量子化。走向低能有效理論時，大質量重力子激發被抑制，作用量簡化為拓撲項 —— 例如 Chern–Simons：</p>
      <div class="eqbox big">$$S=\\frac{k}{4\\pi}\\int\\mathrm{Tr}\\!\\left(A\\wedge dA+\\tfrac{2}{3}A\\wedge A\\wedge A\\right)$$</div>
      <p>這時邊界的希爾伯特空間 $V(\\Sigma)$ 滿足 TQFT 的公理：</p>
      <div class="eqbox">$$\\dim V(\\Sigma)=Z(\\Sigma\\times S^1)$$</div>

      <h4>2. 玩味點 · 拓撲算子 ≡ 邏輯算子</h4>
      <p>若把代碼子空間 $\\mathcal{H}_{\\text{code}}$ 的維度與 TQFT 在流形 $\\Sigma$ 上的狀態數連起來，你會發現：內部的 TQFT 算子，正好對應 QEC 中的<strong>邏輯算子 (Logical Operators)</strong>。因為 TQFT 算子都是拓撲算子（例如 Wilson Loop），把它在內部時空稍微挪動、形變，測量結果完全不變 —— 這正是邏輯算子的特徵：對局部物理微擾（局部噪聲）完全免疫。</p>
      <ul>
        <li><strong>TQFT 說</strong>：這個算子怎麼拉扯都不變，因為它是拓撲的。</li>
        <li><strong>QEC 說</strong>：這個算子怎麼干擾都不錯誤，因為它是邏輯算子。</li>
      </ul>
      <p>這兩句話在數學上，透過 $V:\\text{Bord}\\to\\text{Vec}$ 完美融合在了一起。</p>
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
