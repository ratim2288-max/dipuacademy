// Self-unregistering Service Worker — Cleans up all caches and unregisters itself
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      clients.forEach(client => {
        try { client.navigate(client.url); } catch (err) {}
      });
    })
  );
});

// Pass-through fetch - never intercept navigations or serve stale offline page
self.addEventListener('fetch', (e) => {
  // Let all network requests pass through cleanly
  return;
});
