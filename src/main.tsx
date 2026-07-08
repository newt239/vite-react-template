import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Home } from "#/routes/home";
import { RootLayout } from "#/routes/root-layout";
import "#/index.css";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [{ Component: Home, index: true }],
    path: "/",
  },
]);

const rootElement = document.querySelector("#root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
