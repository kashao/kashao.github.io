(function () {
  const url = "https://shao.shaopara.workers.dev/track";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      event: "page_view",
      page: location.pathname,
      ts: Date.now()
    })
  }).catch(() => {});
})();
