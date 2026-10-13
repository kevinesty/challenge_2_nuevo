const series = {
  ira: {
    label: "EPISODIOS DE IRA",
    title: "Evolución anual de episodios",
    legend: "Episodios de IRA",
    tableMetric: "Episodios",
    values: [1003178, 883959, 824978],
    color: "#3878ee"
  },
  pneumonia: {
    label: "DEFUNCIONES POR NEUMONÍA",
    title: "Evolución anual de defunciones",
    legend: "Defunciones por neumonía",
    tableMetric: "Defunciones",
    values: [113, 82, 51],
    color: "#139b78"
  }
};
const years = [2023, 2024, 2025];
let selected = "ira";
const canvas = document.getElementById("trendChart");
const ctx = canvas.getContext("2d");

function fmt(value) { return new Intl.NumberFormat("es-PE").format(value); }
function variation(current, previous) {
  if (previous === 0) return "—";
  const pct = ((current - previous) / previous) * 100;
  return `${pct > 0 ? "+" : ""}${pct.toFixed(1).replace(".", ",")}%`;
}
function renderTable(key) {
  const data = series[key];
  document.getElementById("tableMetric").textContent = data.tableMetric;
  document.getElementById("dataTable").innerHTML = data.values.map((v, i) => {
    const change = i === 0 ? "Base" : variation(v, data.values[i - 1]);
    return `<tr><td>${years[i]}</td><td>${fmt(v)}</td><td>${change}</td></tr>`;
  }).join("");
}
function drawChart(key) {
  const data = series[key];
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, rect.width * ratio);
  canvas.height = Math.max(1, rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const w = rect.width, h = rect.height;
  ctx.clearRect(0, 0, w, h);
  const pad = {top: 28, right: 24, bottom: 38, left: key === "ira" ? 70 : 48};
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const maxVal = Math.max(...data.values) * 1.16;
  const minVal = 0;
  ctx.font = '10px "DM Sans", sans-serif';
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + plotH * i / 4;
    const value = maxVal - (maxVal - minVal) * i / 4;
    ctx.strokeStyle = "#e9eff5";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    ctx.fillStyle = "#91a0b0";
    let label = key === "ira" ? (value / 1000000).toFixed(2).replace(".", ",") + " M" : Math.round(value).toString();
    ctx.fillText(label, pad.left - 10, y);
  }
  const pts = data.values.map((v, i) => ({
    x: pad.left + plotW * i / (data.values.length - 1),
    y: pad.top + plotH * (1 - (v - minVal) / (maxVal - minVal)),
    value: v
  }));
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
  grad.addColorStop(0, key === "ira" ? "rgba(56,120,238,.20)" : "rgba(19,155,120,.20)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pad.top + plotH);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length-1].x, pad.top + plotH);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  ctx.beginPath();
  pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
  ctx.strokeStyle = data.color; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.stroke();
  pts.forEach((p, i) => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff"; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = data.color; ctx.stroke();
    ctx.textAlign = "center"; ctx.textBaseline = "bottom";
    ctx.font = '700 11px "DM Sans", sans-serif'; ctx.fillStyle = "#183451";
    ctx.fillText(fmt(p.value), p.x, p.y - 12);
    ctx.textBaseline = "top"; ctx.font = '10px "DM Sans", sans-serif'; ctx.fillStyle = "#8494a5";
    ctx.fillText(years[i], p.x, pad.top + plotH + 13);
  });
}
function selectChart(key) {
  selected = key;
  document.querySelectorAll("[data-chart]").forEach(btn => btn.classList.toggle("active", btn.dataset.chart === key));
  const data = series[key];
  document.getElementById("chartLabel").textContent = data.label;
  document.getElementById("chartTitle").textContent = data.title;
  document.getElementById("legendText").textContent = data.legend;
  document.querySelector(".legend-dot").style.background = data.color;
  renderTable(key);
  drawChart(key);
}
document.querySelectorAll("[data-chart]").forEach(btn => btn.addEventListener("click", () => selectChart(btn.dataset.chart)));
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const isOpen = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => {
  document.getElementById("mainNav").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}));
window.addEventListener("resize", () => drawChart(selected));
window.addEventListener("load", () => selectChart("ira"));
