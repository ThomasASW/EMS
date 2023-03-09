import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RoleForm = ({ onSubmit, initialValue }) => {
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");

  useEffect(() => {
    if (initialValue !== undefined) {
      setRole(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setRoleError("");
    if (role.length > 1) {
      onSubmit(event, role);
      clearFields();
    } else {
      setRoleError(
        `Please use at least 2 characters (you are currently using ${role.length} characters)`
      );
    }
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
          required
          minLength={2}
          isInvalid={roleError === "" ? false : true}
          onChange={(event) => handleRole(event)}
        />
        <Form.Text className="text-danger">{roleError}</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RoleForm;
