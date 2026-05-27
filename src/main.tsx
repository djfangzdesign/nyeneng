import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Use basename from import.meta.env.BASE_URL for custom domain support */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
