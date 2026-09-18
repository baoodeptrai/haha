// File xử lý hiển thị thông báo nền hệ thống (Service Worker)
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Lắng nghe sự kiện đẩy thông báo
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const title = event.data.title || "⏰ THÔNG BÁO HỆ THỐNG";
        const options = {
            body: event.data.body || "Đến giờ hẹn!",
            icon: "https://cdn-icons-png.flaticon.com/512/3602/3602145.png",
            badge: "https://cdn-icons-png.flaticon.com/512/3602/3602145.png",
            vibrate: [300, 100, 300, 100, 300],
            tag: 'alarm-notification-' + Date.now(),
            renotify: true,
            requireInteraction: true // Giữ thông báo trên màn hình khóa cho đến khi bấm vào
        };

        self.registration.showNotification(title, options);
    }
});