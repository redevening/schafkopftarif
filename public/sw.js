var cacheName = "schafkopftarif";
var filesToCache = [
  "/",
  "/global.css",
  "/index.html",
  "/build/bundle.css",
  "/build/bundle.js",
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
  if (e.request.url.contains("googleapis")) {
    // Don't mess up firebase stuff
    return;
  }

  e.respondWith(
    fetch(e.request).catch(function () {
      return caches.match(e.request);
    })
  );
});
