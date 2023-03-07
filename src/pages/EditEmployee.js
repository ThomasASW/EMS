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
            callback: () => navigate("/list/employee"),
          })
        );
      });
  }, [id]);

  const handleSuccess = () => {
    dispatch(
      notify({
        modalHeader: "Success",
        modalText: "Employee updated successfully...",
        callback: () => navigate("/list/employee"),
      })
    );
  };

  const handleSubmit = async (event, name, email, password, role) => {
    event.preventDefault();
    if (Number(role) !== 0) {
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
    } else {
      dispatch(
        notify({
          modalHeader: "Warning",
          modalText: "Role cannot be empty",
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
