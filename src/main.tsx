import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { routes } from "#/router";
import "#/index.css";

const router = createBrowserRouter(routes);

const rootElement = document.querySelector("#root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
