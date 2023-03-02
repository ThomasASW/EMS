import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import BootstrapTable from "../components/BootstrapTable";

const ListEmployee = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("0");
  const [roleMap, setRoleMap] = useState();

  useEffect(() => {
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
      .then(() => {
        axios
          .get("http://localhost:3000/users")
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              setList(res.data);
              setFilteredList(res.data);
            } else {
              console.log("failed");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const search = (event) => {
    setSearchText(event.target.value);
    setFilteredList([...list]);
  };

  const select = (event) => {
    setFilter(event.target.value);
    setFilteredList([...list]);
  };

  useEffect(() => {
    if (filter != "0") {
      console.log("filter");
      setFilteredList(filteredList.filter((row) => row.role == filter));
    }
    if (searchText != "") {
      if (isNaN(searchText)) {
        setFilteredList(
          filteredList.filter((row) =>
            row.name.toLowerCase().includes(searchText)
          )
        );
      } else {
        var id = +searchText;
        setFilteredList(filteredList.filter((row) => row.id == id));
      }
    }
  }, [filter, searchText]);

  return (
    <>
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
          headers={["#", "Name", "Email", "Role"]}
          data={filteredList.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{roleMap.get(row.role)}</td>
              </tr>
            );
          })}
        />
      </div>
    </>
  );
};

export default ListEmployee;
