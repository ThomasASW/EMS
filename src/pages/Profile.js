import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { PieChart } from "react-minimal-pie-chart";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userStats, setUserStats] = useState([]);
  const [roleMap, setRoleMap] = useState(new Map());

  const randomHsl = () =>
    "#" + (Math.random().toString(16) + "000000").substring(2, 8);

  const defaultLabelStyle = {
    fontSize: "10px",
    fontFamily: "sans-serif",
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        params: {
          id: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data[0]) {
          // console.log(res.data[0]);
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
              // console.log(res.data);
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
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        if (res.data) {
          // console.log(res.data);
          var stats = [];
          var statMap = new Map();
          res.data.forEach((element) => {
            if (isNaN(Number(statMap.get(element.role)))) {
              statMap.set(element.role, 1);
            } else {
              statMap.set(element.role, statMap.get(element.role) + 1);
            }
          });
          statMap.forEach((value, key) => {
            stats.push({
              title: key,
              value: Math.round((value / res.data.length) * 100),
              color: randomHsl(),
            });
          });
          setUserStats(stats);
        } else {
          console.log("failed");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Container className="restGrid">
        <Card style={{ width: "100%" }}>
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
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>User Stats</Card.Title>
                {userStats.map((stat, index) => {
                  return (
                    <Row key={index}>
                      <Col>
                        <Card.Text>{roleMap.get(stat.title)}</Card.Text>
                      </Col>
                      <Col>
                        <div
                          style={{ border: `solid 5px ${stat.color}` }}
                          className="colorBox"
                        ></div>
                      </Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                    </Row>
                  );
                })}
              </Col>
              <Col>
                <PieChart
                  className="pie"
                  label={({ dataEntry }) => dataEntry.value + "%"}
                  labelStyle={{
                    ...defaultLabelStyle,
                  }}
                  data={userStats}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
