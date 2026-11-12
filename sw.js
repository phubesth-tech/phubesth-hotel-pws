const CACHE_NAME = 'phubesth-hotel-native-v5';
const ASSETS = [
'./',
'./index.html',
'./manifest.json'
];
​self.addEventListener('install', (event) => {
self.skipWaiting();
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => {}))
);
});
​self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) =>
Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
).then(() => self.clients.claim())
);
});
​self.addEventListener('fetch', (event) => {
if (event.request.method !== 'GET' || event.request.url.includes('ntfy.sh')) return;
event.respondWith(
fetch(event.request).catch(() => caches.match(event.request))
);
});
