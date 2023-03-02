import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <span className="footer-title">Products</span>
              </li>
              <li className="nav-item">
                <Link to="#">Product 1</Link>
              </li>
              <li className="nav-item">
                <Link to="#">Plans and prices</Link>
              </li>
              <li className="nav-item">
                <Link to="#">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <span className="footer-title">Company</span>
              </li>
              <li className="nav-item">
                <Link to="#">About us</Link>
              </li>
              <li className="nav-item">
                <Link to="#">Career</Link>
              </li>
              <li className="nav-item">
                <Link to="#">News</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <span className="footer-title">Contact & Support</span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  <FontAwesomeIcon icon={faPhone} />
                  +91 9824782629
                </span>
              </li>
              <li className="nav-item">
                <Link to="#">
                  <FontAwesomeIcon icon={faEnvelope} />
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <FontAwesomeIcon icon={faEllipsisH} className="fa-ellipsis-h" />
        </div>

        <div className="row centerText">
          <div className="col-md-4 box text-center">
            <span className="copyright quick-links">
              Copyright &copy; EMS ({new Date().getFullYear()})
            </span>
          </div>
        </div>
        <div className="row centerText">
          <div className="col-md-4 box text-center">
            <ul className="list-inline quick-links">
              <li className="list-inline-item">
                <Link to="#">Privacy Policy</Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
