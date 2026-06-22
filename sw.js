/* =========================================================================
   RASOI RANDOMIZER — Service worker
   Cache-first for the app shell, network-first for everything else.
   Bump CACHE_VERSION on any release to flush old caches.
   ========================================================================= */

const CACHE_VERSION = 'rasoi-v0.2.0';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './seed-library.js',
  './festivals.js',
  './app.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Cache-first for our own origin
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(res => {
          // Cache successful GETs of our own assets
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then(c => c.put(req, copy));
          }
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Network-first for Google Fonts (with cache fallback)
  if (url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
  }
});
