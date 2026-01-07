(function () {
  function init() {
    const app = document.getElementById('app');
    const lastUpdated = document.getElementById('lastUpdated');

    if (typeof window.initTheme === 'function') {
      window.initTheme();
    }
    if (typeof window.initLastUpdated === 'function') {
      window.initLastUpdated(lastUpdated);
    }
    if (typeof window.initRouter === 'function') {
      window.initRouter(app);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
