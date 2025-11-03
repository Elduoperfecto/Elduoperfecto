self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('duo-perfecto-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/js/main.js',
        '/menu.html',
        '/promos.html',
        '/contacto.html',
        '/imagenes/icon-192.png',
        '/imagenes/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});