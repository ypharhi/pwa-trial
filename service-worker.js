// Basic Setup
const CACHE_NAME = 'my-advanced-pwa-cache-v1';
const FILES_TO_CACHE = [
  'index.html',
  'notes_page.html',
  'styles.css',
  'script.js',
  'notes.js'
];

// Install Event: Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});


// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event: Intercept network requests and serve from cache if available
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});


// Sync Event: Handle background sync events
self.addEventListener('sync', (event) => {
  // Perform your data synchronization tasks here.
  // For example, sending local changes to the server.
  // You'd usually trigger a sync from the page with: `navigator.serviceWorker.ready.then(swReg => swReg.sync.register('myFirstSync'));`
  if (event.tag === 'sync-notes') {
    event.waitUntil(syncNotes());
  }
});

// Push Event: Handle push notifications
self.addEventListener('push', (event) => {
  // Display a push notification
  const title = 'New Notification';
  const options = {
    body: event.data.text(),
    icon: 'icon.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Message Event: Receive messages from the application
self.addEventListener('message', (event) => {
  // Handle messages sent from the client
  // For example, event.data could be an object that instructs the service worker to perform a task
  console.log("Service Worker received a message:", event.data);
});

///......


async function syncNotes() {
  // Your logic to sync offline notes when the connection is available
}
