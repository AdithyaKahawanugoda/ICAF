import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Col } from "antd";
import FileBase from "react-file-base64";
import axios from "axios";

const EditorTemplates = () => {
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState("");
  const templateHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let postObj;
    if (fileType === "pdf") {
      postObj = { encPDF: file };
      await axios
        .put(
          "http://localhost:6500/grid/api/editorpvt/addResearchTemplate",
          postObj,
          config
        )
        .then((res) => {
          alert("PDF template uploaded!");
        })
        .catch((err) => {
          alert("ERROR! " + err);
        });
    }
    if (fileType === "ppt") {
      postObj = { encPPT: file };
      await axios
        .put(
          "http://localhost:6500/grid/api/editorpvt/addWorkshopTemplate",
          postObj,
          config
        )
        .then((res) => {
          alert("PPTX template uploaded!");
        })
        .catch((err) => {
          alert("ERROR! " + err);
        });
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "4vh" }}>Upload Templates</h1>
      <Form onSubmit={templateHandler}>
        <Form.Group as={Col} md={24}>
          <Form.Check
            type="radio"
            required={true}
            label="PDF"
            onClick={() => {
              setFileType("pdf");
            }}
            name="formHorizontalRadios"
          />
          <Form.Check
            type="radio"
            required={true}
            label="PPT"
            onClick={() => {
              setFileType("ppt");
            }}
            name="formHorizontalRadios"
          />
          <Form.Label>Template:&nbsp;</Form.Label>
          <div style={{ marginBottom: "4vh" }}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setFile(base64);
              }}
            />
          </div>
          <Button variant="warning" type="submit">
            Upload
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditorTemplates;
