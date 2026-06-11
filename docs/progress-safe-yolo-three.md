# 進度 · witten-emergence-viz 三件事一口氣做完

## 目標
把這頁理論視覺化從「本地單頁」升級為「線上可看、品牌統一、可深入互動」的完成品：
1. 加 `.gitignore` + commit，推到 GitHub，開 GitHub Pages 線上可看。
2. 套用 Genesis gold 主題（dark warm-black + gold/champagne/copper/bronze，Inter / JetBrains Mono）統一視覺。
3. 加互動：點「湧現卡片」展開數學細節 —— 模交叉積（Crossed Product）與 Tomita–Takesaki 在黑洞視界製造霍金溫度。

## 計畫 milestone
- **M1 — 版控與上線**：`.gitignore` + 初始 commit；`gh repo create` + push；啟用 GitHub Pages。預期產出：可公開存取的 URL。
- **M2 — Genesis gold 主題**：依設計 token 產 `assets/gs-theme.css` 並注入；改寫色系、漸層、品牌字。預期產出：暖黑金色視覺。
- **M3 — 互動數學細節**：每張湧現卡片可點擊展開 modal/抽屜，含模交叉積與 Tomita–Takesaki→霍金溫度的公式推導。預期產出：可互動深入頁。

## 進度日誌

### M1 — 版控與上線 ✅
- 加 `.gitignore`（OS/editor/log/node）。
- 初始 commit `9fb5fd6`。
- `gh repo create witten-emergence-viz --public --push` → https://github.com/Kuo-TingKai/witten-emergence-viz
- 啟用 GitHub Pages（master / root）→ **線上 URL：https://kuo-tingkai.github.io/witten-emergence-viz/**（首次建置約 1–2 分鐘）。
- 註：Genesis 主題來源在 Windows（`C:\Users\User\gs-trading-portal`），Linux 端無法存取 → M2 改依設計 token 重建。

### M2 — Genesis gold 主題 ✅
- 來源 `C:\Users\User\gs-trading-portal` 在 Linux 不可達 → 依 skill 文件 token 重建。
- 新增 `assets/gs-theme.css` 覆蓋層：remap 既有語意變數（--cyan/--violet/--rose/--amber/--green/--t3/--t2）為金色家族，整批換色而不動 selector。
- 暖黑 radial 底、金屬漸層進度條、銅→金→香檳品牌漸層字。
- `app.js` 背景糾纏網絡改金/香檳色（連線 #d4af37、節點 #f0d98a）。
- index.html 於 style.css 後注入 gs-theme.css（覆蓋順序正確）。

### M3 — 互動數學細節 ✅
- 新增 `assets/details.js`：5 張湧現卡片皆可點擊 / Enter 展開金色 modal。
  - **heat** → 模交叉積完整推導（$\mathcal{A}\rtimes_\sigma\mathbb{R}$、Takesaki 對偶 → II∞、跡重現 → $S_{\text{gen}}$）。
  - **energy** → Tomita–Takesaki → 霍金溫度（KMS、Bisognano–Wichmann boost、歐氏 $2\pi$ 正則性 → $T_H=\kappa/2\pi$）。
  - time / space / mass 亦各有推導（模流唯一性、糾纏楔重構、Nambu–Goto）。
- modal 樣式加在 `gs-theme.css`（金色、blur 遮罩、ESC / 點外關閉、開啟時 re-typeset MathJax）。
- index.html 載入 details.js（在 app.js 前）。
- 驗證：`node --check` 三支 JS 全過；5 個 data-k 與 DETAILS keys 一一對應；Pages status=built。

### M4 — 全像 QEC 階梯（section 04，後加） ✅
- 在 section 03（四種湧現卡）與原 04（總覽）之間插入新 `.step` 區段，原總覽重編號 04 → 05。
- 定位為「同一件事的 QEC / TQFT 視角」：von Neumann 代數的糾纏楔重構，換成量子糾錯碼語言再走一遍並推到拓撲層；lede 回指〈空間〉卡避免與既有 RT/糾纏楔內容矛盾。
- **嵌入式 mini-DAG**：用既有 `.flow/.node/.arrow` 畫「資訊側（銅）⇄ 幾何側（金）」三根橫桿階梯（RT / JLMS / TQFT），抽象度 度規 → 局域性 → 拓撲。
- 3 張可點擊 `.emerge` 卡（`rt` / `jlms` / `tqft`），正面放「玩味問句」(`.puzzle`) + 公式片段，點擊 → modal 完整推導；沿用既有 card→modal 機制，零接線。
- 2 張 `.todo` placeholder 卡（`happy` = HaPPY 五角形碼、`cs` = Chern–Simons × Weyl），無 DETAILS 故不可點，標「待擴充」。
- `details.js` 加 `rt` / `jlms` / `tqft` 三筆 DETAILS（LaTeX 雙跳脫）。
- `gs-theme.css` 加 `.qec-ladder` / `.n-info` / `.n-geo` / `.puzzle` / `.todo` 樣式 + 新 data-k accent bar 與圖示色 + `#modal-body ul/li`。
- `refs.js` 續編 20–24：RT(hep-th/0603001)、ADH(1411.7041)、JLMS(1512.06431)、HaPPY(1503.06237)、Witten Jones/Chern–Simons(BF01217730)。

### M5 — 展廳模式（3D 旋轉木馬卡片瀏覽）✅
- 在既有 `#switchers` 列注入第三條 **視圖：捲動 / 展廳** 切換 bar；視圖選擇存 `localStorage`（`witten-view`），重載記住，預設捲動。
- 技術選型 **CSS 3D**（非 Three.js）：把 `main .emerge` 全部 10 張卡複製成環上的面（`rotateY(i·step) translateZ(radius)`），整個環 `rotateY(--rot)` 旋轉。100% 復用既有卡片內容 / i18n / MathJax / modal，零外部依賴、無 build。
- 互動：拖曳（Pointer Events）/ 方向鍵 / 滾輪 / 圓點切換，鬆手吸附最近一張；中央卡點擊 → 觸發原卡 `.click()` → 既有金色 modal。
- 連動 i18n：`i18n:rendered` 時重建面內容（隨語言 / 深度）；軟科普模式自動關閉中央卡可點性。
- 新增 `assets/showcase.js` + `assets/showcase.css`；`i18n/{zh-Hant,en}.js` 加 `ui.viewLabel/viewScroll/viewShowcase/scHint`；`index.html` 掛載兩檔。
- 修掉三個 3D carousel 通病：①側卡 2D 投影攔截中央點擊 → 僅 `.is-front` 給 `pointer-events:auto`；②`pointerdown` 立即 `setPointerCapture` 吃掉 click → 改成偵測到實際拖動後才 capture；③Escape 同時關 modal 又退出展廳 → 展廳 keydown 改 capture 階段，modal 開著時放手。
- 驗證：Playwright 實測桌機 + 390px 手機（旋轉、開 modal、切語言重建、Escape 兩段行為、RWD 圓點避開底部切換器）。

### M6 — Witten 英靈（半透明金色光靈 + 名言浮游）✅
- 半透明金色光靈 wisp（核心 + 光暈 + 三顆軌道粒子，純 CSS/SVG）在視窗內 `transform:translate` 漂移，抵達落點停下顯示一句名言，7s 後淡出再移動；點光靈本體可立即換下一句。
- 名言為**查證有出處的真實引言**（i18n `spirit.quotes`，含 text + attr，隨語言切換）：NYT 1987「時空連續體消融」「弦論是個奇蹟」「意外被發現」、Kaku Hyperspace 1995「重力被強加給我們」、NOVA 2003「方程式優雅而微妙」。
- 開關 bar（sparkles 圖示 + 開/關）注入既有 `#switchers`，存 `localStorage`（`witten-spirit`，預設開）；捲動 + 展廳兩種模式都出現。
- `z-index:55`（展廳 40 之上、切換器 60 / modal 100 之下）；容器 `pointer-events:none` 不擋內容，只光靈本體可點。
- 名言氣泡：靠頂端 `flip-y` 改向下開、靠左右邊界水平夾擠（`orientBubble`）避免裁切；尊重 `prefers-reduced-motion`（停漂移與脈動）。
- 新增 `assets/spirit.js` + `assets/spirit.css`；`i18n/{zh-Hant,en}.js` 加 `spirit` 區塊；`index.html` 掛載兩檔。
- 驗證：Playwright 桌機 / 700px / 展廳模式（漂移、名言、開關持久化、氣泡邊界夾擠、z 層級）。

## Fallback 指引
- Rollback 到某 milestone：`git log --oneline` 找 `Mn:` commit，`git reset --hard <hash>`。
- 關鍵檔案：`index.html`（結構）、`assets/style.css`（基底樣式）、`assets/gs-theme.css`（M2 主題，覆蓋層）、`assets/app.js`（M3 互動）、`assets/refs.js`（文獻）。
- 線上頁面設定：GitHub repo Settings → Pages → Source: `master` branch `/ (root)`。
