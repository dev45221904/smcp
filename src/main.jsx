/**
 * main.jsx
 * Application entry point.
 * Wraps the App component with BrowserRouter for client-side routing
 * and imports global styles.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Render the app inside the root element with routing enabled
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
