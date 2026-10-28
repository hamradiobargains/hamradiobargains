const CACHE = "hrb-app-v2";
const SHELL = ["/app/", "/app/index.html", "/app/manifest.webmanifest", "/app/icon-192.png", "/app/icon-512.png", "/app/apple-touch-icon.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.pathname.endsWith(".json") || url.pathname.endsWith(".xml")) {
    // Data feeds: freshest first, cache as the offline fallback.
    e.respondWith(fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request)));
    return;
  }
  if (e.request.mode === "navigate" || url.pathname.endsWith("/app/") || url.pathname.endsWith("index.html")) {
    // The app page itself: network-first so updates arrive on the next open.
    e.respondWith(fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
