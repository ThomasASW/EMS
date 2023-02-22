import axios from "axios";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Navibar from "../components/Navibar";
import { useEffect } from "react";

const ListRole = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/roles")
      .then((res) => {
        if (res.data) {
          setList(res.data);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navibar />
      <div className="restGrid">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {list.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.roleName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ListRole;
