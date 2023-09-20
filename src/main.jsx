import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store";
import { Provider } from "react-redux";
const ClientIdFromEnv = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={ClientIdFromEnv}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer />
      <Toaster />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
