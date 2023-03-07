import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import BootstrapTable from "../components/BootstrapTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirm, notify } from "../AppSlice";

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

  const getUsers = () => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setList(res.data);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log(err));
  };

  const getRoles = () => {
    axios
      .get("http://localhost:3000/roles")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          var map = new Map();
          res.data.forEach((element) => {
            map.set(element.id, element.roleName);
          });
          setRoleMap(map);
          setRoles(res.data);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log(err));
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
            confirmCallback: confirmDelete(id),
          })
        );
        break;
      }
    }
  };

  const confirmDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/users/${id}`)
      .then(() => {
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
      })
      .catch((error) => console.log(error));
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
        headers={["#", "Name", "Email", "Role", "Operations"]}
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
