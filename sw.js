self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // ปล่อยผ่านให้ Vercel โหลดข้อมูลปกติ เพื่อป้องกันระบบค้าง
});
