import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/translations/i18n.ts";
import "./index.css";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
