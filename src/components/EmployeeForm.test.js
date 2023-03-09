import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import DatabaseService from "../services/DatabaseService";
import EmployeeForm from "./EmployeeForm";
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

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

test("EmployeeForm Add Test", async () => {
  jest.spyOn(DatabaseService, "getRoles").mockReturnValueOnce(roles);
  const handleSubmit = jest.fn((name, email, password, role) => {
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(role);
  });
  render(<EmployeeForm onSubmit={handleSubmit} initialValues={{}} />);
  await waitFor(() => {
    const roleInput = screen.getByText("Admin");
  });
  const nameInput = screen.getByLabelText("Name");
  userEvent.type(nameInput, "Ben");
  expect(nameInput.value).toBe("Ben");
  const emailInput = screen.getByLabelText("Email address");
  userEvent.type(emailInput, "ben@email.com");
  expect(emailInput.value).toBe("ben@email.com");
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "1234" } });
  userEvent.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: "Admin" })
  );
  expect(screen.getByRole("option", { name: "Admin" }).selected).toBe(true);
  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);
  expect(handleSubmit).toHaveBeenCalled();
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(
    "Ben",
    "ben@email.com",
    "1234",
    "1"
  );
});

test("EmployeeForm Initial Value Test", async () => {
  jest.spyOn(DatabaseService, "getRoles").mockReturnValueOnce(roles);
  const handleSubmit = jest.fn((name, email, password, role) => {
    console.log(name);
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
  expect(DatabaseService.getRoles).toHaveBeenCalled();
  await waitFor(() => {
    const roleInput = screen.getByText("Admin");
    expect(roleInput.selected).toBeTruthy();
  });
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput.value).toBe("Ben");
  const emailInput = screen.getByLabelText("Email address");
  expect(emailInput.value).toBe("ben@gmail.com");
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput.value).toBe("1234");
});
