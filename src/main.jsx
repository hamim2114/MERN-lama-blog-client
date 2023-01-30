import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./context/Context";
import "./index.css";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ContextProvider>
      <ScrollToTop/>
      <App />
    </ContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
