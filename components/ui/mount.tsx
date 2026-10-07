import * as React from "react";
import { createRoot } from "react-dom/client";
import InteractiveShowcase from "./demo";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <InteractiveShowcase />
    </React.StrictMode>
  );
}
