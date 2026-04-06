document.addEventListener("DOMContentLoaded", () => {
  const t = document.querySelector("[data-menu-toggle]");
  const n = document.querySelector("[data-site-nav]");
  if (t && n) {
    t.addEventListener("click", () => {
      const o = n.classList.toggle("is-open");
      t.setAttribute("aria-expanded", String(o));
    });
  }

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const p = new URLSearchParams(window.location.search);
  const ct = document.getElementById("category-title");
  const cl = document.getElementById("category-lead");
  const cards = document.querySelectorAll("[data-category]");
  const chosen = p.get("cat");

  if (chosen && ct) {
    ct.textContent = chosen;

    if (cl) {
      cl.textContent = `Focused coverage on ${chosen.toLowerCase()} with practical explainers, comparisons, and news-style features.`;
    }

    cards.forEach((c) => {
      c.hidden = c.getAttribute("data-category") !== chosen;
    });
  }

  const buttons = document.querySelectorAll("[data-cookie-settings]");
  const modal = document.getElementById("cookie-modal");

  const open = () => modal && modal.classList.add("is-visible");
  const close = () => modal && modal.classList.remove("is-visible");

  buttons.forEach((b) =>
    b.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    }),
  );

  document
    .querySelectorAll("[data-close-modal]")
    .forEach((b) => b.addEventListener("click", close));

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
  }
});

const POSTS_PER_PAGE = 6;

const params = new URLSearchParams(window.location.search);
const currentCategory = params.get("category");
let currentPage = parseInt(params.get("page")) || 1;

const mainGrid = document.querySelector(".section .grid-3");
const cards = mainGrid
  ? Array.from(mainGrid.querySelectorAll(".post-card"))
  : [];
const paginationContainer = document.querySelector(".pagination");

let filteredCards = cards;

if (currentCategory) {
  filteredCards = cards.filter(
    (card) => card.dataset.category === currentCategory,
  );
}

cards.forEach((card) => (card.style.display = "none"));

const totalPages = Math.ceil(filteredCards.length / POSTS_PER_PAGE);

const start = (currentPage - 1) * POSTS_PER_PAGE;
const end = start + POSTS_PER_PAGE;

filteredCards.slice(start, end).forEach((card) => {
  card.style.display = "";
});

if (paginationContainer) {
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement("a");

    const url = new URL(window.location.href);
    url.searchParams.set("page", i);

    if (currentCategory) {
      url.searchParams.set("category", currentCategory);
    }

    link.href = url.toString();
    link.textContent = i;
    link.className = "page-btn";

    if (i === currentPage) {
      link.classList.add("is-active");
    }

    paginationContainer.appendChild(link);
  }

  if (currentPage < totalPages) {
    const next = document.createElement("a");
    const url = new URL(window.location.href);

    url.searchParams.set("page", currentPage + 1);

    if (currentCategory) {
      url.searchParams.set("category", currentCategory);
    }

    next.href = url.toString();
    next.textContent = "Next →";
    next.className = "page-btn";

    paginationContainer.appendChild(next);
  }
}
