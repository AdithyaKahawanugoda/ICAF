import React, { useState } from "react";
import { Modal } from "antd";
import { ListGroup, Button, Col, Form } from "react-bootstrap";
import "./researcherDetails.css";
import { Image } from "cloudinary-react";
import axios from "axios";
import FileBase from "react-file-base64";

const Researcherdetails = (props) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [base64, setEnc2Data] = useState(null);
  const [error] = useState("");

  const showModal1 = () => {
    setUsername(props.resUsername);
    setEmail(props.resEmail);
    setEnc2Data(props.cusPP)
    setVisible1(true);
  };

  const showModal2 = () => {
    setVisible2(true);
  };

  const showModal3 = () => {
    setVisible3(true);
  };

  const handleOk1 = () => {
    setConfirmLoading(true);
    updateresearcherHanler();
    setTimeout(() => {
      setVisible1(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleOk2 = () => {
    setConfirmLoading(true);
     updatePropic();
    setTimeout(() => {
      setVisible2(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleOk3 = () => {
    setConfirmLoading(true);
    deleteresearcherHandler();
    setTimeout(() => {
      setVisible3(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible1(false);
    setVisible2(false);
    setVisible3(false);
  };

 

  const deleteresearcherHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .delete(
          "http://localhost:6500/grid/api/researcherpvt/deleteprofile",
          config
        )
        .then((res) => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userRole");
          window.location = "/";
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  const updatePropic = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let datapic = {
      fileEnc:base64
      
    };

    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/researcherpvt/updatepp",
          datapic,
          config
        )
        .then((res) => {
          alert("Profile picture updated");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };











  const updateresearcherHanler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let dataObject = {
      username,
      email,
      
    };

    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/researcherpvt/editProfile",
          dataObject,
          config
        )
        .then((res) => {
          alert("researcher Update Successfully!");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  return (
    <div className="navigation-panel">
      <ListGroup variant="flush">
        <ListGroup.Item className="lkcustom-pp">
          <Image
            className="lkcustom-pp-img "
            cloudName="grid1234"
            publicId={props.cusPP}
          />
        </ListGroup.Item>
        <ListGroup.Item>{props.resUsername}</ListGroup.Item>
        <ListGroup.Item>{props.resEmail}</ListGroup.Item>
        
        <ListGroup.Item>
          <Button onClick={showModal1} size="sm" variant="outline-primary">
            Edit Details
          </Button>{" "}
          <Button onClick={showModal3} size="sm" variant="outline-danger">
            Delete Account
          </Button>{" "}
          <Button onClick={showModal2} size="sm" variant="outline-success">
            Update Picture
          </Button>
        </ListGroup.Item>
      </ListGroup>
      <Modal
        title="Researcher Profile Update"
        visible={visible1}
        onOk={handleOk1}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form>
          {error && <span className="error-message">{error}</span>}
          <Form.Row>
            <Form.Group as={Col} md={6} controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal>
      <Modal
        title="Profile Picture Update"
        visible={visible2}
        onOk={handleOk2}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form.Group controlId="fileupload">
          <Form.Label>Profile Picture</Form.Label>
          <h6>**Please do not exceed the amount of file size 25MB </h6>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setEnc2Data(base64);
            }}
          />
        </Form.Group>
      </Modal>
      <Modal
        title="Profile Delete"
        visible={visible3}
        onOk={handleOk3}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>This process can not undo, Press OK to delete user account</p>
      </Modal>
    </div>
  );
};

export default Researcherdetails;
