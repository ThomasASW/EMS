import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ConfirmModal from "./ConfirmModal";
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

test("Confirm Modal Visible Test", async () => {
  const modalDetails = {
    showModal: true,
    isConfirm: true,
    modalHeader: "Success",
    modalText: "Successful",
    closeCallback: undefined,
    confirmCallback: undefined,
  };
  render(<ConfirmModal modalDetails={modalDetails} />);
  const header = screen.getByText("Success");
  expect(header).toBeInTheDocument();
});

test("Confirm Modal Invisible Test", async () => {
  const modalDetails = {
    showModal: false,
    isConfirm: true,
    modalHeader: "Success",
    modalText: "Successful",
    closeCallback: undefined,
    confirmCallback: undefined,
  };
  render(<ConfirmModal modalDetails={modalDetails} />);
  const header = screen.queryByText("Success");
  expect(header).not.toBeInTheDocument();
});

test("Confirm Modal Input Cancel Test", async () => {
  const modalDetails = {
    showModal: true,
    isConfirm: true,
    modalHeader: "Success",
    modalText: "Successful",
    closeCallback: undefined,
    confirmCallback: undefined,
  };
  render(<ConfirmModal modalDetails={modalDetails} />);
  const cancelButton = screen.getByText("Cancel");
  userEvent.click(cancelButton);
  expect(mockDispatch).toBeCalled();
  expect(mockDispatch).toBeCalledTimes(1);
});

test("Confirm Modal Input Confirm Test", async () => {
  const modalDetails = {
    showModal: true,
    isConfirm: true,
    modalHeader: "Success",
    modalText: "Successful",
    closeCallback: undefined,
    confirmCallback: undefined,
  };
  render(<ConfirmModal modalDetails={modalDetails} />);
  const cancelButton = screen.getByText("Confirm");
  userEvent.click(cancelButton);
  expect(mockDispatch).toBeCalled();
  expect(mockDispatch).toBeCalledTimes(1);
});
