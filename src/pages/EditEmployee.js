import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        setInitialValues({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
          role: response.data.role,
        });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(
          notify({
            modalHeader: "Error",
            modalText: "ID does not exist",
            isConfirm: false,
            closeCallback: () => navigate("/list/employee"),
            confirmCallback: undefined,
          })
        );
      });
  }, [id]);

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
    await axios
      .put(`http://localhost:3000/users/${id}`, {
        id: id,
        name: name,
        email: email,
        password: password,
        role: Number(role),
      })
      .then(handleSuccess)
      .catch((error) => console.log(error));
  };

  return (
    <div className="restGrid">
      <h2>Edit employee</h2>
      <EmployeeForm onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
};

export default EditEmployee;
