import axios from "axios";
import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import NotifyModal from "../components/NotifyModal";

const AddEmployee = () => {
  const [notifyDetails, setNotifyDetails] = useState({});

  const notify = (show, header, text) => {
    setNotifyDetails({
      showModal: show,
      modalHeader: header,
      modalText: text,
    });
  };

  const close = () => {
    setNotifyDetails({
      showModal: false,
      modalHeader: "",
      modalText: "",
    });
  };

  const handleSuccess = () => {
    notify(true, "Success", "Employee added successfully...");
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
    <>
      <NotifyModal modalDetails={notifyDetails} handleInput={close} />
      <div className="restGrid">
        <h2>Add employee</h2>
        <EmployeeForm onSubmit={handleSubmit} initialValues={undefined} />
      </div>
    </>
  );
};

export default AddEmployee;
