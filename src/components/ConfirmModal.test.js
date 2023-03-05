import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ConfirmModal from "./ConfirmModal";

test("Confirm Modal Visible Test", async () => {
  const modalDetails = {
    showModal: true,
    modalHeader: "Success",
    modalText: "Successful",
    id: 1,
  };
  const handleInput = jest.fn((id) => {
    console.log(id);
  });
  render(
    <ConfirmModal modalDetails={modalDetails} handleInput={handleInput} />
  );
  const header = screen.getByText("Success");
  expect(header).toBeInTheDocument();
});

test("Confirm Modal Invisible Test", async () => {
  const modalDetails = {
    showModal: false,
    modalHeader: "Success",
    modalText: "Successful",
    id: 1,
  };
  const handleInput = jest.fn((id) => {
    console.log(id);
  });
  render(
    <ConfirmModal modalDetails={modalDetails} handleInput={handleInput} />
  );
  const header = screen.queryByText("Success");
  expect(header).not.toBeInTheDocument();
});

test("Confirm Modal Input Cancel Test", async () => {
  const modalDetails = {
    showModal: true,
    modalHeader: "Success",
    modalText: "Successful",
    id: 1,
  };
  const handleInput = jest.fn((id) => {
    console.log(id);
  });
  render(
    <ConfirmModal modalDetails={modalDetails} handleInput={handleInput} />
  );
  const cancelButton = screen.getByText("Cancel");
  userEvent.click(cancelButton);
  expect(handleInput).toBeCalled();
  expect(handleInput).toBeCalledTimes(1);
  expect(handleInput).toBeCalledWith(-1);
});

test("Confirm Modal Input Confirm Test", async () => {
  const modalDetails = {
    showModal: true,
    modalHeader: "Success",
    modalText: "Successful",
    id: 1,
  };
  const handleInput = jest.fn((id) => {
    console.log(id);
  });
  render(
    <ConfirmModal modalDetails={modalDetails} handleInput={handleInput} />
  );
  const cancelButton = screen.getByText("Confirm");
  userEvent.click(cancelButton);
  expect(handleInput).toBeCalled();
  expect(handleInput).toBeCalledTimes(1);
  expect(handleInput).toBeCalledWith(1);
});
