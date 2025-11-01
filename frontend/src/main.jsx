import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AgriBotProvider } from "./context/AgriBotContext.jsx";
import  { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <AgriBotProvider>
      <App />
    </AgriBotProvider>
    </AuthProvider>
  </StrictMode>
);
