import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Todolister title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Todolister/);
  expect(linkElement).toBeInTheDocument();
});
