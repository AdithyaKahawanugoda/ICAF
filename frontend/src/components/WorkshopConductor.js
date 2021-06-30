import React,{useState} from 'react';
import {Modal} from "antd";
import { ListGroup, Button, Col, Form } from "react-bootstrap";
import "./WorkshopConductor.css"
import { Image } from "cloudinary-react";
import axios from "axios";
import FileBase from "react-file-base64";

const WorkshopConductor = (props) => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [ppImage, setPpImage] = useState(" ");
    const [enc2Data, setEnc2Data] = useState(null);

    const showModal1 =() =>{
        setUsername(props.workshopUsername);
        setEmail(props.workshopEmail);
        setVisible1(true);
    };

    const showModal2 =() =>{
        setVisible2(true);
        setPpImage(props.workshopPP);
    };
    const showModal3 =() =>{
        setVisible3(true);
    };

    const handleOk1 =() =>{
        setConfirmLoading(true);
        updateWorkshopConHandler();
        setTimeout(()=>{
            setVisible1(false);
            setConfirmLoading(false);
        },3000);
    };

    const handleOk2 = () =>{
        setConfirmLoading(true);
        updatePPictureHandler();
        setTimeout(()=>{
            setVisible2(false);
            setConfirmLoading(false);
        },3000);
    };

    const handleOk3 =() =>{
        setConfirmLoading(true);
        deleteWorkshopConHandler();
        setTimeout(()=>{
            setVisible3(false);
            setConfirmLoading(false);
        },3000);
    };

    const handleCancel =() =>{
        setVisible1(false);
        setVisible2(false);
        setVisible3(false);
    };

    const updateWorkshopConHandler = async () =>{
        const config ={
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
        };

        let dataObject ={
            username,
            email,
        };
        try{
            await axios
                .put(
                    "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/update",
                    dataObject,
                    config
                )
                .then((res) =>{
                    alert("Customer Update Successfully!");
                    window.location.reload();
                })
                .catch((err) =>{
                    alert(err);
                });
        }catch(error){
            alert("Error Occured-" + error);
        }
    };

    const updatePPictureHandler = async () =>{
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };

          let dataObject = {
            fileEnc:enc2Data
          };
    try{
        await axios
        .put(
            "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/updatepp",
            dataObject,
            config
        )
        .then((res) =>{
            alert("Profile Picture updated Successfully");
            window.location.reload();
        })
        .catch((err) =>{
            alert(err);
        });
    }catch(error){
        alert("Error Occured-" + error);
    }
    };

    const deleteWorkshopConHandler = async () =>{
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
        try{
            await axios
               .delete(
                   "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/delete",
                   config
               )
               .then((res) =>{
                localStorage.removeItem("authToken");
                localStorage.removeItem("userRole");
                window.location = "/";
               })
               .catch((err) =>{
                   alert(err);
               });
        }catch(error){
            alert("Error Occured-" + error);
        }
    };

    return (
        <div>
        <ListGroup>
        <ListGroup.Item className="custom-cusprof-pp">
          <Image
            className="custom-cusprof-pp-img "
            cloudName="grid1234"
            publicId={props.workshopPP}
          />
        </ListGroup.Item>
        <ListGroup.Item>{props.workshopUsername}</ListGroup.Item>
        <ListGroup.Item>{props.workshopEmail}</ListGroup.Item>
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
        title="Customer Profile Update"
        visible={visible1}
        onOk={handleOk1}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
      <Form>
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
            type="file"   value={ppImage}
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
    )
}

export default WorkshopConductor
