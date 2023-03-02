import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AddEmployee from "./AddEmployee";

test("AddEmployee Render Test", () => {
  render(
    <BrowserRouter>
      <AddEmployee></AddEmployee>
    </BrowserRouter>
  );
  const header = screen.getByText("Add employee");
  expect(header).toBeInTheDocument();
});

// import { render } from "@testing-library/react";
// import React from "react";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

// test("renders learn react link", () => {
//   render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </React.StrictMode>
//   );
// });
