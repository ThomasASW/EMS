import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NotifyModal from "./NotifyModal";

test("Notify Modal Visible Test", async () => {
  const modalDetails = {
    showModal: true,
    modalHeader: "Success",
    modalText: "Successful",
  };
  const handleInput = jest.fn(() => {
    console.log("close");
  });
  render(<NotifyModal modalDetails={modalDetails} handleInput={handleInput} />);
  const header = screen.getByText("Success");
  expect(header).toBeInTheDocument();
});

test("Notify Modal Invisible Test", async () => {
  const modalDetails = {
    showModal: false,
    modalHeader: "Success",
    modalText: "Successful",
  };
  const handleInput = jest.fn(() => {
    console.log("close");
  });
  render(<NotifyModal modalDetails={modalDetails} handleInput={handleInput} />);
  const header = screen.queryByText("Success");
  expect(header).not.toBeInTheDocument();
});

test("Notify Modal Input Close Test", async () => {
  const modalDetails = {
    showModal: true,
    modalHeader: "Success",
    modalText: "Successful",
  };
  const handleInput = jest.fn(() => {
    console.log("close");
  });
  render(<NotifyModal modalDetails={modalDetails} handleInput={handleInput} />);
  const cancelButton = screen.getByText("Close");
  userEvent.click(cancelButton);
  expect(handleInput).toBeCalled();
  expect(handleInput).toBeCalledTimes(1);
});
