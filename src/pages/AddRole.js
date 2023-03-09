import React from "react";
import RoleForm from "../components/RoleForm";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import DatabaseService from "../services/DatabaseService";

const AddRole = () => {
  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(
      notify({
        modalHeader: "Success",
        modalText: "Role added successfully...",
        isConfirm: false,
        closeCallback: undefined,
        confirmCallback: undefined,
      })
    );
  };

  const handleSubmit = async (event, role) => {
    event.preventDefault();
    try {
      await DatabaseService.addRole({
        roleName: role,
      });
      handleSuccess();
    } catch (error) {
      dispatch(
        notify({
          modalHeader: error.message,
          modalText: "Error adding role",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
    }
  };

  return (
    <div className="restGrid">
      <h2>Add role</h2>
      <RoleForm onSubmit={handleSubmit} initialValue={undefined} />
    </div>
  );
};

export default AddRole;
