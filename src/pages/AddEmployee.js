import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navibar from "../components/Navibar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";

const AddEmployee = () => {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/roles")
      .then((res) => {
        if (res.data) {
          setRoles(res.data);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setSuccess(false);
    }, 2500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3000/users", {
        name: name,
        email: email,
        password: password,
        role: Number(role),
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
        <Modal.Body>Employee added successfully...</Modal.Body>
      </Modal>
      <Navibar />
      <div className="restGrid">
        <h2>Add employee</h2>
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
          <Form.Select
            id="Select"
            value={role}
            onChange={(event) => handleRole(event)}
          >
            <option value="0">Select an option</option>
            {roles.map((role) => {
              return (
                <option key={role.id} value={role.id}>
                  {role.roleName}
                </option>
              );
            })}
          </Form.Select>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddEmployee;
