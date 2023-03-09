import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import DatabaseService from "../services/DatabaseService";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    loadInitialValues();
  }, [id]);

  const loadInitialValues = async () => {
    try {
      const response = await DatabaseService.getUser(id);
      setInitialValues({
        name: response.data.name,
        email: response.data.email,
        password: response.data.password,
        role: response.data.role,
      });
    } catch (error) {
      dispatch(
        notify({
          modalHeader: "Error",
          modalText: "ID does not exist",
          isConfirm: false,
          closeCallback: () => navigate("/list/employee"),
          confirmCallback: undefined,
        })
      );
    }
  };

  const handleSuccess = () => {
    dispatch(
      notify({
        modalHeader: "Success",
        modalText: "Employee updated successfully...",
        isConfirm: false,
        closeCallback: () => navigate("/list/employee"),
        confirmCallback: undefined,
      })
    );
  };

  const handleSubmit = async (event, name, email, password, role) => {
    event.preventDefault();
    try {
      await DatabaseService.editEmployee({
        id: id,
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
          modalText: "Error editing employee",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
    }
  };

  return (
    <div className="restGrid">
      <h2>Edit employee</h2>
      <EmployeeForm onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
};

export default EditEmployee;
