import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";

import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function Navibar() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(0);

  useEffect(() => {
    setLogged(localStorage.getItem("token") ? 1 : 0);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Link to="/" className="navLink">
          <Navbar.Brand to="/">Employee Management System</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="navBar">
          <Nav>
            <Link to="/cart" className="navLink"></Link>
            {logged === 1 ? (
              <Nav.Link href="#" onClick={logout}>
                Logout <AiOutlineLogout />
              </Nav.Link>
            ) : (
              <Link to="/login" className="navLink">
                <Nav.Link href="/login">
                  <AiOutlineLogin /> Login
                </Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;
