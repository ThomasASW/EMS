import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import DatabaseService from "../services/DatabaseService";
import { Oval } from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [waiting, setWaiting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    try {
      const user = await DatabaseService.authenticateUser({
        params: {
          email: email,
          password: pwd,
        },
      });
      if (user.data[0]) {
        setErrMsg("");
        handleSuccess(user);
      } else {
        setErrMsg("Incorrect credentials");
        setWaiting(false);
      }
    } catch (error) {
      dispatch(
        notify({
          modalHeader: "Login failed",
          modalText: error.message,
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
      setWaiting(false);
    }
  };

  const handleSuccess = (user) => {
    setEmail("");
    setPwd("");
    localStorage.setItem("token", user.data[0].id);
    localStorage.setItem("role", user.data[0].role);
    dispatch(
      notify({
        modalHeader: "Login successful",
        modalText: "Redirecting...",
        isConfirm: false,
        closeCallback: () => navigate("/profile"),
        confirmCallback: undefined,
      })
    );
  };

  return (
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
          <Row>
            <Col md="auto">
              <Button variant="primary" type="submit" disabled={waiting}>
                Login
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
      </div>
    </div>
  );
}

export default Login;
