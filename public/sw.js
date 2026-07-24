// Akamba Hall Library - Service Worker
// Handles: install prompt support, offline caching, and push notifications

const CACHE_NAME = 'akamba-hall-v2'
const OFFLINE_URL = '/offline'

// ─── Install: pre-cache shell ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/offline',
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/images/starehe-logo.png',
      ]).catch(() => {
        // Non-fatal: cached what we could
      })
    })
  )
  self.skipWaiting()
})

// ─── Activate: clean old caches ───────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// ─── Fetch: network-first, fallback to cache ──────────────────────────────
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and same-origin or CDN
  if (event.request.method !== 'GET') return

  // Skip Next.js internal routes
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/_next/')) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses for static assets
        if (
          response.ok &&
          (url.pathname.startsWith('/images/') ||
            url.pathname.startsWith('/icon-') ||
            url.pathname.endsWith('.png') ||
            url.pathname.endsWith('.jpg') ||
            url.pathname.endsWith('.svg'))
        ) {
          const cloned = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned))
        }
        return response
      })
      .catch(async () => {
        // Offline fallback: serve cached version or offline page
        const cached = await caches.match(event.request)
        return cached || caches.match(OFFLINE_URL)
      })
  )
})

// ─── Push Notifications ───────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return

  let data
  try {
    data = event.data.json()
  } catch {
    data = { title: 'Akamba Hall', body: event.data.text() }
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Akamba Hall Library', {
      body: data.body || 'You have a new notification',
      icon: data.icon || '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: { url: data.url || '/' },
    })
  )
})

// ─── Notification Click ────────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const targetUrl = event.notification.data?.url || '/'

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing tab if open
        for (const client of clientList) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus()
          }
        }
        // Otherwise open a new tab
        if (clients.openWindow) {
          return clients.openWindow(targetUrl)
        }
      })
  )
})
