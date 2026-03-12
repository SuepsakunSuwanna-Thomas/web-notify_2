importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyASQaUu3QclUqig5Sx7j5ldCFe480TaeDQ",
  authDomain: "account-b893a.firebaseapp.com",
  projectId: "account-b893a",
  messagingSenderId: "881003637393",
  appId: "1:881003637393:web:d92682299ec638d50ded30"
});

const messaging = firebase.messaging();

// รับข้อความเบื้องหลัง
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827347.png',
    data: {
      url: payload.data.click_action // เก็บ URL ไว้ใน data
    }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 🔴 ส่วนที่เพิ่ม: เมื่อมีการคลิกแจ้งเตือน
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // ปิดแจ้งเตือน
  const urlToOpen = event.notification.data.url || 'https://google.com';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // ถ้าเปิดเว็บค้างไว้แล้วให้สลับไปหน้านั้น
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) return client.focus();
      }
      // ถ้ายังไม่เปิดให้เปิดแท็บใหม่
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});
