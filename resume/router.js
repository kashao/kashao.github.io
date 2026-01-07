// Tiny hash router for static GitHub Pages
(function () {
  const routes = {
    '#about': 'sections/about.html',
    '#skills': 'sections/skills.html',
    '#experience': 'sections/experience.html',
    '#projects': 'sections/projects.html',
    '#education': 'sections/education.html',
    '#contact': 'sections/contact.html',
    '#notes': 'sections/notes.html'
  };

  async function load(app, path) {
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error(res.statusText);
      const html = await res.text();
      app.innerHTML = html;
      highlightActive();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      app.innerHTML = `<p class="muted">載入失敗：${path}</p>`;
      console.error(err);
    }
  }

  function highlightActive() {
    const links = document.querySelectorAll('a[data-route]');
    const h = location.hash || '#about';
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === h));
  }

  function router(app) {
    const hash = location.hash || '#about';
    const path = routes[hash] || routes['#about'];
    load(app, path);
  }

  function initRouter(app) {
    if (!app) return;
    window.addEventListener('hashchange', () => router(app));
    router(app);
  }

  window.initRouter = initRouter;
})();
