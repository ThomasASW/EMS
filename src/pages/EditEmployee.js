import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditEmployee = () => {
  const [roles, setRoles] = useState([]);

  const [employeeID, setEmployeeID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [found, setFound] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleEmployeeID = (event) => {
    setEmployeeID(event.target.value);
  };

  const handleSuccess = () => {
    setModalHeader("Success");
    setModalText("Employee updated successfully");
    setShowModal(true);
    setTimeout(() => {
      setEmployeeID("");
      setEmail("");
      setName("");
      setPassword("");
      setRole("");
      setShowModal(false);
    }, 2500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (found) {
      if (Number(role) != 0) {
        await axios
          .put(`http://localhost:3000/users/${employeeID}`, {
            id: employeeID,
            name: name,
            email: email,
            password: password,
            role: Number(role),
          })
          .then(handleSuccess)
          .catch((error) => console.log(error));
      } else {
        setModalHeader("Error");
        setModalText("Please select a role");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2500);
      }
    } else {
      await axios(`http://localhost:3000/users/${employeeID}`)
        .then((response) => {
          setEmail(response.data.email);
          setName(response.data.name);
          setRole(response.data.role);
          setPassword(response.data.password);
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
      <div className="restGrid">
        <h2>Edit employee</h2>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee ID"
              value={employeeID}
              onChange={(event) => handleEmployeeID(event)}
            />
          </Form.Group>
          {found ? (
            <>
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
            </>
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

export default EditEmployee;
