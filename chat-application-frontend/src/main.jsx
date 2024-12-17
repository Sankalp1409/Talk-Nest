import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { AppRoute } from "./config/AppRoute.jsx";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <ChatProvider>
      <AppRoute />
    </ChatProvider>
  </BrowserRouter>
);
