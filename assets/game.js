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
  const DEFS = {
    time:   { cost: 1, type: "spell", icon: "hourglass" },
    space:  { cost: 2, type: "unit", atk: 2, hp: 3, icon: "globe" },
    heat:   { cost: 3, type: "spell", icon: "flame" },
    energy: { cost: 2, type: "spell", needsTarget: true, icon: "zap" },
    mass:   { cost: 3, type: "unit", atk: 1, hp: 6, taunt: true, icon: "target" },
    rt:     { cost: 2, type: "spell", icon: "spline" },
    jlms:   { cost: 2, type: "spell", icon: "shield" },
    tqft:   { cost: 4, type: "unit", atk: 3, hp: 3, immune: true, icon: "infinity" },
    happy:  { cost: 4, type: "unit", atk: 0, hp: 7, structure: true, icon: "hexagon" },
    cs:     { cost: 3, type: "spell", icon: "waves" },
  };
  const KEYS = Object.keys(DEFS);
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
  function cardName(k) {
    const c = (dict().card || {})[k];
    return (c && c.title) || k;
  }
  function gcard(k) { return (gd().cards || {})[k] || {}; }
  function fmt(s, vars) {
    return String(s || "").replace(/\{(\w+)\}/g, (m, key) => (vars && key in vars) ? vars[key] : m);
  }

  // ---------- 遊戲狀態 ----------
  let G = null;            // { p, e, cur, over, winner }
  let stage = null, built = false, active = false, busy = false;
  let pending = null;      // {kind:'spell', idx} | {kind:'attack', i}

  function newDeck() {
    const d = [];
    KEYS.forEach(k => { for (let i = 0; i < COPIES; i++) d.push(k); });
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }
  function newPlayer() {
    return { hp: HP0, shield: 0, ent: 0, maxEnt: 0, deck: newDeck(),
             hand: [], field: [], grave: [], cs: 0, fatigue: 0, turns: 0 };
  }
  function links(pl) { return Math.max(0, pl.field.length - 1); }
  function hasTaunt(pl) { return pl.field.some(u => u.taunt); }
  function hasHappy(pl) { return pl.field.some(u => u.k === "happy"); }
  function opp(side) { return side === "p" ? G.e : G.p; }
  function own(side) { return side === "p" ? G.p : G.e; }
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ---------- 遊戲流程 ----------
  function startGame() {
    G = { p: newPlayer(), e: newPlayer(), cur: "p", over: false, winner: null };
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
  }

  function endTurn() {
    if (!G || G.over || busy) return;
    pending = null;
    if (G.cur === "p") { G.cur = "e"; beginTurn("e"); }
    else { G.cur = "p"; beginTurn("p"); }
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
    // HaPPY 容錯：本體受傷 -1
    if (!o.noHappy && hasHappy(pl) && n > 0) n = Math.max(0, n - 1);
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
    if (k === "jlms" && (pl.grave.length === 0 || pl.hand.length >= HAND_MAX)) return false;
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

    if (d.type === "unit") {
      const u = { k, atk: d.atk, hp: d.hp, maxhp: d.hp,
                  taunt: !!d.taunt, immune: !!d.immune, structure: !!d.structure,
                  sick: true, can: false };
      pl.field.push(u);
      // 空間：入場時若已有其他單位 → 糾纏增強 +1/+1（單位死亡時才進棄牌堆）
      if (k === "space" && pl.field.length > 1) { u.atk++; u.hp++; u.maxhp++; }
    } else {
      switch (k) {
        case "time":   // 模流推進：抽 2
          draw(pl); draw(pl); break;
        case "heat":   // 霍金輻射：敵全場 2 點熵衰減（拓撲免疫擋法術）
          en.field.slice().forEach(u => dmgUnit(side === "p" ? "e" : "p", u, 2, { spell: true }));
          dmgHero(side === "p" ? "e" : "p", 2);
          break;
        case "energy": // 指定目標 4 傷害
          if (target && target.unit) dmgUnit(side === "p" ? "e" : "p", target.unit, 4, { spell: true });
          else dmgHero(side === "p" ? "e" : "p", 4);
          break;
        case "rt":     // 面積=糾纏：護盾 +2×單位數
          pl.shield += 2 * pl.field.length; break;
        case "jlms": { // 糾錯重構：棄牌堆隨機回手
          const gi = Math.floor(Math.random() * pl.grave.length);
          pl.hand.push(pl.grave.splice(gi, 1)[0]);
          break;
        }
        case "cs":     // 手徵流：接下來 3 個己方回合開始對敵本體 2 傷害
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
    const who = side === "p" ? (g.you || "你") : (g.enemy || "對手");
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
    await sleep(650);
    const e = G.e;
    // 依優先序反覆出牌直到出不動
    let guard = 20;
    while (!G.over && guard-- > 0) {
      const k = aiPick();
      if (!k) break;
      const idx = e.hand.indexOf(k);
      let target = null;
      if (k === "energy") target = aiEnergyTarget();
      playCard("e", idx, target);
      render();
      await sleep(700);
    }
    // 攻擊：遵守嘲諷；其餘打臉（M3 強化交換判斷）
    for (const u of e.field.slice()) {
      if (G.over) break;
      if (!u.can || u.sick || u.atk === 0) continue;
      const v = validAttackTargets("e");
      if (v.units.length && !v.hero) attack("e", u, { unit: v.units[0] });
      else attack("e", u, {});
      render();
      await sleep(520);
    }
    busy = false;
    if (!G.over) endTurn(); else render();
  }
  function aiPick() {
    const e = G.e;
    const can = k => e.hand.includes(k) && canPlay(e, k);
    if (can("mass") && !hasTaunt(e)) return "mass";
    if (can("tqft")) return "tqft";
    if (can("space")) return "space";
    if (can("energy") && aiEnergyTarget()) return "energy";
    if (can("heat") && G.p.field.length >= 2) return "heat";
    if (can("happy")) return "happy";
    if (can("cs")) return "cs";
    if (can("rt") && e.field.length >= 2) return "rt";
    if (can("time") && e.hand.length <= 3) return "time";
    if (can("jlms")) return "jlms";
    if (can("mass")) return "mass";
    return null;
  }
  function aiEnergyTarget() {
    // 斬殺 > 解掉可解的最大威脅 > 打臉
    if (G.p.hp + G.p.shield <= 4) return { hero: true };
    const killable = G.p.field.filter(u => !u.immune && u.hp <= 4);
    if (killable.length) {
      killable.sort((a, b) => b.atk - a.atk);
      if (killable[0].atk >= 2) return { unit: killable[0] };
    }
    return { hero: true };
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
        '</div>' +
        '<div class="bt-row bt-row-p"></div>' +
      '</div>' +
      '<div class="bt-side bt-player">' +
        '<div class="bt-hero" data-side="p"></div>' +
        '<div class="bt-hand"></div>' +
      '</div>' +
      '<div class="bt-ticker" role="status" aria-live="polite"></div>' +
      '<div class="bt-hintbar"></div>' +
      '<div class="bt-result"></div>';
    document.body.appendChild(stage);

    stage.querySelector(".bt-exit").addEventListener("click", exitGame);
    stage.querySelector(".bt-end").addEventListener("click", endTurn);
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

  // ---------- 渲染 ----------
  function render() {
    if (!built || !G) return;
    const g = gd();
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
    const name = side === "p" ? (g.you || "你") : (g.enemy || "對手");
    el.innerHTML =
      '<div class="bh-portrait"><i data-lucide="' + (side === "p" ? "user-round" : "bot") + '"></i></div>' +
      '<div class="bh-info">' +
        '<div class="bh-name">' + name + '</div>' +
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
      playCard("p", pending.idx, { hero: true });
      pending = null; render();
    } else if (pending.kind === "attack" && validAttackTargets("p").hero) {
      const u = G.p.field[pending.i];
      if (u) attack("p", u, {});
      pending = null; render();
    }
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
      const ready = side === "p" && G.cur === "p" && u.can && !u.sick && u.atk > 0 && !busy && !G.over;
      if (ready) el.classList.add("ready");
      if (pending && pending.kind === "attack" && side === "p" && pending.i === i) el.classList.add("selected");
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
        playCard("p", pending.idx, { unit: u });
        pending = null; render();
      } else if (pending.kind === "attack") {
        const v = validAttackTargets("p");
        if (!v.units.includes(u)) return;
        const a = G.p.field[pending.i];
        if (a) attack("p", a, { unit: u });
        pending = null; render();
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
      const typeTxt = d.type === "unit"
        ? (d.structure ? (g.typeStruct || "結構") : (g.typeUnit || "單位"))
        : (g.typeSpell || "法術");
      el.innerHTML =
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
      pending = null;
      playCard("p", i, null);
      render();
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
    el.innerHTML =
      '<div class="br-box">' +
        '<div class="br-title">' + (win ? (g.win || "Win") : (g.lose || "Lose")) + '</div>' +
        '<div class="br-sub">' + (win ? (g.winSub || "") : (g.loseSub || "")) + '</div>' +
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
  }
  function leave() {
    document.body.classList.remove("v-battle");
    active = false;
  }
  document.addEventListener("view:change", e => {
    if (e.detail && e.detail.view === "battle") enter(); else leave();
  });

  // 語言 / 深度切換 → 重渲染文案
  document.addEventListener("i18n:rendered", () => { if (built && active) render(); });
})();
