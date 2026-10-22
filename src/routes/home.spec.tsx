import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test, vi } from "vite-plus/test";

import { routes } from "#/router";

vi.mock("void/client", () => ({
  FetchError: class FetchError extends Error {
    public override name = "FetchError";
  },
  fetch: vi.fn(async (path: string) => {
    const data = await Promise.resolve(
      path === "/api/views"
        ? { views: 3 }
        : [{ body: "こんにちは", createdAt: "2026-10-22 01:00:00", id: 1, name: "newt" }],
    );
    return data;
  }),
}));

test("API から取得したメッセージと閲覧数が表示される", async () => {
  render(<RouterProvider router={createMemoryRouter(routes)} />);

  expect(await screen.findByText("こんにちは")).toBeInTheDocument();
  expect(screen.getByText("閲覧数: 3")).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "名前" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "メッセージ" })).toBeInTheDocument();
});
