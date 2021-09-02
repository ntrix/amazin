import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store/store';
// import * as serviceWorker from './serviceWorker';

// import { registerRoute, setCatchHandler } from 'workbox-routing';
// import {
//   NetworkFirst,
//   StaleWhileRevalidate,
//   CacheFirst
// } from 'workbox-strategies';
// // Used for filtering matches based on status code, header, or both
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// // Used to limit entries in cache, remove entries after a certain period of time
// import { ExpirationPlugin } from 'workbox-expiration';
// import { precacheAndRoute, matchPrecache } from 'workbox-precaching';

import App from './app';
import(/* webpackPreload: true */ './fonts/AmazonEmber_W_SBd.woff2');
import(/* webpackPreload: true */ './fonts/AmazonEmber_W_He.woff2');
import(/* webpackPreload: true */ './fonts/AmazonEmber_W_Bd.woff2');
import(/* webpackPreload: true */ './fonts/FontAwesome.woff2');

import(/* webpackPreload: true */ './fonts/fonts.css');
import(/* webpackPreload: true */ './index.css');
import(/* webpackPreload: true */ './app/nav.css');
import(/* webpackPreload: true */ './app/responsive.css');
import(/* webpackPreload: true */ 'swiper/swiper-bundle.css');
import(/* webpackPreload: true */ './fonts/font-awesome.css');

import(/* webpackPreload: true */ './screens/Product/VideoScreen/videoScreen.css');
import(/* webpackPreload: true */ 'react-multi-carousel/lib/styles.css');
import(/* webpackPreload: true */ './screens/Product/DealScreen/dealScreen.css');
import(/* webpackPreload: true */ './screens/Product/ProductScreen/productScreen.css');
import(/* webpackPreload: true */ './screens/User/CurrencyScreen/currencyScreen.css');
import(/* webpackPreload: true */ './screens/User/CustomerScreen/customerScreen.css');

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// // Catch routing errors, like if the user is offline
// setCatchHandler(async ({ event }) => {
//   // Return the precached offline page if a document is being requested
//   if (event.request.destination === 'document') {
//     return matchPrecache('/');
//   }
//   return Response.error();
// });

// // Ensure your build step is configured to include /offline.html as part of your precache manifest.
// precacheAndRoute([
//   { url: '/', revision: null },
//   { url: '/deal', revision: null },
//   { url: '/search/category/All/order/newest', revision: null },
//   { url: 'banner/bestseller', revision: null },
//   { url: 'video', revision: null },
//   { url: 'customer', revision: null }
// ]);

// // Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
// registerRoute(
//   // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
//   ({ request }) =>
//     request.destination === 'style' ||
//     request.destination === 'script' ||
//     request.destination === 'worker',
//   // Use a Stale While Revalidate caching strategy
//   new StaleWhileRevalidate({
//     // Put all cached files in a cache named 'assets'
//     cacheName: 'assets',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200]
//       })
//     ]
//   })
// );

// // Cache page navigations (html) with a Network First strategy
// registerRoute(
//   // Check to see if the request is a navigation to a new page
//   ({ request }) => request.mode === 'navigate', // || request.destination === 'document',
//   // Use a Network First caching strategy
//   new NetworkFirst({
//     // Put all cached files in a cache named 'pages'
//     cacheName: 'screens',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200]
//       })
//     ]
//   })
// );

// // Cache images with a Cache First strategy
// registerRoute(
//   // Check to see if the request's destination is style for an image
//   ({ request }) => request.destination === 'image',
//   // Use a Cache First caching strategy
//   new CacheFirst({
//     // Put all cached files in a cache named 'images'
//     cacheName: 'images',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200]
//       }),
//       // Don't cache more than 50 items, and expire them after 30 days
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
//       })
//     ]
//   })
// );
