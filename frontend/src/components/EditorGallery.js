import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Col, Row } from "antd";
import axios from "axios";
import FileBase from "react-file-base64";

const EditorGallery = () => {
  const [dataStatus, setDataStatus] = useState(false);
  const [fileEnc, setFileEnc] = useState("");

  const addGalleryHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let postObject = { fileEnc };
    await axios
      .post(
        "http://localhost:6500/grid/api/editorpvt/addGallery",
        postObject,
        config
      )
      .then((res) => {
        alert("New Timeline added!");
        setDataStatus(!dataStatus);
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  return (
    <div>
      <h1>Gallery</h1>
      <div style={{ marginTop: "4vh" }}>
        <Row style={{ marginTop: "4vh" }}>
          <div
            style={{
              backgroundColor: "#F1C40F",
              padding: "1.5vh",
              borderRadius: "8px",
              border: "2px",
              width: "25vw",
            }}
          >
            <Form.Group as={Col} md={12}>
              <h4 style={{ marginBottom: "2vh" }}>Add Gallery Image</h4>
              <div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setFileEnc(base64);
                  }}
                />
              </div>
              <Button style={{ marginTop: "2vh" }} onClick={addGalleryHandler}>
                Upload
              </Button>
            </Form.Group>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default EditorGallery;
