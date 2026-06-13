# Progress · 概念卡牌對戰模式（M7 系列）

## 目標

把展廳模式的 10 張概念卡（time / space / heat / energy / mass / rt / jlms / tqft / happy / cs）
延伸成一個**純前端、玩家 vs AI 的 3D 卡牌對戰小遊戲**，核心訴求是「機制即教學」：
每張卡的遊戲規則直接對應它的物理內容（RT 面積=糾纏 → 護盾=糾纏連線數、
JLMS 糾錯 → 從棄牌堆重構、TQFT 拓撲 → 免疫法術…），出牌時同步浮出概念解說、
可一鍵展開既有數學 modal。不引入任何框架與後端，沿用 CSS 3D / i18n / details modal 基礎設施。

## 遊戲規則（v1）

- 雙方各 20 點「時空完整度」(HP)，牌庫 = 10 種概念卡 × 2 張，起手 4 張，每回合抽 1。
- 資源「糾纏」：第 n 回合上限 min(n,10)，每回合全滿。
- 牌庫抽乾後每次抽牌受遞增「熵增」傷害（疲勞 = 熵）。
- **糾纏連線（招牌機制）**：你場上相鄰單位每對形成一條金色連線，
  己方回合開始時本體護盾 = 連線數（面積=糾纏熵 → 幾何屏障）。
- 單位有召喚癱瘓（剛凝聚的結構下回合才能行動）。

| 卡 | 費 | 類型 | 效果 | 對應物理 |
|---|---|---|---|---|
| 時間 | 2 | 法術 | 抽 2 張 | 模流自己往前走 → 資訊增加 |
| 空間 | 2 | 單位 2/3 | 入場時若已有單位 +1/+1 | 糾纏縫合空間、節點越多越強 |
| 熱（熵） | 3 | 法術 | 敵全場（單位+本體）2 點熵衰減 | 霍金輻射 |
| 能量 | 2 | 法術 | 指定目標 4 傷害 | 改變時空要付出的力道 |
| 質量 | 3 | 單位 1/6 嘲諷 | 敵方必須先攻擊它 | 能量打結 = 時空缺陷 |
| 面積=糾纏 | 2 | 法術 | 護盾 +2×己方單位數 | RT 公式 |
| 重構=糾錯 | 2 | 法術 | 從棄牌堆隨機重構 1 張回手 | JLMS / QEC 抹除恢復 |
| 拓撲=邏輯算子 | 4 | 單位 3/3 | 免疫法術與熵（只能被單位攻擊） | 邏輯算子對局部噪聲免疫 |
| HaPPY 碼 | 4 | 結構 0/7 | 你的本體受傷 -1 | 容錯張量網絡 |
| Chern–Simons | 3 | 法術 | 接下來 3 回合，回合開始對敵本體 2 傷害，不可移除 | 受拓撲保護的手徵流 |

## 計畫 milestone

- **M1**：視圖列第三選項「對戰」+ 對戰引擎核心（資源/抽牌/出牌/攻擊/嘲諷/勝負/簡單 AI）
  + 全螢幕戰場 UI + `game.js` / `game.css`（zh 文案先行）。
- **M2**：教學連動 — 出牌浮出概念一句話（flavor ticker）、「展開數學細節」按 modal、
  糾纏連線金色視覺 + 護盾規則顯示。
- **M3**：AI 決策強化（嘲諷/解場/斬殺判斷）+ 3D 動畫（扇形手牌、出牌飛行、受擊回饋）
  + 結算畫面（隨機 Witten 名言）。
- **M4**：英文 i18n 全套 + RWD（手機直版）+ 數值平衡 + README / 進度檔收尾。

## 進度日誌

（每完成一個 milestone 追加於此）

## Fallback 指引

- 全部新邏輯在 `assets/game.js` + `assets/game.css`，移除這兩個檔案 + `index.html` 兩行引用
  + `showcase.js` 的 battle view 增量即可完全回退。
- 既有模組（details / i18n / spirit / showcase 環）皆未被破壞性修改；
  `showcase.js` 只新增 "battle" 視圖值、`view:change` 事件與 `window.WittenView`。
- 回退到某個 milestone：`git log --oneline | grep '^.\{8\} M'` 找對應 commit，
  `git revert` 或 `git checkout <hash> -- assets/game.js assets/game.css`。

## M1 — 對戰引擎核心 + 戰場 UI + 視圖整合

- `showcase.js`：readView 接受 "battle"、視圖 bar 第三鈕、setView 廣播 `view:change`、
  對外暴露 `window.WittenView`（增量 ~15 行，不影響既有捲動/展廳）。
- `assets/game.js`（新，~520 行）：完整回合制引擎 —— 糾纏資源曲線、抽牌/疲勞(熵增)、
  10 張卡機制全數實作（時間抽 2、空間入場 buff、熱 AoE、能量指定 4 傷、質量嘲諷、
  RT 護盾、JLMS 棄牌堆重構、TQFT 法術免疫、HaPPY 減傷、CS 持續放電）、
  嘲諷攻擊規則、召喚癱瘓、護盾=糾纏連線數、貪婪 AI、結算 overlay。
- `assets/game.css`（新，~300 行）：金色主題全螢幕戰場、3D 扇形手牌（--fi 變數）、
  目標指定脈動、結算畫面。
- zh 字典加 `game` 區段 + `ui.viewBattle`；`index.html` 掛 css/js。
- 調整：時間卡降為 1 費（否則首回合雙方無牌可出）。
- 驗證：headless chromium 跑 6 回合自動對打，出牌/攻擊/AI/CS 放電/退出皆正常，0 JS 錯誤。

## M2 — 教學連動（機制即教學）

- 出牌即顯示 `bt-ticker`：誰出了什麼卡 + 該卡物理 flavor 一句話（8 秒自動收）。
- ticker 上「展開數學細節」按鈕：對有 modal 的卡（time/space/heat/energy/mass/rt/jlms/tqft），
  直接觸發 `main .emerge[data-k]` 的 click → 復用 details.js 既有金色 modal（z100 蓋過戰場）；
  軟科普模式自動隱藏按鈕（與展廳一致）。
- 糾纏連線視覺：場上相鄰單位之間渲染 `bt-link` 金色脈動連線，呼應「回合開始護盾＝連線數」。
- zh `game.linkTip`；ticker / link RWD（手機 ticker 移到頂部）。
- 驗證：headless 7 回合，ticker 每次出牌皆顯示、modal 成功開啟（標題正確）、
  玩家連線數達 2、0 JS 錯誤。

## M3 — AI 決策強化 + 3D 動畫 + 結算名言

- AI 攻擊重寫 `aiChooseAttack`：斬殺偵測（攻擊力總和 ≥ 玩家 hp+shield 且無嘲諷 → 全員打臉）
  → 嘲諷牆優先清（挑能殺死且自己存活的攻擊者）→ 划算交換（殺得死且不血虧 / 對方威脅大）
  → 否則打臉。出牌 `aiPick` 沿用優先序。
- 動畫（尊重 prefers-reduced-motion）：
  - `animAttack` 攻擊突刺（朝目標位移 55% 再彈回），雙方 attack 路徑共用。
  - `bt-hit` 受擊抖動 + 紅閃；`floatDmg` 飄傷害數字。
  - 單位入場 `bt-enter`（fresh 旗標，凝聚浮現）。
- 結算畫面加一句 Witten 名言（沿用 spirit.quotes，依回合數選句）。
- 驗證：headless 跑到分出勝負（10 回合），入場/受擊/傷害數字動畫皆觸發、
  結算名言正確顯示、0 JS 錯誤。

## M4 — 英文 i18n 全套 + RWD（手機直版）+ 數值平衡 + 收尾

- **英文 i18n**：`en.js` 補上完整 `game` 區段（介面字串 + 10 張卡 text/flavor）。
  以 zh-Hant 為正準來源比對，**42/42 鍵全數對齊、無缺漏無多餘**。
- **手機 RWD**：`game.css` 新增 `≤560px` 直版佈局 —— 全域切換器（手機原本移到底部置中、
  會壓到玩家手牌）在對戰模式改回**頂部置中、可換行**，戰場內容整體下推（`#battle` padding-top 152px）
  讓出空間；縮小卡片/單位/離開鈕、隱藏對手牌背（`bt-ehand`）、ticker 移到頂部下方。
  純加法 media query，不動桌機既有規則（144/144 大括號平衡）。
- **數值平衡（Monte Carlo 驗證）**：用 jsdom 載入**真正的 `game.js` 引擎**，以貪婪玩家
  對打引擎內建 AI 跑 **500 局**：
  - **100% 分出勝負**（loop iters min 11 / median 42 / max 58，遠低於 safety 600）→ 無 soft-lock、
    熵增疲勞確實收斂每一局。
  - **0 JS 錯誤、0 未結束**。
  - 笨貪婪玩家勝率 31% → AI 具挑戰性但遊戲可贏；會讀教學 ticker 的真人玩家明顯佔優。
  - 結論：**無需調整數值**（M1 已把時間卡降 1 費解掉唯一的首回合 soft-lock）。
- **收尾**：README 加「視圖三選項」說明 + 「概念對戰」整段（規則 + 10 卡對照表）+ 檔案樹補
  `game.js/.css`、`showcase`、`spirit`、本進度檔。
- Fallback：本里程碑只動 `en.js`（資料）/ `game.css`（CSS 加法）/ README / 本檔，
  **未改任何遊戲邏輯**（`game.js` DEFS 與規則與 M3 相同）。
