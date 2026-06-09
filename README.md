# It from Bit · 代數結構中湧現的時空

> 將 Edward Witten 與合作者（2022–2025）在**量子重力 × 算符代數**領域的綱領，做成一頁互動式視覺化。
> 核心命題：**時空、熱、能量、質量並非基本的，而是局域觀測者的 von Neumann 代數結構與資訊限制的宏觀投影。**

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
│   ├── style.css       # 深空暗色主題 + 過渡流程圖 + 卡片
│   ├── app.js          # scroll reveal、進度條、糾纏網絡背景動畫
│   └── refs.js         # 19 篇參考文獻清單（對應原始留言索引）
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
