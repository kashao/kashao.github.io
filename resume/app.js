// Tiny hash router for static GitHub Pages
(function () {
  // Route mapping: hash -> partial file
  const routes = {
    '#about': 'sections/about.html',
    '#skills': 'sections/skills.html',
    '#experience': 'sections/experience.html',
    '#projects': 'sections/projects.html',
    '#education': 'sections/education.html',
    '#contact': 'sections/contact.html',
    '#notes': 'sections/notes.html'
  };

  const app = document.getElementById('app');
  const lastUpdated = document.getElementById('lastUpdated');

  // Theme toggle with persistence
  (function theme() {
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (stored === 'light' || (!stored && prefersLight)) document.documentElement.classList.add('light');
    const btn = document.getElementById('themeToggle');
    btn && btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      const isLight = document.documentElement.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    // update "last updated"
    try {
      const dt = new Date(document.lastModified);
      if (!Number.isNaN(+dt) && lastUpdated) {
        lastUpdated.textContent = dt.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
      }
    } catch {}
  })();

  // Load and inject a partial file
  async function load(path) {
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error(res.statusText);
      const html = await res.text();
      app.innerHTML = html;
      highlightActive();
      window.scrollTo({ top: 0, behavior: 'instant' });
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

  // Router entry
  function router() {
    const hash = location.hash || '#about';
    const path = routes[hash] || routes['#about'];
    load(path);
  }

  window.addEventListener('hashchange', router);
  document.addEventListener('DOMContentLoaded', router);
})();
