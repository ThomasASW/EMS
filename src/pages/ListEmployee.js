import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import BootstrapTable from "../components/BootstrapTable";
import ConfirmModal from "../components/ConfirmModal";
import NotifyModal from "../components/NotifyModal";
import { useNavigate } from "react-router-dom";

const ListEmployee = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("0");
  const [roleMap, setRoleMap] = useState();
  const [modalDetails, setModalDetails] = useState({});
  const [notifyDetails, setNotifyDetails] = useState({});

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
        setModalDetails({
          showModal: true,
          modalHeader: "Delete employee?",
          modalText: `Are you sure you want to delete employee ${element.name}?`,
          id: id,
        });
        break;
      }
    }
  };

  const notify = (show, header, text) => {
    setNotifyDetails({
      showModal: show,
      modalHeader: header,
      modalText: text,
    });
  };

  const confirmDelete = async (id) => {
    setModalDetails({
      showModal: false,
      modalHeader: "",
      modalText: "",
    });
    if (id !== -1) {
      await axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          notify(true, "Success", "Employee deleted successfully...");
          getUsers();
        })
        .catch((error) => console.log(error));
    }
  };

  const close = () => {
    setNotifyDetails({
      showModal: false,
      modalHeader: "",
      modalText: "",
    });
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
    <>
      <ConfirmModal modalDetails={modalDetails} handleInput={confirmDelete} />
      <NotifyModal modalDetails={notifyDetails} handleInput={close} />
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
            };
          })}
          deleteFn={deleteEmployee}
          editFn={(id) => navigate(`/edit/employee/${id}`)}
        />
      </div>
    </>
  );
};

export default ListEmployee;
