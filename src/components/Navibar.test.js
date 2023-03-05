import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navibar from "./Navibar";

test("Navibar admin links invisible Test", async () => {
  jest.spyOn(Storage.prototype, "getItem");
  Storage.prototype.getItem = jest.fn().mockReturnValueOnce("1");
  jest.spyOn(Storage.prototype, "getItem");
  Storage.prototype.getItem = jest.fn().mockReturnValueOnce("2");
  render(
    <BrowserRouter>
      <Navibar />
    </BrowserRouter>
  );
  const navHeader = screen.queryByText("Employees");
  expect(navHeader).not.toBeInTheDocument();
});

test("Navibar admin links visible Test", async () => {
  jest.spyOn(Storage.prototype, "getItem");
  Storage.prototype.getItem = jest.fn().mockReturnValue("1");
  render(
    <BrowserRouter>
      <Navibar />
    </BrowserRouter>
  );
  const navHeader = screen.getByText("Employees");
  expect(navHeader).toBeInTheDocument();
});

test("Navibar not logged in Test", async () => {
  jest.spyOn(Storage.prototype, "getItem");
  Storage.prototype.getItem = jest.fn().mockReturnValue(undefined);
  render(
    <BrowserRouter>
      <Navibar />
    </BrowserRouter>
  );
  const navHeader = screen.getByText("Login");
  expect(navHeader).toBeInTheDocument();
});

test("Navibar logged in Test", async () => {
  jest.spyOn(Storage.prototype, "getItem");
  Storage.prototype.getItem = jest.fn().mockReturnValue("1");
  render(
    <BrowserRouter>
      <Navibar />
    </BrowserRouter>
  );
  const navHeader = screen.getByText("Logout");
  expect(navHeader).toBeInTheDocument();
});

test("Navibar log out Test", async () => {
  jest.spyOn(Storage.prototype, "getItem");
  Storage.prototype.getItem = jest.fn().mockReturnValue("1");
  jest.spyOn(Storage.prototype, "removeItem");
  Storage.prototype.removeItem = jest
    .fn()
    .mockImplementation(() => console.log("removed"));
  render(
    <BrowserRouter>
      <Navibar />
    </BrowserRouter>
  );
  const navHeader = screen.getByText("Logout");
  userEvent.click(navHeader);
  expect(Storage.prototype.removeItem).toBeCalled();
  expect(Storage.prototype.removeItem).toBeCalledTimes(2);
});
