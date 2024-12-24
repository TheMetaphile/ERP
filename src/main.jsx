import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import BeforeUnload from "./BeforeUnload.jsx"; // Import the new component
// import * as serviceWorkerRegistration from './firebase-messaging-sw.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {

      console.error('Service Worker registration failed:', error, "Service worker");
    });
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {/* <BeforeUnload> */}
      <RouterProvider router={router} />
    {/* </BeforeUnload> */}
  </AuthProvider>
);



