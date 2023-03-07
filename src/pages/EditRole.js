import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm from "../components/RoleForm";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialValue, setInitialValue] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/roles/${id}`)
      .then((response) => {
        setInitialValue(response.data.roleName);
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(
          notify({
            modalHeader: "Error",
            modalText: "ID does not exist",
            closeCallback: () => navigate("/list/role"),
            confirmCallback: undefined,
          })
        );
      });
  }, [id]);

  const handleSuccess = () => {
    dispatch(
      notify({
        modalHeader: "Success",
        modalText: "Role updated successfully",
        closeCallback: () => navigate("/list/role"),
        confirmCallback: undefined,
      })
    );
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
    <div className="restGrid">
      <h2>Edit role</h2>
      <RoleForm onSubmit={handleSubmit} initialValue={initialValue} />
    </div>
  );
};

export default EditRole;
