import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./store/useCart.jsx";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
      <ScrollToTop />
        <Toaster />
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
