import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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

  const navigateOnClick = (location) => {
    navigate(location);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Link to="/profile" className="navLink">
          <Navbar.Brand to="/profile">Employee Management System</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="navBar">
          <Nav>
            {localStorage.getItem("role") === "admin" ? (
              <>
                <Link></Link>
                <Link></Link>
                <NavDropdown title="Employees" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    href="#"
                    onClick={() => navigateOnClick("/list")}
                  >
                    List employees
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">
                    Add employee
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Edit employee
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Remove employee
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Roles" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    List roles
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">
                    Add role
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Edit role
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Remove role
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <></>
            )}
            <Link to="/cart" className="navLink"></Link>
            {logged === 1 ? (
              <Nav.Link href="#" onClick={logout}>
                Logout <AiOutlineLogout />
              </Nav.Link>
            ) : (
              <Link to="/login" className="navLink">
                <AiOutlineLogin /> Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;
