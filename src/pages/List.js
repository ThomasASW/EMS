import axios from "axios";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Navibar from "../components/Navbar";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";

export default function List() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        params: {
          role: "employee",
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setList(res.data);
          setTable(res.data);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const setTable = (data) => {
    setFilteredList(
      data.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        );
      })
    );
  };

  const filterList = (event) => {
    var temp = [];
    if (event.target.value === "") {
      setTable(list);
    } else if (isNaN(event.target.value)) {
      temp = [...list];
      setTable(
        temp.filter((row) =>
          row.name.toLowerCase().includes(event.target.value)
        )
      );
    } else {
      var id = +event.target.value;
      temp = [...list];
      setTable(temp.filter((row) => row.id == id));
    }
  };

  return (
    <>
      <Navibar />
      <div className="restGrid">
        <Form.Control
          type="text"
          placeholder="Search"
          onChange={(event) => filterList(event)}
        />
        <Form.Select id="Select">
          <option>Select an option</option>
        </Form.Select>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>{filteredList}</tbody>
        </Table>
      </div>
    </>
  );
}
