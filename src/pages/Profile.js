import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { PieChart } from "react-minimal-pie-chart";
import DatabaseService from "../services/DatabaseService";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userStats, setUserStats] = useState([]);

  const randomHsl = () =>
    "#" + (Math.random().toString(16) + "000000").substring(2, 8);

  const defaultLabelStyle = {
    fontSize: "10px",
    fontFamily: "sans-serif",
  };

  useEffect(() => {
    getRoles();
  }, []);

  const calculateUserStats = async (roles) => {
    try {
      const users = await DatabaseService.getUsers();
      const length = users.data.length;
      var stats = [];
      var count = {};
      roles.forEach((role) => {
        count[role.roleName] = (count[role.roleName] || 0) + 1;
      });
      Object.entries(count).forEach((key, value) => {
        stats.push({
          title: key[0],
          value: Math.round((value / length) * 100),
          color: randomHsl(),
        });
      });
      setUserStats(stats);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async (roles) => {
    try {
      const user = await DatabaseService.getUser(localStorage.getItem("token"));
      for (let i = 0; i < roles.length; i++) {
        const element = roles[i];
        if (element.id === user.data.role) {
          setUserDetails({
            id: user.data.id,
            name: user.data.name,
            email: user.data.email,
            role: element.roleName,
          });
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRoles = async () => {
    try {
      const roles = await DatabaseService.getRoles();
      getUserDetails(roles.data);
      calculateUserStats(roles.data);
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
              {userDetails.role}
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
                        <Card.Text>{`${stat.title} (${stat.value}%)`}</Card.Text>
                      </Col>
                      <Col>
                        <div
                          style={{ border: `solid 5px ${stat.color}` }}
                          className="colorBox"
                        ></div>
                      </Col>
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
