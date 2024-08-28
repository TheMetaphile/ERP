import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAusDWT3oh6q_PS5u8H9C4EUuO3C25OA-E",
  authDomain: "erpdemo-7dfd8.firebaseapp.com",
  projectId: "erpdemo-7dfd8",
  storageBucket: "erpdemo-7dfd8.appspot.com",
  messagingSenderId: "640779355140",
  appId: "1:640779355140:web:8ba2550b65acefa9316151",
  measurementId: "G-6N05YM19FL"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
