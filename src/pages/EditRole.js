import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navibar from "../components/Navibar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditRole = () => {
  const [roleID, setRoleID] = useState("");
  const [role, setRole] = useState("");
  const [found, setFound] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleRoleName = (event) => {
    setRole(event.target.value);
  };

  const handleRoleID = (event) => {
    setRoleID(event.target.value);
  };

  const handleSuccess = () => {
    setModalHeader("Success");
    setModalText("Role updated successfully");
    setShowModal(true);
    setTimeout(() => {
      setRoleID("");
      setRole("");
      setShowModal(false);
    }, 2500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (found) {
      await axios
        .put(`http://localhost:3000/roles/${roleID}`, {
          id: roleID,
          roleName: role,
        })
        .then(handleSuccess)
        .catch((error) => console.log(error));
    } else {
      await axios(`http://localhost:3000/roles/${roleID}`)
        .then((response) => {
          setRole(response.data.roleName);
          setFound(true);
        })
        .catch((error) => {
          console.log(error.message);
          setModalHeader("Error");
          setModalText("ID does not exist");
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
          }, 2500);
        });
    }
  };

  return (
    <>
      <Modal size="sm" show={showModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            {modalHeader}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
      </Modal>
      <Navibar />
      <div className="restGrid">
        <h2>Edit role</h2>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label>Role ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role ID"
              value={roleID}
              onChange={(event) => handleRoleID(event)}
            />
          </Form.Group>
          {found ? (
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                value={role}
                onChange={(event) => handleRoleName(event)}
              />
            </Form.Group>
          ) : (
            <></>
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditRole;
