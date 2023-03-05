import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const EmployeeForm = ({ onSubmit, initialValues }) => {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (initialValues !== undefined) {
      setName(initialValues.name);
      setEmail(initialValues.email);
      setPassword(initialValues.password);
      setRole(initialValues.role);
    }
  }, [initialValues]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/roles", {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setRoles(res.data);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("cancelled");
        } else {
          console.log(err);
        }
      });
    return () => {
      cancelToken.cancel();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event, name, email, password, role);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => handleName(event)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => handleEmail(event)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => handlePassword(event)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Select">
        <Form.Label>Roles</Form.Label>
        <Form.Select
          id="Select"
          value={role}
          onChange={(event) => handleRole(event)}
        >
          {roles.map((role) => {
            return (
              <option key={role.id} value={role.id}>
                {role.roleName}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EmployeeForm;
