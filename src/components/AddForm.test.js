import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AddForm from "./AddForm";

test("AddForm Submit Test", () => {
  const handleSubmit = jest.fn((e, name, email, password, role) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(role);
  });
  render(<AddForm onSubmit={handleSubmit} />);
  const nameInput = screen.getByLabelText("Name");
  fireEvent.change(nameInput, { target: { value: "Ben" } });
  const emailInput = screen.getByLabelText("Email address");
  fireEvent.change(emailInput, { target: { value: "ben@email.com" } });
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "1234" } });
  const roleInput = screen.getByRole("combobox");
  fireEvent.click(roleInput);
  const roleValue = screen.getByText("HR");
  screen.click(roleValue);
  fireEvent.change(roleInput, { target: { value: 1 } });
  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);
  expect(handleSubmit).toHaveBeenCalled();
});
