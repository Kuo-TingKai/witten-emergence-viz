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

## Fallback 指引
- Rollback 到某 milestone：`git log --oneline` 找 `Mn:` commit，`git reset --hard <hash>`。
- 關鍵檔案：`index.html`（結構）、`assets/style.css`（基底樣式）、`assets/gs-theme.css`（M2 主題，覆蓋層）、`assets/app.js`（M3 互動）、`assets/refs.js`（文獻）。
- 線上頁面設定：GitHub repo Settings → Pages → Source: `master` branch `/ (root)`。
