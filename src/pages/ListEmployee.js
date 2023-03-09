import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import BootstrapTable from "../components/BootstrapTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import DatabaseService from "../services/DatabaseService";

const ListEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("0");
  const [roleMap, setRoleMap] = useState();

  useEffect(() => {
    getRoles();
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const users = await DatabaseService.getUsers();
      setList(users.data);
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

  const getRoles = async () => {
    try {
      const roles = await DatabaseService.getRoles();
      var map = new Map();
      roles.data.forEach((element) => {
        map.set(element.id, element.roleName);
      });
      setRoleMap(map);
      setRoles(roles.data);
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

  const search = (event) => {
    setSearchText(event.target.value);
  };

  const select = (event) => {
    setFilter(event.target.value);
  };

  const deleteEmployee = (id) => {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.id === id) {
        dispatch(
          notify({
            modalHeader: "Delete employee?",
            modalText: `Are you sure you want to delete employee ${element.name}?`,
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
      await DatabaseService.deleteEmployee(id);
      dispatch(
        notify({
          modalHeader: "Success",
          modalText: "Employee deleted successfully...",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
      getUsers();
    } catch (error) {
      dispatch(
        notify({
          modalHeader: error.message,
          modalText: "Error deleting employee",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
    }
  };

  useEffect(() => {
    var nList = [...list];
    if (filter !== "0") {
      nList = nList.filter((row) => row.role.toString() === filter);
    }
    if (searchText !== "") {
      if (isNaN(searchText)) {
        nList = nList.filter((row) =>
          row.name.toLowerCase().includes(searchText)
        );
      } else {
        var id = +searchText;
        nList = nList.filter((row) => row.id === id);
      }
    }
    setFilteredList([...nList]);
  }, [filter, searchText, list]);

  return (
    <div className="restGrid">
      <Form.Control
        type="text"
        placeholder="Search"
        onChange={(event) => search(event)}
      />
      <Form.Select id="Select" onChange={(event) => select(event)}>
        <option value="0">Select an option</option>
        {roles.map((role) => {
          return (
            <option key={role.id} value={role.id}>
              {role.roleName}
            </option>
          );
        })}
      </Form.Select>
      <BootstrapTable
        headers={["ID", "Name", "Email", "Role", "Operations"]}
        data={filteredList.map((row) => {
          return {
            id: row.id,
            name: row.name,
            email: row.email,
            role: roleMap.get(row.role),
            deleteFn: () => deleteEmployee(row.id),
            editFn: () => navigate(`/edit/employee/${row.id}`),
          };
        })}
      />
    </div>
  );
};

export default ListEmployee;
