// Kariwala Connect service worker — keeps the app opening fast and offline-safe.
// The page itself is always fetched fresh first, so updates show on the next
// open. API calls (script.google.com) and sign-in are never touched.
const CACHE = 'kariwala-connect-v3';
const SHELL = ['./manifest.json', './icons/icon-192.png', './icons/icon-512.png',
  './icons/logo-full.png', './icons/logo-full-white.png', './icons/logo-mark.png', './icons/logo-mark-white.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // API calls are POSTs — leave alone
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;        // Google, fonts, Drive — leave alone

  if (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('./')))
    );
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
