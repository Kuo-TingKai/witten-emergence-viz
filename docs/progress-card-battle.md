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

## M5 — 對手 Carlo Rovelli + 迴圈量子重力專屬牌組 + 反應式 AI + 抽鬼牌抬牌

把對戰從「鏡像對打」升級成**兩種量子重力綱領對撞**：玩家＝全像糾纏（It from Qubit），
對手＝ Carlo Rovelli，操一套專屬的 **迴圈量子重力（LQG）** 牌組。

- **引擎雙陣營化（faction-agnostic）**：`DEFS` 每張卡加 `faction`（holo/lqg）與 `fx`（效果原型）。
  `playCard` 的法術分派從「依卡名 `switch(k)`」改為「依效果 `switch(d.fx)`」；單位入場增益、
  重構可出條件、結構減傷（`hasHappy`→`hasStructure`）全部改吃旗標/`fx`。牌庫依 faction 抽牌
  （`newDeck(faction)`、`G.p=holo / G.e=lqg`）。**player 牌組數值與機制完全不變**（只是換了分派路徑）。
- **Rovelli 的 10 張 LQG 牌**（機制 1:1 對應玩家牌、物理意義換成 LQG，故平衡延續 M4 結果）：
  和樂圈(draw2)、自旋網絡節點(buffIfAllies)、自旋泡沫(aoe2)、哈密頓約束(bolt4)、體積量子(taunt)、
  面積量子化(shieldUnits)、大反彈(reconstruct)、微分同胚不變(immune)、普朗克離散(structure)、
  Immirzi 參數 γ(dot)。卡名/說明/flavor 在 `game.cards.<k>`，zh + en 各補 10 張。
- **反應式 AI（`aiPick` 重寫，faction 無關）**：改成依「玩家場面威脅」而非固定卡名挑牌——
  面臨斬殺 → 立體積量子嘲諷牆 / 補面積護盾；玩家鋪場 ≥2 → 自旋泡沫 AoE；玩家有大單位 →
  哈密頓約束定向點掉；否則鋪場（免疫>嘲諷>一般）→ 節奏牌。這就是「他會根據你的出牌出對應的牌」。
- **抽鬼牌式抬牌**：`build()` 在 `.bt-hand` 掛 `pointermove`／`pointerdown`／`leave`／`cancel`，
  用 `elementFromPoint` 找指到的 `.bt-card` 加 `.lift`（滑鼠與觸控統一，手機可滑著看）；
  CSS `.bt-card.lift, .bt-card:hover` 站直、放大 1.16、上移 40px、`z-index:12`，連不能出的牌也抬起讓你看清。
- **英靈名 / 副標**：敵方英雄改顯示「Carlo Rovelli」＋ 副標「迴圈量子重力 · LQG」、頭像換 `orbit` 圖標；
  玩家副標「全像糾纏 · It from Qubit」。回合指示、ticker、結算文案改寫成兩綱領對撞。
- **驗證**：jsdom 載入真實 `game.js` 跑 **500 局**（貪婪玩家 vs 新反應式 LQG AI）：
  - **100% 分出勝負**（loop iters min 14 / median 41 / max 61）、**0 JS 錯誤、0 未結束**。
  - 笨貪婪玩家勝率 27.4%（較 M4 的 31% 略降 → 反應式 AI 更強、更會解場），遊戲仍可贏。
  - 單局取樣確認 Rovelli 場上實際打出 LQG 牌（lqg_planck ×2 / lqg_diffeo / lqg_node）→ 有來有回。
  - i18n 鍵 zh/en **75/75 全對齊**；`game.css` 大括號平衡。
- Fallback：仍只動 `game.js` + `game.css` + 兩個 i18n 檔 + README/本檔；移除這些增量即回到 M4
  鏡像對打版本。LQG 牌組是純資料 + faction 標記，拔掉 `lqg_*` 卡與 `faction` 過濾即還原。

## M6 — 出牌動畫：把牌丟到牌桌中央 + 攻擊/防禦/魔法/陷阱特效

回報問題：點手牌時牌直接消失、單位才出現，沒有「丟到中間牌桌」的動作，法術也完全沒有施法特效。
原因：`onHandClick`／`onUnitClick`／`onHeroClick` 是同步 `playCard` + `render`，跳過任何過場動畫。

- **`animCast(side, handIdx, target)`**（新）取代出牌時的直接 `playCard`：抓來源卡矩形 → `flyCard`
  把卡的飛行殘影從手牌位置平移＋放大到 `.bt-board` 中央（CSS transition，`void offsetWidth` 觸發、
  不用 rAF 以相容 headless）→ `spawnFx` 在中央爆出類型特效 → 傷害類法術預抓目標 element 閃
  `bt-hit` + 飄傷害數字 → 最後才 `playCard` 套用狀態 + `render`。
- **玩家入口 `playerCast`**：`busy=true; render()` 鎖住輸入 → `await animCast("p",…)` → `busy=false; render()`，
  三個出牌點（一般牌 / 指定單位 / 打臉）全改走它。**Rovelli 的 AI 出牌迴圈也改 `await animCast("e",…)`**，
  所以雙方都會把牌丟到桌上、雙方法術都有特效（牌背從對手手牌區飛出，手機隱藏牌背時退回從英雄飛出）。
- **特效分五類**（呼應 TCG 攻擊/防禦/魔法/陷阱 + 召喚），`vfxOf(k)` 由 `fx`/旗標推導、配色各異：
  攻擊(紅, bolt4/aoe2)、防禦(青, shieldUnits + 嘲諷/結構/0攻單位)、魔法(金, draw2/reconstruct)、
  陷阱(紫虛線, dot)、召喚(綠, 進攻型單位)。中央環擴散 + 圖標脈衝 + 大字標籤（i18n `vfxAttack`…`vfxSummon`）。
- 尊重 `prefers-reduced-motion`：reduced 時 `flyCard`/`spawnFx` 直接略過，僅套狀態。
- `.bt-board`、`.bt-hero` 補 `position:relative`（特效中心定位 / 飄字錨點）。
- **驗證**：jsdom 跑 **300 局**（含新非同步出牌路徑）→ **100% 分出勝負、0 JS 錯誤、0 未結束**
  （iters min 18 / median 42 / max 57）；單局取樣確認**一局產生 43 次飛牌、五種特效（attack/defense/
  magic/trap/summon）全數觸發**。i18n zh/en **80/80 對齊**、`game.css` 177/177 大括號平衡。
- Fallback：把出牌點改回直接 `playCard`+`render`、刪 `animCast`/`playerCast`/`flyCard`/`spawnFx`/`vfxOf`
  與 `.bt-fly`/`.bt-fx` CSS 即還原 M5 即時出牌。

## M7 — 回合自動交棒（修「丟完牌後 Rovelli 不接手」）+ busy 防卡死

回報問題：玩家把手牌丟到桌上後，Carlo Rovelli 沒有「馬上」進行他的回合。
根因有二：(1) Rovelli 只在玩家**手動按「結束回合」**時才會行動（回合制設計，但對玩家不直覺）；
(2) M6 把出牌改成非同步 `playerCast`（`busy=true … await animCast … busy=false`），
**一旦動畫中任何一行在真實瀏覽器丟例外，`busy` 會永遠停在 `true`**，「結束回合」鈕永久 disabled →
Rovelli 永遠無法行動、整局凍結（headless 測試因 stub 掉 lucide 測不出來）。

- **`busy` 防卡死（try/finally）**：`playerCast` / `doPlayerAttack` / `aiTurn` 全部把主體包進
  `try … finally`，`finally` 一定把 `busy` 設回 `false` 並 `render()`；`aiTurn` 的 `finally` 還會
  `endTurn()` 把控制權交回玩家。動畫即使出錯也不再凍結整局。
- **回合自動交棒（auto-end）**：新增 `playerHasMoves()`（出得起的牌 / 可攻擊單位）與 `maybeAutoEnd()`，
  在 `playerCast`、`doPlayerAttack` 結束後與玩家回合開始時呼叫——當玩家**已無事可做**（mana 花完、
  新單位都在召喚癱瘓、且沒有可攻擊的舊單位）時，延遲 750ms 自動 `endTurn()`，Rovelli 立刻接手。
  保留手動「結束回合」鈕：玩家若還有可攻擊單位但不想攻擊，仍可手動結束（auto-end 不會搶走主導權）。
- **視覺提示**：無招可出時「結束回合」鈕加 `.idle` class 脈動，預告回合即將自動交給 Rovelli。
- **驗證**：jsdom 跑 300 局 → **100% 分出勝負、0 JS 錯誤**（median 自 42 降到 28 iters，交棒更乾淨）。
  專項驗證：玩家「**全程從不按結束回合**、只丟牌＋攻擊」→ 遊戲仍完整跑到分出勝負（你的時空解體了）、
  End-turn 點擊 0 次、0 JS 錯誤 → 證明 auto-end 確實自動把回合交給 Rovelli。`game.css` 181/181 平衡。
- Fallback：移除 `playerHasMoves`/`maybeAutoEnd`/`autoEndT` 與 `.idle` 脈動、把 try/finally 還原即回 M6
  （手動結束回合）。

## M8 — Carl 出牌動畫被選單擋住 + 手牌移到左上角

回報問題：(1) 玩家丟牌後看不到 Carl「選牌＋丟牌到牌桌」的動畫；(2) Carl 的手牌應放左上角、
貼著他的名字 profile 框，才不會被切換選單擋住。

根因（堆疊層級）：`#switchers` 切換選單 `position:fixed; top:12px; right:14px; z-index:60`；
`.bt-enemy` 用 `justify-content:space-between` 把 Carl 的牌背 `.bt-ehand` 推到**右上角，正好壓在選單下**；
出牌殘影 `.bt-fly` 原本 `z-index:30` 且掛在 `#battle`（z40）裡 → 整個在選單（z60）之下。
所以 Carl 的手牌與「從手牌飛出」的動畫都被選單蓋住、看起來像沒做動畫。

- **手牌移到左上角**：`.bt-enemy` 改 `justify-content:flex-start; gap:1.3rem; padding-right:6rem`，
  牌背緊貼 hero profile 框右側（左上角），右上角讓給選單。
- **丟牌動畫浮到最上層**：`.bt-fly` `z-index:30→70`（>選單 60），且 `flyCard` 改 `document.body.appendChild`
  （脫離 `#battle` 的 z40 堆疊脈絡）才壓得過選單；`leave()` 清掉殘留 `.bt-fly`。
- **正面飛出**：`animCast` 出的牌一律 `faceUp=true`，看得到 Carl 選了哪張（手牌仍顯示牌背，出牌時翻正飛出）。
- **驗證**：jsdom 一局統計 —— 玩家丟牌動畫 19 次、**Rovelli 丟牌動畫 22 次（> 0，證明 Carl 確實有做動畫）**、
  body 無殘留 fly、分出勝負、0 JS 錯誤。`game.css` 181/181 平衡。
- Fallback：`.bt-enemy` 還原 `space-between`、`.bt-fly` z-index 還原 30 並改回 `stage.appendChild`、
  `faceUp` 還原 `side==="p"` 即回 M7。

## M9 — 第一次進對戰自動彈規則說明（含 ? 鈕可重開）

回報問題：玩家第一次進對戰模式不知道怎麼玩。

- **首次自動彈**：`enter()` 檢查 `rulesSeen()`，第一次進場彈出規則卡 `#bt-rules`（掛 body、`z-index:90`，
  蓋過選單 60 與飛牌 70）。按「開始對戰」或點背景關閉，並 `markRulesSeen()` 記住，之後不再自動彈。
- **持久化**：`localStorage["witten-battle-rules-seen"]`，存取包 try/catch，失敗時退回記憶體旗標
  （headless / 隱私模式也不會壞）。
- **? 規則鈕**：`.bt-mid` 加一顆「?」鈕，隨時可重開規則卡。
- **規則內容（i18n `game.rules`，zh+en）**：勝利條件（打到時空完整度 0）、糾纏資源、出牌（點牌→飛桌→
  指定目標）、攻擊（點發光單位→點目標、召喚癱瘓、嘲諷）、招牌機制面積＝糾纏護盾、自動/手動結束回合、
  機制即教學。7 條，各帶 lucide 圖標。語言切換時若規則卡開著會跟著重繪。
- **驗證**：jsdom —— 首次進場彈出（標題「怎麼玩」、7 條、含 Carlo Rovelli）、按開始關閉、
  第二次進場不再自動彈、? 鈕可重開，0 JS 錯誤；100 局回歸 100% 分勝負、0 錯誤。
  i18n zh/en **97/97 對齊**、`game.css` 199/199 平衡。
- Fallback：移除 `showRules`/`rulesSeen`/`markRulesSeen`、`enter()` 的彈出呼叫、`.bt-help` 鈕與
  `.bt-rules` CSS、i18n `rules` 區段即還原 M8。
