import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "../components/BootstrapTable";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import DatabaseService from "../services/DatabaseService";
import { Dna } from "react-loader-spinner";

const ListRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const roles = await DatabaseService.getRoles();
      setList(roles.data);
      setLoading(false);
    } catch (error) {
      dispatch(
        notify({
          modalHeader: error.message,
          modalText: "Error fetching data",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
    }
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
    try {
      setLoading(true);
      await DatabaseService.deleteRole(id);
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
    } catch (error) {
      setLoading(false);
      dispatch(
        notify({
          modalHeader: error.message,
          modalText: "Error deleting role",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
    }
  };

  return (
    <div className="restGrid">
      {loading ? (
        <div className="loadingSpinner">
          <Dna height={120} width={120} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ListRole;
