importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAusDWT3oh6q_PS5u8H9C4EUuO3C25OA-E",
  authDomain: "erpdemo-7dfd8.firebaseapp.com",
  projectId: "erpdemo-7dfd8",
  storageBucket: "erpdemo-7dfd8.appspot.com",
  messagingSenderId: "640779355140",
  appId: "1:640779355140:web:8ba2550b65acefa9316151",
  measurementId: "G-6N05YM19FL"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener('notificationclick', function(event) {
  console.log(event.notification);
  event.notification.close();
  // Handle the click event here, such as opening a specific page
});
