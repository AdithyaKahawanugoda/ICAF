import React,{useState,useEffect} from 'react';
import "./WorkshopConductorSidebar.css";
import { Row, Col } from "antd";
import { Container, ListGroup } from "react-bootstrap";
import WorkshopConductor from './WorkshopConductor';
import WorkshopProposal from './WorkshopProposal';
import axios from "axios";

const WorkshopConductorSidebar = () => {

    const [proposal,setProposal] = useState(false);
    const [profile, setProfile] = useState(true);

    const [username, setUsername] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [profilepic, setProfilePic] = useState(" ");

    useEffect(() =>{
        const getWorkshopConductorDetails = async ()=>{
            const config ={
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                  },
            };
            try{
                await axios
                    .get("http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor",config)
                    .then((res) => {
                        setUsername(res.data.workshopConductor.username);
                        setEmail(res.data.workshopConductor.email);
                        setProfilePic(res.data.workshopConductor.profileImage.imagePublicId);
                    })
                    .catch((err) =>{
                        alert("Error occured!!! :"+err);
                    });
            }catch(error){
                alert("Error occured!!! : " + error);
            }
        };
        getWorkshopConductorDetails();
    },[]);
    return (
        <div className="workshop-workprof-body">
        <Row>
        <Col span={7}>
        <Row>
        <Container>
          <div className="workshop-workprof-navigation-panel">
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item
                action
                href="#link1"
                onClick={() => {
                  setProposal(false);
                  setProfile(true);
                }}
              >
                Profile
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#link3"
                onClick={() => {
                  setProfile(false);
                  setProposal(true);
                }}
              >
                Workshop Proposal
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Container>
        </Row>
      </Col>  

    <Col span={17}>
        <Container className="workshop-workprof-dynamic-content-body">
        {proposal && <WorkshopProposal />}
        {profile && (
          <WorkshopConductor
            workshopUsername={username}
            workshopEmail={email}  
            workshopPP={profilepic}
          />
        )}
        </Container>
    </Col>
    </Row>
    </div>
    );
}

export default WorkshopConductorSidebar
