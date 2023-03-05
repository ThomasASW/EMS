import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import BootstrapTable from "./BootstrapTable";

const data = [
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
];

const headers = ["#", "Name", "Operations"];

test("Bootstrap Table Data Render Test", async () => {
  const editFn = jest.fn((id) => {
    console.log(id);
  });
  const deleteFn = jest.fn((id) => {
    console.log(id);
  });
  render(
    <BootstrapTable
      headers={headers}
      data={data}
      editFn={editFn}
      deleteFn={deleteFn}
    />
  );
  const roleName = screen.getByText("Admin");
  expect(roleName).toBeInTheDocument();
});

test("Bootstrap Table Header Render Test", async () => {
  const editFn = jest.fn((id) => {
    console.log(id);
  });
  const deleteFn = jest.fn((id) => {
    console.log(id);
  });
  render(
    <BootstrapTable
      headers={headers}
      data={data}
      editFn={editFn}
      deleteFn={deleteFn}
    />
  );
  const headerName = screen.getByText("Operations");
  expect(headerName).toBeInTheDocument();
});

test("Bootstrap Table Edit Test", async () => {
  const editFn = jest.fn((id) => {
    console.log(id);
  });
  const deleteFn = jest.fn((id) => {
    console.log(id);
  });
  render(
    <BootstrapTable
      headers={headers}
      data={data}
      editFn={editFn}
      deleteFn={deleteFn}
    />
  );
  const editButton = screen.getAllByAltText("Edit Button")[0];
  userEvent.click(editButton);
  expect(editFn).toBeCalled();
  expect(editFn).toBeCalledTimes(1);
  expect(editFn).toBeCalledWith(1);
});

test("Bootstrap Table Delete Test", async () => {
  const editFn = jest.fn((id) => {
    console.log(id);
  });
  const deleteFn = jest.fn((id) => {
    console.log(id);
  });
  render(
    <BootstrapTable
      headers={headers}
      data={data}
      editFn={editFn}
      deleteFn={deleteFn}
    />
  );
  const deleteButton = screen.getAllByAltText("Delete Button")[0];
  userEvent.click(deleteButton);
  expect(deleteFn).toBeCalled();
  expect(deleteFn).toBeCalledTimes(1);
  expect(deleteFn).toBeCalledWith(1);
});
