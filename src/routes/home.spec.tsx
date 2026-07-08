import { render, screen } from "@testing-library/react";
import { expect, test } from "vite-plus/test";

import { Home } from "#/routes/home";

test("トップページに Hello World! が表示される", () => {
  render(<Home />);
  expect(screen.getByText("Hello World!")).toBeInTheDocument();
});
