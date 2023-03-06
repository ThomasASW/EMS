import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";
import { act } from "react-dom/test-utils";
jest.mock("axios");

const response = {
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

const cancelTokenSource = {
  cancel: jest.fn(),
  token: { reason: { message: "user canceled" } },
};

test("EmployeeForm Add Test", async () => {
  jest
    .spyOn(axios.CancelToken, "source")
    .mockReturnValueOnce(cancelTokenSource);
  act(() => {
    axios.get.mockResolvedValueOnce(response);
  });
  const handleSubmit = jest.fn((e, name, email, password, role) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(role);
  });
  render(<EmployeeForm onSubmit={handleSubmit} initialValues={{}} />);
  const nameInput = screen.getByLabelText("Name");
  userEvent.type(nameInput, "Ben");
  expect(nameInput.value).toBe("Ben");
  const emailInput = screen.getByLabelText("Email address");
  userEvent.type(emailInput, "ben@email.com");
  expect(emailInput.value).toBe("ben@email.com");
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "1234" } });
  await waitFor(() => {
    const roleInput = screen.getByText("Admin");
  });
  userEvent.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: "Admin" })
  );
  expect(screen.getByRole("option", { name: "Admin" }).selected).toBe(true);
  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);
  expect(handleSubmit).toHaveBeenCalled();
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test("EmployeeForm Initial Value Test", async () => {
  jest
    .spyOn(axios.CancelToken, "source")
    .mockReturnValueOnce(cancelTokenSource);
  // jest.spyOn(axios, "get").mockResolvedValueOnce("teresa teng");
  act(() => {
    axios.get.mockResolvedValueOnce(response);
  });
  const handleSubmit = jest.fn((e, name, email, password, role) => {
    e.preventDefault();
  });
  render(
    <EmployeeForm
      onSubmit={handleSubmit}
      initialValues={{
        name: "Ben",
        email: "ben@gmail.com",
        password: "1234",
        role: 1,
      }}
    />
  );
  expect(axios.get).toHaveBeenCalled();
  expect(axios.get).toBeCalledWith("http://localhost:3000/roles", {
    cancelToken: cancelTokenSource.token,
  });
  expect(axios.CancelToken.source).toBeCalledTimes(1);
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput.value).toBe("Ben");
  const emailInput = screen.getByLabelText("Email address");
  expect(emailInput.value).toBe("ben@gmail.com");
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput.value).toBe("1234");
  await waitFor(() => {
    const roleInput = screen.getByText("Admin");
    expect(roleInput.selected).toBeTruthy();
  });
});
