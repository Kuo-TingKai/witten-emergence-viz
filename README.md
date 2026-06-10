# It from Bit · 代數結構中湧現的時空

> 將 Edward Witten 與合作者（2022–2025）在**量子重力 × 算符代數**領域的綱領，做成一頁互動式視覺化。
> 核心命題：**時空、熱、能量、質量並非基本的，而是局域觀測者的 von Neumann 代數結構與資訊限制的宏觀投影。**

**🔗 線上版（GitHub Pages）：<https://kuo-tingkai.github.io/witten-emergence-viz/>**

採 Genesis gold 視覺主題（暖黑底 + gold / champagne / copper / bronze）。點擊任一張「湧現卡片」可展開該概念的數學推導 modal。

右上角（手機在底部置中）有 **解釋深度切換**，同一套推導可切三種講法：

- **專業** — 原本的算符代數語言（Type III₁、模交叉積、Tomita–Takesaki…），給有物理／數學背景的讀者。
- **硬科普** — 面向有科學／工程背景的人，保留關鍵公式，但用直覺說明取代術語。
- **軟科普** — 面向一般大眾，純文字、隱藏公式，全程以日常比喻講解。

選擇會記在 `localStorage`。版面採手機 / 平板 / 桌機三段式自適應。

## 這份視覺化講什麼

一條從「一個觀測者的局域代數」出發的推導鏈：

1. **起點 — Type III₁ 代數的資訊限制**
   Reeh–Schlieder 定理 → 真空在邊界帶無限紫外糾纏 → 局域代數沒有跡、沒有密度矩陣 → 單一區域糾纏熵未定義。

2. **代數過渡 — Crossed Product 打開「跡」的開關**
   引入微擾重力（$G_N>0$ / 全像 $1/N$）→ 重力對哈密頓量做幾何著裝 → 模交叉積運算 → `Type III₁ → Type II∞`（黑洞外）或 `Type II₁`（de Sitter）→ 跡與密度矩陣重現 → 廣義熵 $S_{\text{gen}}=\dfrac{\text{Area}}{4G_N}+S_{\text{out}}$。

3. **四種湧現 + 質量**

   | 宏觀概念 | 代數源頭 |
   |---|---|
   | 時間 | 模自同構流 $\sigma_t^\omega(A)=\Delta^{it}A\Delta^{-it}$（Tomita–Takesaki / Connes–Rovelli 熱時假說） |
   | 空間 | 子代數包含對偶 $\mathcal{A}(A)\subset\mathcal{A}(B)$ 與糾纏楔重構 |
   | 熱 | Type III → Type II 重現的跡效應（廣義熵） |
   | 能量 | 模哈密頓量擾動 $\Delta S=\Delta\langle K\rangle$、RT 曲面面積變化的幾何阻力 |
   | 質量 | Type II 自由度在時空邊界凝聚（Nambu–Goto 弦張力） |

4. **全像 QEC 階梯 — 邊界資訊編織內部幾何與拓撲**（"It from Qubit" 視角）
   把上面的糾纏楔重構換成量子糾錯碼（QEC）語言再走一遍，並推到拓撲層。三根橫桿把「資訊側」與「幾何側」焊死，抽象度逐級上升：度規 → 局域性 → 拓撲。

   | 橋接 | 資訊側 | 幾何側 | 公式 |
   |---|---|---|---|
   | RT | 糾纏熵 $S(A)$ | 極小曲面面積 | $S(A)=\dfrac{\text{Area}(\gamma_A)}{4G_N}$ |
   | JLMS / ADH | 抗抹除 code subspace | 糾纏楔 / 子區域重構 | $V\phi_b P_{\text{code}}=O_A V P_{\text{code}}$ |
   | TQFT | 邏輯算子（免疫噪聲） | 拓撲不變量（Wilson loop） | $\dim V(\Sigma)=Z(\Sigma\times S^1)$，$V:\text{Bord}\to\text{Vec}$ |

   點 `rt` / `jlms` / `tqft` 卡可展開完整推導；底部 `HaPPY 五角形碼`、`Chern–Simons × Weyl` 為待擴充 toy model。

## 怎麼看

純前端、零相依、零建置。直接開：

```bash
# 任一即可
xdg-open index.html              # Linux
python3 -m http.server 8000      # 然後開 http://localhost:8000
```

## 結構

```
witten-emergence-viz/
├── index.html          # 主視覺化頁面（含 MathJax 公式）
├── assets/
│   ├── style.css       # 基底版面：流程圖、卡片、reveal
│   ├── gs-theme.css    # Genesis gold 主題覆蓋層 + modal 樣式
│   ├── responsive.css  # 手機 / 平板 / 桌機三段式自適應佈局
│   ├── modes.css       # 解釋深度切換器樣式 + 三級變體顯隱
│   ├── app.js          # scroll reveal、進度條、糾纏網絡背景動畫
│   ├── modes.js        # 專業 / 硬科普 / 軟科普 切換（localStorage）
│   ├── details.js      # 卡片點擊 → 數學細節 modal（湧現 5 卡 + RT/JLMS/TQFT 3 卡）
│   └── refs.js         # 24 篇參考文獻清單（對應原始留言索引）
├── docs/
│   └── progress-safe-yolo-three.md  # 開發進度日誌
└── README.md
```

## 技術細節

- **公式**：MathJax 3（CDN），支援 `$...$` 與 `$$...$$`。
- **背景動畫**：canvas 糾纏網絡 —— 節點＝算符、連線亮度＝糾纏強度，呼應「糾纏網絡 → 空間」的隱喻；尊重 `prefers-reduced-motion`。
- **無框架**：原生 HTML/CSS/JS，可離線運行（需網路載入字型與 MathJax CDN）。

## 參考文獻

完整 19 篇來源（arXiv / INSPIRE / PRD / 講稿）列於頁面底部，亦見 `assets/refs.js`。核心綜述：[arXiv:2510.07017](https://arxiv.org/abs/2510.07017)。

---

*內容為理論科普整理，數學細節（模交叉積、Tomita–Takesaki 在黑洞視界製造霍金溫度）以原始論文為準。*
