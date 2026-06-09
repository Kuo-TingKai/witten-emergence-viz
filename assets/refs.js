// 參考文獻清單（含原始留言索引）
const REFS = [
  { i: 1,  url: "https://arxiv.org/pdf/2510.07017", note: "arXiv 2510.07017 — 核心綜述" },
  { i: 2,  url: "https://arxiv.org/pdf/2303.02837", note: "arXiv 2303.02837" },
  { i: 3,  url: "https://arxiv.org/pdf/2504.00096", note: "arXiv 2504.00096" },
  { i: 4,  url: "https://www2.yukawa.kyoto-u.ac.jp/~qith2022/Witten.pdf", note: "Witten — Yukawa Inst. 講稿" },
  { i: 5,  url: "https://arxiv.org/abs/2302.01958", note: "arXiv 2302.01958" },
  { i: 6,  url: "https://indico.global/event/8299/contributions/121060/attachments/56210/107992/1_SuneetaIISctalk.pdf", note: "Suneeta — IISc talk" },
  { i: 7,  url: "https://indico.cern.ch/event/1085701/contributions/4940799/attachments/2479685/4260630/Slides_Witten.pdf", note: "Witten — CERN slides" },
  { i: 8,  url: "https://link.aps.org/doi/10.1103/PhysRevD.111.045006", note: "Phys. Rev. D 111, 045006" },
  { i: 9,  url: "https://arxiv.org/pdf/2112.12828", note: "arXiv 2112.12828 — Crossed product" },
  { i: 10, url: "https://inspirehep.net/literature/2926506", note: "INSPIRE 2926506" },
  { i: 11, url: "https://inspirehep.net/literature/2803929", note: "INSPIRE 2803929" },
  { i: 12, url: "https://arxiv.org/abs/2108.04841", note: "arXiv 2108.04841" },
  { i: 13, url: "https://arxiv.org/abs/2206.10780", note: "arXiv 2206.10780" },
  { i: 14, url: "https://teorica.fis.ucm.es/bootstrap2024/Jon_LectureNotes.pdf", note: "Bootstrap 2024 — 講義" },
  { i: 15, url: "https://arxiv.org/abs/2510.07017", note: "arXiv 2510.07017" },
  { i: 16, url: "https://inspirehep.net/literature/2867084", note: "INSPIRE 2867084 — It from Bit" },
  { i: 17, url: "https://arxiv.org/pdf/2308.03663", note: "arXiv 2308.03663" },
  { i: 18, url: "https://d-nb.info/1329705467/34", note: "DNB 1329705467" },
  { i: 19, url: "https://inspirehep.net/literature/2639381", note: "INSPIRE 2639381 — Entanglement wedge" },
];

const ol = document.getElementById("reflist");
if (ol) {
  REFS.forEach(r => {
    const li = document.createElement("li");
    li.value = r.i;
    li.innerHTML = `<a href="${r.url}" target="_blank" rel="noopener">${r.url.replace(/^https?:\/\//,'')}</a> <span class="note">— ${r.note}</span>`;
    ol.appendChild(li);
  });
}
