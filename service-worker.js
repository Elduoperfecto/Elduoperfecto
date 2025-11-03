// ==========================
// 🚀 SERVICE WORKER PWA
// ==========================

// Nombre del caché
const CACHE_NAME = "duo-perfecto-v1";

// Archivos que se van a guardar en caché
const urlsToCache = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/menu.html",
  "/promos.html",
  "/contacto.html",
  "/imagenes/icon-192.png",
  "/imagenes/icon-512.png",
  "/imagenes/logotipo.jpeg",
  "/imagenes/favicon.jpeg"
];

// Evento de instalación: guarda los archivos en caché
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("📦 Archivos cacheados correctamente");
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de activación: limpia cachés viejos si cambias la versión
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("🧹 Caché vieja eliminada:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Evento fetch: intercepta peticiones y responde con caché o red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, devuelve eso; sino, lo busca online
        return response || fetch(event.request);
      })
  );
});
