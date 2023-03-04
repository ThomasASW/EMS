import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "../components/BootstrapTable";
import ConfirmModal from "../components/ConfirmModal";
import NotifyModal from "../components/NotifyModal";

const ListRole = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [modalDetails, setModalDetails] = useState({});
  const [notifyDetails, setNotifyDetails] = useState({});

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
        setModalDetails({
          showModal: true,
          modalHeader: "Delete role?",
          modalText: `Are you sure you want to delete ${element.roleName} role?`,
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
        .delete(`http://localhost:3000/roles/${id}`)
        .then(() => {
          notify(true, "Success", "Role deleted successfully...");
          getRoles();
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

  return (
    <>
      <ConfirmModal modalDetails={modalDetails} handleInput={confirmDelete} />
      <NotifyModal modalDetails={notifyDetails} handleInput={close} />
      <div className="restGrid">
        <BootstrapTable
          headers={["#", "Role", "Operations"]}
          data={list.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.roleName}</td>
                <td>
                  <Button
                    variant="outline-success"
                    onClick={() => navigate(`/edit/role/${row.id}`)}
                  >
                    <img
                      width="28px"
                      src="/icons/pencil.svg"
                      alt="Your Alt Text"
                    ></img>
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteRole(row.id)}
                  >
                    <img
                      width="28px"
                      src="/icons/trash.svg"
                      alt="Your Alt Text"
                    ></img>
                  </Button>
                </td>
              </tr>
            );
          })}
        />
      </div>
    </>
  );
};

export default ListRole;
