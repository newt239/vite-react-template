import { Home } from "#/routes/home";
import { homeAction, homeLoader } from "#/routes/home.data";
import { RootLayout } from "#/routes/root-layout";
import { rootLoader, shouldRevalidateRoot } from "#/routes/root-layout.data";

import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    children: [{ Component: Home, action: homeAction, index: true, loader: homeLoader }],
    loader: rootLoader,
    path: "/",
    shouldRevalidate: shouldRevalidateRoot,
  },
];
