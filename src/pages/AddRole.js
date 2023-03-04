import axios from "axios";
import React, { useState } from "react";
import NotifyModal from "../components/NotifyModal";
import RoleForm from "../components/RoleForm";

const AddRole = () => {
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
    notify(true, "Success", "Role added successfully...");
  };

  const handleSubmit = async (event, role) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3000/roles", {
        roleName: role,
      })
      .then(handleSuccess)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NotifyModal modalDetails={notifyDetails} handleInput={close} />
      <div className="restGrid">
        <h2>Add role</h2>
        <RoleForm onSubmit={handleSubmit} initialValue={undefined} />
      </div>
    </>
  );
};

export default AddRole;
