import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm from "../components/RoleForm";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import DatabaseService from "../services/DatabaseService";

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialValue, setInitialValue] = useState();

  useEffect(() => {
    loadInitialValue();
  }, [id]);

  const loadInitialValue = async () => {
    try {
      const response = await DatabaseService.getRole(id);
      setInitialValue(response.data.roleName);
    } catch (error) {
      dispatch(
        notify({
          modalHeader: "Error",
          modalText: "ID does not exist",
          isConfirm: false,
          closeCallback: () => navigate("/list/role"),
          confirmCallback: undefined,
        })
      );
    }
  };

  const handleSuccess = () => {
    dispatch(
      notify({
        modalHeader: "Success",
        modalText: "Role updated successfully",
        isConfirm: false,
        closeCallback: () => navigate("/list/role"),
        confirmCallback: undefined,
      })
    );
  };

  const handleSubmit = async (event, role) => {
    event.preventDefault();
    try {
      await DatabaseService.editRole({
        id: id,
        roleName: role,
      });
      handleSuccess();
    } catch (error) {
      dispatch(
        notify({
          modalHeader: error.message,
          modalText: "Error editing role",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
    }
  };

  return (
    <div className="restGrid">
      <h2>Edit role</h2>
      <RoleForm onSubmit={handleSubmit} initialValue={initialValue} />
    </div>
  );
};

export default EditRole;
