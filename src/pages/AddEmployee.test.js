import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AddEmployee from "./AddEmployee";
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

test("AddEmployee Render Test", () => {
  render(
    <BrowserRouter>
      <AddEmployee></AddEmployee>
    </BrowserRouter>
  );
  const header = screen.getByText("Add employee");
  expect(header).toBeInTheDocument();
});
