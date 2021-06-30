import React from "react";
import { Row, Col } from "antd";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "3vh" }}>
      <Row type="flex" justify="center" gutter="40">
        <Col span={6}>
          <div>
            <h4 style={{ color: "white  " }}>Our Mission</h4>
          </div>
          <div>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim onsequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum."
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div>
            <h4 style={{ color: "white  " }}>Privacy Policy</h4>
          </div>
          <div>
            <p>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. [Last updated: May 05, 2021]
            </p>
          </div>
        </Col>
        <Col span={6} style={{ paddingLeft: "10vw" }}>
          <div>
            <h4 style={{ color: "white  " }}>Site-map</h4>
          </div>
          <div>
            <ul>
              <li>Conference</li>
              <li>Resources</li>
              <li>Support</li>
              <li>lorem</li>
            </ul>
          </div>
        </Col>
        <Col span={6}>
          <div>
            <h4 style={{ color: "white  " }}>Contact us</h4>
          </div>
          <div>Contact us form.</div>
        </Col>
        <Row>Copyright &copy; GRID-ICAF 2021</Row>
      </Row>
    </div>
  );
};

export default Footer;
