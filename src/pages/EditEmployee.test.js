import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import EditEmployee from "./EditEmployee";
import axios from "axios";
import { act } from "react-dom/test-utils";
jest.mock("axios");

const response = {
  data: {
    id: 7,
    name: "CJ",
    email: "cj@email.com",
    password: "1234",
    role: 3,
  },
};

const roles = {
  data: [
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
  ],
};

const cancelTokenSource = {
  cancel: jest.fn(),
  token: { reason: { message: "user canceled" } },
};

test("EditEmployee Axios test", async () => {
  jest
    .spyOn(axios.CancelToken, "source")
    .mockReturnValueOnce(cancelTokenSource);
  act(() => {
    axios.get.mockResolvedValueOnce(roles);
    axios.get.mockResolvedValueOnce(response);
  });
  render(
    <BrowserRouter>
      <EditEmployee />
    </BrowserRouter>
  );
  await waitFor(() => {
    const roleInput = screen.getAllByRole("option")[0];
    expect(roleInput.value).toBe("1");
  });
  await waitFor(() => {
    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput.value).toBe("cj@email.com");
  });
  expect(axios.get).toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalledTimes(2);
});

test("EditEmployee Axios fail test", async () => {
  jest
    .spyOn(axios.CancelToken, "source")
    .mockReturnValueOnce(cancelTokenSource);
  act(() => {
    axios.get.mockResolvedValueOnce(roles);
    axios.get.mockResolvedValueOnce(Promise.reject({ status: 404, data: {} }));
  });
  render(
    <BrowserRouter>
      <EditEmployee />
    </BrowserRouter>
  );
  await waitFor(() => {
    const roleInput = screen.getAllByRole("option")[0];
    expect(roleInput.value).toBe("1");
  });
  await waitFor(() => {
    const header = screen.getByText("Error");
    expect(header).toBeInTheDocument();
  });
  expect(axios.get).toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalledTimes(2);
});
