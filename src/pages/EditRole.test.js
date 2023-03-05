import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import EditRole from "./EditRole";
import axios from "axios";
import { act } from "react-dom/test-utils";
jest.mock("axios");

const response = {
  data: {
    id: 1,
    roleName: "Admin",
  },
};

test("EditRole Axios test", async () => {
  act(() => {
    axios.get.mockResolvedValueOnce(response);
  });
  render(
    <BrowserRouter>
      <EditRole />
    </BrowserRouter>
  );
  await waitFor(() => {
    const roleInput = screen.getByLabelText("Role Name");
    expect(roleInput.value).toBe("Admin");
  });
  expect(axios.get).toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("EditRole Axios fail test", async () => {
  act(() => {
    axios.get.mockResolvedValueOnce(Promise.reject({ status: 404, data: {} }));
  });
  render(
    <BrowserRouter>
      <EditRole />
    </BrowserRouter>
  );
  await waitFor(() => {
    const header = screen.getByText("Error");
    expect(header).toBeInTheDocument();
  });
  expect(axios.get).toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalledTimes(1);
});
