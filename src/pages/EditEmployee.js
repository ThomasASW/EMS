import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import NotifyModal from "../components/NotifyModal";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({});
  const [notifyDetails, setNotifyDetails] = useState({});

  const notify = (show, header, text) => {
    setNotifyDetails({
      showModal: show,
      modalHeader: header,
      modalText: text,
    });
  };

  const close = () => {
    if (notifyDetails.modalHeader === "Warning") {
      setNotifyDetails({
        showModal: false,
        modalHeader: "",
        modalText: "",
      });
    } else {
      navigate("list/employee");
    }
  };

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
        notify(true, "Error", "ID does not exist");
      });
  }, [id]);

  const handleSuccess = () => {
    notify(true, "Success", "Employee updated successfully");
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
      notify(true, "Warning", "Role cannot be empty");
    }
  };

  return (
    <>
      <NotifyModal modalDetails={notifyDetails} handleInput={close} />
      <div className="restGrid">
        <h2>Edit employee</h2>
        <EmployeeForm onSubmit={handleSubmit} initialValues={initialValues} />
      </div>
    </>
  );
};

export default EditEmployee;
