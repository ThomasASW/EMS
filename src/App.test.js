import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("App - login page render test", () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/login" }]}>
      <App />
    </MemoryRouter>
  );
  const footerLink = screen.queryByText("Privacy Policy");
  expect(footerLink).not.toBeInTheDocument();
});

test("App render test", () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/profile" }]}>
      <App />
    </MemoryRouter>
  );
  const footerLink = screen.queryByText("Privacy Policy");
  expect(footerLink).toBeInTheDocument();
});
