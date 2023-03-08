import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "../components/BootstrapTable";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";

const ListRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    await axios
      .get("http://localhost:3000/roles")
      .then((response) => {
        if (response.data) {
          setList(response.data);
        } else {
          console.log("failed");
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteRole = (id) => {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.id === id) {
        dispatch(
          notify({
            modalHeader: "Delete role?",
            modalText: `Are you sure you want to delete ${element.roleName} role?`,
            isConfirm: true,
            closeCallback: undefined,
            confirmCallback: () => confirmDelete(id),
          })
        );
        break;
      }
    }
  };

  const confirmDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/roles/${id}`)
      .then(() => {
        dispatch(
          notify({
            modalHeader: "Success",
            modalText: "Role deleted successfully...",
            isConfirm: false,
            closeCallback: undefined,
            confirmCallback: undefined,
          })
        );
        getRoles();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="restGrid">
      <BootstrapTable
        headers={["#", "Role", "Operations"]}
        data={list.map((row) => {
          return {
            id: row.id,
            roleName: row.roleName,
            deleteFn: () => deleteRole(row.id),
            editFn: () => navigate(`/edit/role/${row.id}`),
          };
        })}
      />
    </div>
  );
};

export default ListRole;
