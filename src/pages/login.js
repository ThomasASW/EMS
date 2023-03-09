import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";
import DatabaseService from "../services/DatabaseService";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
