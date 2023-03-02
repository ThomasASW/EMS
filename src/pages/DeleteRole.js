import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const DeleteRole = () => {
  const [role, setRole] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleSuccess = () => {
    setShowModal(true);
    setModalHeader("Success");
    setModalText("Role deleted successfully...");
    setTimeout(() => {
      setRole("");
      setShowModal(false);
    }, 2500);
  };

  const handleError = () => {
    setShowModal(true);
    setModalHeader("Error");
    setModalText("Given ID does not exist");
    setTimeout(() => {
      setRole("");
      setShowModal(false);
    }, 2500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .delete(`http://localhost:3000/roles/${role}`)
      .then(handleSuccess)
      .catch(handleError);
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
      <div className="restGrid">
        <h2>Delete role</h2>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Role ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role ID"
              value={role}
              onChange={(event) => handleRole(event)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default DeleteRole;
