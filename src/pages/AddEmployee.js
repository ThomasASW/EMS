import React from "react";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import EmployeeForm from "../components/EmployeeForm";
import DatabaseService from "../services/DatabaseService";

const AddEmployee = () => {
  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(
      notify({
        modalHeader: "Success",
        modalText: "Employee added successfully...",
        isConfirm: false,
        closeCallback: undefined,
        confirmCallback: undefined,
      })
    );
  };

  const handleSubmit = async (event, name, email, password, role) => {
    event.preventDefault();
    try {
      await DatabaseService.addEmployee({
        name: name,
        email: email,
        password: password,
        role: Number(role),
      });
      handleSuccess();
    } catch (error) {
      dispatch(
        notify({
          modalHeader: error.message,
          modalText: "Error adding employee",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
    }
  };

  return (
    <div className="restGrid">
      <h2>Add employee</h2>
      <EmployeeForm onSubmit={handleSubmit} initialValues={{}} />
    </div>
  );
};

export default AddEmployee;
