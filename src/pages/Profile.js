import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Navibar from "../components/Navibar";
import axios from "axios";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [roleMap, setRoleMap] = useState(new Map());

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
      .then(() => {
        axios
          .get("http://localhost:3000/roles")
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              var map = new Map();
              res.data.forEach((element) => {
                map.set(element.id, element.roleName);
              });
              setRoleMap(map);
            } else {
              console.log("failed");
            }
          })
          .catch((error) => console.log(error));
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
              {roleMap.get(userDetails.role)}
            </Card.Subtitle>
            <Card.Link href={`mailto:${userDetails.email}`}>
              {userDetails.email}
            </Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
