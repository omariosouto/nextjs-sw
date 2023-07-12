self.addEventListener('install', () => {
  console.log('service worker installed')
});

self.addEventListener('activate', () => {
  console.log('service worker activated')
});


const cacheName = 'v1'

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const BASE_URL = url.origin + url.pathname;

  if (BASE_URL.includes("/api")) {
    const cache = event.request.headers.get('X-SW-Cache');
    const retry = event.request.headers.get('X-SW-Retry');
    const expires = event.request.headers.get('X-SW-Expires');
    console.log("[cache]", cache);
    console.log("[retry]", retry);
    console.log("[expires]", expires);

    event.respondWith(
      cacheClone(event)
        .catch(() => caches.match(event.request))
        .then((res) => res)
    );
    return;
  }

  event.respondWith(fetch(event.request));
});