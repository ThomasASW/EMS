import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Oval } from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";

const RoleForm = ({ onSubmit, initialValue }) => {
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (initialValue !== undefined) {
      setRole(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaiting(true);
    setRoleError("");
    if (role.length > 1) {
      await onSubmit(role);
      clearFields();
    } else {
      setRoleError(
        `Please use at least 2 characters (you are currently using ${role.length} characters)`
      );
    }
    setWaiting(false);
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
      <Row>
        <Col md="auto">
          <Button variant="primary" type="submit" disabled={waiting}>
            Submit
          </Button>
        </Col>
        <Col md="auto">
          {waiting ? (
            <Oval
              height={35}
              width={35}
              color="#0b5ed7"
              secondaryColor="#073c8a"
              strokeWidth={9}
              strokeWidthSecondary={9}
            />
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default RoleForm;
