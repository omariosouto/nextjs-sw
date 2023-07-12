self.addEventListener('install', () => {
  console.log('service worker installed')
});

self.addEventListener('activate', () => {
  console.log('service worker activated')
});


self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);
  const BASE_URL = url.origin + url.pathname;

  if (BASE_URL.includes("/api")) {
    const cache = event.request.headers.get('X-SW-Cache');
    const retry = event.request.headers.get('X-SW-Retry');
    const expires = event.request.headers.get('X-SW-Expires');
    console.log("[cache]", cache);
    console.log("[retry]", retry);
    console.log("[expires]", expires);
    if(cache === 'true') {
      event.respondWith(
        caches.match(event.request)
          .then(function (response) {
            if (response) {
              return response;
            }
            return fetch(event.request);
          })
      );
      return;
    }


    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.status === 200) {
            const clonedRes = res.clone();
            caches.open('sw-proxy-cache-v1')
              .then(cache => {
                cache.put(event.request, clonedRes);
              });
          }
          
          return res;
        })
        .catch(err => {
          console.error('Error fetching from GitHub API: ', err);
        })
    );
  }
});
