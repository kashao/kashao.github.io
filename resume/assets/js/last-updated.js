(function () {
  function initLastUpdated(lastUpdated) {
    if (!lastUpdated) return;
    try {
      const dt = new Date(document.lastModified);
      if (!Number.isNaN(+dt)) {
        lastUpdated.textContent = dt.toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      }
    } catch {}
  }

  window.initLastUpdated = initLastUpdated;
})();
