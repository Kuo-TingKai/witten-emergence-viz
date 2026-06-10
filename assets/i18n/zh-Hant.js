// ============================================================
// 正準內容字典 · 繁體中文（翻譯來源）
// 結構：單值 slot = 字串；分深度 slot = { pro, hard, soft }
// HTML 標籤與 $...$ / $$...$$ 公式為語言無關，翻譯時原樣保留。
// ============================================================
window.I18N = window.I18N || {};
window.I18N["zh-Hant"] = {
  meta: { name: "繁體中文", htmlLang: "zh-Hant", dir: "ltr" },

  ui: {
    depthLabel: "解釋深度",
    langLabel: "語言",
    pro: "專業", hard: "硬科普", soft: "軟科普",
    scrollCue: "往下看推導 ↓",
    expandHint: "點擊展開數學細節 →",
    modalClose: "關閉",
    refsTitle: "參考文獻 · References",
    footer: "視覺化 · Type III von Neumann Algebras & Emergent Spacetime · 內容整理自 Witten et al. 2022–2025"
  },

  hero: {
    eyebrow: "Witten et al. · 2022–2025 · 量子重力 × 算符代數",
    h1: '從 <span class="grad">一個觀測者的代數</span><br/>湧現出時間、空間、熱與質量',
    lede: {
      pro: '時空與幾何不是基本的，而是<strong>局域觀測者的代數結構</strong>與<strong>資訊限制</strong>的宏觀投影。這是 Edward Witten 與合作者近年在 von Neumann 代數與全像原理交會處發展的研究綱領 —— <span class="mono">It from Bit</span>。',
      hard: '我們通常把時間和空間當成舞台，物質在上面演出。這裡的想法剛好相反：先問<strong>「一個觀測者究竟能測到什麼」</strong>，時間、空間、熱、質量都是從這份資訊裡長出來的結果。這是 Witten 等人近年用算符代數重新理解重力的方向 —— <span class="mono">It from Bit</span>。',
      soft: '我們習慣把時間和空間當成理所當然的背景。但近年有一群物理學家認為：它們其實不是世界最底層的東西，而是從<strong>「資訊」</strong>裡浮現出來的。這頁試著用最少的數學，帶你看這個想法怎麼運作。'
    },
    eq: '$$\\text{觀測者的局域代數}\\ (\\textbf{It}) \\;\\xrightarrow{\\;\\text{資訊限制}\\;(\\textbf{Bit})\\;}\\; \\{\\,\\text{時間},\\ \\text{空間},\\ \\text{熱},\\ \\text{能量},\\ \\text{質量}\\,\\}$$'
  },

  s01: {
    h2: {
      pro: "資訊的局域限制 · Type III₁ 代數",
      hard: "為什麼「一塊區域的資訊」沒辦法乾淨地切出來",
      soft: "第一步：你只能看到宇宙的一小塊"
    },
    left: {
      pro: '<p>傳統量子力學假設希爾伯特空間可以張量分解，於是有部分跡與密度矩陣：</p><div class="eqbox">$$\\mathcal{H}=\\mathcal{H}_A\\otimes\\mathcal{H}_B,\\qquad S=-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$$</div><p>但在相對論性 QFT 中，<strong>Reeh–Schlieder 定理</strong>指出：真空在任何空間邊界上都帶有<strong>無限的紫外糾纏</strong>。局域觀測者觸及的，是一種沒有跡、沒有局域密度矩陣的 <span class="tag t3">Type III₁</span> von Neumann 代數。</p>',
      hard: '<p>在一般的量子力學裡，你可以把系統一分為二，分別描述「這邊」和「那邊」，再各自算出亂度（熵）。背後用到的就是這個分解：</p><div class="eqbox">$$\\mathcal{H}=\\mathcal{H}_A\\otimes\\mathcal{H}_B,\\qquad S=-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$$</div><p>但把相對論和量子場論放在一起，事情就變了。<strong>Reeh–Schlieder 定理</strong>說：真空本身在任何一條分界線上，都糾纏得密密麻麻、而且糾纏程度沒有上限。結果是——你沒辦法乾淨地只描述「這一塊」。數學上這種代數叫 <span class="tag t3">Type III₁</span>，麻煩在於連「亂度」都算不出一個有限的值。</p>',
      soft: '<p>想像宇宙是一整片無縫的布。你想剪下其中一塊單獨研究，卻發現布的纖維在剪縫處糾纏得無窮密——怎麼剪都剪不乾淨，邊緣永遠拖著無限多條線。物理學家發現：當你只是宇宙裡的一個觀測者，你能掌握的那一塊，正是這樣一塊「剪不乾淨」的區域。</p>'
    },
    aside: {
      pro: '<h3>Type III 的關鍵特性</h3><ul><li><i data-lucide="x" class="li-x"></i> 沒有跡 (Trace)</li><li><i data-lucide="x" class="li-x"></i> 沒有局域密度矩陣 $\\rho_A$</li><li><i data-lucide="alert-triangle" class="li-warn"></i> 單一時空區域的糾纏熵在數學上<strong>未定義</strong>（等同無限大）</li></ul><p class="fine">黑洞外、或 de Sitter static patch 中的觀測者，因視界遮蔽，只能存取 Type III 代數的可觀測量。</p>',
      hard: '<h3>這種代數麻煩在哪</h3><ul><li><i data-lucide="x" class="li-x"></i> 沒有可歸一化的「總量」（無跡）</li><li><i data-lucide="x" class="li-x"></i> 沒有單一區域自己的狀態矩陣</li><li><i data-lucide="alert-triangle" class="li-warn"></i> 想算這塊區域的糾纏熵，答案是<strong>無限大</strong>，不是一個數</li></ul><p class="fine">黑洞外面、或加速觀測者看到的視界後方，都是這種情況——有一道地平線把資訊擋住。</p>',
      soft: '<h3>這塊區域有什麼問題</h3><ul><li><i data-lucide="x" class="li-x"></i> 算不出這塊「有多亂」（答案是無限大）</li><li><i data-lucide="x" class="li-x"></i> 沒辦法只用這塊的資訊寫下它的完整狀態</li><li><i data-lucide="alert-triangle" class="li-warn"></i> 想單獨談「這一塊」，數學就當機</li></ul><p class="fine">黑洞外的人、或視界外的觀測者，正好都卡在這種處境。</p>'
    }
  },

  s02: {
    h2: {
      pro: "代數過渡 · 微擾重力打開「跡」的開關",
      hard: "加進重力之後，「亂度」才重新變得算得出來",
      soft: "第二步：把重力加進來，無限大就被馴服了"
    },
    lede: {
      pro: '當牛頓常數 $G_N>0$（全像中的 $1/N$ 微擾）被引入，重力會對觀測者的哈密頓量做<strong>幾何著裝 (Gravitational Dressing)</strong>。把重力約束（微分同胚不變性）加進代數，數學上相當於一次<strong>模交叉積 (Crossed Product)</strong> —— Type III 因此降為 Type II，跡與密度矩陣重新出現。',
      hard: '關鍵轉折是「把重力打開」。一旦重力強度不為零，觀測者的能量就不再是孤立的數字，而要連同它對時空造成的彎曲一起算。把這個約束加進代數運算，數學上是一個叫<strong>交叉積</strong>的操作。做完之後，原本算不出來的亂度，又變回一個有限、可比較的量。',
      soft: '轉折來了：只要把重力放進來，那個惱人的無限大就被收服了。原因是，有了重力，你問「這塊區域多亂」的時候，問題裡自動多了一個參照點（觀測者自己的時鐘和能量），無限大被這個參照點抵消，剩下一個乾淨的數字。'
    },
    flow: '<div class="node n3"><div class="ntype">Type III₁</div><div class="ndesc">無跡 · 無 $\\rho$<br/>糾纏熵發散</div></div><div class="arrow"><div class="arrow-line"><span class="pulse"></span></div><div class="arrow-label">⊗ Crossed Product<br/><span class="mono">+ G<sub>N</sub> / 1/N</span></div></div><div class="branch"><div class="node n2"><div class="ntype">Type II∞</div><div class="ndesc">黑洞外部<br/>跡重現 ✓</div></div><div class="node n2 alt"><div class="ntype">Type II₁</div><div class="ndesc">de Sitter 時空<br/>跡重現 ✓</div></div></div>',
    hl: {
      pro: '<h3>跡重現 → 廣義熵</h3><p>有了跡，就能定義正規化的代數糾纏熵。Witten 證明它正是黑洞的<strong>廣義熵</strong>：</p><div class="eqbox big">$$S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>宏觀的黑洞熱力學、霍金輻射、熱效應，本質上是觀測者引入重力後，原本被 Type III 遮蔽的資訊，在過渡到 Type II 時付出的<strong>代數代價</strong>。</p>',
      hard: '<h3>亂度回來了，而且正好是黑洞的熵</h3><p>重新出現的這個有限亂度，算出來不多不少，正好等於黑洞物理裡早就知道的<strong>廣義熵</strong>：</p><div class="eqbox big">$$S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>也就是視界面積除以四，再加上外部物質的熵。換句話說，黑洞會發熱、有溫度（霍金輻射），根源就是觀測者把重力納入後，得為「看不到視界後方」付出的資訊代價。</p>',
      soft: '<h3>而那個數字，正好就是黑洞的熵</h3><p>更漂亮的是，這個數字早就有人見過——它正是黑洞的熵，也就是黑洞表面積的四分之一。黑洞會發光發熱（霍金輻射），背後的理由就是：你看不到視界後面，這份「看不到」本身就是一種亂度，是要付出的代價。</p>'
    }
  },

  s03: {
    h2: {
      pro: "四種湧現 + 質量 · 宏觀物理 = 代數資訊流",
      hard: "時間、空間、熱、能量、質量，怎麼一個個冒出來",
      soft: "第三步：五樣東西，全都從資訊長出來"
    }
  },

  s04: {
    h2: {
      pro: "全像 QEC 階梯 · 邊界資訊編織內部幾何與拓撲",
      hard: "換成「糾錯碼」的語言，再講一遍",
      soft: "第四步：宇宙像一套防錯的密碼"
    },
    lede: {
      pro: '前面從 von Neumann 代數看到糾纏楔重構（見上節〈空間〉卡）。同一件事，換成<strong>量子糾錯碼（QEC）</strong>的語言再走一遍，並一路推到拓撲層。三根橫桿把<strong>「資訊側」</strong>（邊界 / CFT / QEC）與<strong>「幾何側」</strong>（內部 / Bulk / TQFT）對應起來，抽象度逐級上升 —— <span class="mono">度規 → 局域性 → 拓撲</span>。最值得注意的是：幾何上的「面積」與「拓撲」，剛好等於資訊論的「熵」與「代碼子空間」。',
      hard: '同樣一件事，可以換成<strong>量子糾錯碼</strong>的角度再看一次。糾錯碼是這種東西：把資訊巧妙地攤開存放，就算壞掉一部分，也能完整還原。下面三排，左邊是資訊／編碼的概念，右邊是幾何／時空的概念，一一對應；越往下越抽象——從長度，到位置，到形狀。',
      soft: '工程師存重要資料時會用「糾錯碼」：把資料聰明地分散開，壞掉一部分也救得回來。近年發現，宇宙內部的時空看起來就像把邊界上的資訊用糾錯碼存起來的結果。下面三排，左邊講資訊怎麼存，右邊講對應出什麼樣的空間。'
    },
    ladder: '<div class="flow"><div class="node n-info"><div class="ntype">糾纏熵 $S(A)$</div><div class="ndesc">$-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$<br/>純資訊論</div></div><div class="arrow"><div class="arrow-line"><span class="pulse"></span></div><div class="arrow-label">RT 公式<br/><span class="mono">= Area / 4G_N</span></div></div><div class="node n-geo"><div class="ntype">極小曲面面積</div><div class="ndesc">$\\mathrm{Area}(\\gamma_A)$<br/>幾何 · 度規</div></div></div><div class="flow"><div class="node n-info"><div class="ntype">抗抹除碼</div><div class="ndesc">$P_{\\text{code}}=VV^\\dagger$<br/>code subspace</div></div><div class="arrow"><div class="arrow-line"><span class="pulse"></span></div><div class="arrow-label">JLMS / ADH<br/><span class="mono">糾纏楔</span></div></div><div class="node n-geo"><div class="ntype">子區域重構</div><div class="ndesc">Bulk 算子還原<br/>幾何 · 局域性</div></div></div><div class="flow"><div class="node n-info"><div class="ntype">邏輯算子</div><div class="ndesc">免疫局部噪聲<br/>logical operator</div></div><div class="arrow"><div class="arrow-line"><span class="pulse"></span></div><div class="arrow-label">TQFT 函子<br/><span class="mono">V: Bord→Vec</span></div></div><div class="node n-geo"><div class="ntype">拓撲不變量</div><div class="ndesc">Wilson loop<br/>幾何 · 拓撲</div></div></div>'
  },

  s05: {
    h2: {
      pro: "總覽 · 宏觀概念 ⇄ 代數源頭",
      hard: "總覽 · 宏觀概念 ⇄ 代數源頭",
      soft: "一張表看懂：每樣東西從哪來"
    },
    table: {
      pro: '<thead><tr><th>宏觀物理概念</th><th>底層代數與量子資訊源頭</th></tr></thead><tbody><tr><td><span class="ico"><i data-lucide="hourglass"></i></span> 時間 $(t)$</td><td>Type III 代數內在的模自同構流（Modular Flow）</td></tr><tr><td><span class="ico"><i data-lucide="globe"></i></span> 空間（幾何）</td><td>子代數之間的包含對易關係與量子糾纏網絡</td></tr><tr><td><span class="ico"><i data-lucide="flame"></i></span> 熱（熵）</td><td>微擾重力下 Type III → Type II 所重現的代數跡（Trace）</td></tr><tr><td><span class="ico"><i data-lucide="zap"></i></span> 能量 $(E)$</td><td>擾動微觀糾纏時宏觀幾何產生的阻力（模哈密頓量擾動）</td></tr><tr><td><span class="ico"><i data-lucide="target"></i></span> 質量 $(m)$</td><td>Type II 自由度在時空邊界的凝聚（Nambu–Goto 弦張力）</td></tr></tbody>',
      soft: '<thead><tr><th>我們熟悉的東西</th><th>它其實從哪來</th></tr></thead><tbody><tr><td><span class="ico"><i data-lucide="hourglass"></i></span> 時間</td><td>系統為了維持平衡，自己走出來的節奏</td></tr><tr><td><span class="ico"><i data-lucide="globe"></i></span> 空間</td><td>糾纏的強弱：牽得越緊就越近，斷了就裂開</td></tr><tr><td><span class="ico"><i data-lucide="flame"></i></span> 熱</td><td>被視界擋住、你看不到的那些資訊</td></tr><tr><td><span class="ico"><i data-lucide="zap"></i></span> 能量</td><td>時空抵抗被改變的力道</td></tr><tr><td><span class="ico"><i data-lucide="target"></i></span> 質量</td><td>能量擠在一處、被自己綁住的結</td></tr></tbody>'
    },
    closing: {
      pro: '我們不需要先假設一個有時間、有空間、有質量的宇宙。只要從「一個觀測者能觀測到的局域代數（<span class="mono">It</span>）」出發，重力、時間、熱與質量，都會作為資訊（<span class="mono">Bit</span>）受限後的宏觀投影自然浮現。這是朝向統一的一條值得認真看待的線索。',
      hard: '重點是順序反過來了：不是先有時空、再把物理放進去，而是先有「一個觀測者能掌握的資訊」，時間、空間、熱、質量再從這份資訊的限制裡一個個長出來。<span class="mono">It</span>（代數）受到 <span class="mono">Bit</span>（資訊限制）的約束，宏觀世界就此浮現。',
      soft: '整個故事其實只有一句話：先別假設宇宙本來就有時間、有空間、有重量。從「一個觀測者能知道什麼」開始，這些東西會自己一個個冒出來。時間、空間、熱、質量，全是資訊被限制之後留下的影子。'
    }
  },

  card: {
    time: {
      title: "時間",
      body: {
        pro: '<div class="esrc">模自同構流 · Modular Flow</div><p>Type III 代數本身沒有客觀時間。但給定局域狀態 $\\omega$，<strong>Tomita–Takesaki 理論</strong>會唯一確定一個單參數自同構群：</p><div class="eqbox">$$\\sigma_t^{\\omega}(A)=\\Delta^{it}\\,A\\,\\Delta^{-it}$$</div><p>參數 $t$ 在宏觀上正是觀測者的<strong>固有時間</strong>。時間的流逝，是代數為了維持統計平衡而自發的演化（Connes–Rovelli 熱時假說）。</p>',
        hard: '<div class="esrc">代數內建的時鐘</div><p>代數本身不附帶時間。但只要你指定一個狀態（例如系統處在某個平衡），數學上會自動冒出一個唯一的「演化方向」：</p><div class="eqbox">$$\\sigma_t^{\\omega}(A)=\\Delta^{it}\\,A\\,\\Delta^{-it}$$</div><p>這個方向的參數，宏觀上量起來就是你手錶上的時間。時間不是先驗給定的，而是系統為了維持平衡，自己定義出來的流動。</p>',
        soft: '<div class="esrc">藏在資訊裡的時鐘</div><p>底層的世界其實沒有「時間」這回事。但只要系統穩定在某個狀態，數學就會自動指出一個「往前走」的方向——那就是我們感覺到的時間。換句話說，時間不是宇宙的背景時鐘，而是事物為了保持平衡，自己走出來的節奏。</p>'
      }
    },
    space: {
      title: "空間",
      body: {
        pro: '<div class="esrc">子代數包含 · 糾纏網絡</div><p>空間區域 $U$ ↔ 邊界算符子代數 $\\mathcal{A}(U)$。遠近、大小、包含關係 ↔ 子代數的包含與對易：</p><div class="eqbox">$$A\\subset B \\;\\Longleftrightarrow\\; \\mathcal{A}(A)\\subset\\mathcal{A}(B)$$</div><p><strong>糾纏楔重構</strong>：糾纏越強，宏觀距離越近；熵歸零，空間結構就斷裂。</p>',
        hard: '<div class="esrc">誰被誰包含</div><p>每一塊空間區域，對應到一組可觀測量。誰大誰小、誰包含誰，就看對應的那組量彼此是不是包含、能不能同時測量：</p><div class="eqbox">$$A\\subset B \\;\\Longleftrightarrow\\; \\mathcal{A}(A)\\subset\\mathcal{A}(B)$$</div><p>而「距離」由糾纏的強弱決定：糾纏越強，兩點越近；糾纏一旦歸零，空間就在那裡斷開。</p>',
        soft: '<div class="esrc">靠糾纏黏起來的遠近</div><p>空間裡的「遠」和「近」，其實是糾纏的強弱在說話。兩個地方糾纏得越緊，就越靠近；糾纏一旦斷光，它們之間的空間也跟著裂開。空間不是預先鋪好的格子，而是糾纏把各處「縫」在一起的結果。</p>'
      }
    },
    heat: {
      title: "熱（熵）",
      body: {
        pro: '<div class="esrc">Type III → Type II 的跡效應</div><p>引入微擾重力後代數過渡所重現的跡，使原本被視界遮蔽的資訊以熵的形式具現：</p><div class="eqbox">$$S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>霍金溫度、黑洞熱力學，都是這個代數代價的宏觀表象。</p>',
        hard: '<div class="esrc">被擋住的資訊變成熵</div><p>前面那個重新出現的有限亂度，就是熱力學裡的熵：</p><div class="eqbox">$$S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>視界把一部分資訊擋在後面，你算不到、也控制不了，這份「不確定」累積起來，就以溫度和熵的形式表現出來——黑洞的霍金溫度正是如此。</p>',
        soft: '<div class="esrc">看不到的部分，變成了熱</div><p>凡是被地平線擋住、你看不到的資訊，都會以「熱」的形式回到你身上。黑洞之所以有溫度、會慢慢蒸發，就是因為它的視界後面藏了大量你永遠看不到的資訊。熱，是「看不到」的另一個名字。</p>'
      }
    },
    energy: {
      title: "能量",
      body: {
        pro: '<div class="esrc">模哈密頓量擾動 · 幾何阻力</div><p>模哈密頓量 $K$ 是代數內在時間流的生成元（在 Rindler 楔中即 Boost 能量）。擾動糾纏態時：</p><div class="eqbox">$$\\Delta S=\\Delta\\langle K\\rangle$$</div><p>在 AdS/CFT 中對應 <strong>Ryu–Takayanagi 極小曲面</strong>的面積變化 —— 宏觀幾何對抗糾纏擾動的「彈性」，就是能量。</p>',
        hard: '<div class="esrc">幾何抵抗改變的力道</div><p>你想稍微改變一塊區域的糾纏，幾何會抵抗——像拉彈簧要使力。這個抵抗的力道，等於糾纏改變量乘上一個生成時間流的算符：</p><div class="eqbox">$$\\Delta S=\\Delta\\langle K\\rangle$$</div><p>換個說法：能量衡量的是「時空有多不情願被你改動」。在 AdS/CFT 裡，它對應到 Ryu–Takayanagi 曲面的面積變化。</p>',
        soft: '<div class="esrc">時空不想被推動的脾氣</div><p>想改變一個地方的狀態，時空會反抗，就像你壓彈簧它會回推。這股反抗的力道，就是我們說的能量。能量不是裝在東西裡的某種燃料，而是時空抵抗改變的「脾氣」。</p>'
      }
    },
    mass: {
      title: "質量",
      body: {
        pro: '<div class="esrc">能量聚集 · Nambu–Goto 弦振動的表象</div><p>質量是局域能量的凝聚（$E=mc^2$）。當能量在宏觀時空高度聚集形成時空缺陷，弦／膜的運動由 <strong>Nambu–Goto 作用量</strong>主導。在代數底層，這代表大量 Type II 自由度被「緊緻化／凝聚」在特定時空邊界（弦張力、原子質量），成為觀測者測得的靜止質量。</p>',
        hard: '<div class="esrc">能量擠在一起的結果</div><p>質量就是擠在一處的能量（$E=mc^2$）。當能量在某個地方高度集中、把時空壓出一個凹陷，底層那一大堆自由度就被「綁」在那裡動彈不得。被綁住的程度，宏觀上量起來就是靜止質量；在弦論的語言裡，這對應到弦的張力（Nambu–Goto 作用量）。</p>',
        soft: '<div class="esrc">能量打的一個結</div><p>質量說穿了就是「打了結的能量」。當能量在一個地方擠得夠多、夠密，它就被卡在那裡跑不掉，於是我們就說那裡「有質量」。一顆粒子的重量，其實是一團能量被自己綁住的結。</p>'
      }
    },
    rt: {
      title: "面積 = 糾纏",
      body: {
        pro: '<div class="esrc">Ryu–Takayanagi · 幾何橋樑</div><p class="puzzle">為什麼空間是連在一起的，而不是散成一盤沙？</p><div class="eqbox">$$S(A)=\\frac{\\text{Area}(\\gamma_A)}{4G_N}$$</div><p>邊界區域 $A$ 的馮紐曼糾纏熵，等於內部極小曲面 $\\gamma_A$ 的幾何面積。糾纏歸零 → 面積歸零 → 時空斷開。空間的連續性，是由糾纏決定的。</p>',
        hard: '<div class="esrc">面積就是糾纏</div><p class="puzzle">為什麼空間是連在一起的，而不是散成一盤沙？</p><div class="eqbox">$$S(A)=\\frac{\\text{Area}(\\gamma_A)}{4G_N}$$</div><p>一塊邊界區域的糾纏量，恰好等於它在內部對應的那張「最小膜」的面積。糾纏多，膜就大、空間連著；糾纏歸零，膜縮成零、空間就斷開。空間之所以連續，是因為它各處都還糾纏著。</p>',
        soft: '<div class="esrc">牽得越緊，靠得越近</div><p class="puzzle">為什麼空間是連在一起的，而不是散成一盤沙？</p><p>兩個地方有多「連在一起」，由它們糾纏多深決定。糾纏深，空間就連得緊；糾纏斷了，那段空間也就裂開。宇宙之所以是一整片、而不是散沙，全靠這些看不見的糾纏把它縫住。</p>'
      }
    },
    jlms: {
      title: "重構 = 糾錯",
      body: {
        pro: '<div class="esrc">JLMS / ADH · 子區域對偶</div><p class="puzzle">補集全毀，內部還能完整還原？</p><div class="eqbox">$$\\hat H_{\\text{mod}}^{\\partial}=\\frac{\\hat{\\text{Area}}(\\gamma_A)}{4G_N}+\\hat H_{\\text{mod}}^{\\text{bulk}}$$</div><p>落在糾纏楔內的 bulk 時空點，被「加密」在邊界區域 $A$。即使補集遭嚴重噪聲（抹除錯誤）破壞，仍能單憑 $A$ 的算子完整還原。Bulk＝抗抹除的 code subspace。</p>',
        hard: '<div class="esrc">重構就是糾錯</div><p class="puzzle">補集全毀，內部還能完整還原？</p><div class="eqbox">$$\\hat H_{\\text{mod}}^{\\partial}=\\frac{\\hat{\\text{Area}}(\\gamma_A)}{4G_N}+\\hat H_{\\text{mod}}^{\\text{bulk}}$$</div><p>內部的某個時空點，它的資訊其實被加密地攤在一整塊邊界上。所以就算另一半邊界被雜訊毀掉，你還是能靠剩下的這半把那個點完整還原回來。內部時空，就是一個抗刪除的糾錯碼。</p>',
        soft: '<div class="esrc">一半毀了，還能救回全部</div><p class="puzzle">補集全毀，內部還能完整還原？</p><p>內部的一個位置，它的資訊不是放在某一點，而是打散加密、攤在一大片邊界上。於是就算邊界毀掉一半，剩下的一半仍足以把它完整救回。這正是糾錯碼的看家本領——而宇宙內部天生就是這麼存的。</p>'
      }
    },
    tqft: {
      title: "拓撲 = 邏輯算子",
      body: {
        pro: '<div class="esrc">TQFT · 低能極限 · Chern–Simons</div><p class="puzzle">算子怎麼拉扯、怎麼形變，測量值都不變 —— 為什麼？</p><div class="eqbox">$$\\dim V(\\Sigma)=Z(\\Sigma\\times S^1)$$</div><p>把 bulk 重力推到低能極限，度規動力學被凍結，留下純拓撲項（Chern–Simons）。其上的 Wilson loop 是拓撲算子，形變不改測量值 —— 這正是 QEC 邏輯算子的特徵：對局部噪聲免疫。TQFT 說「拓撲所以不變」，QEC 說「邏輯所以不錯」，兩句話透過函子 $V:\\text{Bord}\\to\\text{Vec}$ 在數學上對應起來。</p>',
        hard: '<div class="esrc">拓撲就是邏輯算子</div><p class="puzzle">算子怎麼拉扯、怎麼形變，測量值都不變 —— 為什麼？</p><div class="eqbox">$$\\dim V(\\Sigma)=Z(\\Sigma\\times S^1)$$</div><p>把重力推到最低能量的極限，長度、彎曲這些細節全凍結，只剩下「形狀」層級的資訊（拓撲）。這一層的觀測量，你怎麼拉扯變形它都不變——這跟糾錯碼裡「對局部雜訊免疫」的邏輯位元是同一回事。一邊說「因為是拓撲所以不變」，一邊說「因為是邏輯位元所以不出錯」，數學上其實是同一句話。</p>',
        soft: '<div class="esrc">怎麼揉都不變的東西</div><p class="puzzle">算子怎麼拉扯、怎麼形變，測量值都不變 —— 為什麼？</p><p>有些東西，你怎麼揉、怎麼拉都不會變——比方一個甜甜圈中間的洞，再怎麼捏，它還是一個洞。宇宙最深的那一層也有這種「怎麼揉都不變」的性質，而這恰恰是好的糾錯碼該有的樣子：局部怎麼被干擾，關鍵資訊都不出錯。</p>'
      }
    },
    happy: {
      title: "HaPPY 五角形碼",
      body: {
        pro: '<div class="esrc">Pastawski–Yoshida–Harlow–Preskill</div><p>用離散的雙曲鋪磚張量網絡，看完美張量如何在格子上複製上述三式（RT／糾纏楔重構／邏輯算子）。</p><span class="todo-tag">玩具模型 · 待擴充</span>',
        hard: '<div class="esrc">用張量網絡把上面三件事做出來</div><p>用一張鋪在雙曲面上的張量網絡當積木，把前面的「面積＝糾纏」「重構＝糾錯」「拓撲＝邏輯算子」三件事在格子上具體做出來。</p><span class="todo-tag">玩具模型 · 待擴充</span>',
        soft: '<div class="esrc">一個能動手玩的小模型</div><p>一個可以實際在格子上動手堆出來的小模型，用來示範前面那三件事是怎麼運作的。</p><span class="todo-tag">玩具模型 · 待擴充</span>'
      }
    },
    cs: {
      title: "Chern–Simons × Weyl",
      body: {
        pro: '<div class="esrc">手徵流的拓撲保護</div><p>邊界的手徵流（Chiral Current）如何藉由 bulk 的拓撲作用量，得到反常下的不變性。</p><span class="todo-tag">玩具模型 · 待擴充</span>',
        hard: '<div class="esrc">邊界電流為何不受干擾</div><p>邊界上只往單一方向流的電流，如何靠內部的拓撲結構，在各種干擾下仍保持穩定。</p><span class="todo-tag">玩具模型 · 待擴充</span>',
        soft: '<div class="esrc">一種「不會被打亂」的流</div><p>邊界上有一種只往一個方向跑的流，靠著內部的結構保護，外界怎麼擾動它都不亂。</p><span class="todo-tag">玩具模型 · 待擴充</span>'
      }
    }
  },

  modal: {
    heat: {
      sub: "Crossed Product",
      title: "模交叉積 · Type III → Type II 與廣義熵",
      html: '<p>設 Type III₁ 代數 $\\mathcal{A}$ 作用於 $\\mathcal{H}$，真空 $|\\Omega\\rangle$ 透過 Tomita–Takesaki 誘導出模自同構流 $\\sigma_t$，其生成元為模哈密頓量（在 Rindler 中即 boost 能量）$h=-\\ln\\Delta$。</p><h4>1. 把觀測者的時鐘 / 能量併進代數</h4><p>交叉積 $\\mathcal{A}\\rtimes_\\sigma\\mathbb{R}$ 是把模流本身「升級」為代數的內部自由度：在 $\\mathcal{H}\\otimes L^2(\\mathbb{R})$ 上，由下列算符生成 ——</p><div class="eqbox">$$\\hat a = e^{ipX}\\,a\\,e^{-ipX}\\ (a\\in\\mathcal{A}),\\qquad X\\ (\\text{觀測者能量}),$$</div><p>其中 $X$ 是與觀測者哈密頓量共軛的算符，$p$ 是模流的生成元。物理上這就是 Witten 所謂的<strong>重力著裝 (gravitational dressing)</strong>：微分同胚不變性逼你把能量約束 $\\hat H = h + X$ 一起帶上。</p><h4>2. Takesaki 對偶：交叉積把 III₁ 變成 II∞</h4><div class="eqbox big">$$\\mathcal{A}\\ (\\text{III}_1)\\ \\rtimes_\\sigma\\mathbb{R}\\ \\;\\cong\\;\\ \\mathcal{A}\\otimes B(L^2\\mathbb{R})\\ \\text{的 II}_\\infty\\ \\text{因子}$$</div><p>關鍵在於：交叉積代數上存在一個半有限<strong>跡</strong> $\\mathrm{Tr}$（在 de Sitter 的有界情形則為 II₁、跡有限）。跡一旦回來，密度矩陣 $\\rho$ 與 von Neumann 熵就重新有定義。</p><h4>3. 代數熵 = 廣義熵</h4><p>對著裝後的態 $\\hat\\rho$ 計算 $S=-\\mathrm{Tr}(\\hat\\rho\\ln\\hat\\rho)$，Witten 證明其展開正是</p><div class="eqbox big">$$S=\\langle \\hat H\\rangle + S_{\\text{rel}} + \\text{const} \\;\\longrightarrow\\; S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>面積項 $\\frac{A}{4G_N}$ 來自觀測者能量 $X$ 的歸一化常數（$\\sim 1/G_N$），$S_{\\text{out}}$ 來自場的相對熵。<strong>結論：黑洞熵不是微觀態計數，而是 Type III → Type II 過渡時跡重現所付出的代數代價。</strong></p>'
    },
    time: {
      sub: "Modular Flow",
      title: "Tomita–Takesaki · 從真空唯一導出時間流",
      html: '<p>取循環且分離的真空向量 $|\\Omega\\rangle$。定義反線性算符 $S$：</p><div class="eqbox">$$S\\,a|\\Omega\\rangle = a^\\dagger|\\Omega\\rangle,\\qquad a\\in\\mathcal{A}$$</div><h4>極分解</h4><div class="eqbox big">$$S=J\\,\\Delta^{1/2}$$</div><p>$\\Delta$ 為正定的<strong>模算符</strong>，$J$ 為反幺正的<strong>模共軛</strong>。Tomita 定理保證它們唯一存在，且：</p><div class="eqbox">$$\\Delta^{it}\\mathcal{A}\\Delta^{-it}=\\mathcal{A},\\qquad J\\mathcal{A}J=\\mathcal{A}\'$$</div><p>於是<strong>單靠一個狀態 $\\omega$</strong>就生成一參數自同構群 $\\sigma_t^\\omega(a)=\\Delta^{it}a\\Delta^{-it}$。參數 $t$ 沒有先驗的「時間」意義 —— 但 Connes–Rovelli 熱時假說指出，它<strong>就是</strong>局域觀測者感知到的固有時間流向。時間是代數為維持統計平衡而自激的演化，而非背景舞台。</p>'
    },
    energy: {
      sub: "KMS · Bisognano–Wichmann · Unruh",
      title: "Tomita–Takesaki → 視界上的霍金溫度",
      html: '<p>真空對模流是一個熱平衡態。Tomita–Takesaki 直接蘊含 <strong>KMS 條件</strong>：</p><div class="eqbox big">$$\\omega\\big(a\\,\\sigma_t(b)\\big)=\\omega\\big(\\sigma_{t-i}(b)\\,a\\big)$$</div><p>即真空在模時間 $t$ 下是逆溫 $\\beta=1$ 的吉布斯態。</p><h4>1. 模流 = boost（Bisognano–Wichmann）</h4><p>對 Rindler 楔形，模流恰為 Lorentz boost：$\\Delta^{it}=e^{-2\\pi i K t}$，$K$ 為 boost 生成元。換算到觀測者的物理 boost 參數 $s$，KMS 週期變為 $2\\pi$。</p><h4>2. 為何是 $2\\pi$？歐氏正則性</h4><p>把時間做 Wick 轉動，Rindler 楔變成極座標平面，boost 變成轉角 $\\theta$。要在原點不出現圓錐奇點，$\\theta$ 必須以 $2\\pi$ 為週期 → 逆溫 $\\beta=2\\pi/\\kappa$。</p><h4>3. Unruh / Hawking 溫度</h4><div class="eqbox big">$$T_{\\text{Unruh}}=\\frac{a}{2\\pi},\\qquad T_{\\text{Hawking}}=\\frac{\\kappa}{2\\pi}\\xrightarrow{\\text{Schwarzschild}}\\frac{1}{8\\pi G M}$$</div><p>$\\kappa$ 為視界面重力。<strong>霍金溫度不是外加假設，而是 Tomita–Takesaki 模流在視界上的 KMS 週期 $2\\pi$ 的直接後果。</strong></p><p>同一個 $K$ 也給出能量的湧現：擾動糾纏態時 $\\Delta S=\\Delta\\langle K\\rangle$，在 AdS/CFT 對應 Ryu–Takayanagi 曲面的面積變化 —— 幾何對糾纏擾動的阻力即能量。</p>'
    },
    space: {
      sub: "Subregion–Subalgebra Duality",
      title: "子代數對偶 · 從糾纏網絡長出幾何",
      html: '<p>空間區域 $U$ 對應邊界算符子代數 $\\mathcal{A}(U)$，幾何的包含關係映成代數的包含關係：</p><div class="eqbox big">$$A\\subset B\\;\\Longleftrightarrow\\;\\mathcal{A}(A)\\subset\\mathcal{A}(B),\\qquad A,B\\ \\text{類空} \\Rightarrow [\\mathcal{A}(A),\\mathcal{A}(B)]=0$$</div><h4>糾纏楔重構</h4><p>用 Type II 代數算出的廣義熵極小化，給出 RT/HRT 曲面 $\\gamma$：</p><div class="eqbox">$$S(\\mathcal{A}(U))=\\min_\\gamma\\ \\mathrm{ext}\\left[\\frac{\\text{Area}(\\gamma)}{4G_N}+S_{\\text{bulk}}\\right]$$</div><p>$\\gamma$ 所圍的體積 = 子代數可重構的範疇。<strong>糾纏越強 → 宏觀距離越近；糾纏切斷（熵→0）→ 空間結構斷裂。</strong>幾何的連通性就是糾纏的連通性。</p>'
    },
    mass: {
      sub: "Nambu–Goto",
      title: "質量 · Type II 自由度的邊界凝聚",
      html: '<p>質量是局域能量的凝聚 $E=mc^2$。當能量在宏觀時空高度聚集形成時空缺陷（激發態 / 黑洞邊界），一維弦或高維膜的世界面動力學由 Nambu–Goto 作用量主導：</p><div class="eqbox big">$$S_{\\text{NG}}=-T\\!\\int d^2\\sigma\\,\\sqrt{-\\det h_{ab}},\\qquad T=\\frac{1}{2\\pi\\alpha\'}$$</div><p>$h_{ab}=\\partial_a X^\\mu\\partial_b X^\\nu g_{\\mu\\nu}$ 為誘導度規，$T$ 為弦張力。在代數底層，這代表大量 Type II 自由度被「緊緻化／凝聚」在特定時空邊界上 —— 弦張力、原子質量，皆是這些代數自由度在邊界凝聚後，被宏觀觀測者測得的靜止質量。</p>'
    },
    rt: {
      sub: "It from Qubit · RT Formula",
      title: "Ryu–Takayanagi · 幾何面積 = 糾纏熵",
      html: '<p>RT 公式是 <span class="mono">"It from Qubit"</span> 最著名的數學橋樑：它把<strong>內部（Bulk）的幾何面積</strong>，與<strong>邊界（Boundary）的糾纏熵</strong>直接畫上等號。</p><div class="eqbox big">$$S(A)=\\frac{\\text{Area}(\\gamma_A)}{4G_N}$$</div><h4>1. 公式拆解</h4><ul><li>$S(A)$：邊界區域 $A$ 與其互補區域的<strong>馮紐曼糾纏熵</strong> $-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$ —— 完全是純資訊論、純量子位元層面的度量。</li><li>$\\gamma_A$：內部延伸進去、且以 $A$ 為邊界的<strong>極小曲面 (Minimal Surface)</strong>。</li><li>$\\text{Area}(\\gamma_A)$：這個極小曲面的<strong>幾何面積</strong>。</li><li>$G_N$：Bulk 的牛頓重力常數。</li></ul><h4>2. 關鍵 · 時空由糾纏決定</h4><p>你改變邊界量子位元之間的糾纏狀態（改變 $S(A)$），為了維持等式，內部的幾何度規 (Metric) 就必須跟著改變，進而改變極小曲面的面積。當邊界沒有糾纏（$S(A)=0$），對應的內部曲面面積就是 $0$ —— 代表時空在那裡<strong>斷開或消失</strong>。時空的連續性，在數學上正是由糾纏決定的。</p><p class="fine">這是上節〈空間〉卡 $S=\\min_\\gamma\\mathrm{ext}[\\frac{\\text{Area}}{4G_N}+S_{\\text{bulk}}]$ 的經典極限版本（忽略 bulk 熵項），換成 QEC 視角的入口。</p>'
    },
    jlms: {
      sub: "JLMS · Almheiri–Dong–Harlow",
      title: "子系統 QEC · 體形重構與代碼子空間投射",
      html: '<p>全像原理的 QEC 視角由 Almheiri, Dong, Harlow (ADH) 等人奠定：他們發現 Bulk 的局部物理算子，其實是被<strong>「加密」</strong>在 Boundary 的子區域中。其數學核心是 JLMS 公式：</p><div class="eqbox big">$$\\hat H_{\\text{mod}}^{\\text{boundary}}=\\frac{\\hat{\\text{Area}}(\\gamma_A)}{4G_N}+\\hat H_{\\text{mod}}^{\\text{bulk}}$$</div><h4>1. 糾錯碼結構</h4><p>在量子錯誤糾正碼中，我們有一個物理大空間 $\\mathcal{H}_{\\text{physical}}$（邊界 CFT）和一個代碼子空間 $\\mathcal{H}_{\\text{code}}$（內部的低能有效物理）。定義一個<strong>等距同構映射 (Isometry)</strong> $V:\\mathcal{H}_{\\text{code}}\\to\\mathcal{H}_{\\text{physical}}$。</p><p>若內部 Bulk 算子 $\\phi_b$ 想在邊界區域 $A$ 被讀取，數學上必須滿足：</p><div class="eqbox">$$V\\,\\phi_b\\,P_{\\text{code}}=O_A\\,V\\,P_{\\text{code}}$$</div><p>其中 $P_{\\text{code}}=VV^\\dagger$ 是代碼子空間的投射算子，$O_A$ 是只作用在邊界區域 $A$ 的算子。</p><h4>2. 關鍵 · 內部 = 抗抹除碼</h4><p>這意味著：Bulk 內部的某個時空點 $b$，若落在由區域 $A$ 決定的<strong>糾纏楔 (Entanglement Wedge)</strong> 之內，那麼即使邊界其餘部分（$A$ 的補集）遭到嚴重的量子噪聲破壞（<strong>抹除錯誤 Erasure Error</strong>），我們依然能單憑區域 $A$ 的算子 $O_A$ 把內部的時空資訊完整還原。時空的「內部」，在數學上就是一個對抗邊界抹除錯誤的物理 <strong>Code Subspace</strong>。</p>'
    },
    tqft: {
      sub: "Chern–Simons · V: Bord → Vec",
      title: "低能極限 · TQFT 不變量 = 量子化函子的突現",
      html: '<p>當我們把 Bulk 的重力理論推進到<strong>低能極限</strong>、或考慮拓撲不變量時，重力的動力學（幾何度規）被凍結，留下來的正是 TQFT。數學上體現在 Bulk 配分函數對幾何微擾的<strong>不敏感性</strong>。</p><h4>1. 從高度糾纏的真空到拓撲項</h4><p>邊界 CFT 的真空態 $|0\\rangle$ 可用張量網絡（如 MERA）或路徑積分準備。邊界高度糾纏時，這個路徑積分在 Bulk 中等價於對作用量 $S_{\\text{bulk}}[g,\\dots]$ 進行量子化。走向低能有效理論時，大質量重力子激發被抑制，作用量簡化為拓撲項 —— 例如 Chern–Simons：</p><div class="eqbox big">$$S=\\frac{k}{4\\pi}\\int\\mathrm{Tr}\\!\\left(A\\wedge dA+\\tfrac{2}{3}A\\wedge A\\wedge A\\right)$$</div><p>這時邊界的希爾伯特空間 $V(\\Sigma)$ 滿足 TQFT 的公理：</p><div class="eqbox">$$\\dim V(\\Sigma)=Z(\\Sigma\\times S^1)$$</div><h4>2. 關鍵 · 拓撲算子 ≡ 邏輯算子</h4><p>若把代碼子空間 $\\mathcal{H}_{\\text{code}}$ 的維度與 TQFT 在流形 $\\Sigma$ 上的狀態數連起來，你會發現：內部的 TQFT 算子，正好對應 QEC 中的<strong>邏輯算子 (Logical Operators)</strong>。因為 TQFT 算子都是拓撲算子（例如 Wilson Loop），把它在內部時空稍微挪動、形變，測量結果完全不變 —— 這正是邏輯算子的特徵：對局部物理微擾（局部噪聲）完全免疫。</p><ul><li><strong>TQFT 說</strong>：這個算子怎麼拉扯都不變，因為它是拓撲的。</li><li><strong>QEC 說</strong>：這個算子怎麼干擾都不錯誤，因為它是邏輯算子。</li></ul><p>這兩句話在數學上，透過 $V:\\text{Bord}\\to\\text{Vec}$ 對應到了一起。</p>'
    }
  }
};
