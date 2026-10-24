import React from "react";
import { createRoot } from "react-dom/client";
import ProductCatalog from "./components/ProductCatalog.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductCatalog />
  </React.StrictMode>,
);
