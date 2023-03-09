import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import EditRole from "./EditRole";
import DatabaseService from "../services/DatabaseService";
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const role = {
  data: {
    id: 1,
    roleName: "Admin",
  },
};

test("EditRole getRole test", async () => {
  jest.spyOn(DatabaseService, "getRole").mockReturnValueOnce(role);
  render(
    <BrowserRouter>
      <EditRole />
    </BrowserRouter>
  );
  await waitFor(() => {
    const roleInput = screen.getByLabelText("Role Name");
    expect(roleInput.value).toBe("Admin");
  });
  expect(DatabaseService.getRole).toHaveBeenCalled();
  expect(DatabaseService.getRole).toHaveBeenCalledTimes(1);
});

test("EditRole Axios fail test", async () => {
  jest
    .spyOn(DatabaseService, "getRole")
    .mockReturnValueOnce(Promise.reject({ status: 404, data: {} }));
  render(
    <BrowserRouter>
      <EditRole />
    </BrowserRouter>
  );
  await waitFor(() => {
    const roleInput = screen.getByLabelText("Role Name");
  });
  expect(DatabaseService.getRole).toHaveBeenCalled();
  expect(DatabaseService.getRole).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
