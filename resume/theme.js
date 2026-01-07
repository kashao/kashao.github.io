// Theme toggle with persistence
(function () {
  function initTheme() {
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (stored === 'light' || (!stored && prefersLight)) {
      document.documentElement.classList.add('light');
    }
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      const isLight = document.documentElement.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  window.initTheme = initTheme;
})();
