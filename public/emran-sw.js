// public/emran-sw.js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let data = {
    title: 'EMRAN Portal',
    body: 'You have a new update.',
    icon: '/emran-icon.png',
    badge: '/emran-icon.png',
    url: '/',
    image: null,
  };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch (_) {}

  const notifOptions = {
    body: data.body,
    icon: data.icon || '/emran-icon.png',
    badge: data.badge || '/emran-icon.png',
    data: { url: data.url || '/', refresh: true },
    vibrate: [200, 100, 200],
  };

  // Show the first image inside the notification if one was provided
  // This works on Android Chrome and desktop Chrome — iOS ignores it gracefully
  if (data.image) {
    notifOptions.image = data.image;
  }

  event.waitUntil(
    self.registration.showNotification(data.title, notifOptions)
  );
});

// When the user taps the notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target  = event.notification.data?.url || '/';
  const refresh = event.notification.data?.refresh === true;

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        const existing = clients.find((c) =>
          c.url.includes(self.location.origin)
        );

        if (existing) {
          existing.focus();
          existing.navigate(target);

          // Send a message to the open page to trigger a fresh API call
          // The NewsEvents page listens for this and re-fetches from the backend
          if (refresh) {
            existing.postMessage({ type: 'REFRESH_NEWSEVENTS' });
          }
        } else {
          // Open a new tab — the page will load fresh data automatically
          self.clients.openWindow(target);
        }
      })
  );
});
