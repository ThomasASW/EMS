import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Navibar from "../components/Navibar";
import axios from "axios";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";

const Profile = () => {
  const [userDetails, setUserDetails] = useState();

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
          setUserDetails(res.data[0]);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navibar />
      <Container className="restGrid">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{userDetails.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
