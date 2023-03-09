import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import EditEmployee from "./EditEmployee";
import DatabaseService from "../services/DatabaseService";
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const user = {
  data: {
    id: 7,
    name: "CJ",
    email: "cj@email.com",
    password: "1234",
    role: 3,
  },
};

const roles = {
  data: [
    {
      id: 1,
      roleName: "Admin",
    },
    {
      id: 2,
      roleName: "Employee",
    },
    {
      id: 3,
      roleName: "Consultant",
    },
    {
      roleName: "Manager",
      id: 4,
    },
  ],
};

test("EditEmployee getUser and getRole test", async () => {
  jest.spyOn(DatabaseService, "getUser").mockReturnValueOnce(user);
  jest.spyOn(DatabaseService, "getRoles").mockReturnValueOnce(roles);
  render(
    <BrowserRouter>
      <EditEmployee />
    </BrowserRouter>
  );
  await waitFor(() => {
    const roleInput = screen.getAllByRole("option")[0];
    expect(roleInput.value).toBe("1");
  });
  await waitFor(() => {
    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput.value).toBe("cj@email.com");
  });
  expect(DatabaseService.getUser).toHaveBeenCalled();
  expect(DatabaseService.getRoles).toHaveBeenCalled();
});

test("EditEmployee Axios fail test", async () => {
  jest
    .spyOn(DatabaseService, "getUser")
    .mockReturnValueOnce(Promise.reject({ status: 404, data: {} }));
  jest.spyOn(DatabaseService, "getRoles").mockReturnValueOnce(roles);
  render(
    <BrowserRouter>
      <EditEmployee />
    </BrowserRouter>
  );
  await waitFor(() => {
    const roleInput = screen.getAllByRole("option")[0];
    expect(roleInput.value).toBe("1");
  });
  expect(DatabaseService.getUser).toHaveBeenCalled();
  expect(DatabaseService.getRoles).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalled();
});
