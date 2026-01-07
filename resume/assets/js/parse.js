/**
 * parse.js
 * - Parse <ul data-link-carousel> to groups for the carousel.
 */
(function () {
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

  window.notesCarouselParse = {
    parseGroupsFromUl,
  };
})();
