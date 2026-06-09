// ---- scroll reveal ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ---- progress bar ----
const bar = document.getElementById("progress");
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---- background entanglement field ----
// 節點 = 算符；連線越亮 = 糾纏越強。隱喻「糾纏網絡 → 空間」。
const c = document.getElementById("bg-field");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (c && !reduce) {
  const ctx = c.getContext("2d");
  let w, h, pts;
  const N = 70, LINK = 150;
  function resize() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25
    }));
  }
  resize(); addEventListener("resize", resize);
  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < LINK) {
          const a = (1 - d / LINK) * .22;
          ctx.strokeStyle = `rgba(212,175,55,${a})`; // gold links
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    for (const p of pts) {
      ctx.fillStyle = "rgba(240,217,138,.6)"; // champagne nodes
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}
