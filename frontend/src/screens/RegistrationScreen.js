import React from "react";
import { Row, Col } from "antd";
import RegistrationForm from "../components/RegistrationForm";
import DynamicImages from "../components/DynamicImages";
import { RegImgCtxProvider } from "../context/reg-screen-context";
const RegistrationScreen = () => {
  return (
    <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
      <RegImgCtxProvider>
        <Row>
          <Col span={14}>
            <RegistrationForm />
          </Col>
          <Col span={8}>
            <DynamicImages />
          </Col>
        </Row>
      </RegImgCtxProvider>
    </div>
  );
};

export default RegistrationScreen;
