import { Outlet, useLoaderData } from "react-router";

import type { rootLoader } from "#/routes/root-layout.data";

export const RootLayout = () => {
  const { views } = useLoaderData<typeof rootLoader>();

  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>閲覧数: {views.toLocaleString("ja-JP")}</p>
      </footer>
    </>
  );
};
