import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Container, Tabs,Tab } from "react-bootstrap";
import Researcherdetails from "../../src/components/Researcherdetails";
import Addresarchppr from "../../src/components/Addresarchppr";
import Researchpapers from "../../src/components/Reserchpapers";
import Getnotification from "../../src/components/Getnotification";

import "./researcherprofile.css";
import axios from "axios";

const Researcherprofile = () => {
  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [profilepic, setProfilePic] = useState(" ");
  const [researchData, setResearchData] = useState(" ");

  useEffect(() => {
    const getResearcherData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/grid/api/researcherpvt/getProfile",
            config
          )
          
          .then((res) => {
            setUsername(res.data.researcher.username);
            setEmail(res.data.researcher.email);
            setProfilePic(res.data.researcher.profileImage.imagePublicId);
            setResearchData(res.data.researcher.researchData)
            

          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getResearcherData();
  }, []);

  return (
    <div className="custom-body">
      <Row>
        <Col span={7}>
          <Row>
            <Container>
              <Researcherdetails
                resUsername={username}
                resEmail={email}
                cusPP={profilepic}
              />
            </Container>
          </Row>
        </Col>
        <Col span={17}>
          <Container className="custom-content-body">
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="RESEARCH PAPERS" title="RESEARCH PAPERS">
  <Researchpapers/>
  </Tab>
  <Tab eventKey="ADD RESEARCH PAPER" title="ADD RESARCH PAPER">
   <Addresarchppr/>
  </Tab>
  <Tab eventKey="NOTIFICATIONS" title="NOTIFICATIONS">
  <Getnotification researchData={researchData}/>
  </Tab>
</Tabs>

          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Researcherprofile;
