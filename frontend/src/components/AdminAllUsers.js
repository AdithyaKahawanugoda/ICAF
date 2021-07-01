import React, { useState } from "react";
import { Row, Col, Button, Modal, Divider, Badge } from "antd";
import { ListGroup, Table } from "react-bootstrap";

const AdminAllUsers = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  const [searchTerm, setsearchTerm] = useState("");

  const showModal = () => {
    setVisible(true);
  };

  const showModal2 = () => {
    setVisible2(true);
  };

  const showModal3 = () => {
    setVisible3(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    });
  };
  const handleOk2 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible2(false);
      setConfirmLoading(false);
    });
  };

  const handleOk3 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible3(false);
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const handleCancel2 = () => {
    console.log("Clicked cancel button");
    setVisible2(false);
  };

  const handleCancel3 = () => {
    console.log("Clicked cancel button");
    setVisible3(false);
  };

  return (
    <div className="allUsers">
      <ListGroup>
        <ListGroup.Item action onClick={showModal}>
          <Row>
            <Col span={21} xs={24} sm={24} md={24} lg={21} xl={21} >
              Researchers
            </Col>
            <Col span={2} xs={24} sm={24} md={24} lg={2} xl={2}>
              <Badge count={props.researcherCounter} onClick={showModal}>
                <a href="#" className="head-example" />
              </Badge>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item action onClick={showModal2}>
          {" "}
          <Row>
            <Col span={21} xs={24} sm={24} md={24} lg={21} xl={21}>
              Workshop Conductors
            </Col>
            <Col span={2} xs={24} sm={24} md={24} lg={2} xl={2}>
              <Badge count={props.wCCounter} onClick={showModal2}>
                <a href="#" className="head-example" />
              </Badge>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item action onClick={showModal3}>
          {" "}
          <Row>
            <Col span={21} xs={24} sm={24} md={24} lg={21} xl={21}>
              Attendees
            </Col>
            <Col span={2} xs={24} sm={24} md={24} lg={2} xl={2}>
              {" "}
       
              <Badge count={props.attendeeCounter} onClick={showModal3}>
                <a href="#" className="head-example" />
              </Badge>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <Modal
        title="Reaschers"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <input
            type="text"
            className="form-control"
            id="code"
            placeholder="Enter User Name...."
            onChange={(event) => {
              setsearchTerm(event.target.value);
            }}
          />
          <br />
          {props.user
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.username.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .filter((wrk) => wrk.role === "researcher")
            .map((users, index) => (
              <div key={index}>
                <Table striped bordered hover variant="dark">
                  <tbody>
                    <tr>
                      <td>Username</td>
                      <td>{users.username}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{users.email}</td>
                    </tr>
                  </tbody>
                </Table>
                <Divider />
              </div>
            ))}
        </div>
      </Modal>

      <Modal
        title="Workshop Conductors"
        visible={visible2}
        onOk={handleOk2}
        confirmLoading={confirmLoading}
        onCancel={handleCancel2}
      >
        <div>
          <input
            type="text"
            className="form-control"
            id="code"
            placeholder="Enter User Name...."
            onChange={(event) => {
              setsearchTerm(event.target.value);
            }}
          />
          <br />
          {props.user
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.username.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .filter((wrk) => wrk.role === "workshop conductor")
            .map((users, index) => (
              <div key={index}>
                <Table striped bordered hover variant="dark">
                  <tbody>
                    <tr>
                      <td>Username</td>
                      <td>{users.username}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{users.email}</td>
                    </tr>
                  </tbody>
                </Table>
                <Divider />
              </div>
            ))}
        </div>
      </Modal>

      <Modal
        title="Attendees"
        visible={visible3}
        onOk={handleOk3}
        confirmLoading={confirmLoading}
        onCancel={handleCancel3}
      >
        <div>
          <input
            type="text"
            className="form-control"
            id="code"
            placeholder="Enter User Name...."
            onChange={(event) => {
              setsearchTerm(event.target.value);
            }}
          />
          <br />
          {props.user
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.username.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .filter((wrk) => wrk.role === "attendee")
            .map((users, index) => (
              <div key={index}>
                <Table striped bordered hover variant="dark">
                  <tbody>
                    <tr>
                      <td>Username</td>
                      <td>{users.username}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{users.email}</td>
                    </tr>
                  </tbody>
                </Table>

                <Divider />
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default AdminAllUsers;
