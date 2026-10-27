/* SOLENNE — interactions (no dependencies) */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Sticky header height → scroll-padding for anchors ---------- */
  const header = $(".site-header");
  const syncHeaderHeight = () =>
    document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
  syncHeaderHeight();
  new ResizeObserver(syncHeaderHeight).observe(header);

  /* ---------- Mobile navigation ---------- */
  const nav = $("#nav");
  const toggle = $(".nav-toggle");
  const desktopNav = window.matchMedia("(min-width: 960px)");

  const setNavOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setNavOpen(!nav.classList.contains("is-open")));
  $$(".nav-panel a, .nav-panel button").forEach((el) =>
    el.addEventListener("click", () => setNavOpen(false))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setNavOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target)) setNavOpen(false);
  });
  desktopNav.addEventListener("change", (e) => e.matches && setNavOpen(false));

  /* ---------- Placeholder links (href="#") should not jump to top ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href="#"]');
    if (a) e.preventDefault();
  });

  /* ---------- Highlight the current section in the nav ---------- */
  const navLinks = $$(".nav-links a[data-section]");
  const sections = ["stays", "philosophy", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            // "Journal" and "Contact" both point at the footer; mark only Contact.
            const isCurrent = link.dataset.section === id && link.textContent.trim() !== "Journal";
            if (isCurrent) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    // Clear the state when back at the hero
    const hero = $(".hero");
    new IntersectionObserver(
      ([entry]) => entry.isIntersecting && navLinks.forEach((l) => l.removeAttribute("aria-current")),
      { rootMargin: "-40% 0px -55% 0px" }
    ).observe(hero);
  }

  /* ---------- Search dialog (filters the stays on the page) ---------- */
  const dialog = $("#search");
  const input = $("#search-input");
  const list = $("#search-results");
  const empty = $(".search__empty");
  const stays = $$("[data-stay]").map((el) => ({
    el,
    name: el.dataset.stayName,
    desc: el.dataset.stayDesc,
  }));

  const renderResults = (query = "") => {
    const q = query.trim().toLowerCase();
    const matches = stays.filter((s) => `${s.name} ${s.desc}`.toLowerCase().includes(q));
    list.replaceChildren(
      ...matches.map((s) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.innerHTML = "<strong></strong><span></span>";
        btn.firstChild.textContent = s.name;
        btn.lastChild.textContent = s.desc;
        btn.addEventListener("click", () => goToStay(s.el));
        li.append(btn);
        return li;
      })
    );
    empty.hidden = matches.length > 0;
  };

  const goToStay = (el) => {
    dialog.close();
    el.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "center" });
    el.classList.remove("is-highlight");
    void el.offsetWidth; // restart the animation
    el.classList.add("is-highlight");
    el.addEventListener("animationend", () => el.classList.remove("is-highlight"), { once: true });
  };

  $$("[data-search-open]").forEach((btn) =>
    btn.addEventListener("click", () => {
      input.value = "";
      renderResults();
      dialog.showModal();
      input.focus();
    })
  );
  input.addEventListener("input", () => renderResults(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const first = $("button", list);
      if (first) first.click();
    }
  });
  // Click on the backdrop closes the dialog
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  /* ---------- Newsletter form ---------- */
  const form = $(".newsletter");
  const email = $("#newsletter-email");
  const status = $(".newsletter__status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!email.value.trim() || !email.validity.valid) {
      email.setAttribute("aria-invalid", "true");
      status.textContent = "Enter a valid email address.";
      email.focus();
      return;
    }
    email.removeAttribute("aria-invalid");
    // TODO: send to your mailing-list endpoint, e.g.
    // fetch("/api/subscribe", { method: "POST", body: new FormData(form) })
    status.textContent = "Thanks. You're on the list.";
    form.reset();
  });
  email.addEventListener("input", () => {
    if (email.getAttribute("aria-invalid")) {
      email.removeAttribute("aria-invalid");
      status.textContent = "";
    }
  });
})();
