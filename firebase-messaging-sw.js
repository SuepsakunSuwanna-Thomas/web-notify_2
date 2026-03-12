// นำเข้า Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ใส่ Config ชุดเดียวกัน
firebase.initializeApp({
  apiKey: "AIzaSyASQaUu3QclUqig5Sx7j5ldCFe480TaeDQ",
  authDomain: "account-b893a.firebaseapp.com",
  databaseURL: "https://account-b893a-default-rtdb.firebaseio.com",
  projectId: "account-b893a",
  storageBucket: "account-b893a.firebasestorage.app",
  messagingSenderId: "881003637393",
  appId: "1:881003637393:web:d92682299ec638d50ded30",
  measurementId: "G-GB9GXV6V86"
});

const messaging = firebase.messaging();

// รับข้อความและแสดงผลเมื่อผู้ใช้ "ปิดหน้าเว็บ" ไปแล้ว
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] ได้รับข้อความเบื้องหลัง: ', payload);
  
  const notificationTitle = payload.notification.title || 'มีการแจ้งเตือนใหม่';
  const notificationOptions = {
    body: payload.notification.body || 'คลิกเพื่อดูรายละเอียด',
    icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827347.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
