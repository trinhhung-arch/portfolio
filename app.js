// =====================================================
// Project data
// Edit this array to add, remove, or update projects.
// =====================================================
const projects = [
  {
    id: "online-judge",
    title: "Online Judge",
    category: "backend",
    status: "Live",
    blurb: "A modular-monolith online judge that compiles and grades C++/Java/Python submissions and runs ICPC/IOI-style contests with a live scoreboard.",
    tech: ["Spring Boot 3.3", "Java 21", "PostgreSQL 16", "Docker", "RabbitMQ", "Redis", "JWT + TOTP 2FA"],
    details: "Built with a partner over a 13-week roadmap. The system splits into an API/platform service and an isolated judge worker, connected through a shared contract module, so grading never touches the main API process. Submissions run inside IOI-standard sandboxing, and the platform supports full contests: problems, testcases, and a real-time scoreboard, secured with JWT and TOTP two-factor auth. Load-tested with k6, containerized with Docker, and shipped through a GitHub Actions CI pipeline.",
    links: [
      { label: "Live demo", url: "https://onlinejudge67.click" },
      { label: "Repository", url: "https://github.com/trinhhung-arch/online-judge" }
    ]
  },
  {
    id: "coffee-shop",
    title: "Coffee Shop Management System",
    category: "backend",
    status: "Shipped",
    blurb: "A web-based ordering system with separate waiter and runner workflows for taking and fulfilling orders.",
    tech: ["Java", "JSP / Servlet", "SQL Server", "NetBeans"],
    details: "Modeled the order flow as two roles — waiters placing orders, runners fulfilling them — backed by a shared SQL Server database. This is the project I get asked to defend most in interviews, usually on query performance and indexing choices.",
    links: [
      { label: "Repository", url: "https://github.com/ThanhTranGangz/The-Coffee-Shop-Management-System" }
    ]
  }
];

// =====================================================
// Render project cards
// =====================================================
const grid = document.getElementById("projectGrid");

function renderProjects() {
  projects.forEach(project => {
    const card = document.createElement("button");
    card.className = "project-card";
    card.type = "button";
    card.setAttribute("data-id", project.id);
    card.setAttribute("aria-haspopup", "dialog");

    card.innerHTML = `
      <span class="status-badge" data-status="${project.status}">${project.status}</span>
      <h3>${project.title}</h3>
      <p>${project.blurb}</p>
      <ul class="chip-list">
        ${project.tech.slice(0, 3).map(t => `<li>${t}</li>`).join("")}
      </ul>
    `;

    card.addEventListener("click", () => openModal(project, card));
    grid.appendChild(card);
  });
}

renderProjects();

// =====================================================
// Modal
// =====================================================
const modalBackdrop = document.getElementById("modalBackdrop");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalStatus = document.getElementById("modalStatus");
const modalTitle = document.getElementById("modalTitle");
const modalBlurb = document.getElementById("modalBlurb");
const modalTech = document.getElementById("modalTech");
const modalDetails = document.getElementById("modalDetails");
const modalLinks = document.getElementById("modalLinks");

let lastFocusedElement = null;

function openModal(project, triggerEl) {
  lastFocusedElement = triggerEl;

  modalStatus.textContent = project.status;
  modalTitle.textContent = project.title;
  modalBlurb.textContent = project.blurb;
  modalTech.innerHTML = project.tech.map(t => `<li>${t}</li>`).join("");
  modalDetails.textContent = project.details;
  modalLinks.innerHTML = project.links
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} &rarr;</a>`)
    .join("");

  modalBackdrop.hidden = false;
  modalClose.focus();
  document.addEventListener("keydown", handleModalKeydown);
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.removeEventListener("keydown", handleModalKeydown);
  if (lastFocusedElement) lastFocusedElement.focus();
}

function handleModalKeydown(e) {
  if (e.key === "Escape") closeModal();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// =====================================================
// Mobile nav toggle
// =====================================================
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

primaryNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// =====================================================
// Contact form (UI only — no backend)
// =====================================================
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.textContent = "This form is a UI demo only — please use the email link above to actually reach me.";
  contactForm.reset();
});
