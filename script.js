/* ===== EDIT THIS DATA WITH YOUR OWN SKILLS AND PROJECTS ===== */
const skills = {
  web:   [["HTML5", 70], ["CSS3", 60], ["JavaScript", 45], ["Responsive design", 55]],
  tools: [["VS Code", 80], ["Git / GitHub", 45]],
  office:[["MS Office", 85], ["Internet & computer applications", 85]]
};



/* ---------- Skills tabs ---------- */
const meters = document.getElementById("meters");
const tabs = document.querySelectorAll(".tabs button");

function showSkills(group) {
  meters.innerHTML = "";
  skills[group].forEach(([name, level]) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${name}</span><span class="bar"><i></i></span><span class="pct">${level}%</span>`;
    meters.appendChild(li);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      li.querySelector("i").style.width = level + "%";
    }));
  });
}
tabs.forEach(btn => btn.addEventListener("click", () => {
  tabs.forEach(b => b.setAttribute("aria-selected", String(b === btn)));
  showSkills(btn.dataset.group);
}));
showSkills("web");

/* ---------- Project filter ---------- */
const grid = document.getElementById("projectGrid");
const filterBox = document.getElementById("filters");
const allTags = ["All", ...new Set([...grid.querySelectorAll(".card")].flatMap(c => c.dataset.tags.split(",")))];

allTags.forEach((tag, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = tag;
  b.setAttribute("aria-pressed", String(i === 0));
  b.addEventListener("click", () => {
    filterBox.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    grid.querySelectorAll(".card").forEach(c => {
      c.hidden = !(tag === "All" || c.dataset.tags.split(",").includes(tag));
    });
  });
  filterBox.appendChild(b);
});

/* ---------- Theme toggle (remembers choice) ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function applyTheme(t) {
  root.setAttribute("data-theme", t);
  themeBtn.textContent = t === "dark" ? "Light mode" : "Dark mode";
  themeBtn.setAttribute("aria-pressed", String(t === "dark"));
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
applyTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* ---------- Copy email ---------- */
const toast = document.getElementById("toast");
document.getElementById("copyBtn").addEventListener("click", async e => {
  const email = e.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = "Email copied.";
  } catch (err) {
    toast.textContent = "Copy failed. Email: " + email;
  }
  setTimeout(() => (toast.textContent = ""), 2500);
});

/* ---------- Highlight current section in the menu ---------- */
const links = document.querySelectorAll(".rail nav a");
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-30% 0px -60% 0px" });
document.querySelectorAll("main section").forEach(s => io.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();
