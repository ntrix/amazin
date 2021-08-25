/* eslint-disable quotes, comma-spacing */
const PrecacheConfig = [
  // ["/"],
  // ["/deal"],
  // ["/search/category/All/order/newest"],
  // ["/banner/bestseller"],
  // ["/video"],
  // ["/customer"],
];
/* eslint-enable quotes, comma-spacing */
const CacheNamePrefix = `sw-precache-v1--${
  self.registration ? self.registration.scope : ''
}-`;

const IgnoreUrlParametersMatching = [/^utm_/];

const addDirectoryIndex = function (originalUrl, index) {
  const url = new URL(originalUrl);
  if (url.pathname.slice(-1) === '/') {
    url.pathname += index;
  }
  return url.toString();
};

const getCacheBustedUrl = function (url, param) {
  param = param || Date.now();

  const urlWithCacheBusting = new URL(url);
  urlWithCacheBusting.search += `${
    urlWithCacheBusting.search ? '&' : ''
  }sw-precache=${param}`;

  return urlWithCacheBusting.toString();
};

const isPathWhitelisted = function (whitelist, absoluteUrlString) {
  // If the whitelist is empty, then consider all URLs to be whitelisted.
  if (whitelist.length === 0) {
    return true;
  }

  // Otherwise compare each path regex to the path of the URL passed in.
  const path = new URL(absoluteUrlString).pathname;
  return whitelist.some(function (whitelistedPathRegex) {
    return path.match(whitelistedPathRegex);
  });
};

const populateCurrentCacheNames = function (
  precacheConfig,
  cacheNamePrefix,
  baseUrl
) {
  const absoluteUrlToCacheName = {};
  const currentCacheNamesToAbsoluteUrl = {};

  precacheConfig.forEach(function (cacheOption) {
    const absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
    const cacheName = `${cacheNamePrefix + absoluteUrl}-${cacheOption[1]}`;
    currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
    absoluteUrlToCacheName[absoluteUrl] = cacheName;
  });

  return { absoluteUrlToCacheName, currentCacheNamesToAbsoluteUrl };
};

const stripIgnoredUrlParameters = function (
  originalUrl,
  ignoreUrlParametersMatching
) {
  const url = new URL(originalUrl);

  url.search = url.search
    .slice(1) // Exclude initial '?'
    .split('&') // Split into an array of 'key=value' strings
    .map(function (kv) {
      return kv.split('='); // Split each 'key=value' string into a [key, value] array
    })
    .filter(function (kv) {
      return ignoreUrlParametersMatching.every(function (ignoredRegex) {
        return !ignoredRegex.test(kv[0]); // Return true if the key doesn't match any of the regex-es.
      });
    })
    .map(function (kv) {
      return kv.join('='); // Join each [key, value] array into a 'key=value' string
    })
    .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

  return url.toString();
};

const mappings = populateCurrentCacheNames(
  PrecacheConfig,
  CacheNamePrefix,
  self.location
);
const AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
const CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function (cacheNames) {
    return Promise.all(
      cacheNames.map(function (cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(
      Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function (cacheName) {
        return caches.open(cacheName).then(function (cache) {
          // Get a list of all the entries in the specific named cache.
          // For caches that are already populated for a given version of a
          // resource, there should be 1 entry.
          return cache.keys().then(function (keys) {
            // If there are 0 entries, either because this is a brand new version
            // of a resource or because the install step was interrupted the
            // last time it ran, then we need to populate the cache.
            if (keys.length === 0) {
              // Use the last bit of the cache name, which contains the hash,
              // as the cache-busting parameter.
              // See https://github.com/GoogleChrome/sw-precache/issues/100
              const cacheBustParam = cacheName.split('-').pop();
              const urlWithCacheBusting = getCacheBustedUrl(
                CurrentCacheNamesToAbsoluteUrl[cacheName],
                cacheBustParam
              );

              const request = new Request(urlWithCacheBusting, {
                credentials: 'same-origin'
              });
              return fetch(request).then(function (response) {
                if (response.ok) {
                  return cache.put(
                    CurrentCacheNamesToAbsoluteUrl[cacheName],
                    response
                  );
                }

                console.error(
                  'Request for %s returned a response status %d, ' +
                    'so not attempting to cache it.',
                  urlWithCacheBusting,
                  response.status
                );
                // Get rid of the empty cache if we can't add a successful response to it.
                return caches.delete(cacheName);
              });
            }
          });
        });
      })
    )
      .then(function () {
        return caches.keys().then(function (allCacheNames) {
          return Promise.all(
            allCacheNames
              .filter(function (cacheName) {
                return (
                  cacheName.indexOf(CacheNamePrefix) === 0 &&
                  !(cacheName in CurrentCacheNamesToAbsoluteUrl)
                );
              })
              .map(function (cacheName) {
                return caches.delete(cacheName);
              })
          );
        });
      })
      .then(function () {
        if (typeof self.skipWaiting === 'function') {
          // Force the SW to transition from installing -> active state
          self.skipWaiting();
        }
      })
  );
});

if (self.clients && typeof self.clients.claim === 'function') {
  self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function (event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches()
      .then(function () {
        console.log('Caches deleted.');
        event.ports[0].postMessage({
          error: null
        });
      })
      .catch(function (error) {
        console.log('Caches not deleted:', error);
        event.ports[0].postMessage({ error });
      });
  }
});

self.addEventListener('fetch', function (event) {
  if (event.request.method === 'GET') {
    let urlWithoutIgnoredParameters = stripIgnoredUrlParameters(
      event.request.url,
      IgnoreUrlParametersMatching
    );

    let cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    const directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(
        urlWithoutIgnoredParameters,
        directoryIndex
      );
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    const navigateFallback = '/index.html';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (
      !cacheName &&
      navigateFallback &&
      event.request.headers.has('accept') &&
      event.request.headers.get('accept').includes('text/html') &&
      /* eslint-disable quotes, comma-spacing */
      isPathWhitelisted([], event.request.url)
    ) {
      /* eslint-enable quotes, comma-spacing */
      const navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches
          .open(cacheName)
          .then(function (cache) {
            return cache.keys().then(function (keys) {
              return cache.match(keys[0]).then(function (response) {
                if (response) {
                  return response;
                }
                // If for some reason the response was deleted from the cache,
                // raise and exception and fall back to the fetch() triggered in the catch().
                throw Error(`The cache ${cacheName} is empty.`);
              });
            });
          })
          .catch(function (e) {
            console.warn(
              'Couldn\'t serve response for "%s" from cache: %O',
              event.request.url,
              e
            );
            return fetch(event.request);
          })
      );
    }
  }
});
