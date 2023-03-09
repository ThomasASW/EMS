import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NotifyModal from "./NotifyModal";
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

test("Notify Modal Visible Test", async () => {
  const modalDetails = {
    showModal: true,
    isConfirm: false,
    modalHeader: "Success",
    modalText: "Successful",
    closeCallback: undefined,
    confirmCallback: undefined,
  };
  render(<NotifyModal modalDetails={modalDetails} />);
  const header = screen.getByText("Success");
  expect(header).toBeInTheDocument();
});

test("Notify Modal Invisible Test", async () => {
  const modalDetails = {
    showModal: false,
    isConfirm: false,
    modalHeader: "Success",
    modalText: "Successful",
    closeCallback: undefined,
    confirmCallback: undefined,
  };
  render(<NotifyModal modalDetails={modalDetails} />);
  const header = screen.queryByText("Success");
  expect(header).not.toBeInTheDocument();
});

test("Notify Modal Input Close Test", async () => {
  const modalDetails = {
    showModal: true,
    isConfirm: false,
    modalHeader: "Success",
    modalText: "Successful",
    closeCallback: undefined,
    confirmCallback: undefined,
  };
  render(<NotifyModal modalDetails={modalDetails} />);
  const cancelButton = screen.getByText("Close");
  userEvent.click(cancelButton);
  expect(mockDispatch).toBeCalled();
  expect(mockDispatch).toBeCalledTimes(1);
});
