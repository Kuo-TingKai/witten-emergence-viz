// ============================================================
// Content dictionary · English
// Structure mirrors zh-Hant.js. HTML tags and $...$ / $$...$$ math
// are language-independent and kept verbatim.
// ============================================================
window.I18N = window.I18N || {};
window.I18N["en"] = {
  meta: { name: "English", htmlLang: "en", dir: "ltr" },

  ui: {
    depthLabel: "Level",
    langLabel: "Language",
    viewLabel: "View",
    viewScroll: "Scroll",
    viewShowcase: "Gallery",
    viewBattle: "Battle",
    scHint: "Drag · arrow keys · wheel to rotate · click the center card for the math",
    pro: "Expert", hard: "Science", soft: "Plain",
    scrollCue: "Scroll for the derivation ↓",
    expandHint: "Tap to expand the math →",
    modalClose: "close",
    refsTitle: "References",
    footer: "Visualization · Type III von Neumann Algebras & Emergent Spacetime · compiled from Witten et al. 2022–2025"
  },

  // Floating "Witten spirit" + quotes (read by spirit.js; all sourced, verbatim)
  spirit: {
    label: "Spirit",
    on: "On", off: "Off",
    aria: "Spirit of Edward Witten",
    quotes: [
      { text: "It is very possible that a proper understanding of string theory will make the space-time continuum melt away.", attr: "E. Witten · NYT Magazine, 1987" },
      { text: "String theory is a miracle through and through.", attr: "E. Witten · NYT Magazine, 1987" },
      { text: "I don't think any physicist would have been clever enough to invent string theory on purpose. Luckily, it was invented by accident.", attr: "E. Witten · NYT Magazine, 1987" },
      { text: "String theory is extremely attractive because gravity is forced upon us.", attr: "E. Witten · Kaku, Hyperspace, 1995" },
      { text: "The equations that really work in describing nature with the most generality and the greatest simplicity are very elegant and subtle.", attr: "E. Witten · NOVA, 2003" }
    ]
  },

  // Concept-battle mode (read by game.js) — card names reuse card.<k>.title
  game: {
    you: "You", enemy: "Opponent",
    youFaction: "Holographic entanglement · It from Qubit",
    enemyName: "Carlo Rovelli", enemyFaction: "Loop Quantum Gravity · LQG",
    integrity: "Spacetime integrity",
    shield: "Entanglement shield",
    endTurn: "End turn",
    yourTurn: "Your turn",
    enemyTurn: "Rovelli’s turn",
    win: "Spacetime rebuilt",
    lose: "Your spacetime dissolved",
    winSub: "You stitched back, with entanglement, the spacetime Rovelli tried to resolve into a spin network — two quantum-gravity programs collided at the table, and holography won this round. Every card you played is a real physical mechanism.",
    loseSub: "Rovelli’s spin foam resolved your geometry back into a discrete lattice. Entanglement severed, spacetime scattered into sand — try a different strategy and stitch it back.",
    restart: "Play again",
    exitGame: "Leave battle",
    learnMore: "Expand the math →",
    taunt: "Taunt", immune: "Topo", sick: "Condensing",
    linkTip: "Entanglement link: becomes your hero’s shield at the start of your turn (area = entanglement)",
    typeUnit: "Unit", typeSpell: "Spell", typeStruct: "Structure",
    hint: "Click a card to play it · click your unit then a target to attack · shield at turn start = entanglement links between adjacent units (area = entanglement)",
    cards: {
      time:   { text: "Draw 2 cards.", flavor: "Time isn’t a backdrop — it’s modular flow moving forward on its own, and your information grows with it." },
      space:  { text: "On play, if you already control a unit, gain +1/+1.", flavor: "Space is stitched out of entanglement: more nodes, tighter weave." },
      heat:   { text: "Deal 2 entropy damage to all enemy units and the enemy hero.", flavor: "Information hidden behind a horizon returns to you as heat — Hawking radiation." },
      energy: { text: "Deal 4 damage to any target.", flavor: "Energy is how strongly spacetime resists being changed." },
      mass:   { text: "Taunt: enemies must attack it first.", flavor: "Energy tied into a knot dents spacetime — that’s mass." },
      rt:     { text: "Gain shield = 2 × the number of units you control.", flavor: "Area = entanglement entropy: more entanglement, bigger geometric barrier (RT formula)." },
      jlms:   { text: "Reconstruct a random card from your discard pile back to your hand.", flavor: "Local damage is fine — an error-correcting code reconstructs from what remains (JLMS)." },
      tqft:   { text: "Topological immunity: unaffected by spells and entropy; can only be attacked by units.", flavor: "A topological operator is invariant under deformation — a logical qubit immune to local noise." },
      happy:  { text: "Structure: damage to your hero is reduced by 1.", flavor: "The HaPPY tensor network: fault tolerance is how the universe stores its save file." },
      cs:     { text: "At the start of your next 3 turns, deal 2 damage to the enemy hero. Cannot be removed.", flavor: "A chiral current under topological protection: one-way flow that can’t be disrupted (Chern–Simons)." },
      // ---- Carlo Rovelli’s Loop Quantum Gravity deck ----
      lqg_holonomy:    { name: "Holonomy", text: "Draw 2 cards.", flavor: "Parallel-transport around a closed loop and what you read off is the loop variable — the namesake of Loop Quantum Gravity." },
      lqg_node:        { name: "Spin-network node", text: "On play, if you already control a unit, gain +1/+1.", flavor: "The quantum of space: nodes carry volume, links carry area — the denser the network, the heavier the geometry." },
      lqg_foam:        { name: "Spin foam", text: "Deal 2 damage to all enemy units and the enemy hero.", flavor: "A sum over all spacetime histories — spin foam is LQG’s path integral, sweeping the whole board in one stroke." },
      lqg_hamiltonian: { name: "Hamiltonian constraint", text: "Deal 4 damage to any target.", flavor: "It forces geometry to evolve by the dynamics — the constraint equation slammed onto a single target." },
      lqg_volume:      { name: "Volume quantum", text: "Taunt: enemies must attack it first.", flavor: "Volume eigenvalues are discrete; a quantized chunk of volume blocks the path — get past it first." },
      lqg_area:        { name: "Area quantization", text: "Gain shield = 2 × the number of units you control.", flavor: "Area takes only discrete eigenvalues √(j(j+1)) — quantized area piles up into a geometric barrier." },
      lqg_bounce:      { name: "Big Bounce", text: "Reconstruct a random card from your discard pile back to your hand.", flavor: "Loop quantum cosmology replaces the Big Bang singularity with a bounce — what got crushed comes back from the other side." },
      lqg_diffeo:      { name: "Diffeomorphism invariance", text: "Topological immunity: unaffected by spells and decay; can only be attacked by units.", flavor: "Physics only sees gauge-equivalence classes — what’s invariant under any change of coordinates, a spell can’t touch." },
      lqg_planck:      { name: "Planck discreteness", text: "Structure: damage to your hero is reduced by 1.", flavor: "There is a minimum length; spacetime is discrete at the Planck scale — damage can’t cut below the floor." },
      lqg_immirzi:     { name: "Immirzi parameter γ", text: "At the start of your next 3 turns, deal 2 damage to the enemy hero. Cannot be removed.", flavor: "γ fixes the scale of the area gap — quanta of Planck area press in, one unit at a time." }
    }
  },

  hero: {
    eyebrow: "Witten et al. · 2022–2025 · Quantum Gravity × Operator Algebras",
    h1: 'Out of <span class="grad">one observer’s algebra</span><br/>emerge time, space, heat, and mass',
    lede: {
      pro: 'Spacetime and geometry are not fundamental; they are the macroscopic projection of a <strong>local observer’s algebraic structure</strong> together with its <strong>information limits</strong>. This is the research programme Edward Witten and collaborators have been developing where von Neumann algebras meet holography — <span class="mono">It from Bit</span>.',
      hard: 'We usually treat time and space as a stage on which matter performs. Here the idea is reversed: start by asking <strong>“what can a single observer actually measure”</strong>, and time, space, heat and mass all turn out to grow out of that information. This is how Witten and others have recently re-read gravity through operator algebras — <span class="mono">It from Bit</span>.',
      soft: 'We tend to take time and space for granted, as the backdrop to everything. But a number of physicists now argue they aren’t the bottom layer of the world at all — they <strong>emerge from “information.”</strong> This page walks you through that idea with as little math as possible.'
    },
    eq: '$$\\text{local algebra of an observer}\\ (\\textbf{It}) \\;\\xrightarrow{\\;\\text{information limits}\\;(\\textbf{Bit})\\;}\\; \\{\\,\\text{time},\\ \\text{space},\\ \\text{heat},\\ \\text{energy},\\ \\text{mass}\\,\\}$$'
  },

  s01: {
    h2: {
      pro: "Local information limits · Type III₁ algebras",
      hard: "Why you can’t cleanly cut out “the information in one region”",
      soft: "Step 1: you can only see a small patch of the universe"
    },
    left: {
      pro: '<p>Ordinary quantum mechanics assumes the Hilbert space factorizes, which gives a partial trace and a density matrix:</p><div class="eqbox">$$\\mathcal{H}=\\mathcal{H}_A\\otimes\\mathcal{H}_B,\\qquad S=-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$$</div><p>But in relativistic QFT the <strong>Reeh–Schlieder theorem</strong> tells us the vacuum carries <strong>infinite UV entanglement</strong> across any spatial boundary. What a local observer can access is a <span class="tag t3">Type III₁</span> von Neumann algebra — one with no trace and no local density matrix.</p>',
      hard: '<p>In ordinary quantum mechanics you can split a system in two, describe “here” and “there” separately, and compute the disorder (entropy) of each. That relies on this factorization:</p><div class="eqbox">$$\\mathcal{H}=\\mathcal{H}_A\\otimes\\mathcal{H}_B,\\qquad S=-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$$</div><p>Put relativity and quantum field theory together, though, and things change. The <strong>Reeh–Schlieder theorem</strong> says the vacuum is densely entangled across any dividing line, with no upper bound. The upshot: you can’t cleanly describe just “this patch.” Mathematically this algebra is called <span class="tag t3">Type III₁</span>, and the trouble is that even the “disorder” has no finite value.</p>',
      soft: '<p>Picture the universe as one seamless sheet of fabric. You try to cut out a piece to study on its own, but the threads at the cut are entangled infinitely densely — no matter how you cut, the edge always trails endless loose threads. Physicists found that when you are just one observer inside the universe, the patch you can grasp is exactly this kind of “can’t-cut-cleanly” region.</p>'
    },
    aside: {
      pro: '<h3>The key features of Type III</h3><ul><li><i data-lucide="x" class="li-x"></i> No trace</li><li><i data-lucide="x" class="li-x"></i> No local density matrix $\\rho_A$</li><li><i data-lucide="alert-triangle" class="li-warn"></i> The entanglement entropy of a single region is mathematically <strong>undefined</strong> (effectively infinite)</li></ul><p class="fine">Observers outside a black hole, or inside a de Sitter static patch, are screened by a horizon and can only access the observables of a Type III algebra.</p>',
      hard: '<h3>Where this algebra gives trouble</h3><ul><li><i data-lucide="x" class="li-x"></i> No normalizable “total” (no trace)</li><li><i data-lucide="x" class="li-x"></i> No state matrix for the region on its own</li><li><i data-lucide="alert-triangle" class="li-warn"></i> Ask for the region’s entanglement entropy and the answer is <strong>infinite</strong>, not a number</li></ul><p class="fine">Outside a black hole, or behind the horizon an accelerating observer sees, you are in exactly this situation — a horizon blocks the information.</p>',
      soft: '<h3>What’s wrong with this patch</h3><ul><li><i data-lucide="x" class="li-x"></i> You can’t compute how “disordered” it is (the answer is infinite)</li><li><i data-lucide="x" class="li-x"></i> You can’t write its full state from the patch alone</li><li><i data-lucide="alert-triangle" class="li-warn"></i> Try to talk about “this patch” by itself and the math jams</li></ul><p class="fine">Someone outside a black hole, or any observer behind a horizon, is stuck in exactly this spot.</p>'
    }
  },

  s02: {
    h2: {
      pro: "The algebra transition · perturbative gravity flips the “trace” switch",
      hard: "Once you add gravity, “disorder” becomes computable again",
      soft: "Step 2: add gravity, and the infinity gets tamed"
    },
    lede: {
      pro: 'When Newton’s constant $G_N>0$ (the $1/N$ perturbation in holography) is switched on, gravity <strong>geometrically dresses</strong> the observer’s Hamiltonian. Imposing the gravitational constraint (diffeomorphism invariance) on the algebra is, mathematically, a <strong>crossed product</strong> — so Type III drops to Type II, and the trace and density matrix reappear.',
      hard: 'The key turn is “switching gravity on.” Once the gravitational strength is nonzero, the observer’s energy is no longer an isolated number — it must be counted together with the curvature it imprints on spacetime. Folding that constraint into the algebra is an operation called the <strong>crossed product</strong>. Afterward, the disorder that was uncomputable becomes a finite, comparable quantity again.',
      soft: 'Here’s the turn: simply bringing gravity in tames that pesky infinity. The reason is that with gravity, when you ask “how disordered is this patch,” the question automatically comes with a reference point (the observer’s own clock and energy). The infinity cancels against that reference, leaving a clean number.'
    },
    flow: '<div class="node n3"><div class="ntype">Type III₁</div><div class="ndesc">no trace · no $\\rho$<br/>entropy diverges</div></div><div class="arrow"><div class="arrow-line"><span class="pulse"></span></div><div class="arrow-label">⊗ Crossed Product<br/><span class="mono">+ G<sub>N</sub> / 1/N</span></div></div><div class="branch"><div class="node n2"><div class="ntype">Type II∞</div><div class="ndesc">black-hole exterior<br/>trace returns ✓</div></div><div class="node n2 alt"><div class="ntype">Type II₁</div><div class="ndesc">de Sitter spacetime<br/>trace returns ✓</div></div></div>',
    hl: {
      pro: '<h3>Trace returns → generalized entropy</h3><p>With a trace, you can define a normalized algebraic entanglement entropy. Witten showed it is exactly the black hole’s <strong>generalized entropy</strong>:</p><div class="eqbox big">$$S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>Macroscopic black-hole thermodynamics, Hawking radiation and thermal effects are, at bottom, the <strong>algebraic price</strong> the observer pays when the information once screened by Type III crosses over into Type II.</p>',
      hard: '<h3>The disorder is back — and it’s exactly the black hole’s entropy</h3><p>This finite disorder that reappears comes out to be, no more and no less, the <strong>generalized entropy</strong> long known in black-hole physics:</p><div class="eqbox big">$$S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>That is, the horizon area over four, plus the entropy of the matter outside. In other words, a black hole radiates and has a temperature (Hawking radiation) precisely because, once the observer includes gravity, there is an information price to pay for “not seeing behind the horizon.”</p>',
      soft: '<h3>And that number is exactly the black hole’s entropy</h3><p>The lovely part: this number has been seen before — it is exactly the entropy of a black hole, namely one quarter of its surface area. A black hole glows and radiates (Hawking radiation) for one reason: you can’t see behind its horizon, and that “can’t see” is itself a kind of disorder — a price to be paid.</p>'
    }
  },

  s03: {
    h2: {
      pro: "Four emergences + mass · macroscopic physics = algebraic information flow",
      hard: "How time, space, heat, energy and mass each appear, one by one",
      soft: "Step 3: five things, all grown from information"
    }
  },

  s04: {
    h2: {
      pro: "The holographic QEC ladder · boundary information weaving bulk geometry and topology",
      hard: "The same thing, retold in the language of “error-correcting codes”",
      soft: "Step 4: the universe is like an error-proof code"
    },
    lede: {
      pro: 'Earlier, von Neumann algebras gave us entanglement-wedge reconstruction (see the “Space” card above). The same story, retold in the language of <strong>quantum error-correcting codes (QEC)</strong>, runs all the way up to topology. Three rungs pair the <strong>“information side”</strong> (boundary / CFT / QEC) with the <strong>“geometry side”</strong> (bulk / TQFT), rising in abstraction — <span class="mono">metric → locality → topology</span>. The striking part: geometric “area” and “topology” equal the information-theoretic “entropy” and “code subspace.”',
      hard: 'The same thing can be viewed once more through <strong>quantum error-correcting codes</strong>. A code is this kind of thing: store information cleverly spread out, and even if part is destroyed you can fully recover it. In the three rows below, the left is the information/coding concept and the right is the geometry/spacetime concept, paired one to one; each row is more abstract than the last — from length, to position, to shape.',
      soft: 'When engineers store important data they use “error-correcting codes”: spread the data out smartly so that even if part is lost, it can be recovered. It turns out the spacetime inside the universe looks just like the result of storing the boundary’s information with such a code. In the three rows below, the left says how information is stored, the right says what kind of space it produces.'
    },
    ladder: '<div class="flow"><div class="node n-info"><div class="ntype">entanglement entropy $S(A)$</div><div class="ndesc">$-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$<br/>pure information</div></div><div class="arrow"><div class="arrow-line"><span class="pulse"></span></div><div class="arrow-label">RT formula<br/><span class="mono">= Area / 4G_N</span></div></div><div class="node n-geo"><div class="ntype">minimal-surface area</div><div class="ndesc">$\\mathrm{Area}(\\gamma_A)$<br/>geometry · metric</div></div></div><div class="flow"><div class="node n-info"><div class="ntype">erasure-proof code</div><div class="ndesc">$P_{\\text{code}}=VV^\\dagger$<br/>code subspace</div></div><div class="arrow"><div class="arrow-line"><span class="pulse"></span></div><div class="arrow-label">JLMS / ADH<br/><span class="mono">entanglement wedge</span></div></div><div class="node n-geo"><div class="ntype">subregion reconstruction</div><div class="ndesc">bulk operators recovered<br/>geometry · locality</div></div></div><div class="flow"><div class="node n-info"><div class="ntype">logical operator</div><div class="ndesc">immune to local noise<br/>logical operator</div></div><div class="arrow"><div class="arrow-line"><span class="pulse"></span></div><div class="arrow-label">TQFT functor<br/><span class="mono">V: Bord→Vec</span></div></div><div class="node n-geo"><div class="ntype">topological invariant</div><div class="ndesc">Wilson loop<br/>geometry · topology</div></div></div>'
  },

  s05: {
    h2: {
      pro: "Overview · macroscopic concept ⇄ algebraic origin",
      hard: "Overview · macroscopic concept ⇄ algebraic origin",
      soft: "One table: where each thing comes from"
    },
    table: {
      pro: '<thead><tr><th>Macroscopic concept</th><th>Underlying algebraic &amp; quantum-information origin</th></tr></thead><tbody><tr><td><span class="ico"><i data-lucide="hourglass"></i></span> Time $(t)$</td><td>The modular flow intrinsic to a Type III algebra</td></tr><tr><td><span class="ico"><i data-lucide="globe"></i></span> Space (geometry)</td><td>Inclusion/commutation of subalgebras and the entanglement network</td></tr><tr><td><span class="ico"><i data-lucide="flame"></i></span> Heat (entropy)</td><td>The algebraic trace recovered as Type III → Type II under perturbative gravity</td></tr><tr><td><span class="ico"><i data-lucide="zap"></i></span> Energy $(E)$</td><td>The geometric resistance when microscopic entanglement is perturbed (modular Hamiltonian)</td></tr><tr><td><span class="ico"><i data-lucide="target"></i></span> Mass $(m)$</td><td>Condensation of Type II degrees of freedom at a spacetime boundary (Nambu–Goto string tension)</td></tr></tbody>',
      soft: '<thead><tr><th>What we know</th><th>Where it really comes from</th></tr></thead><tbody><tr><td><span class="ico"><i data-lucide="hourglass"></i></span> Time</td><td>The rhythm a system walks out for itself to stay balanced</td></tr><tr><td><span class="ico"><i data-lucide="globe"></i></span> Space</td><td>Entanglement strength: tighter bonds, closer; cut, and it tears</td></tr><tr><td><span class="ico"><i data-lucide="flame"></i></span> Heat</td><td>The information blocked behind a horizon that you can’t see</td></tr><tr><td><span class="ico"><i data-lucide="zap"></i></span> Energy</td><td>How hard spacetime resists being changed</td></tr><tr><td><span class="ico"><i data-lucide="target"></i></span> Mass</td><td>Energy crammed into one place, tied up by itself</td></tr></tbody>'
    },
    closing: {
      pro: 'We need not assume a universe that already has time, space and mass. Starting only from “the local algebra an observer can observe (<span class="mono">It</span>),” gravity, time, heat and mass all emerge naturally as the macroscopic projection of information (<span class="mono">Bit</span>) under its limits. It is a lead toward unification worth taking seriously.',
      hard: 'The point is that the order is reversed: not spacetime first, with physics dropped in, but “the information an observer can grasp” first, out of which time, space, heat and mass grow one by one from the limits of that information. <span class="mono">It</span> (the algebra) is constrained by <span class="mono">Bit</span> (information limits), and the macroscopic world emerges.',
      soft: 'The whole story is really one sentence: don’t assume the universe comes with time, space and weight to begin with. Start from “what one observer can know,” and these things appear by themselves, one by one. Time, space, heat and mass are all shadows left behind once information is constrained.'
    }
  },

  card: {
    time: {
      title: "Time",
      body: {
        pro: '<div class="esrc">Modular flow</div><p>A Type III algebra has no objective time of its own. But given a local state $\\omega$, <strong>Tomita–Takesaki theory</strong> uniquely fixes a one-parameter automorphism group:</p><div class="eqbox">$$\\sigma_t^{\\omega}(A)=\\Delta^{it}\\,A\\,\\Delta^{-it}$$</div><p>Macroscopically, the parameter $t$ is precisely the observer’s <strong>proper time</strong>. The passage of time is the algebra’s spontaneous evolution to maintain statistical equilibrium (the Connes–Rovelli thermal-time hypothesis).</p>',
        hard: '<div class="esrc">A clock built into the algebra</div><p>The algebra carries no time by itself. But the moment you fix a state (say, the system sitting in some equilibrium), a unique “direction of evolution” appears automatically:</p><div class="eqbox">$$\\sigma_t^{\\omega}(A)=\\Delta^{it}\\,A\\,\\Delta^{-it}$$</div><p>The parameter along that direction, measured macroscopically, is the time on your watch. Time isn’t given in advance — the system defines it itself in order to stay in equilibrium.</p>',
        soft: '<div class="esrc">A clock hidden inside the information</div><p>At bottom, the world has no “time” at all. But as soon as a system settles into some state, the math automatically points out a “forward” direction — and that is the time we feel. In other words, time isn’t the universe’s background clock; it’s the rhythm things walk out for themselves in order to stay balanced.</p>'
      }
    },
    space: {
      title: "Space",
      body: {
        pro: '<div class="esrc">Subalgebra inclusion · entanglement network</div><p>A spatial region $U$ ↔ a boundary operator subalgebra $\\mathcal{A}(U)$. Near/far, size and containment ↔ inclusion and commutation of subalgebras:</p><div class="eqbox">$$A\\subset B \\;\\Longleftrightarrow\\; \\mathcal{A}(A)\\subset\\mathcal{A}(B)$$</div><p><strong>Entanglement-wedge reconstruction</strong>: stronger entanglement means smaller macroscopic distance; when the entropy hits zero, the spatial structure tears apart.</p>',
        hard: '<div class="esrc">Who contains whom</div><p>Each spatial region corresponds to a set of observables. Which is bigger, which contains which, is read off from whether the corresponding sets are nested and can be measured together:</p><div class="eqbox">$$A\\subset B \\;\\Longleftrightarrow\\; \\mathcal{A}(A)\\subset\\mathcal{A}(B)$$</div><p>“Distance” is set by how strong the entanglement is: more entanglement, closer points; once entanglement drops to zero, space splits open right there.</p>',
        soft: '<div class="esrc">Near and far, glued by entanglement</div><p>“Far” and “near” in space are really entanglement strength talking. The more tightly two places are entangled, the closer they are; once the entanglement is cut, the space between them tears open too. Space isn’t a pre-laid grid — it’s the result of entanglement stitching everywhere together.</p>'
      }
    },
    heat: {
      title: "Heat (entropy)",
      body: {
        pro: '<div class="esrc">The trace effect of Type III → Type II</div><p>The trace that reappears in the algebra transition under perturbative gravity makes the once horizon-screened information manifest as entropy:</p><div class="eqbox">$$S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>Hawking temperature and black-hole thermodynamics are the macroscopic face of this algebraic price.</p>',
        hard: '<div class="esrc">Blocked information becomes entropy</div><p>That finite disorder that reappeared is exactly the entropy of thermodynamics:</p><div class="eqbox">$$S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>The horizon keeps some information out of reach — you can’t compute it or control it — and that accumulated “uncertainty” shows up as temperature and entropy. A black hole’s Hawking temperature is exactly this.</p>',
        soft: '<div class="esrc">The part you can’t see becomes heat</div><p>Any information blocked behind a horizon, that you can’t see, comes back to you as “heat.” A black hole has a temperature and slowly evaporates precisely because a huge amount of information you’ll never see is hidden behind its horizon. Heat is just another name for “can’t see.”</p>'
      }
    },
    energy: {
      title: "Energy",
      body: {
        pro: '<div class="esrc">Modular Hamiltonian perturbation · geometric resistance</div><p>The modular Hamiltonian $K$ generates the algebra’s intrinsic time flow (in a Rindler wedge it is the boost energy). Perturb an entangled state:</p><div class="eqbox">$$\\Delta S=\\Delta\\langle K\\rangle$$</div><p>In AdS/CFT this matches the area change of the <strong>Ryu–Takayanagi minimal surface</strong> — the “stiffness” of macroscopic geometry against entanglement perturbations is energy.</p>',
        hard: '<div class="esrc">How hard geometry resists change</div><p>Try to change a region’s entanglement a little and geometry pushes back — like a spring you have to pull. That resistance equals the change in entanglement times an operator that generates time flow:</p><div class="eqbox">$$\\Delta S=\\Delta\\langle K\\rangle$$</div><p>Put differently: energy measures “how reluctant spacetime is to be changed by you.” In AdS/CFT it corresponds to the area change of the Ryu–Takayanagi surface.</p>',
        soft: '<div class="esrc">Spacetime’s reluctance to be pushed</div><p>Try to change the state of a place and spacetime fights back, just like a spring pushes back when you press it. That push-back is what we call energy. Energy isn’t some fuel stored inside things — it’s spacetime’s “temper” when it resists being changed.</p>'
      }
    },
    mass: {
      title: "Mass",
      body: {
        pro: '<div class="esrc">Energy concentration · the face of Nambu–Goto string vibration</div><p>Mass is condensed local energy ($E=mc^2$). When energy piles up in macroscopic spacetime to form a defect, the motion of strings/branes is governed by the <strong>Nambu–Goto action</strong>. At the algebraic level this means a large number of Type II degrees of freedom are “compactified/condensed” at a particular spacetime boundary (string tension, atomic mass), measured by the observer as rest mass.</p>',
        hard: '<div class="esrc">What happens when energy piles up</div><p>Mass is energy crammed into one place ($E=mc^2$). When energy is highly concentrated somewhere and presses a dent into spacetime, the huge pile of underlying degrees of freedom gets “tied down” there. How tightly it’s tied, measured macroscopically, is the rest mass; in the language of string theory this is the string’s tension (Nambu–Goto action).</p>',
        soft: '<div class="esrc">A knot tied in energy</div><p>Mass is really just “knotted-up energy.” When energy is packed densely enough in one spot, it gets stuck there and can’t escape — and that’s when we say the spot “has mass.” A particle’s weight is, at heart, a clump of energy tied up by itself.</p>'
      }
    },
    rt: {
      title: "Area = entanglement",
      body: {
        pro: '<div class="esrc">Ryu–Takayanagi · the geometric bridge</div><p class="puzzle">Why is space connected, rather than scattered like loose sand?</p><div class="eqbox">$$S(A)=\\frac{\\text{Area}(\\gamma_A)}{4G_N}$$</div><p>The von Neumann entanglement entropy of a boundary region $A$ equals the geometric area of the interior minimal surface $\\gamma_A$. Entanglement to zero → area to zero → spacetime disconnects. The continuity of space is set by entanglement.</p>',
        hard: '<div class="esrc">Area just is entanglement</div><p class="puzzle">Why is space connected, rather than scattered like loose sand?</p><div class="eqbox">$$S(A)=\\frac{\\text{Area}(\\gamma_A)}{4G_N}$$</div><p>The entanglement of a boundary region is exactly the area of the “minimal membrane” it corresponds to inside. More entanglement, bigger membrane, connected space; entanglement to zero, the membrane shrinks to nothing and space disconnects. Space is continuous because it is still entangled everywhere.</p>',
        soft: '<div class="esrc">The tighter the bond, the closer they are</div><p class="puzzle">Why is space connected, rather than scattered like loose sand?</p><p>How “connected” two places are is decided by how deeply they’re entangled. Deep entanglement, tightly connected space; cut the entanglement, and that stretch of space tears open. The universe is one continuous sheet rather than loose sand only because these invisible entanglements stitch it together.</p>'
      }
    },
    jlms: {
      title: "Reconstruction = error correction",
      body: {
        pro: '<div class="esrc">JLMS / ADH · subregion duality</div><p class="puzzle">The complement is wiped out, yet the interior can still be fully recovered?</p><div class="eqbox">$$\\hat H_{\\text{mod}}^{\\partial}=\\frac{\\hat{\\text{Area}}(\\gamma_A)}{4G_N}+\\hat H_{\\text{mod}}^{\\text{bulk}}$$</div><p>A bulk spacetime point lying inside the entanglement wedge is “encrypted” into the boundary region $A$. Even if the complement is severely corrupted by noise (an erasure error), it can be fully recovered from the operators of $A$ alone. The bulk is an erasure-proof code subspace.</p>',
        hard: '<div class="esrc">Reconstruction is error correction</div><p class="puzzle">The complement is wiped out, yet the interior can still be fully recovered?</p><div class="eqbox">$$\\hat H_{\\text{mod}}^{\\partial}=\\frac{\\hat{\\text{Area}}(\\gamma_A)}{4G_N}+\\hat H_{\\text{mod}}^{\\text{bulk}}$$</div><p>A spacetime point inside has its information encrypted and spread across a whole patch of boundary. So even if the other half of the boundary is destroyed by noise, you can still recover that point in full from the half that remains. The interior of spacetime is a deletion-proof error-correcting code.</p>',
        soft: '<div class="esrc">Lose half, still recover all</div><p class="puzzle">The complement is wiped out, yet the interior can still be fully recovered?</p><p>A spot in the interior doesn’t keep its information in one place — it scatters and encrypts it across a wide stretch of boundary. So even if half the boundary is destroyed, the remaining half is enough to recover it completely. That is exactly what error-correcting codes do best — and the interior of the universe is stored this way by nature.</p>'
      }
    },
    tqft: {
      title: "Topology = logical operator",
      body: {
        pro: '<div class="esrc">TQFT · low-energy limit · Chern–Simons</div><p class="puzzle">No matter how you tug or deform the operator, the measurement doesn’t change — why?</p><div class="eqbox">$$\\dim V(\\Sigma)=Z(\\Sigma\\times S^1)$$</div><p>Push bulk gravity to the low-energy limit and the metric dynamics freeze, leaving a purely topological term (Chern–Simons). A Wilson loop on it is a topological operator whose value is unchanged by deformation — exactly the hallmark of a QEC logical operator: immune to local noise. TQFT says “unchanged because topological,” QEC says “error-free because logical,” and the functor $V:\\text{Bord}\\to\\text{Vec}$ makes the two statements correspond mathematically.</p>',
        hard: '<div class="esrc">Topology just is a logical operator</div><p class="puzzle">No matter how you tug or deform the operator, the measurement doesn’t change — why?</p><div class="eqbox">$$\\dim V(\\Sigma)=Z(\\Sigma\\times S^1)$$</div><p>Push gravity to its lowest-energy limit and the details of length and curvature all freeze, leaving only “shape”-level information (topology). The observables at this level don’t change however you stretch or deform them — the very same thing as the “immune to local noise” logical bit in an error-correcting code. One side says “unchanged because it’s topological,” the other “error-free because it’s a logical bit”; mathematically they’re the same statement.</p>',
        soft: '<div class="esrc">The thing that doesn’t change however you knead it</div><p class="puzzle">No matter how you tug or deform the operator, the measurement doesn’t change — why?</p><p>Some things don’t change no matter how you knead or pull them — for instance the hole in the middle of a doughnut; squeeze it however you like and it’s still one hole. The deepest layer of the universe has this same “unchanged however you knead it” quality — which is exactly what a good error-correcting code looks like: however the local parts are disturbed, the key information never goes wrong.</p>'
      }
    },
    happy: {
      title: "HaPPY pentagon code",
      body: {
        pro: '<div class="esrc">Pastawski–Yoshida–Harlow–Preskill</div><p>A discrete hyperbolic-tiling tensor network, showing how perfect tensors reproduce the three relations above (RT / entanglement-wedge reconstruction / logical operators) on a lattice.</p><span class="todo-tag">TOY MODEL · to be expanded</span>',
        hard: '<div class="esrc">Building the three above out of a tensor network</div><p>Use a tensor network tiled on a hyperbolic plane as building blocks to realize the earlier “area = entanglement,” “reconstruction = error correction,” and “topology = logical operator” concretely on a lattice.</p><span class="todo-tag">TOY MODEL · to be expanded</span>',
        soft: '<div class="esrc">A small model you can actually build</div><p>A small model you can actually stack up on a lattice by hand, to demonstrate how those three things work.</p><span class="todo-tag">TOY MODEL · to be expanded</span>'
      }
    },
    cs: {
      title: "Chern–Simons × Weyl",
      body: {
        pro: '<div class="esrc">Topological protection of the chiral current</div><p>How the boundary chiral current acquires its invariance under the anomaly through the bulk topological action.</p><span class="todo-tag">TOY MODEL · to be expanded</span>',
        hard: '<div class="esrc">Why the boundary current resists disturbance</div><p>How a current that flows in a single direction on the boundary stays stable under all kinds of disturbance, protected by the topological structure inside.</p><span class="todo-tag">TOY MODEL · to be expanded</span>',
        soft: '<div class="esrc">A current that “can’t be scrambled”</div><p>On the boundary there’s a current that runs only one way; protected by the structure inside, it stays orderly no matter how the outside disturbs it.</p><span class="todo-tag">TOY MODEL · to be expanded</span>'
      }
    }
  },

  modal: {
    heat: {
      sub: "Crossed Product",
      title: "The crossed product · Type III → Type II and generalized entropy",
      html: '<p>Let a Type III₁ algebra $\\mathcal{A}$ act on $\\mathcal{H}$; the vacuum $|\\Omega\\rangle$ induces, via Tomita–Takesaki, a modular automorphism flow $\\sigma_t$ whose generator is the modular Hamiltonian (the boost energy in Rindler) $h=-\\ln\\Delta$.</p><h4>1. Folding the observer’s clock / energy into the algebra</h4><p>The crossed product $\\mathcal{A}\\rtimes_\\sigma\\mathbb{R}$ “promotes” the modular flow itself into an internal degree of freedom of the algebra: on $\\mathcal{H}\\otimes L^2(\\mathbb{R})$, generated by —</p><div class="eqbox">$$\\hat a = e^{ipX}\\,a\\,e^{-ipX}\\ (a\\in\\mathcal{A}),\\qquad X\\ (\\text{observer energy}),$$</div><p>where $X$ is conjugate to the observer’s Hamiltonian and $p$ generates the modular flow. Physically this is Witten’s <strong>gravitational dressing</strong>: diffeomorphism invariance forces you to carry the energy constraint $\\hat H = h + X$ along.</p><h4>2. Takesaki duality: the crossed product turns III₁ into II∞</h4><div class="eqbox big">$$\\mathcal{A}\\ (\\text{III}_1)\\ \\rtimes_\\sigma\\mathbb{R}\\ \\;\\cong\\;\\ \\mathcal{A}\\otimes B(L^2\\mathbb{R})\\ \\text{a II}_\\infty\\ \\text{factor}$$</div><p>The key point: the crossed-product algebra carries a semifinite <strong>trace</strong> $\\mathrm{Tr}$ (in the bounded de Sitter case it is II₁, with a finite trace). Once the trace is back, the density matrix $\\rho$ and the von Neumann entropy are well-defined again.</p><h4>3. Algebraic entropy = generalized entropy</h4><p>Computing $S=-\\mathrm{Tr}(\\hat\\rho\\ln\\hat\\rho)$ for the dressed state $\\hat\\rho$, Witten showed its expansion is exactly</p><div class="eqbox big">$$S=\\langle \\hat H\\rangle + S_{\\text{rel}} + \\text{const} \\;\\longrightarrow\\; S_{\\text{gen}}=\\frac{\\text{Area}}{4G_N}+S_{\\text{out}}$$</div><p>The area term $\\frac{A}{4G_N}$ comes from the normalization constant of the observer energy $X$ ($\\sim 1/G_N$), and $S_{\\text{out}}$ from the relative entropy of the fields. <strong>Conclusion: black-hole entropy is not a count of microstates but the algebraic price of the trace reappearing in the Type III → Type II transition.</strong></p>'
    },
    time: {
      sub: "Modular Flow",
      title: "Tomita–Takesaki · deriving the flow of time uniquely from the vacuum",
      html: '<p>Take a cyclic and separating vacuum vector $|\\Omega\\rangle$. Define the antilinear operator $S$:</p><div class="eqbox">$$S\\,a|\\Omega\\rangle = a^\\dagger|\\Omega\\rangle,\\qquad a\\in\\mathcal{A}$$</div><h4>Polar decomposition</h4><div class="eqbox big">$$S=J\\,\\Delta^{1/2}$$</div><p>$\\Delta$ is the positive-definite <strong>modular operator</strong> and $J$ the antiunitary <strong>modular conjugation</strong>. Tomita’s theorem guarantees they exist uniquely, and:</p><div class="eqbox">$$\\Delta^{it}\\mathcal{A}\\Delta^{-it}=\\mathcal{A},\\qquad J\\mathcal{A}J=\\mathcal{A}\'$$</div><p>So a <strong>single state $\\omega$</strong> alone generates a one-parameter automorphism group $\\sigma_t^\\omega(a)=\\Delta^{it}a\\Delta^{-it}$. The parameter $t$ has no a-priori meaning of “time” — but the Connes–Rovelli thermal-time hypothesis says it <strong>is</strong> the proper-time direction a local observer perceives. Time is the algebra’s self-driven evolution to maintain statistical equilibrium, not a background stage.</p>'
    },
    energy: {
      sub: "KMS · Bisognano–Wichmann · Unruh",
      title: "Tomita–Takesaki → the Hawking temperature on the horizon",
      html: '<p>The vacuum is a thermal equilibrium state for the modular flow. Tomita–Takesaki directly implies the <strong>KMS condition</strong>:</p><div class="eqbox big">$$\\omega\\big(a\\,\\sigma_t(b)\\big)=\\omega\\big(\\sigma_{t-i}(b)\\,a\\big)$$</div><p>i.e. the vacuum is a Gibbs state at inverse temperature $\\beta=1$ in modular time $t$.</p><h4>1. Modular flow = boost (Bisognano–Wichmann)</h4><p>For the Rindler wedge the modular flow is exactly a Lorentz boost: $\\Delta^{it}=e^{-2\\pi i K t}$, with $K$ the boost generator. Converting to the observer’s physical boost parameter $s$, the KMS period becomes $2\\pi$.</p><h4>2. Why $2\\pi$? Euclidean regularity</h4><p>Wick-rotate time and the Rindler wedge becomes a polar-coordinate plane, with the boost becoming the angle $\\theta$. To avoid a conical singularity at the origin, $\\theta$ must have period $2\\pi$ → inverse temperature $\\beta=2\\pi/\\kappa$.</p><h4>3. Unruh / Hawking temperature</h4><div class="eqbox big">$$T_{\\text{Unruh}}=\\frac{a}{2\\pi},\\qquad T_{\\text{Hawking}}=\\frac{\\kappa}{2\\pi}\\xrightarrow{\\text{Schwarzschild}}\\frac{1}{8\\pi G M}$$</div><p>$\\kappa$ is the surface gravity. <strong>The Hawking temperature is not an added assumption but a direct consequence of the $2\\pi$ KMS period of the Tomita–Takesaki modular flow on the horizon.</strong></p><p>The same $K$ also yields the emergence of energy: perturbing the entangled state, $\\Delta S=\\Delta\\langle K\\rangle$, which in AdS/CFT corresponds to the area change of the Ryu–Takayanagi surface — geometry’s resistance to entanglement perturbation is energy.</p>'
    },
    space: {
      sub: "Subregion–Subalgebra Duality",
      title: "Subalgebra duality · growing geometry from the entanglement network",
      html: '<p>A spatial region $U$ corresponds to a boundary operator subalgebra $\\mathcal{A}(U)$, with geometric inclusion mapping to algebraic inclusion:</p><div class="eqbox big">$$A\\subset B\\;\\Longleftrightarrow\\;\\mathcal{A}(A)\\subset\\mathcal{A}(B),\\qquad A,B\\ \\text{spacelike} \\Rightarrow [\\mathcal{A}(A),\\mathcal{A}(B)]=0$$</div><h4>Entanglement-wedge reconstruction</h4><p>Minimizing the generalized entropy computed with the Type II algebra gives the RT/HRT surface $\\gamma$:</p><div class="eqbox">$$S(\\mathcal{A}(U))=\\min_\\gamma\\ \\mathrm{ext}\\left[\\frac{\\text{Area}(\\gamma)}{4G_N}+S_{\\text{bulk}}\\right]$$</div><p>The volume enclosed by $\\gamma$ = the scope reconstructible by the subalgebra. <strong>Stronger entanglement → smaller macroscopic distance; cut the entanglement (entropy → 0) → the spatial structure tears apart.</strong> The connectivity of geometry is the connectivity of entanglement.</p>'
    },
    mass: {
      sub: "Nambu–Goto",
      title: "Mass · boundary condensation of Type II degrees of freedom",
      html: '<p>Mass is condensed local energy $E=mc^2$. When energy piles up in macroscopic spacetime to form a defect (an excited state / black-hole boundary), the worldsheet dynamics of a 1D string or higher-dimensional brane is governed by the Nambu–Goto action:</p><div class="eqbox big">$$S_{\\text{NG}}=-T\\!\\int d^2\\sigma\\,\\sqrt{-\\det h_{ab}},\\qquad T=\\frac{1}{2\\pi\\alpha\'}$$</div><p>$h_{ab}=\\partial_a X^\\mu\\partial_b X^\\nu g_{\\mu\\nu}$ is the induced metric and $T$ the string tension. At the algebraic level this means a large number of Type II degrees of freedom are “compactified/condensed” at a particular spacetime boundary — string tension and atomic mass are the rest mass a macroscopic observer measures once these algebraic degrees of freedom condense at the boundary.</p>'
    },
    rt: {
      sub: "It from Qubit · RT Formula",
      title: "Ryu–Takayanagi · geometric area = entanglement entropy",
      html: '<p>The RT formula is the most famous mathematical bridge of <span class="mono">"It from Qubit"</span>: it equates the <strong>geometric area in the bulk</strong> directly with the <strong>entanglement entropy on the boundary</strong>.</p><div class="eqbox big">$$S(A)=\\frac{\\text{Area}(\\gamma_A)}{4G_N}$$</div><h4>1. Unpacking the formula</h4><ul><li>$S(A)$: the <strong>von Neumann entanglement entropy</strong> $-\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$ between boundary region $A$ and its complement — a purely information-theoretic, purely qubit-level measure.</li><li>$\\gamma_A$: the <strong>minimal surface</strong> reaching into the interior with $A$ as its boundary.</li><li>$\\text{Area}(\\gamma_A)$: the <strong>geometric area</strong> of that minimal surface.</li><li>$G_N$: the bulk Newton constant.</li></ul><h4>2. Key · spacetime is set by entanglement</h4><p>Change the entanglement among the boundary qubits (change $S(A)$), and to keep the equation the interior metric must change with it, changing the minimal-surface area. With no boundary entanglement ($S(A)=0$), the corresponding interior surface area is $0$ — meaning spacetime <strong>disconnects or vanishes</strong> there. The continuity of spacetime is, mathematically, set by entanglement.</p><p class="fine">This is the classical-limit version of the “Space” card’s $S=\\min_\\gamma\\mathrm{ext}[\\frac{\\text{Area}}{4G_N}+S_{\\text{bulk}}]$ (dropping the bulk entropy term), recast as an entry point to the QEC view.</p>'
    },
    jlms: {
      sub: "JLMS · Almheiri–Dong–Harlow",
      title: "Subsystem QEC · bulk reconstruction and code-subspace projection",
      html: '<p>The QEC view of holography was laid down by Almheiri, Dong, Harlow (ADH) and others: they found that local bulk operators are actually <strong>“encrypted”</strong> into a subregion of the boundary. Its mathematical core is the JLMS formula:</p><div class="eqbox big">$$\\hat H_{\\text{mod}}^{\\text{boundary}}=\\frac{\\hat{\\text{Area}}(\\gamma_A)}{4G_N}+\\hat H_{\\text{mod}}^{\\text{bulk}}$$</div><h4>1. The error-correcting-code structure</h4><p>In a quantum error-correcting code we have a large physical space $\\mathcal{H}_{\\text{physical}}$ (the boundary CFT) and a code subspace $\\mathcal{H}_{\\text{code}}$ (the low-energy effective physics inside). Define an <strong>isometry</strong> $V:\\mathcal{H}_{\\text{code}}\\to\\mathcal{H}_{\\text{physical}}$.</p><p>For a bulk operator $\\phi_b$ to be read off on boundary region $A$, it must satisfy:</p><div class="eqbox">$$V\\,\\phi_b\\,P_{\\text{code}}=O_A\\,V\\,P_{\\text{code}}$$</div><p>where $P_{\\text{code}}=VV^\\dagger$ is the projector onto the code subspace and $O_A$ acts only on boundary region $A$.</p><h4>2. Key · the interior = an erasure-proof code</h4><p>This means: a bulk spacetime point $b$, if it lies inside the <strong>entanglement wedge</strong> determined by region $A$, can still be fully recovered from the operators $O_A$ of $A$ alone — even if the rest of the boundary (the complement of $A$) is severely corrupted by quantum noise (an <strong>erasure error</strong>). The “interior” of spacetime is, mathematically, a physical <strong>code subspace</strong> protected against boundary erasure errors.</p>'
    },
    tqft: {
      sub: "Chern–Simons · V: Bord → Vec",
      title: "Low-energy limit · TQFT invariants = the emergence of a quantization functor",
      html: '<p>When we push the bulk gravity theory to the <strong>low-energy limit</strong>, or consider topological invariants, the dynamics of gravity (the metric) freeze and what remains is precisely a TQFT. Mathematically this shows up as the bulk partition function’s <strong>insensitivity</strong> to geometric perturbations.</p><h4>1. From a highly entangled vacuum to a topological term</h4><p>The boundary CFT vacuum $|0\\rangle$ can be prepared with a tensor network (e.g. MERA) or a path integral. When the boundary is highly entangled, this path integral is equivalent in the bulk to quantizing the action $S_{\\text{bulk}}[g,\\dots]$. Toward the low-energy effective theory, massive graviton excitations are suppressed and the action reduces to a topological term — e.g. Chern–Simons:</p><div class="eqbox big">$$S=\\frac{k}{4\\pi}\\int\\mathrm{Tr}\\!\\left(A\\wedge dA+\\tfrac{2}{3}A\\wedge A\\wedge A\\right)$$</div><p>The boundary Hilbert space $V(\\Sigma)$ then satisfies the TQFT axioms:</p><div class="eqbox">$$\\dim V(\\Sigma)=Z(\\Sigma\\times S^1)$$</div><h4>2. Key · topological operator ≡ logical operator</h4><p>Connect the dimension of the code subspace $\\mathcal{H}_{\\text{code}}$ with the number of TQFT states on a manifold $\\Sigma$ and you find: the interior TQFT operators correspond exactly to the <strong>logical operators</strong> of QEC. Because TQFT operators are topological (e.g. a Wilson loop), moving or deforming one slightly inside spacetime leaves the measurement completely unchanged — the hallmark of a logical operator: fully immune to local physical perturbations (local noise).</p><ul><li><strong>TQFT says</strong>: this operator is unchanged however you tug it, because it is topological.</li><li><strong>QEC says</strong>: this operator is error-free however you disturb it, because it is logical.</li></ul><p>These two statements are brought into correspondence, mathematically, through $V:\\text{Bord}\\to\\text{Vec}$.</p>'
    }
  }
};
