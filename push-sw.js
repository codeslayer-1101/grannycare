// GrannyCare Web Push service worker.
// Receives push events from the Supabase edge function and shows a notification
// even when the app tab is in the background or closed.

self.addEventListener('push', (event) => {
  let data = { title: 'GrannyCare', body: '' };
  try { data = event.data.json(); } catch (_) {}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/Icon-192.png',
      badge: '/icons/Icon-192.png',
      tag: 'grannycare-dose',      // replaces previous banner instead of stacking
      renotify: true,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
