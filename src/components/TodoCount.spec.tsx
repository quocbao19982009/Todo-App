import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TodoCount from "./TodoCount";

it("should render correctly", () => {
  render(<TodoCount count={3} />);

  expect(screen.getByText(/3 todos/i));
});

it("should render custom label correctly", () => {
  render(<TodoCount count={1} label="Hallo" />);

  expect(screen.getByText(/1 hallo/i));
});
