import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Table } from "antd";
import { Image } from "cloudinary-react";
import axios from "axios";
import { ListGroup, Button, Form } from "react-bootstrap";

const AttendeeProfile = () => {
  const [attendeeData, setAttendeeData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const [confData, setConfData] = useState();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    setDataLoaded(false);
    const fetchConferenceData = async () => {
      await axios
        .get("http://localhost:6500/grid/api/guest/getConference")
        .then((res) => {
          if (res.data.latestConference === null) {
            alert("Currently no conference is scheduled");
          } else {
            setConfData(res.data.latestConference);
          }
        })
        .catch((err) => {
          alert("Error!" + err);
        });
    };
    fetchConferenceData();
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get("http://localhost:6500/grid/api/attendeepvt/attendee", config)
        .then((res) => {
          setAttendeeData(res.data.attendee);
          setDataLoaded(true);
        })
        .catch((err) => {
          alert("Error!" + err);
        });
    };
    fetchData();
  }, [dataStatus]);

  const updateUserHandler = async () => {
    setConfirmLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const postObj = { username, email };
    await axios
      .put(
        "http://localhost:6500/grid/api/attendeepvt/attendee/update",
        postObj,
        config
      )
      .then((res) => {
        alert("Attendee updated!");
        setConfirmLoading(false);
        handleCancel();
        setDataStatus(!dataStatus);
      })
      .catch((err) => {
        alert("ERROR! " + err);
        setConfirmLoading(false);
        handleCancel();
      });
  };

  const deleteUserHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    await axios
      .delete(
        "http://localhost:6500/grid/api/attendeepvt/attendee/delete",
        config
      )
      .then((res) => {
        window.location("/");
        alert("Profile has been deleted!");
        localStorage.removeItem("userRole");
        localStorage.removeItem("authToken");
      })
      .catch((err) => {
        window.location("/");
        alert("Profile has been deleted!!");
        localStorage.removeItem("userRole");
        localStorage.removeItem("authToken");
      });
  };

  const attendeeColumns = [
    {
      title: "Date/Time",
      dataIndex: "placedAt",
      key: "placedAt",
    },
    {
      title: "Amount (LKR)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div
      style={{
        paddingTop: "5vh",
        padding: "3vh",
        margin: "auto",
        width: "90vw",
      }}
    >
      {dataLoaded && (
        <div>
          <Row>
            <Col style={{ marginRight: "7vw" }}>
              <ListGroup variant="flush">
                <ListGroup.Item
                  style={{
                    margin: "auto",
                    width: "17vw",
                    height: "17vw",
                    padding: 0,
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: 8,
                    }}
                    cloudName="grid1234"
                    publicId={attendeeData.profileImage.imagePublicId}
                  />
                </ListGroup.Item>
                <ListGroup.Item>{attendeeData.username}</ListGroup.Item>
                <ListGroup.Item>{attendeeData.email}</ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={deleteUserHandler}
                    variant="danger"
                    style={{ marginRight: "1vh" }}
                  >
                    Delete Account
                  </Button>
                  <Button onClick={showModal}>Update Account</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col style={{ width: "60vw" }}>
              <Row style={{ textAlign: "center", marginBottom: "6vh" }}>
                <h1>Welcome {attendeeData.username}!</h1>
              </Row>
              <Row>
                <Col span={10} style={{ marginRight: "15vw" }}>
                  <Row>
                    {confData && (
                      <div
                        style={{
                          padding: "1vh",
                          background: "#D35400",
                          color: "white",
                          borderRadius: "9px",
                          width: "20vw",
                          marginBottom: "6vh",
                        }}
                      >
                        <p>{confData.title} conference ticket</p>
                        <p>{confData.venue}</p>
                        <p>{confData._id}</p>
                      </div>
                    )}
                  </Row>
                  <Row>
                    <Table
                      style={{ width: "50vw" }}
                      size="medium"
                      columns={attendeeColumns}
                      dataSource={attendeeData.paymentHistory}
                      pagination={{ pageSize: 4 }}
                      rowKey="_id"
                    />
                  </Row>
                </Col>
                <Col span={7}>
                  <img
                    src="https://i.ibb.co/ZWrXcs2/taxi-waiting.png"
                    width="100%"
                    height="100%"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal
            title="Update Data"
            visible={visible}
            onOk={updateUserHandler}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            closable={false}
            width="30vw"
          >
            <Form.Group as={Col} md={12}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AttendeeProfile;
