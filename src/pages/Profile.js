import React from "react";
import { Container } from "react-bootstrap";
import Navibar from "../components/Navibar";
import axios from "axios";
import { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        params: {
          id: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data[0]) {
          console.log(res.data[0]);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navibar />
      {localStorage.getItem("role") === "admin" ? (
        <Container className="restGrid"></Container>
      ) : (
        <Container className="restGrid"></Container>
      )}
    </>
  );
}
