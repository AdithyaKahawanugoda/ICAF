import React, { useContext } from "react";
import { Row, Col } from "antd";
import EditorContext from "../context/editor-context";

const EditorWelcome = () => {
  const ctx = useContext(EditorContext);
  return (
    <Row>
      <Col>
        <h1>Welcome {ctx.username}!</h1>
        <div
          style={{
            margin: "auto",
            width: "30vw",
            height: "30vw",
            padding: "0",
          }}
        >
          <img
            src="https://i.ibb.co/8X9hKyW/taxi-teamwork-in-office.png"
            width="100%"
            height="100%"
            object-fit="contain"
            padding="0"
          />
        </div>
      </Col>
      <Col style={{ paddingTop: "20vh" }}>
        <h3>Ready to Get Started?</h3>
        <h5 style={{ width: "20vw" }}>
          Put your high caliber brain into start mode, and build us with your
          creative ideas!
        </h5>
      </Col>
    </Row>
  );
};

export default EditorWelcome;
