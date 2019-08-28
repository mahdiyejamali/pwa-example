//PWA-5 add this file
if ("function" === typeof importScripts) {
  console.log({ importScripts });
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /**
     * PWA-5-1.
     * you can use skipWaiting and clientsClaim to force the new
     * service worker to immediately take control of open pages
     */
    workbox.skipWaiting();
    workbox.clientsClaim();

    self.addEventListener("install", event => {
      console.log("install.");
      // PWA-5-2. We can do cleanup of cache here
    });

    self.addEventListener("activate", event => {
      console.log("activate");
      // PWA-5-3. we can interact with localStorage or indexDB here (for instance: cache outgoing requests)
    });

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* PWA-5-4. Cache data fetch */
    workbox.routing.registerRoute(
      new RegExp("http://.*:3000/posts"),
      workbox.strategies.networkFirst()
    );

    /* Custom cache rules for route of files */
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|json)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
