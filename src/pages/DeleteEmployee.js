import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EmployeeRole = () => {
  const [employee, setEmployee] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEmployeeID = (event) => {
    setEmployee(event.target.value);
  };

  const handleSuccess = () => {
    setShowModal(true);
    setModalHeader("Success");
    setModalText("Employee deleted successfully...");
    setTimeout(() => {
      setEmployee("");
      setShowModal(false);
    }, 2500);
  };

  const handleError = () => {
    setShowModal(true);
    setModalHeader("Error");
    setModalText("Given ID does not exist");
    setTimeout(() => {
      setEmployee("");
      setShowModal(false);
    }, 2500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .delete(`http://localhost:3000/users/${employee}`)
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
        <h2>Delete employee</h2>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee ID"
              value={employee}
              onChange={(event) => handleEmployeeID(event)}
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

export default EmployeeRole;
