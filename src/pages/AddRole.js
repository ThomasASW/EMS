import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddRole = () => {
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setRole("");
      setSuccess(false);
    }, 2500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3000/roles", {
        roleName: role,
      })
      .then(handleSuccess)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal size="sm" show={success} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Role added successfully...</Modal.Body>
      </Modal>
      <div className="restGrid">
        <h2>Add role</h2>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role name"
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

export default AddRole;
