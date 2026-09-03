const CACHE = 'kariwala-connect-v2';
const SHELL = [
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

// Never cache Google Sheets/Drive data - always fetch fresh.
// The page itself (index.html) is also always fetched fresh from the
// network first, so updates show up on the very next reload - only if
// there's no internet at all does it fall back to the last cached copy,
// just so the app still opens offline. Only icons/manifest (which barely
// ever change) are served cache-first for speed.
self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  if (url.includes('docs.google.com') || url.includes('drive.google.com')) {
    return; // let these go straight to the network
  }

  const isPage = e.request.mode === 'navigate' || url.endsWith('/') || url.endsWith('index.html');
  if (isPage) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
