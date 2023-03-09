import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { PieChart } from "react-minimal-pie-chart";
import DatabaseService from "../services/DatabaseService";
import { useDispatch } from "react-redux";
import { notify } from "../AppSlice";

const Profile = () => {
  const dispatch = useDispatch();
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
    let roleMap = new Map();
    roles.forEach((role) => {
      roleMap.set(role.id, role.roleName);
    });
    const users = await DatabaseService.getUsers();
    const data = users.data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleMap.get(user.role),
      };
    });
    getUserDetails(data);
    let stats = [];
    roleMap.clear();
    data.forEach((element) => {
      roleMap.set(element.role, (roleMap.get(element.role) || 0) + 1);
    });
    roleMap.forEach((value, key) => {
      stats.push({
        title: key,
        value: Math.round((value / data.length) * 100),
        color: randomHsl(),
      });
    });
    setUserStats(stats);
  };

  const getUserDetails = (users) => {
    const user = users.find(
      (element) => element.id.toString() === localStorage.getItem("token")
    );
    setUserDetails(user);
  };

  const getRoles = async () => {
    try {
      const roles = await DatabaseService.getRoles();
      calculateUserStats(roles.data);
    } catch (error) {
      dispatch(
        notify({
          modalHeader: error.message,
          modalText: "Error fetching data",
          isConfirm: false,
          closeCallback: undefined,
          confirmCallback: undefined,
        })
      );
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
