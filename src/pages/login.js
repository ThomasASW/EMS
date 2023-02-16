import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:3000/users", {
        params: {
          email: email,
          password: pwd,
        },
      })
      .then((res) => {
        if (res.data[0]) {
          setErrMsg("");
          handleSuccess(res);
        } else {
          setErrMsg("Incorrect credentials");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSuccess = (res) => {
    setSuccess(true);
    setEmail("");
    setPwd("");
    localStorage.setItem("token", res.data[0].id);
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 2500);
  };

  return (
    <>
      <Modal size="sm" show={success} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">Logged in</Modal.Title>
        </Modal.Header>
        <Modal.Body>Redirecting...</Modal.Body>
      </Modal>
      <div className="outer">
        <div className="inner">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                autoFocus
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                isInvalid={errMsg === "" ? false : true}
                required
              />
              <Form.Text className="text-danger">{errMsg}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                isInvalid={errMsg === "" ? false : true}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRedirect">
              <Link to="/register">Create an account</Link>
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
