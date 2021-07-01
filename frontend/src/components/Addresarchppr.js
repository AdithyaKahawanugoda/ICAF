import React, { useState } from "react";
import {  Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import FileBase from "react-file-base64";

const Addresarchppr = (props) => {
  const [researchTopic, setresearchTopic] = useState("");
  const [paperAuthors, setpaperAuthors] = useState("");
  const [researchSubject, setresearchSubject] = useState("");
  const [paperAbstract, setpaperAbstract] = useState("");
  const [researchPaper, setFileEnc] = useState("");


  const handleOk2 = () => {
    addresearchdata();
    
  };

  
  const addresearchdata = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let dataObject = {
        researchTopic,
        paperAuthors,
        researchSubject,
        paperAbstract,
        researchPaper
    };

    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/researcherpvt/addresearchdata",
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
    <div >
      <Form>
   
      <Form.Group as={Row} className="mb-3" controlId="topic">
    <Form.Label column sm="2" className="labelstyle" >
    Research Topic
    </Form.Label>
    <Col sm="10">
    <Form.Control type="text" placeholder="Enter Research Topic" onChange={(e) => {
                        setresearchTopic(e.target.value);
                      }} />
    </Col>
  </Form.Group>


  <Form.Group as={Row} className="mb-3" controlId="authors">
    <Form.Label column sm="2" className="labelstyle" >
    Paper Authors
        </Form.Label>
    <Col sm="10">
    <Form.Control type="text" placeholder="Enter Paper Authors"  onChange={(e) => {
                        setpaperAuthors(e.target.value); }}/>
    </Col>
  </Form.Group>
 
  <Form.Group as={Row} className="mb-3" controlId="subject">
    <Form.Label column sm="2" className="labelstyle" >
    research Subject
            </Form.Label>
    <Col sm="10">
    <Form.Control type="text" placeholder="Enter research Subject"  onChange={(e) => {
                        setresearchSubject(e.target.value); }}/>
    </Col>
  </Form.Group>



  <Form.Group as={Row} className="mb-3" controlId="abstract">
    <Form.Label column sm="2" className="lklabelstyle" >
    Research Abstract
                </Form.Label>
    <Col sm="10">
    <Form.Control as="textarea" rows={3}  onChange={(e) => {
                        setpaperAbstract(e.target.value); }}/>
    </Col>
  </Form.Group>


  <Form.Group as={Col} md={6}>
                    <Form.Label>Research paper:&nbsp;</Form.Label>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setFileEnc(base64);
                      }}
                    />
                  </Form.Group>

  



  <Button onClick={handleOk2} variant="primary" type="submit">
    Submit
  </Button>
</Form>
    </div>
  );
};

export default Addresarchppr;
