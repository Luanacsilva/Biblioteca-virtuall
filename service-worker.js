const CACHE_NAME = 'bookcomments-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/scripts/script.js',
    '/imagens/Logo.svg',
    '/imagens/A Casa na Floresta.jpeg',
    '/imagens/Alma.jpeg',
    '/imagens/icons/icon-192x192.png',
    '/imagens/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
