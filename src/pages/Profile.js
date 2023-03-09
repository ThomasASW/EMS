import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { PieChart } from "react-minimal-pie-chart";
import DatabaseService from "../services/DatabaseService";

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
    getUserDetails();
    getRoles();
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const users = await DatabaseService.getUsers();
      var stats = [];
      var statMap = new Map();
      users.data.forEach((element) => {
        if (isNaN(Number(statMap.get(element.role)))) {
          statMap.set(element.role, 1);
        } else {
          statMap.set(element.role, statMap.get(element.role) + 1);
        }
      });
      statMap.forEach((value, key) => {
        stats.push({
          title: key,
          value: Math.round((value / users.data.length) * 100),
          color: randomHsl(),
        });
      });
      setUserStats(stats);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    try {
      const user = await DatabaseService.getUser(localStorage.getItem("token"));
      setUserDetails(user.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoles = async () => {
    try {
      const roles = await DatabaseService.getRoles();
      var map = new Map();
      roles.data.forEach((element) => {
        map.set(element.id, element.roleName);
      });
      setRoleMap(map);
    } catch (error) {
      console.log(error);
    }
  };

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
