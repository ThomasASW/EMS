import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotifyModal from "../components/NotifyModal";
import RoleForm from "../components/RoleForm";

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValue, setInitialValue] = useState();
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
    navigate("/list/role");
  };

  useEffect(() => {
    axios(`http://localhost:3000/roles/${id}`)
      .then((response) => {
        setInitialValue(response.data.roleName);
      })
      .catch((error) => {
        console.log(error.message);
        notify(true, "Error", "ID does not exist");
      });
  }, [id]);

  const handleSuccess = () => {
    notify(true, "Success", "Role updated successfully");
  };

  const handleSubmit = async (event, role) => {
    event.preventDefault();
    await axios
      .put(`http://localhost:3000/roles/${id}`, {
        id: id,
        roleName: role,
      })
      .then(handleSuccess)
      .catch((error) => console.log(error));
  };

  return (
    <>
      <NotifyModal modalDetails={notifyDetails} handleInput={close} />
      <div className="restGrid">
        <h2>Edit role</h2>
        <RoleForm onSubmit={handleSubmit} initialValue={initialValue} />
      </div>
    </>
  );
};

export default EditRole;
