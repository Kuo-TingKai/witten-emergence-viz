// ============================================================
// 概念對戰 · It from Bit 卡牌對戰模式
// ------------------------------------------------------------
// 把 10 張概念卡延伸成玩家 vs AI 的卡牌對戰，核心是「機制即教學」：
// 每張卡的規則直接對應其物理內容（RT 護盾=糾纏連線、JLMS=棄牌堆重構、
// TQFT=免疫法術…）。純前端、無依賴；視圖切換掛在 showcase.js 廣播的
// view:change 事件上（view === "battle"），文案全部走 i18n 字典 game 區段。
// ============================================================
(function () {
  // ---------- 卡片機制定義（文案在 i18n；這裡只放數值與旗標） ----------
  // faction：holo＝玩家（全像 / It-from-Qubit）；lqg＝對手 Carlo Rovelli（迴圈量子重力）。
  // fx＝效果原型，引擎與 AI 依 fx/旗標運作（與卡名無關），兩套牌組共用同一套機制。
  const DEFS = {
    // ---- 玩家陣營：全像糾纏（AdS/CFT · It from Qubit） ----
    time:   { faction: "holo", cost: 1, type: "spell", icon: "hourglass", fx: "draw2" },
    space:  { faction: "holo", cost: 2, type: "unit", atk: 2, hp: 3, icon: "globe", fx: "buffIfAllies" },
    heat:   { faction: "holo", cost: 3, type: "spell", icon: "flame", fx: "aoe2" },
    energy: { faction: "holo", cost: 2, type: "spell", needsTarget: true, icon: "zap", fx: "bolt4" },
    mass:   { faction: "holo", cost: 3, type: "unit", atk: 1, hp: 6, taunt: true, icon: "target" },
    rt:     { faction: "holo", cost: 2, type: "spell", icon: "spline", fx: "shieldUnits" },
    jlms:   { faction: "holo", cost: 2, type: "spell", icon: "shield", fx: "reconstruct" },
    tqft:   { faction: "holo", cost: 4, type: "unit", atk: 3, hp: 3, immune: true, icon: "infinity" },
    happy:  { faction: "holo", cost: 4, type: "unit", atk: 0, hp: 7, structure: true, icon: "hexagon" },
    cs:     { faction: "holo", cost: 3, type: "spell", icon: "waves", fx: "dot" },
    // ---- 對手陣營：Carlo Rovelli · 迴圈量子重力（Loop Quantum Gravity） ----
    lqg_holonomy:    { faction: "lqg", cost: 1, type: "spell", icon: "circle-dot", fx: "draw2" },
    lqg_node:        { faction: "lqg", cost: 2, type: "unit", atk: 2, hp: 3, icon: "share-2", fx: "buffIfAllies" },
    lqg_foam:        { faction: "lqg", cost: 3, type: "spell", icon: "cloud", fx: "aoe2" },
    lqg_hamiltonian: { faction: "lqg", cost: 2, type: "spell", needsTarget: true, icon: "sigma", fx: "bolt4" },
    lqg_volume:      { faction: "lqg", cost: 3, type: "unit", atk: 1, hp: 6, taunt: true, icon: "box" },
    lqg_area:        { faction: "lqg", cost: 2, type: "spell", icon: "grid-3x3", fx: "shieldUnits" },
    lqg_bounce:      { faction: "lqg", cost: 2, type: "spell", icon: "refresh-cw", fx: "reconstruct" },
    lqg_diffeo:      { faction: "lqg", cost: 4, type: "unit", atk: 3, hp: 3, immune: true, icon: "git-compare" },
    lqg_planck:      { faction: "lqg", cost: 4, type: "unit", atk: 0, hp: 7, structure: true, icon: "ruler" },
    lqg_immirzi:     { faction: "lqg", cost: 3, type: "spell", icon: "sliders-horizontal", fx: "dot" },
  };
  const FACTION_KEYS = f => Object.keys(DEFS).filter(k => DEFS[k].faction === f);
  const HP0 = 20, HAND_MAX = 8, FIELD_MAX = 6, ENT_MAX = 10, COPIES = 2;

  // ---------- i18n 取用（en 缺 game 區段時回退 zh-Hant） ----------
  function dict() {
    return (window.I18nState && window.I18nState.dict()) ||
           (window.I18N && window.I18N["zh-Hant"]) || {};
  }
  function gd() {
    return dict().game ||
           ((window.I18N && window.I18N["zh-Hant"]) || {}).game || {};
  }
  function gcard(k) { return (gd().cards || {})[k] || {}; }
  // 玩家陣營卡名沿用展廳概念卡 card.<k>.title；LQG 卡名讀 game.cards.<k>.name
  function cardName(k) {
    const c = (dict().card || {})[k];
    if (c && c.title) return c.title;
    return gcard(k).name || k;
  }
  function fmt(s, vars) {
    return String(s || "").replace(/\{(\w+)\}/g, (m, key) => (vars && key in vars) ? vars[key] : m);
  }

  // ---------- 遊戲狀態 ----------
  let G = null;            // { p, e, cur, over, winner }
  let stage = null, built = false, active = false, busy = false;
  let pending = null;      // {kind:'spell', idx} | {kind:'attack', i}

  function newDeck(faction) {
    const d = [];
    FACTION_KEYS(faction).forEach(k => { for (let i = 0; i < COPIES; i++) d.push(k); });
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }
  function newPlayer(faction) {
    return { faction, hp: HP0, shield: 0, ent: 0, maxEnt: 0, deck: newDeck(faction),
             hand: [], field: [], grave: [], cs: 0, fatigue: 0, turns: 0 };
  }
  function links(pl) { return Math.max(0, pl.field.length - 1); }
  function hasTaunt(pl) { return pl.field.some(u => u.taunt); }
  function hasStructure(pl) { return pl.field.some(u => u.structure); }
  function opp(side) { return side === "p" ? G.e : G.p; }
  function own(side) { return side === "p" ? G.p : G.e; }
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ---------- 遊戲流程 ----------
  function startGame() {
    G = { p: newPlayer("holo"), e: newPlayer("lqg"), cur: "p", over: false, winner: null };
    pending = null; busy = false;
    for (let i = 0; i < 4; i++) { draw(G.p, true); draw(G.e, true); }
    beginTurn("p");
  }

  function beginTurn(side) {
    const pl = own(side);
    pl.turns++;
    pl.maxEnt = Math.min(ENT_MAX, pl.turns);
    pl.ent = pl.maxEnt;
    // 招牌規則：回合開始時，護盾重算為糾纏連線數（面積 = 糾纏）
    pl.shield = links(pl);
    pl.field.forEach(u => { u.sick = false; u.can = u.atk > 0; });
    // Chern–Simons 手徵流：在持有者回合開始對敵本體放電
    if (pl.cs > 0 && !G.over) {
      pl.cs--;
      dmgHero(side === "p" ? "e" : "p", 2);
    }
    if (!G.over) draw(pl);
    render();
    if (G.over) return;
    if (side === "e") aiTurn();
    else maybeAutoEnd();   // 玩家回合一開始就無事可做（空手牌等）→ 自動讓 Rovelli 接手
  }

  function endTurn() {
    if (!G || G.over || busy) return;
    clearTimeout(autoEndT);
    pending = null;
    if (G.cur === "p") { G.cur = "e"; beginTurn("e"); }
    else { G.cur = "p"; beginTurn("p"); }
  }

  // 玩家這回合是否還有事可做（出得起的牌 / 可攻擊的單位）
  function playerHasMoves() {
    if (!G || G.cur !== "p") return false;
    if (G.p.hand.some(k => canPlay(G.p, k))) return true;
    if (G.p.field.some(u => u.can && !u.sick && u.atk > 0)) return true;
    return false;
  }
  // 丟完手牌、沒招可出時自動結束回合 → Rovelli 馬上接手（不必手動找「結束回合」鈕）
  let autoEndT = null;
  function maybeAutoEnd() {
    clearTimeout(autoEndT);
    if (!G || G.over || busy || pending || G.cur !== "p") return;
    if (playerHasMoves()) return;
    autoEndT = setTimeout(() => {
      if (G && !G.over && !busy && !pending && G.cur === "p" && !playerHasMoves()) endTurn();
    }, 750);
  }

  function draw(pl, silent) {
    if (pl.deck.length === 0) {
      // 牌庫耗盡 → 熵增疲勞：遞增傷害（教學：抽不到新資訊，熵照漲）
      pl.fatigue++;
      const side = pl === G.p ? "p" : "e";
      dmgHero(side, pl.fatigue, { noHappy: true });
      return;
    }
    const k = pl.deck.pop();
    if (pl.hand.length >= HAND_MAX) { pl.grave.push(k); return; } // 過載：被熵吃掉
    pl.hand.push(k);
  }

  // ---------- 傷害結算 ----------
  function dmgHero(side, n, o) {
    const pl = own(side);
    o = o || {};
    // 結構容錯（HaPPY 碼 / 普朗克離散）只擋「軟」傷害（法術 / 熵 = 噪聲），
    // 擋不住單位直接攻擊（邏輯算子照樣打進來）→ 所以清掉嘲諷後單位能穩定扣本體血。
    if (o.soft && hasStructure(pl) && n > 0) n = Math.max(0, n - 1);
    const absorbed = Math.min(pl.shield, n);
    pl.shield -= absorbed;
    pl.hp -= (n - absorbed);
    checkOver();
  }
  function dmgUnit(ownerSide, u, n, o) {
    o = o || {};
    if (u.immune && o.spell) return false;  // 拓撲免疫：法術 / 熵無效
    u.hp -= n;
    if (u.hp <= 0) killUnit(ownerSide, u);
    return true;
  }
  function killUnit(ownerSide, u) {
    const pl = own(ownerSide);
    const i = pl.field.indexOf(u);
    if (i >= 0) { pl.field.splice(i, 1); pl.grave.push(u.k); }
  }
  function checkOver() {
    if (G.over) return;
    if (G.p.hp <= 0 || G.e.hp <= 0) {
      G.over = true;
      G.winner = G.e.hp <= 0 && G.p.hp > 0 ? "p" : "e";
      G.p.hp = Math.max(0, G.p.hp); G.e.hp = Math.max(0, G.e.hp);
    }
  }

  // ---------- 出牌 ----------
  function canPlay(pl, k) {
    const d = DEFS[k];
    if (pl.ent < d.cost) return false;
    if (d.type === "unit" && pl.field.length >= FIELD_MAX) return false;
    // 重構類（JLMS 糾錯 / 大反彈）：棄牌堆要有牌且手牌未滿
    if (d.fx === "reconstruct" && (pl.grave.length === 0 || pl.hand.length >= HAND_MAX)) return false;
    return true;
  }

  // target: {unit} 或 {hero:true}（僅 energy 需要）
  function playCard(side, handIdx, target) {
    const pl = own(side), en = opp(side);
    const k = pl.hand[handIdx];
    const d = DEFS[k];
    if (!canPlay(pl, k)) return false;
    pl.hand.splice(handIdx, 1);
    pl.ent -= d.cost;

    const enSide = side === "p" ? "e" : "p";
    if (d.type === "unit") {
      const u = { k, atk: d.atk, hp: d.hp, maxhp: d.hp,
                  taunt: !!d.taunt, immune: !!d.immune, structure: !!d.structure,
                  sick: true, can: false, fresh: true };
      pl.field.push(u);
      // 縫合增益（空間 / 自旋網絡節點）：入場時若已有其他單位 → +1/+1
      if (d.fx === "buffIfAllies" && pl.field.length > 1) { u.atk++; u.hp++; u.maxhp++; }
    } else {
      switch (d.fx) {
        case "draw2":       // 模流推進 / 和樂圈：抽 2
          draw(pl); draw(pl); break;
        case "aoe2":        // 霍金輻射 / 自旋泡沫：敵全場 2 點衰減（軟傷害，免疫/結構可擋）
          en.field.slice().forEach(u => dmgUnit(enSide, u, 2, { spell: true }));
          dmgHero(enSide, 2, { soft: true });
          break;
        case "bolt4":       // 能量 / 哈密頓約束：指定目標 4 傷害（軟傷害）
          if (target && target.unit) dmgUnit(enSide, target.unit, 4, { spell: true });
          else dmgHero(enSide, 4, { soft: true });
          break;
        case "shieldUnits": // 面積=糾纏 / 面積量子化：護盾 +2×單位數
          pl.shield += 2 * pl.field.length; break;
        case "reconstruct": { // 糾錯重構 / 大反彈：棄牌堆隨機回手
          const gi = Math.floor(Math.random() * pl.grave.length);
          pl.hand.push(pl.grave.splice(gi, 1)[0]);
          break;
        }
        case "dot":         // 手徵流 / Immirzi 參數：接下來 3 個己方回合開始對敵本體 2 傷害
          pl.cs += 3; break;
      }
      pl.grave.push(k);
    }
    showTicker(side, k);
    checkOver();
    return true;
  }

  // ---------- 教學 ticker：出牌即解說（機制即教學的掛載點） ----------
  let tickerT = null;
  function showTicker(side, k) {
    if (!built) return;
    const g = gd();
    const el = stage.querySelector(".bt-ticker");
    if (!el) return;
    const who = side === "p" ? (g.you || "你") : (g.enemyName || g.enemy || "對手");
    // 有對應數學 modal 且非軟科普模式 → 給「展開數學細節」按鈕（沿用 details.js）
    const srcCard = document.querySelector('main .emerge[data-k="' + k + '"]');
    const canOpen = !!srcCard && srcCard.classList.contains("clickable") &&
                    !document.body.classList.contains("m-soft");
    el.innerHTML =
      '<div class="tk-head">' +
        '<span class="tk-who">' + who + '</span>' +
        '<span class="tk-name"><i data-lucide="' + DEFS[k].icon + '"></i>' + cardName(k) + '</span>' +
      '</div>' +
      '<div class="tk-flavor">' + (gcard(k).flavor || "") + '</div>' +
      (canOpen ? '<button class="tk-more" type="button">' + (g.learnMore || "→") + '</button>' : "");
    if (canOpen) {
      el.querySelector(".tk-more").addEventListener("click", ev => {
        ev.stopPropagation();
        srcCard.click();           // → details.js 既有金色 modal（z100 蓋過戰場）
      });
    }
    el.classList.add("show");
    if (window.lucide && lucide.createIcons) lucide.createIcons();
    clearTimeout(tickerT);
    tickerT = setTimeout(() => el.classList.remove("show"), 8000);
  }

  // ---------- 動畫（純 CSS class 觸發；尊重 reduced-motion） ----------
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function unitEl(side, unit) {
    const pl = own(side);
    const i = pl.field.indexOf(unit);
    if (i < 0) return null;
    return stage.querySelector((side === "p" ? ".bt-row-p" : ".bt-row-e") + " .bt-unit:nth-child(" + (i * 2 + 1) + ")");
  }
  function heroEl(side) { return stage.querySelector('.bt-hero[data-side="' + side + '"]'); }

  // 攻擊突刺：攻擊者朝目標位移再彈回，命中時目標抖動 + 飄傷害數字
  async function animAttack(side, attacker, target) {
    if (reduceMotion || !built) return;
    const aEl = unitEl(side, attacker);
    const tEl = target.unit ? unitEl(side === "p" ? "e" : "p", target.unit) : heroEl(side === "p" ? "e" : "p");
    if (!aEl || !tEl) return;
    const a = aEl.getBoundingClientRect(), t = tEl.getBoundingClientRect();
    const dx = (t.left + t.width / 2) - (a.left + a.width / 2);
    const dy = (t.top + t.height / 2) - (a.top + a.height / 2);
    aEl.style.transition = "transform .16s cubic-bezier(.5,0,.9,.5)";
    aEl.style.transform = "translate(" + (dx * 0.55) + "px," + (dy * 0.55) + "px) scale(1.08)";
    aEl.style.zIndex = "7";
    await sleep(165);
    tEl.classList.add("bt-hit");
    floatDmg(tEl, attacker.atk);
    if (target.unit && attacker.atk > 0 && target.unit.atk > 0) floatDmg(aEl, target.unit.atk);
    await sleep(150);
    aEl.style.transition = "transform .22s ease";
    aEl.style.transform = "";
    setTimeout(() => { tEl.classList.remove("bt-hit"); if (aEl) aEl.style.zIndex = ""; }, 320);
    await sleep(220);
  }
  function floatDmg(el, n) {
    if (!el || !n) return;
    const d = document.createElement("div");
    d.className = "bt-dmg";
    d.textContent = "-" + n;
    el.appendChild(d);
    setTimeout(() => d.remove(), 900);
  }

  // ---------- 出牌動畫：把手牌丟到牌桌中央 + 依類型展示特效 ----------
  // 特效類型（呼應 TCG 的攻擊 / 防禦 / 魔法 / 陷阱 + 召喚）：
  //   damage spell → attack；shield → defense；持續 dot → trap；
  //   抽牌 / 重構 → magic；單位入場 → 進攻型 summon、防禦型(嘲諷/結構/0攻) defense。
  function vfxOf(k) {
    const d = DEFS[k];
    if (d.type === "unit") return (d.taunt || d.structure || d.atk === 0) ? "defense" : "summon";
    switch (d.fx) {
      case "bolt4": case "aoe2": return "attack";
      case "shieldUnits": return "defense";
      case "dot": return "trap";
      default: return "magic";
    }
  }
  function boardCenter() {
    const b = stage.querySelector(".bt-board").getBoundingClientRect();
    return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
  }
  // 卡片從來源位置飛到牌桌中央（CSS transition；無來源或 reduced-motion 則略過）
  function flyCard(srcRect, k, faceUp) {
    return new Promise(resolve => {
      if (reduceMotion || !srcRect || srcRect.width === 0) { resolve(); return; }
      const c = boardCenter();
      const d = DEFS[k];
      const fly = document.createElement("div");
      fly.className = "bt-fly" + (faceUp ? "" : " back");
      if (faceUp) {
        fly.innerHTML =
          '<div class="bc-cost">' + d.cost + '</div>' +
          '<div class="bc-ico"><i data-lucide="' + d.icon + '"></i></div>' +
          '<div class="bc-name">' + cardName(k) + '</div>';
      }
      fly.style.left = srcRect.left + "px";
      fly.style.top = srcRect.top + "px";
      fly.style.width = srcRect.width + "px";
      fly.style.height = srcRect.height + "px";
      document.body.appendChild(fly);   // 掛在 body（非 #battle）才能蓋過 z60 選單
      if (window.lucide && lucide.createIcons) lucide.createIcons();
      const dx = c.x - (srcRect.left + srcRect.width / 2);
      const dy = c.y - (srcRect.top + srcRect.height / 2);
      void fly.offsetWidth; // 強制 reflow 讓 transition 生效
      fly.style.transform = "translate(" + dx + "px," + dy + "px) scale(1.25)";
      setTimeout(() => {
        fly.classList.add("land");
        setTimeout(() => fly.remove(), 200);
        resolve();
      }, 340);
    });
  }
  // 牌桌中央的類型特效爆裂（環 + 圖標 + 標籤）
  function spawnFx(k) {
    if (reduceMotion || !built) return;
    const g = gd(), v = vfxOf(k);
    const labels = { attack: g.vfxAttack, defense: g.vfxDefense, magic: g.vfxMagic, trap: g.vfxTrap, summon: g.vfxSummon };
    const fx = document.createElement("div");
    fx.className = "bt-fx fx-" + v;
    fx.innerHTML =
      '<span class="fx-ring"></span>' +
      '<span class="fx-core"><i data-lucide="' + DEFS[k].icon + '"></i></span>' +
      '<span class="fx-label">' + (labels[v] || "") + '</span>';
    stage.querySelector(".bt-board").appendChild(fx);
    if (window.lucide && lucide.createIcons) lucide.createIcons();
    setTimeout(() => fx.remove(), 820);
  }
  // 完整出牌動畫：抓來源 → 飛到中央 → 特效 → 傷害類閃目標 → 套用狀態
  async function animCast(side, handIdx, target) {
    const pl = own(side), k = pl.hand[handIdx];
    if (k == null) return;
    const d = DEFS[k], enSide = side === "p" ? "e" : "p";

    // 來源卡矩形（玩家＝手牌該張；對手＝牌背，手機隱藏則退回英雄）
    let srcRect = null;
    if (side === "p") {
      const el = stage.querySelectorAll(".bt-hand .bt-card")[handIdx];
      if (el) srcRect = el.getBoundingClientRect();
    } else {
      const backs = stage.querySelectorAll(".bt-ehand .bt-back");
      const el = backs[Math.min(handIdx, backs.length - 1)];
      let r = el ? el.getBoundingClientRect() : null;
      if (!r || r.width === 0) { const h = heroEl("e"); r = h ? h.getBoundingClientRect() : null; }
      srcRect = r;
    }

    // 先抓傷害類法術的目標 element（playCard 後 render 會重建）
    const hitEls = [];
    if (d.fx === "bolt4") {
      const tEl = target && target.unit ? unitEl(enSide, target.unit) : heroEl(enSide);
      if (tEl) hitEls.push([tEl, 4]);
    } else if (d.fx === "aoe2") {
      own(enSide).field.forEach(u => { if (!u.immune) { const el = unitEl(enSide, u); if (el) hitEls.push([el, 2]); } });
      const h = heroEl(enSide); if (h) hitEls.push([h, 2]);
    }

    await flyCard(srcRect, k, true);   // 出的牌一律正面飛出（看得到 Carl 選了哪張）
    spawnFx(k);
    hitEls.forEach(([el, n]) => {
      el.classList.add("bt-hit"); floatDmg(el, n);
      setTimeout(() => el.classList.remove("bt-hit"), 320);
    });
    await sleep(reduceMotion ? 0 : 200);
    playCard(side, handIdx, target);
  }
  // 玩家出牌入口：鎖輸入 → 動畫 → 解鎖重繪
  async function playerCast(handIdx, target) {
    if (busy || !G || G.over || G.cur !== "p") return;
    busy = true; pending = null; render();
    try { await animCast("p", handIdx, target); }
    finally { busy = false; render(); maybeAutoEnd(); }   // finally：動畫即使出錯也絕不卡死 busy
  }

  // ---------- 攻擊 ----------
  function validAttackTargets(side) {
    const en = opp(side);
    if (hasTaunt(en)) return { units: en.field.filter(u => u.taunt), hero: false };
    return { units: en.field.slice(), hero: true };
  }
  function attack(side, unit, target) {
    const enSide = side === "p" ? "e" : "p";
    unit.can = false;
    if (target.unit) {
      const t = target.unit;
      t.hp -= unit.atk;
      unit.hp -= t.atk;
      if (t.hp <= 0) killUnit(enSide, t);
      if (unit.hp <= 0) killUnit(side, unit);
    } else {
      dmgHero(enSide, unit.atk);
    }
    checkOver();
  }

  // ---------- AI（M1：貪婪出牌 + 嘲諷規則攻擊） ----------
  async function aiTurn() {
    busy = true; render();
    const e = G.e;
    try {
      await sleep(650);
      // 依優先序反覆出牌直到出不動
      let guard = 20;
      while (!G.over && guard-- > 0) {
        const k = aiPick();
        if (!k) break;
        const idx = e.hand.indexOf(k);
        let target = null;
        if (DEFS[k].needsTarget) target = aiBoltTarget();
        await animCast("e", idx, target);   // Rovelli 也把牌丟到中央 + 特效
        render();
        await sleep(reduceMotion ? 250 : 300);
      }
      // 攻擊（M3 強化）：斬殺優先 → 嘲諷必清 → 划算交換 → 否則打臉
      let aguard = 20;
      while (!G.over && aguard-- > 0) {
        const attackers = e.field.filter(u => u.can && !u.sick && u.atk > 0);
        if (!attackers.length) break;
        const tgt = aiChooseAttack(attackers);
        if (!tgt) break;
        await animAttack("e", tgt.attacker, tgt.target);
        attack("e", tgt.attacker, tgt.target);
        render();
        await sleep(420);
      }
    } finally {
      busy = false;
      // finally：即使 Rovelli 回合中動畫出錯，也一定把控制權交回玩家，不會卡死
      if (!G.over) endTurn(); else render();
    }
  }

  // 回傳 {attacker, target:{unit}|{}}；無合理攻擊回 null
  function aiChooseAttack(attackers) {
    const v = validAttackTargets("e");
    // 1) 斬殺：可用攻擊力總和 ≥ 玩家 hp+shield 且場上沒嘲諷 → 全部打臉
    if (v.hero) {
      const total = attackers.reduce((s, u) => s + u.atk, 0);
      if (total >= G.p.hp + G.p.shield) {
        return { attacker: attackers[0], target: {} };
      }
    }
    // 2) 嘲諷牆：必須先清；挑「能打死且自己活下來」最划算的攻擊者
    if (!v.hero && v.units.length) {
      const wall = v.units.slice().sort((a, b) => a.hp - b.hp)[0];
      const killer = attackers.find(u => u.atk >= wall.hp && u.hp > wall.atk) ||
                     attackers.find(u => u.atk >= wall.hp) || attackers[0];
      return { attacker: killer, target: { unit: wall } };
    }
    // 3) 划算交換：用攻擊者解掉「能殺死、且交換不虧」的敵方單位
    for (const u of attackers) {
      const trades = v.units
        .filter(t => u.atk >= t.hp && (u.hp > t.atk || t.atk >= 3))  // 殺得死且不血虧 / 對方威脅大
        .sort((a, b) => (b.atk + b.hp) - (a.atk + a.hp));
      if (trades.length) return { attacker: u, target: { unit: trades[0] } };
    }
    // 4) 否則打臉（沒嘲諷時）
    if (v.hero) return { attacker: attackers[0], target: {} };
    // 只能換不划算的牆
    if (v.units.length) return { attacker: attackers[0], target: { unit: v.units[0] } };
    return null;
  }
  // 反應式選牌：依玩家「場面威脅」而非卡名挑牌，holo / lqg 牌組共用同一套判斷
  // —— 這就是 Rovelli「根據你的出牌出對應的牌」的來源：你鋪場他清場、你逼臉他立牆。
  function aiPick() {
    const e = G.e, p = G.p;
    const can = k => canPlay(e, k);
    const byFx = fx => e.hand.find(k => DEFS[k].fx === fx && can(k));
    const byFlag = fl => e.hand.find(k => DEFS[k][fl] && can(k));
    const anyUnit = () => e.hand.filter(k => DEFS[k].type === "unit" && can(k))
                            .sort((a, b) => DEFS[b].cost - DEFS[a].cost)[0];  // 先打大的
    const playerAtk = p.field.reduce((s, u) => s + u.atk, 0); // 玩家全場攻擊力（下回合都可動）
    const lethalRisk = playerAtk >= e.hp + e.shield && !hasTaunt(e); // 玩家下回合可能斬殺

    // 1) 反應「斬殺威脅」：先立嘲諷牆（體積量子）或補盾（面積量子化）擋下
    if (lethalRisk) {
      const tk = byFlag("taunt"); if (tk) return tk;
      const sh = byFx("shieldUnits"); if (sh && e.field.length) return sh;
    }
    // 2) 反應「鋪場」：玩家場上 ≥2 單位 → 自旋泡沫 AoE 橫掃
    if (p.field.length >= 2) { const aoe = byFx("aoe2"); if (aoe) return aoe; }
    // 3) 反應「大單位」：攻≥4 或高血免疫 → 哈密頓約束定向移除
    const bigThreat = p.field.some(u => u.atk >= 4 || (u.immune && u.hp >= 3));
    if (bigThreat) { const bolt = byFx("bolt4"); if (bolt && aiBoltTarget().unit) return bolt; }
    // 4) 鋪場發展：免疫單位 > 嘲諷牆 > 一般單位
    const imm = byFlag("immune"); if (imm) return imm;
    const tk2 = byFlag("taunt"); if (tk2) return tk2;
    const u = anyUnit(); if (u) return u;
    // 5) 節奏：持續傷害 > 場面領先時補盾 > 缺牌時補牌 > 重構
    const dot = byFx("dot"); if (dot) return dot;
    const sh2 = byFx("shieldUnits"); if (sh2 && e.field.length >= 2) return sh2;
    const dr = byFx("draw2"); if (dr && e.hand.length <= 3) return dr;
    const rc = byFx("reconstruct"); if (rc) return rc;
    // 6) 無事可做 → bolt 打臉
    const b = byFx("bolt4"); if (b) return b;
    return null;
  }
  function aiBoltTarget() {
    // 斬殺 > 解掉可解的最大威脅 > 打臉
    if (G.p.hp + G.p.shield <= 4) return { hero: true };
    const killable = G.p.field.filter(u => !u.immune && u.hp <= 4);
    if (killable.length) {
      killable.sort((a, b) => b.atk - a.atk);
      if (killable[0].atk >= 2) return { unit: killable[0] };
    }
    return { hero: true };
  }

  // ---------- Carl Rovelli 的 Q 版粒子頭像（仿 spirit.js 的發光粒子 + 淡金連線手法）----------
  // 辨識特徵刻意和 Witten 區隔：滿頭波浪頭髮（非禿頂）、沒戴眼鏡、溫和微笑。viewBox 0 0 100 100。
  function rovelliSVG() {
    const dots = [], lines = [];
    const D = (x, y, s) => dots.push([+x.toFixed(1), +y.toFixed(1), s || 1]);
    const L = (a, b) => lines.push([+a[0].toFixed(1), +a[1].toFixed(1), +b[0].toFixed(1), +b[1].toFixed(1)]);
    const rad = d => d * Math.PI / 180;
    function arc(cx, cy, rx, ry, a0, a1, n, o) {
      o = o || {}; const pts = [];
      for (let i = 0; i < n; i++) {
        const t = a0 + (a1 - a0) * (n === 1 ? 0 : i / (n - 1));
        const x = cx + rx * Math.cos(rad(t)), y = cy + ry * Math.sin(rad(t));
        pts.push([x, y]); D(x, y, o.s);
      }
      if (o.link) { for (let i = 0; i < pts.length - 1; i++) L(pts[i], pts[i + 1]); if (o.close) L(pts[pts.length - 1], pts[0]); }
      return pts;
    }
    function seg(x1, y1, x2, y2, n, o) {
      o = o || {}; const pts = [];
      for (let i = 0; i < n; i++) { const t = n === 1 ? 0 : i / (n - 1); const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t; pts.push([x, y]); D(x, y, o.s); }
      if (o.link) for (let i = 0; i < pts.length - 1; i++) L(pts[i], pts[i + 1]);
      return pts;
    }
    arc(50, 55, 26, 28, 0, 360, 22, { link: true, close: true, s: 1 });   // 臉部輪廓
    arc(50, 52, 30, 31, 178, 362, 16, { s: 1.15 });                       // 滿頭頭髮（蓋過頭頂）
    arc(50, 49, 27, 28, 192, 348, 11, { s: 1.0 });                        // 頭髮厚度第二層
    arc(42, 39, 6, 5, 200, 340, 4, { s: .8, link: true });                // 左瀏海波浪
    arc(58, 39, 6, 5, 200, 340, 4, { s: .8, link: true });                // 右瀏海波浪
    seg(24, 50, 26, 63, 3, { s: 1 }); seg(76, 50, 74, 63, 3, { s: 1 });   // 兩側鬢髮
    seg(36, 47, 45, 46, 3, { s: .7 }); seg(55, 46, 64, 47, 3, { s: .7 });  // 眉
    D(42, 51, 1.6); D(58, 51, 1.6);                                       // 眼（無眼鏡，與 Witten 區隔）
    seg(50, 54, 50, 61, 2, { s: .7 });                                    // 鼻
    arc(50, 62, 11, 9, 30, 150, 7, { link: true, s: .9 });                // 微笑
    D(22, 56, 1.1); D(78, 56, 1.1);                                       // 耳
    const ln = lines.map(l => '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '"/>').join("");
    const dt = dots.map((d, i) =>
      '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + (1.5 * d[2]).toFixed(2) +
      '" style="--d:' + ((i % 11) * 0.27).toFixed(2) + 's"/>').join("");
    return '<svg class="rovelli-fig" viewBox="0 0 100 100" aria-hidden="true">' +
      '<g class="rf-lines">' + ln + '</g><g class="rf-dots">' + dt + '</g></svg>';
  }

  // ---------- DOM ----------
  function build() {
    stage = document.createElement("div");
    stage.id = "battle";
    stage.innerHTML =
      '<button class="bt-exit" type="button" aria-label="exit">✕</button>' +
      '<div class="bt-side bt-enemy">' +
        '<div class="bt-hero" data-side="e"></div>' +
        '<div class="bt-ehand"></div>' +
      '</div>' +
      '<div class="bt-board">' +
        '<div class="bt-row bt-row-e"></div>' +
        '<div class="bt-mid">' +
          '<div class="bt-turn"></div>' +
          '<button class="bt-end" type="button"></button>' +
          '<button class="bt-advisor" type="button" aria-label="advisor">💡</button>' +
          '<button class="bt-help" type="button" aria-label="rules">?</button>' +
          '<div class="bt-endhint"></div>' +
        '</div>' +
        '<div class="bt-row bt-row-p"></div>' +
      '</div>' +
      '<div class="bt-side bt-player">' +
        '<div class="bt-hero" data-side="p"></div>' +
        '<div class="bt-hand"></div>' +
      '</div>' +
      '<div class="bt-ticker" role="status" aria-live="polite"></div>' +
      '<div class="bt-coach" role="status" aria-live="polite"></div>' +
      '<div class="bt-hintbar"></div>' +
      '<div class="bt-result"></div>';
    document.body.appendChild(stage);

    stage.querySelector(".bt-exit").addEventListener("click", exitGame);
    stage.querySelector(".bt-end").addEventListener("click", endTurn);
    stage.querySelector(".bt-help").addEventListener("click", () => showRules());
    stage.querySelector(".bt-advisor").addEventListener("click", () => setAdvisor(!advisor));

    // 抽鬼牌式「抬牌」：滑鼠或手指滑過手牌時，指到的那張比其他牌高一截。
    // 用 pointermove + elementFromPoint 對滑鼠與觸控統一處理（手機可滑著看）。
    const handEl = stage.querySelector(".bt-hand");
    const liftAt = (x, y) => {
      const hit = document.elementFromPoint(x, y);
      const card = hit && hit.closest && hit.closest(".bt-card");
      handEl.querySelectorAll(".bt-card.lift").forEach(c => { if (c !== card) c.classList.remove("lift"); });
      if (card && handEl.contains(card)) card.classList.add("lift");
    };
    const clearLift = () => handEl.querySelectorAll(".bt-card.lift").forEach(c => c.classList.remove("lift"));
    handEl.addEventListener("pointermove", e => liftAt(e.clientX, e.clientY));
    handEl.addEventListener("pointerdown", e => liftAt(e.clientX, e.clientY));
    handEl.addEventListener("pointerleave", clearLift);
    handEl.addEventListener("pointercancel", clearLift);
    // 點空白處取消選取
    stage.addEventListener("click", e => {
      if (e.target === stage || e.target.classList.contains("bt-board")) cancelPending();
    });
    addEventListener("keydown", e => {
      if (!active) return;
      const modalOpen = !!document.querySelector("#modal-overlay.show");
      if (modalOpen) return;
      if (e.key === "Escape") {
        if (pending) { cancelPending(); }
        else exitGame();
      }
    }, true);
    built = true;
  }

  function exitGame() {
    if (window.WittenView) window.WittenView.set("scroll");
  }
  function cancelPending() { pending = null; render(); }

  // ---------- 規則說明（第一次進對戰自動彈、之後可由 ? 鈕重開） ----------
  const RULES_KEY = "witten-battle-rules-seen";
  let rulesSeenMem = false;
  function rulesSeen() {
    if (rulesSeenMem) return true;
    try { return localStorage.getItem(RULES_KEY) === "1"; } catch (e) { return false; }
  }
  function markRulesSeen() {
    rulesSeenMem = true;
    try { localStorage.setItem(RULES_KEY, "1"); } catch (e) {}
  }
  // 顯示規則卡；關閉時記住「已看過」，之後不再自動彈（仍可由 ? 鈕重開）
  function showRules() {
    const r = gd().rules || {};
    const old = document.getElementById("bt-rules");
    if (old) old.remove();
    const ov = document.createElement("div");
    ov.id = "bt-rules"; ov.className = "bt-rules";
    const items = (r.items || []).map(it =>
      '<li><i data-lucide="' + (it.icon || "dot") + '"></i><span>' + (it.text || "") + '</span></li>').join("");
    ov.innerHTML =
      '<div class="brp-panel">' +
        '<div class="brp-title">' + (r.title || "How to play") + '</div>' +
        '<div class="brp-intro">' + (r.intro || "") + '</div>' +
        '<ul class="brp-list">' + items + '</ul>' +
        '<button class="brp-start" type="button">' + (r.start || "Start") + '</button>' +
      '</div>';
    document.body.appendChild(ov);
    if (window.lucide && lucide.createIcons) lucide.createIcons();
    const close = () => { ov.remove(); markRulesSeen(); };
    ov.querySelector(".brp-start").addEventListener("click", close);
    ov.addEventListener("click", e => { if (e.target === ov) close(); }); // 點背景關閉
  }

  // ---------- 即時教練：建議下一步該做什麼（可開關） ----------
  const ADVISOR_KEY = "witten-battle-advisor";
  let advisor = readAdvisor();
  let curAdvice = null;   // 每次 render 重算，給 renderHand / renderRow / coach banner 用
  function readAdvisor() {
    try { const v = localStorage.getItem(ADVISOR_KEY); if (v === "off") return false; if (v === "on") return true; } catch (e) {}
    return true; // 預設開啟（玩家剛上手、需要幫助）
  }
  function setAdvisor(on) {
    advisor = on;
    try { localStorage.setItem(ADVISOR_KEY, on ? "on" : "off"); } catch (e) {}
    render();
  }
  // 回傳 { kind, handIdx?, targetUnit?, reason }；kind: play / attackFace / attackTaunt / end
  function advise() {
    if (!G || G.over || G.cur !== "p" || busy) return null;
    const me = G.p, foe = G.e, a = (gd().advice) || {};
    const playable = me.hand.map((k, i) => ({ k, i })).filter(o => canPlay(me, o.k));
    const find = pred => playable.find(o => pred(DEFS[o.k], o.k));
    const readyAtk = me.field.filter(u => u.can && !u.sick && u.atk > 0);
    const atkSum = readyAtk.reduce((s, u) => s + u.atk, 0);
    const bestAtk = readyAtk.slice().sort((x, y) => y.atk - x.atk)[0]; // 建議先點的攻擊單位（攻擊力最高）
    const foeTaunt = hasTaunt(foe);
    const bolt = find(d => d.fx === "bolt4");

    // 1) 斬殺：沒嘲諷且攻擊力（+bolt）足以打死 Carl
    if (!foeTaunt && atkSum > 0 && atkSum >= foe.hp + foe.shield)
      return { kind: "attackFace", attackerUnit: bestAtk, reason: a.lethal };
    if (!foeTaunt && bolt && atkSum + 4 >= foe.hp + foe.shield && foe.hp + foe.shield <= 4)
      return { kind: "play", handIdx: bolt.i, reason: a.lethalBolt };
    // 2) 嘲諷牆擋路：bolt 轟掉，或叫玩家用單位先清（明確指出點哪個單位、打哪個牆）
    if (foeTaunt) {
      const wall = foe.field.filter(u => u.taunt).sort((x, y) => x.hp - y.hp)[0];
      if (bolt && wall && wall.hp <= 4) return { kind: "play", handIdx: bolt.i, targetUnit: wall, reason: a.clearTaunt };
      if (readyAtk.length) return { kind: "attackTaunt", attackerUnit: bestAtk, targetUnit: wall, reason: a.attackTaunt };
    }
    // 3) 解掉 Carl 的大單位
    const threat = foe.field.filter(u => !u.immune && u.atk >= 3).sort((x, y) => y.atk - x.atk)[0];
    if (threat && bolt) return { kind: "play", handIdx: bolt.i, targetUnit: threat, reason: a.removeThreat };
    // 4) 鋪場：先打大單位（建立攻擊力 + 糾纏連線護盾）
    const unit = playable.filter(o => DEFS[o.k].type === "unit").sort((x, y) => DEFS[y.k].cost - DEFS[x.k].cost)[0];
    if (unit) {
      const d = DEFS[unit.k];
      const reason = d.taunt ? a.playTaunt : d.immune ? a.playImmune : d.structure ? a.playStruct : a.develop;
      return { kind: "play", handIdx: unit.i, reason };
    }
    // 5) 節奏：缺牌補抽 → 持續傷害 → 清場 → 補盾 → 重構
    const draw = find(d => d.fx === "draw2"); if (draw && me.hand.length <= 4) return { kind: "play", handIdx: draw.i, reason: a.draw };
    const dot = find(d => d.fx === "dot"); if (dot) return { kind: "play", handIdx: dot.i, reason: a.dot };
    const aoe = find(d => d.fx === "aoe2"); if (aoe && foe.field.length >= 2) return { kind: "play", handIdx: aoe.i, reason: a.aoe };
    const sh = find(d => d.fx === "shieldUnits"); if (sh && me.field.length >= 2) return { kind: "play", handIdx: sh.i, reason: a.shield };
    const rc = find(d => d.fx === "reconstruct"); if (rc) return { kind: "play", handIdx: rc.i, reason: a.reconstruct };
    // 6) 還能打臉就打臉
    if (readyAtk.length && !foeTaunt) return { kind: "attackFace", attackerUnit: bestAtk, reason: a.attackFace };
    // 7) 任何能出的牌
    if (playable.length) return { kind: "play", handIdx: playable[0].i, reason: a.play };
    // 8) 沒事可做 → 結束回合
    return { kind: "end", reason: a.end };
  }

  // ---------- 渲染 ----------
  function render() {
    if (!built || !G) return;
    const g = gd();
    curAdvice = advisor ? advise() : null;
    renderHero("p"); renderHero("e");
    renderRow("p"); renderRow("e");
    renderHand(); renderEnemyHand();

    // 回合指示 + 結束回合鈕
    const turnEl = stage.querySelector(".bt-turn");
    turnEl.textContent = G.cur === "p" ? (g.yourTurn || "你的回合") : (g.enemyTurn || "對手回合");
    turnEl.classList.toggle("enemy", G.cur !== "p");
    const endBtn = stage.querySelector(".bt-end");
    endBtn.textContent = g.endTurn || "結束回合";
    endBtn.disabled = G.cur !== "p" || busy || G.over;
    // 沒招可出時讓「結束回合」鈕脈動，提示回合即將自動交給 Rovelli
    endBtn.classList.toggle("idle", G.cur === "p" && !busy && !G.over && !pending && !playerHasMoves());

    // 出牌用光時明確提示玩家結束回合（不依賴教練開關，永遠顯示）
    const endhint = stage.querySelector(".bt-endhint");
    if (endhint) {
      const myTurn = G.cur === "p" && !busy && !G.over && !pending;
      const noCards = myTurn && !G.p.hand.some(k => canPlay(G.p, k));
      const hasAtk = G.p.field.some(u => u.can && !u.sick && u.atk > 0);
      const txt = !noCards ? "" : (hasAtk ? (g.endHintAttack || "") : (g.endHintNone || ""));
      endhint.textContent = txt;
      endhint.classList.toggle("show", !!txt);
    }

    // 教練開關鈕狀態 + 教練橫幅（出牌建議由手牌氣泡顯示；攻擊/結束建議顯示在橫幅）
    const advBtn = stage.querySelector(".bt-advisor");
    if (advBtn) { advBtn.classList.toggle("on", advisor); advBtn.title = advisor ? (g.advisorOn || "") : (g.advisorOff || ""); }
    const coach = stage.querySelector(".bt-coach");
    if (coach) {
      const showBanner = advisor && curAdvice && curAdvice.kind !== "play" && !!curAdvice.reason;
      coach.textContent = showBanner ? ("💡 " + curAdvice.reason) : "";
      coach.classList.toggle("show", showBanner);
    }

    stage.querySelector(".bt-hintbar").textContent = g.hint || "";
    renderResult();
    if (window.lucide && lucide.createIcons) lucide.createIcons();
  }

  function entCrystals(pl) {
    let s = "";
    for (let i = 0; i < pl.maxEnt; i++) s += '<span class="ec' + (i < pl.ent ? " on" : "") + '"></span>';
    return s;
  }

  function renderHero(side) {
    const g = gd(), pl = own(side);
    const el = stage.querySelector('.bt-hero[data-side="' + side + '"]');
    const name = side === "p" ? (g.you || "你") : (g.enemyName || g.enemy || "對手");
    const sub = side === "p" ? (g.youFaction || "") : (g.enemyFaction || "");
    el.innerHTML =
      '<div class="bh-portrait' + (side === "e" ? " bh-rovelli" : "") + '">' +
        (side === "p" ? '<i data-lucide="user-round"></i>' : rovelliSVG()) +
      '</div>' +
      '<div class="bh-info">' +
        '<div class="bh-name">' + name + (sub ? '<span class="bh-faction">' + sub + '</span>' : "") + '</div>' +
        '<div class="bh-stats">' +
          '<span class="bh-hp" title="' + (g.integrity || "") + '"><i data-lucide="heart-pulse"></i>' + pl.hp + '</span>' +
          (pl.shield > 0 ? '<span class="bh-shield"><i data-lucide="shield"></i>' + pl.shield + '</span>' : "") +
          (pl.cs > 0 ? '<span class="bh-cs"><i data-lucide="waves"></i>' + pl.cs + '</span>' : "") +
          '<span class="bh-deck"><i data-lucide="layers"></i>' + pl.deck.length + '</span>' +
        '</div>' +
        '<div class="bh-ent">' + entCrystals(pl) + '</div>' +
      '</div>';
    // 本體作為攻擊 / 法術目標
    el.classList.toggle("targetable", isHeroTargetable(side));
    // 教練建議攻擊本體、且玩家已選好攻擊單位 → 讓 Carl 頭像發光（第二步該點這）
    const adviseHero = advisor && curAdvice && side === "e" && pending && pending.kind === "attack" &&
                       curAdvice.kind === "attackFace" && validAttackTargets("p").hero;
    el.classList.toggle("advise", !!adviseHero);
    el.onclick = () => onHeroClick(side);
  }

  function isHeroTargetable(side) {
    if (!pending || G.cur !== "p" || side !== "e") return false;
    if (pending.kind === "spell") return true;            // energy 可打臉
    if (pending.kind === "attack") return validAttackTargets("p").hero;
    return false;
  }
  function onHeroClick(side) {
    if (!pending || side !== "e" || busy || G.over) return;
    if (pending.kind === "spell") {
      const idx = pending.idx; pending = null;
      playerCast(idx, { hero: true });
    } else if (pending.kind === "attack" && validAttackTargets("p").hero) {
      const u = G.p.field[pending.i];
      pending = null;
      if (u) doPlayerAttack(u, {});
      else render();
    }
  }

  async function doPlayerAttack(attacker, target) {
    busy = true; render();
    try { await animAttack("p", attacker, target); attack("p", attacker, target); }
    finally { busy = false; render(); maybeAutoEnd(); }
  }

  function badge(cls, txt) { return '<span class="bu-badge ' + cls + '">' + txt + '</span>'; }

  function renderRow(side) {
    const g = gd(), pl = own(side);
    const row = stage.querySelector(side === "p" ? ".bt-row-p" : ".bt-row-e");
    row.innerHTML = "";
    pl.field.forEach((u, i) => {
      const el = document.createElement("div");
      el.className = "bt-unit";
      el.dataset.k = u.k;
      if (u.taunt) el.classList.add("is-taunt");
      if (u.immune) el.classList.add("is-immune");
      if (u.structure) el.classList.add("is-structure");
      if (u.sick) el.classList.add("is-sick");
      if (u.fresh) { el.classList.add("bt-enter"); u.fresh = false; }
      const ready = side === "p" && G.cur === "p" && u.can && !u.sick && u.atk > 0 && !busy && !G.over;
      if (ready) el.classList.add("ready");
      if (pending && pending.kind === "attack" && side === "p" && pending.i === i) el.classList.add("selected");
      // 教練建議的發光指引：
      //  · 還沒選單位時 → 讓「該點的己方攻擊單位」發光（第一步）
      //  · 已選單位(pending attack)時 → 讓「該打的敵方目標」發光（第二步）
      //  · 指定法術(pending spell)時 → 讓「該指定的敵方目標」發光
      if (advisor && curAdvice) {
        const atkAdvice = curAdvice.kind === "attackFace" || curAdvice.kind === "attackTaunt";
        if (!pending && side === "p" && ready && atkAdvice && curAdvice.attackerUnit === u) el.classList.add("advise");
        if (side === "e" && curAdvice.targetUnit === u) {
          const spellOk = pending && pending.kind === "spell" && !u.immune;
          const atkOk = pending && pending.kind === "attack" && validAttackTargets("p").units.includes(u);
          if (spellOk || atkOk) el.classList.add("advise");
        }
      }
      el.innerHTML =
        '<div class="bu-ico"><i data-lucide="' + DEFS[u.k].icon + '"></i></div>' +
        '<div class="bu-name">' + cardName(u.k) + '</div>' +
        '<div class="bu-badges">' +
          (u.taunt ? badge("b-taunt", g.taunt || "嘲諷") : "") +
          (u.immune ? badge("b-immune", g.immune || "拓撲") : "") +
          (u.sick ? badge("b-sick", g.sick || "凝聚中") : "") +
        '</div>' +
        '<div class="bu-stats"><span class="bu-atk">' + u.atk + '</span><span class="bu-hp' +
          (u.hp < u.maxhp ? " hurt" : "") + '">' + u.hp + '</span></div>';

      // 敵方單位作為目標
      if (side === "e" && pending && G.cur === "p") {
        const v = validAttackTargets("p");
        const spellOk = pending.kind === "spell" && !u.immune;
        const atkOk = pending.kind === "attack" && v.units.includes(u);
        if (spellOk || atkOk) el.classList.add("targetable");
      }
      el.addEventListener("click", ev => { ev.stopPropagation(); onUnitClick(side, i); });
      // 糾纏連線：相鄰單位之間的金色連線（回合開始化作護盾 = 面積=糾纏）
      if (i > 0) {
        const link = document.createElement("div");
        link.className = "bt-link";
        link.title = g.linkTip || "";
        row.appendChild(link);
      }
      row.appendChild(el);
    });
  }

  function onUnitClick(side, i) {
    if (!G || G.over || busy || G.cur !== "p") return;
    const pl = own(side), u = pl.field[i];
    if (!u) return;
    if (side === "p") {
      // 選取自己的單位準備攻擊
      if (u.can && !u.sick && u.atk > 0) {
        pending = (pending && pending.kind === "attack" && pending.i === i) ? null : { kind: "attack", i };
        render();
      }
    } else {
      if (!pending) return;
      if (pending.kind === "spell") {
        if (u.immune) return;   // 拓撲免疫：不可被法術指定
        const idx = pending.idx; pending = null;
        playerCast(idx, { unit: u });
      } else if (pending.kind === "attack") {
        const v = validAttackTargets("p");
        if (!v.units.includes(u)) return;
        const a = G.p.field[pending.i];
        pending = null;
        if (a) doPlayerAttack(a, { unit: u });
        else render();
      }
    }
  }

  function renderHand() {
    const g = gd();
    const hand = stage.querySelector(".bt-hand");
    hand.innerHTML = "";
    const n = G.p.hand.length;
    G.p.hand.forEach((k, i) => {
      const d = DEFS[k];
      const el = document.createElement("div");
      el.className = "bt-card";
      el.dataset.k = k;
      el.style.setProperty("--fi", (i - (n - 1) / 2).toFixed(2));
      const playable = G.cur === "p" && !busy && !G.over && canPlay(G.p, k);
      if (playable) el.classList.add("playable");
      if (pending && pending.kind === "spell" && pending.idx === i) el.classList.add("selected");
      // 教練建議出這張 → 發光 + 上方提示氣泡
      const advised = curAdvice && curAdvice.kind === "play" && curAdvice.handIdx === i && playable;
      if (advised) el.classList.add("advise");
      const typeTxt = d.type === "unit"
        ? (d.structure ? (g.typeStruct || "結構") : (g.typeUnit || "單位"))
        : (g.typeSpell || "法術");
      el.innerHTML =
        (advised ? '<div class="bc-tip">💡 ' + (curAdvice.reason || "") + '</div>' : "") +
        '<div class="bc-cost">' + d.cost + '</div>' +
        '<div class="bc-ico"><i data-lucide="' + d.icon + '"></i></div>' +
        '<div class="bc-name">' + cardName(k) + '</div>' +
        '<div class="bc-text">' + (gcard(k).text || "") + '</div>' +
        '<div class="bc-foot">' +
          '<span class="bc-type">' + typeTxt + '</span>' +
          (d.type === "unit" ? '<span class="bc-stats">' + d.atk + " / " + d.hp + '</span>' : "") +
        '</div>';
      el.addEventListener("click", ev => { ev.stopPropagation(); onHandClick(i); });
      hand.appendChild(el);
    });
  }

  function onHandClick(i) {
    if (!G || G.over || busy || G.cur !== "p") return;
    const k = G.p.hand[i];
    if (!canPlay(G.p, k)) return;
    if (DEFS[k].needsTarget) {
      // 進入指定目標模式（再點一次取消）
      pending = (pending && pending.kind === "spell" && pending.idx === i) ? null : { kind: "spell", idx: i };
      render();
    } else {
      playerCast(i, null);   // 丟到牌桌中央 + 類型特效
    }
  }

  function renderEnemyHand() {
    const eh = stage.querySelector(".bt-ehand");
    eh.innerHTML = "";
    const n = G.e.hand.length;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      el.className = "bt-back";
      el.style.setProperty("--fi", (i - (n - 1) / 2).toFixed(2));
      eh.appendChild(el);
    }
  }

  function renderResult() {
    const g = gd();
    const el = stage.querySelector(".bt-result");
    if (!G.over) { el.classList.remove("show"); el.innerHTML = ""; return; }
    const win = G.winner === "p";
    // 結算附一句 Witten 名言（沿用 spirit 字典；無則略）
    const qs = (dict().spirit && dict().spirit.quotes) || [];
    const q = qs.length ? qs[G.p.turns % qs.length] : null;
    el.innerHTML =
      '<div class="br-box">' +
        '<div class="br-title">' + (win ? (g.win || "Win") : (g.lose || "Lose")) + '</div>' +
        '<div class="br-sub">' + (win ? (g.winSub || "") : (g.loseSub || "")) + '</div>' +
        (q ? '<blockquote class="br-quote">“' + q.text + '”<cite>— ' + (q.attr || "") + '</cite></blockquote>' : "") +
        '<div class="br-actions">' +
          '<button class="br-restart" type="button">' + (g.restart || "Restart") + '</button>' +
          '<button class="br-exit" type="button">' + (g.exitGame || "Exit") + '</button>' +
        '</div>' +
      '</div>';
    el.classList.add("show");
    el.querySelector(".br-restart").addEventListener("click", () => { startGame(); });
    el.querySelector(".br-exit").addEventListener("click", exitGame);
  }

  // ---------- 視圖切換接線 ----------
  function enter() {
    if (!built) build();
    if (!G) startGame();
    document.body.classList.add("v-battle");
    active = true;
    render();
    if (!rulesSeen()) showRules();   // 第一次進對戰自動彈規則說明
  }
  function leave() {
    document.body.classList.remove("v-battle");
    active = false;
    // 清掉掛在 body 上的出牌殘影與規則卡
    document.querySelectorAll(".bt-fly, #bt-rules").forEach(el => el.remove());
  }
  document.addEventListener("view:change", e => {
    if (e.detail && e.detail.view === "battle") enter(); else leave();
  });

  // 語言 / 深度切換 → 重渲染文案（規則卡若開著也跟著換語言）
  document.addEventListener("i18n:rendered", () => {
    if (built && active) render();
    if (document.getElementById("bt-rules")) showRules();
  });
})();
