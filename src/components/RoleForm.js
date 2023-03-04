import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RoleForm = ({ onSubmit, initialValue }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (initialValue !== undefined) {
      setRole(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event, role);
    clearFields();
  };

  const clearFields = () => {
    setRole("");
  };

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  return (
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
  );
};

export default RoleForm;
