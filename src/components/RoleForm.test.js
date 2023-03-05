import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import RoleForm from "./RoleForm";

test("RoleForm Submit Test", async () => {
  const handleSubmit = jest.fn((e, role) => {
    e.preventDefault();
    console.log(role);
  });
  render(<RoleForm onSubmit={handleSubmit} />);
  const nameInput = screen.getByLabelText("Role Name");
  userEvent.type(nameInput, "Admin");
  expect(nameInput.value).toBe("Admin");
  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);
  expect(handleSubmit).toHaveBeenCalled();
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test("RoleForm Initial Value Test", async () => {
  const handleSubmit = jest.fn((e, role) => {
    e.preventDefault();
    console.log(role);
  });
  render(<RoleForm onSubmit={handleSubmit} initialValue={"Admin"} />);
  const nameInput = screen.getByLabelText("Role Name");
  expect(nameInput.value).toBe("Admin");
});
