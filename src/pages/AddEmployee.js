import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployee = () => {
  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(
      notify({
        modalHeader: "Success",
        modalText: "Employee added successfully...",
        callback: undefined,
      })
    );
  };

  const handleSubmit = async (event, name, email, password, role) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3000/users", {
        name: name,
        email: email,
        password: password,
        role: Number(role),
      })
      .then(handleSuccess)
      .catch((err) => console.log(err));
  };

  return (
    <div className="restGrid">
      <h2>Add employee</h2>
      <EmployeeForm onSubmit={handleSubmit} initialValues={{}} />
    </div>
  );
};

export default AddEmployee;
