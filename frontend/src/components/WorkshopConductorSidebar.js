import React,{useState,useEffect} from 'react';
import "./WorkshopConductorSidebar.css";
import { Row, Col,Badge } from "antd";
import { Container, ListGroup } from "react-bootstrap";
import WorkshopConductor from './WorkshopConductor';
import WorkshopProposal from './WorkshopProposal';
import WorkshopNotification from './WorkshopNotification';
import axios from "axios";

const WorkshopConductorSidebar = () => {

    const [notification,setNotification] = useState(false);
    const [proposal,setProposal] = useState(false);
    const [profile, setProfile] = useState(true);

    const [notifications, setNotifications] = useState([]);
    const [username, setUsername] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [profilepic, setProfilePic] = useState(" ");
    const [counter, setCounter] = useState(0);

    let count = 0;

    useEffect(()=>{
      const getNotification = async() =>{
            
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
          try{
              await axios
                .get(
                    "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/proposal/notify",
                    config
                )
                .then((res)=>{
                  for (var i = 0; i < res.data.notifications.length; i++) {
                    if (res.data.notifications[i].status === "unread") {
                      count++;
                      setCounter(count);
                    }
                  }
                  setNotifications(res.data.notifications);
                   
                })
                .catch((err)=>{
                   console.log(err.message);
                });
          }catch(err){
            alert("error :" + err);
          } 
    };
    getNotification();
    },[]);
    

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
                  setNotification(false);
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
                  setNotification(false);
                  setProfile(false);
                  setProposal(true);
                }}
              >
                Workshop Proposal
              </ListGroup.Item>
              <ListGroup.Item
              action
              href="#link4"
              onClick={() => {
                setNotification(true);
                setProfile(false);
                setProposal(false);
              }}
            >
              Notifications
              <Badge count={counter} style={{marginLeft:"2rem"}}>

              </Badge>
            </ListGroup.Item>
            </ListGroup>
          </div>
        </Container>
        </Row>
      </Col>  

    <Col span={17}>
        <Container className="workshop-workprof-dynamic-content-body">
        {notification && <WorkshopNotification />}
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
