import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import BootstrapTable from "./BootstrapTable";

const data = [
  {
    id: 1,
    roleName: "Admin",
    editFn: jest.fn(() => console.log(1)),
    deleteFn: jest.fn(() => console.log(1)),
  },
  {
    id: 2,
    roleName: "Employee",
    editFn: jest.fn(() => console.log(2)),
    deleteFn: jest.fn(() => console.log(2)),
  },
  {
    id: 3,
    roleName: "Consultant",
    editFn: jest.fn(() => console.log(3)),
    deleteFn: jest.fn(() => console.log(3)),
  },
  {
    id: 4,
    roleName: "Manager",
    editFn: jest.fn(() => console.log(4)),
    deleteFn: jest.fn(() => console.log(4)),
  },
];

const headers = ["#", "Name", "Operations"];

test("Bootstrap Table Data Render Test", async () => {
  render(<BootstrapTable headers={headers} data={data} />);
  const roleName = screen.getByText("Admin");
  expect(roleName).toBeInTheDocument();
});

test("Bootstrap Table Header Render Test", async () => {
  render(<BootstrapTable headers={headers} data={data} />);
  const headerName = screen.getByText("Operations");
  expect(headerName).toBeInTheDocument();
});

test("Bootstrap Table Edit Test", async () => {
  const editFn = jest.fn(() => {
    console.log("editFn");
  });
  let newData = [...data];
  newData[0].editFn = editFn;
  render(<BootstrapTable headers={headers} data={newData} />);
  const editButton = screen.getAllByAltText("Edit Button")[0];
  userEvent.click(editButton);
  expect(editFn).toBeCalled();
  expect(editFn).toBeCalledTimes(1);
});

test("Bootstrap Table Delete Test", async () => {
  const deleteFn = jest.fn(() => {
    console.log("deleteFn");
  });
  let newData = [...data];
  newData[0].deleteFn = deleteFn;
  render(<BootstrapTable headers={headers} data={newData} />);
  const deleteButton = screen.getAllByAltText("Delete Button")[0];
  userEvent.click(deleteButton);
  expect(deleteFn).toBeCalled();
  expect(deleteFn).toBeCalledTimes(1);
});
