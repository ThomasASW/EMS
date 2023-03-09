import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatabaseService from "../services/DatabaseService";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import { Oval, Dna } from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";

const EmployeeForm = ({ onSubmit, initialValues }) => {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(initialValues).length > 0) {
      setName(initialValues.name);
      setEmail(initialValues.email);
      setPassword(initialValues.password);
      setRole(initialValues.role);
    }
  }, [initialValues]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const roles = await DatabaseService.getRoles();
        setRoles(roles.data);
        setLoading(false);
      } catch (error) {
        dispatch(
          notify({
            modalHeader: error.message,
            modalText: "Error fetching data",
            isConfirm: false,
            closeCallback: undefined,
            confirmCallback: undefined,
          })
        );
      }
    };
    getRoles();
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaiting(true);
    setNameError("");
    setEmailError("");
    setPasswordError("");
    if (name.length < 5) {
      setNameError(
        `Please use at least 5 characters (you are currently using ${name.length} characters)`
      );
    } else if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    ) {
      setEmailError("Invalid email format");
    } else if (password.length < 4) {
      setPasswordError(
        `Please use at least 4 characters (you are currently using ${password.length} characters)`
      );
    } else {
      await onSubmit(name, email, password, role);
      clearFields();
    }
    setWaiting(false);
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

  if (loading) {
    return (
      <div className="loadingSpinner">
        <Dna height={120} width={120} />
      </div>
    );
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          required={true}
          minLength={5}
          isInvalid={nameError === "" ? false : true}
          onChange={(event) => handleName(event)}
        />
        <Form.Text className="text-danger">{nameError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          required={true}
          isInvalid={emailError === "" ? false : true}
          onChange={(event) => handleEmail(event)}
        />
        <Form.Text className="text-danger">{emailError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          required={true}
          minLength={4}
          isInvalid={passwordError === "" ? false : true}
          onChange={(event) => handlePassword(event)}
        />
        <Form.Text className="text-danger">{passwordError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="Select">
        <Form.Label>Roles</Form.Label>
        <Form.Select
          id="Select"
          value={role}
          required={true}
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

export default EmployeeForm;
