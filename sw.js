const CACHE = 'kariwala-connect-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Never cache Google Sheets data - always fetch fresh so the app reflects
// the latest sheet updates. Only the app shell (HTML/CSS/JS/icons) is cached
// so the app still opens when offline.
self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  if (url.includes('docs.google.com') || url.includes('drive.google.com')) {
    return; // let these go straight to the network
  }
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
