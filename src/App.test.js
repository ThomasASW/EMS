import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
const mockSelector = jest.fn(() => {
  return {
    showModal: false,
    modalHeader: "",
    modalText: "",
    isConfirm: false,
    closeCallback: undefined,
    confirmCallback: undefined,
  };
});
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

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
  jest.spyOn(Storage.prototype, "getItem");
  Storage.prototype.getItem = jest.fn().mockReturnValue("1");
  render(
    <MemoryRouter initialEntries={[{ pathname: "/profile" }]}>
      <App />
    </MemoryRouter>
  );
  const footerLink = screen.queryByText("Privacy Policy");
  expect(footerLink).toBeInTheDocument();
});
