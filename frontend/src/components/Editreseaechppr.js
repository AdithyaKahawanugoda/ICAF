import React, { useState } from "react";
import { Modal,Input } from "antd";
import { ListGroup, Button, Col, Form } from "react-bootstrap";
import "./researcherDetails.css";
import axios from "axios";

const Editreseaechppr = (props) => {
    const { TextArea } = Input;
  const [visible1, setVisible1] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const[resstatus,setresstatus]=useState("");
  const [researchTopic, setresearchTopic] = useState("");
  const [researchSubject, setresearchSubject] = useState("");
  const [paperAbstract, setpaperAbstract] = useState("");
  const [rpID,setid] = useState("");

  const [error] = useState("");

  const showModal1 = () => {
    setresearchTopic(props.resresearchTopic);
    setresearchSubject(props.resresearchSubject);
    setpaperAbstract(props.respaperAbstract);
    setid(props.resid);
    setVisible1(true);
  };

 

  const showModal3 = () => {
    setid(props.resid)
    setVisible3(true);
  };

  const handleOk1 = () => {
    setConfirmLoading(true);
    updateresearchdata();
    setTimeout(() => {
      setVisible1(false);
      setConfirmLoading(false);
    }, 3000);
  };


  const handleOk3 = () => {
    setConfirmLoading(true);
    deleteresearchdata();
    setTimeout(() => {
      setVisible3(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible1(false);
    setVisible3(false);
  };

  

  const deleteresearchdata = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let data = {rpID};
    
    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/researcherpvt/removeresearchdata",
          data,
          config
          
        )
        .then((res) => {
          alert("research data deleted Successfully!");
          window.location.reload();

        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  const updateresearchdata = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let dataObject = {
        rpID,
        researchTopic,
        researchSubject,
        paperAbstract,
      
    };

    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/researcherpvt/updateresearchdata",
          dataObject,
          config
        )
        .then((res) => {
          alert("research data Update Successfully!");
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
    <div>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Button onClick={showModal1} size="sm" variant="outline-warning">
            Edit Research Data 
          </Button>{" "}
          <Button onClick={showModal3} size="sm" variant="outline-danger">
            Delete Research Data
          </Button>{" "}
        </ListGroup.Item>
      </ListGroup>
        
      <Modal
        title="Research Data Update "
        visible={visible1}
        onOk={handleOk1}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
         
      >
        <Form>
          {error && <span className="error-message">{error}</span>}
          <Form.Row>
            <Form.Group as={Col} md={5} controlId="topic">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new Topic"
                value={researchTopic}
                onChange={(e) => {
                    setresearchTopic(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md={5} controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject"
                Row={200}
                value={researchSubject}
                onChange={(e) => setresearchSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={10} controlId="abstract">
              <Form.Label>Abstract</Form.Label>
              <TextArea
                placeholder="Enter Abstrct"
                value={paperAbstract}
                style={{ height: "300px", resize: "none" }}
                onChange={(e) => setpaperAbstract(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal>
     
      <Modal
        title="Delete"
        visible={visible3}
        onOk={handleOk3}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>This process can not undo, Press OK to delete research data</p>
      </Modal>
    </div>
  );
};

export default Editreseaechppr;
