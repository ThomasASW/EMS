import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import BootstrapTable from "../components/BootstrapTable";

const ListRole = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <>
      <div className="restGrid">
        <BootstrapTable
          headers={["#", "Role"]}
          data={list.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.roleName}</td>
              </tr>
            );
          })}
        />
      </div>
    </>
  );
};

export default ListRole;
