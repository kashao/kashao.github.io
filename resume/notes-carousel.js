/**
 * notes-carousel.js
 * - For hash-router partial injection (#app.innerHTML).
 * - Groups <li> by HTML comment nodes inside <ul data-link-carousel>.
 * - Shows ONE group at a time (carousel by group), each group shows ALL its links.
 * - Generates a clickable topic list (badges) from the group titles (HTML comments).
 *
 * Usage:
 * 1) In notes.html:
 *    <ul data-link-carousel>
 *      <!-- Labs -->
 *      <li>...</li>
 *      <!-- Backend -->
 *      <li>...</li>
 *    </ul>
 * 2) In index.html (after app.js):
 *    <script src="assets/js/notes-carousel.js"></script>
 *
 * Notes:
 * - This script does NOT touch location.hash, so it won't conflict with your hash router (#notes).
 * - Button styling is controlled by your CSS via class hooks:
 *   - .group-carousel-topics .badge  (topic buttons)
 *   - .btn.btn-ghost                (prev/next/pause)
 */

(function () {
  const AUTO_MS = 5000;
  const INIT_ATTR = "data-group-carousel-initialized";

  function normalizeTitle(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function parseGroupsFromUl(ul) {
    const nodes = Array.from(ul.childNodes);

    /** @type {{ title: string, items: HTMLLIElement[] }[]} */
    const groups = [];
    let current = null;

    for (const n of nodes) {
      if (n.nodeType === Node.COMMENT_NODE) {
        const title = normalizeTitle(n.nodeValue);
        if (!title) continue;
        current = { title, items: [] };
        groups.push(current);
        continue;
      }

      if (n.nodeType === Node.ELEMENT_NODE && n.tagName === "LI") {
        if (!current) {
          current = { title: "Links", items: [] };
          groups.push(current);
        }
        current.items.push(n);
      }
    }

    // Remove empty groups (just in case)
    return groups.filter((g) => g.items && g.items.length > 0);
  }

  function buildCarousel(ul, groups) {
    // English comments: Container replaces the original UL
    const root = document.createElement("div");
    root.className = "group-carousel";
    root.setAttribute(INIT_ATTR, "1");

    // English comments: Header
    const head = document.createElement("div");
    head.className = "group-carousel-head";

    const title = document.createElement("div");
    title.className = "group-carousel-title";

    const actions = document.createElement("div");
    actions.className = "group-carousel-actions";

    // English comments: Use class hooks so you can style in your existing CSS
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "btn btn-ghost group-carousel-prev";
    prevBtn.textContent = "Prev";

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "btn btn-ghost group-carousel-next";
    nextBtn.textContent = "Next";

    const pauseBtn = document.createElement("button");
    pauseBtn.type = "button";
    pauseBtn.className = "btn btn-ghost group-carousel-pause";
    pauseBtn.textContent = "Pause";
    pauseBtn.setAttribute("aria-pressed", "false");

    actions.appendChild(prevBtn);
    actions.appendChild(nextBtn);
    actions.appendChild(pauseBtn);

    head.appendChild(title);
    head.appendChild(actions);

    // English comments: Topic buttons (generated from group titles)
    const topics = document.createElement("div");
    topics.className = "group-carousel-topics";
    // Optional accessibility
    topics.setAttribute("role", "tablist");
    topics.setAttribute("aria-label", "Notes topics");

    /** @type {HTMLButtonElement[]} */
    const topicButtons = groups.map((g, i) => {
      const b = document.createElement("button");
      b.type = "button";
      // Reuse your badge style; add a hook for active state
      b.className = "badge group-carousel-topic";
      b.textContent = g.title;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", "false");
      b.setAttribute("data-topic-index", String(i));
      topics.appendChild(b);
      return b;
    });

    // English comments: Slides wrapper
    const slidesWrap = document.createElement("div");
    slidesWrap.className = "group-carousel-slides";

    // English comments: Build slides; each slide contains ALL links of that group
    const slides = groups.map((g) => {
      const slide = document.createElement("section");
      slide.className = "group-carousel-slide";
      slide.hidden = true;

      const h3 = document.createElement("h3");
      h3.className = "group-carousel-slide-title";
      h3.textContent = g.title;

      const list = document.createElement("ul");
      list.className = "group-carousel-list";

      // Move existing <li> nodes into this slide list
      g.items.forEach((li) => list.appendChild(li));

      slide.appendChild(h3);
      slide.appendChild(list);
      slidesWrap.appendChild(slide);

      return slide;
    });

    // Assemble
    root.appendChild(head);
    root.appendChild(topics);
    root.appendChild(slidesWrap);

    // Replace the original UL with carousel root
    ul.parentNode.insertBefore(root, ul);
    ul.remove();

    // English comments: State + behavior
    let idx = 0;
    let paused = false;
    let timer = null;

    function setActiveTopicButton() {
      topicButtons.forEach((b, i) => {
        const isActive = i === idx;
        b.classList.toggle("is-active", isActive);
        b.setAttribute("aria-selected", String(isActive));
      });
    }

    function render() {
      slides.forEach((s, i) => {
        s.hidden = i !== idx;
      });

      title.textContent = `精選：${groups[idx].title}`;
      setActiveTopicButton();

      // Optional: scroll to top of carousel area on switch
      root.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    function next() {
      idx = (idx + 1) % slides.length;
      render();
    }

    function prev() {
      idx = (idx - 1 + slides.length) % slides.length;
      render();
    }

    function start() {
      timer = window.setInterval(() => {
        if (!paused) next();
      }, AUTO_MS);
    }

    function restart() {
      if (timer) window.clearInterval(timer);
      start();
    }

    // English comments: Click topic to jump directly (does not change hash)
    topics.addEventListener("click", (e) => {
      const btn = e.target.closest("button.group-carousel-topic");
      if (!btn) return;

      const i = Number(btn.getAttribute("data-topic-index"));
      if (Number.isNaN(i)) return;

      idx = Math.max(0, Math.min(i, slides.length - 1));
      render();
      restart();
    });

    prevBtn.addEventListener("click", () => {
      prev();
      restart();
    });

    nextBtn.addEventListener("click", () => {
      next();
      restart();
    });

    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.setAttribute("aria-pressed", String(paused));
      pauseBtn.textContent = paused ? "Resume" : "Pause";
    });

    render();
    start();
  }

  function initInRoot(root) {
    const uls = Array.from(root.querySelectorAll("ul[data-link-carousel]"));
    if (!uls.length) return;

    uls.forEach((ul) => {
      // Prevent double init
      if (ul.getAttribute(INIT_ATTR) === "1") return;

      const groups = parseGroupsFromUl(ul);
      if (!groups.length) return;

      buildCarousel(ul, groups);
    });
  }

  function startObserver() {
    const app = document.getElementById("app");
    if (!app) return;

    // init current content
    initInRoot(app);

    // Observe router injections
    const mo = new MutationObserver(() => initInRoot(app));
    mo.observe(app, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
