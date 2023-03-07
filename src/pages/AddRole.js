import axios from "axios";
import React from "react";
import RoleForm from "../components/RoleForm";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";

const AddRole = () => {
  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(
      notify({
        modalHeader: "Success",
        modalText: "Role added successfully...",
        callback: undefined,
      })
    );
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
    <div className="restGrid">
      <h2>Add role</h2>
      <RoleForm onSubmit={handleSubmit} initialValue={undefined} />
    </div>
  );
};

export default AddRole;
