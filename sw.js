const CACHE_NAME = 'phubesth-hotel-pms-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('ntfy.sh')) return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
