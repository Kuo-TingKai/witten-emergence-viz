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
（每完成一個 milestone 追加）

## Fallback 指引
- Rollback 到某 milestone：`git log --oneline` 找 `Mn:` commit，`git reset --hard <hash>`。
- 關鍵檔案：`index.html`（結構）、`assets/style.css`（基底樣式）、`assets/gs-theme.css`（M2 主題，覆蓋層）、`assets/app.js`（M3 互動）、`assets/refs.js`（文獻）。
- 線上頁面設定：GitHub repo Settings → Pages → Source: `master` branch `/ (root)`。
