// public/emran-sw.js — place this file in your /public folder
// This service worker handles incoming push events from your backend
// and displays them as native browser notifications even when the
// EMRAN tab is closed.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let data = { title: 'EMRAN Portal', body: 'You have a new update.', icon: '/emran-icon.png', url: '/' };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch (_) {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/emran-icon.png',
      badge: '/emran-icon.png',
      data: { url: data.url || '/' },
      vibrate: [200, 100, 200],
    })
  );
});

// When the user taps the notification, open/focus the site
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(self.location.origin));
      if (existing) {
        existing.focus();
        existing.navigate(target);
      } else {
        self.clients.openWindow(target);
      }
    })
  );
});