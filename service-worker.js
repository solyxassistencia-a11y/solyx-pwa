const CACHE_NAME = "AppFidelidade-v13"; // Mudamos para v11 para forçar a atualização!
const OFFLINE_URL = "offline.html"; // Sem a barra (/) no início!

const urlsToCache = [
  "./", // Ponto e barra significa "A página atual (index)"
  OFFLINE_URL
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
          // Salva a página principal e o Quiz na memória
          return cache.addAll(urlsToCache);
      })
      .catch(err => console.error("Erro ao fazer cache dos arquivos:", err))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request).catch(() => {
            // Se a internet cair e for uma navegação de página
            if (event.request.mode === 'navigate') {
                return caches.match(OFFLINE_URL);
            }
        });
      })
  );
});
