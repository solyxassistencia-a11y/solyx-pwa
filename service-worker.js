const CACHE_NAME = "AppFidelidade-v11";
const OFFLINE_URL = "/offline.html"; // A sua página do Quiz

const urlsToCache = [
  "/",
  OFFLINE_URL
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
          // Salva a página principal e o Quiz na memória do celular na instalação
          return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Tenta puxar do cache primeiro. Se não achar, tenta buscar na internet (fetch)
        return response || fetch(event.request).catch(() => {
            // SE A INTERNET CAIR (deu erro no fetch) E O USUÁRIO QUISER ABRIR A PÁGINA...
            if (event.request.mode === 'navigate') {
                // ... ELE EXIBE O QUIZ OFFLINE QUE ESTÁ SALVO NO CACHE!
                return caches.match(OFFLINE_URL);
            }
        });
      })
  );
});
