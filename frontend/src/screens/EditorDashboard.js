import React from "react";
import OptionSelector from "../components/OptionSelector";
import { Row, Col } from "antd";
import { EditorCtxProvider } from "../context/editor-context";
import EditorDataDisplayer from "../components/EditorDataDisplayer";

const EditorDashboard = () => {
  const optionsArray = [
    { name: "Profile", counter: 1 },
    { name: "Manage Conference", counter: 2 },
    { name: "Upload Templates", counter: 3 },
    { name: "Timeline", counter: 4 },
    { name: "Home Notices", counter: 5 },
    { name: "Gallery", counter: 6 },
    { name: "User Guide", counter: 7 },
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
      <EditorCtxProvider>
        <Row>
          <Col style={{ marginRight: "8vw" }}>
            <OptionSelector options={optionsArray} />
          </Col>
          <Col>
            <EditorDataDisplayer />
          </Col>
        </Row>
      </EditorCtxProvider>
    </div>
  );
};

export default EditorDashboard;
