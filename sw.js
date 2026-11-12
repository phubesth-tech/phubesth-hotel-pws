const CACHE_NAME = 'phubesth-hotel-pms-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Icon.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('ntfy.sh') || event.request.url.includes('qrserver.com') || event.request.url.includes('192.168.')) return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
