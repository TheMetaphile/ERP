import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import BeforeUnload from "./BeforeUnload.jsx"; // Import the new component

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BeforeUnload>
      <RouterProvider router={router} />
    </BeforeUnload>
  </AuthProvider>
);



// import React from "react";
// import ReactDOM from "react-dom/client";
// import router from "./routes.jsx";
// import "./index.css";
// import { RouterProvider } from "react-router-dom";
// import { AuthProvider } from "./Context/AuthContext.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
  
//     <AuthProvider>
//     <RouterProvider router={router} />
//     </AuthProvider>
 
// );
