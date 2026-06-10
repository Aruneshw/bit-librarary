export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export async function showLocalNotification(
  title: string,
  body: string,
  options?: { url?: string; tag?: string; icon?: string; badge?: string }
): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  registration.active?.postMessage({
    type: 'SHOW_NOTIFICATION',
    title,
    body,
    icon: options?.icon || '/icon.png',
    badge: options?.badge || '/icon.png',
    tag: options?.tag || crypto.randomUUID(),
    renotify: true,
    vibrate: [200, 100, 200],
    data: { url: options?.url || '/' },
  });
}
