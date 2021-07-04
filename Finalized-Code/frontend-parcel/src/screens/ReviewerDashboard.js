import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Badge, Divider } from "antd";
import { ListGroup } from "react-bootstrap";
import { MailFilled,  HomeFilled } from "@ant-design/icons";

import "./ReviewerDashboard.css";

import ReviwerWorkshops from "../components/ReviwerWorkshops";
import ReviwerResearchPapers from "../components/ReviwerResearchPapers";
import ReviewerNotifications from "../components/ReviewerNotifications";

const ReviewerDashBoard = () => {
  const [notification, setNotification] = useState(false);
  const [workshops, setworkshops] = useState(false);
  const [researchPapers, setresearchPapers] = useState(false);
  const [prof, seProf] = useState(true);

  const [workshopData, setworkshopsData] = useState([]);
  const [conterW, setconterW] = useState(0);
  let countW = 0;

  const [rPapers, setrPapers] = useState([]);
  const [conterR, setconterR] = useState(0);
  let countR = 0;

  const [notifications, setNotifications] = useState([]);
  const [counterN, setCounterN] = useState(0);
  let countN = 0;

  const [profile, setProfile] = useState("");

  const [greet, setgreet] = useState("");
  const [conference, setConference] = useState("");

  

  const getConference = async () => {
    try {
      await axios
        .get("http://localhost:6500/grid/api/guest/getConference")
        .then((res) => {
          setConference(res.data.latestConference);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };







  const greeting = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();

    if (hrs < 12) setgreet("Good Morning");
    else if (hrs >= 12 && hrs <= 17) setgreet("Good Afternoon");
    else if (hrs >= 17 && hrs <= 24) setgreet("Good Evening");
  };

  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/grid/api/reviewerpvt/getReviewer", config)
        .then((res) => {
          setProfile(res.data.reviewer);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getNotification = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get(
          "http://localhost:6500/grid/api/reviewerpvt/getNotifications",
          config
        )
        .then((res) => {
          for (var i = 0; i < res.data.notifications.length; i++) {
            if (res.data.notifications[i].status === "unread") {
              countN++;
              setCounterN(countN);
            }
          }

          setNotifications(res.data.notifications);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getRPapers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get(
          "http://localhost:6500/grid/api/reviewerpvt/getResearchPapers",
          config
        )
        .then((res) => {
          setrPapers(res.data.researchPapers);

          for (var i = 0; i < res.data.researchPapers.length; i++) {
            for (
              var j = 0;
              j < res.data.researchPapers[i].researchData.length;
              j++
            ) {
              if (
                res.data.researchPapers[i].researchData[j].status === "pending"
              ) {
                countR++;
                setconterR(countR);
              }
            }
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getWorkshops = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get(
          "http://localhost:6500/grid/api/reviewerpvt/getWorkshopProposals",
          config
        )
        .then((res) => {
          setworkshopsData(res.data.workshopProposals);
          for (var i = 0; i < res.data.workshopProposals.length; i++) {
            for (
              var j = 0;
              j < res.data.workshopProposals[i].workshopData.length;
              j++
            ) {
              if (
                res.data.workshopProposals[i].workshopData[j].status ===
                "pending"
              ) {
                countW++;
                setconterW(countW);
              }
            }
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      greeting();
      getWorkshops();
      getRPapers();
      getNotification();
      getProfile();
      getConference();
    };
    getData();
  }, []);

  return (
    <div className="reviewerDashBoard">
      <Row>
        <Col span={1}> </Col>
        <Col span={1}>
          {" "}
          <HomeFilled
            style={{ fontSize: "3vw", color: "rgb(2, 3, 39)" }}
            onClick={() => {
              setworkshops(false);
              setresearchPapers(false);
              setNotification(false);
              seProf(true);
            }}
          />{" "}
        </Col>
        <Col span={20}> </Col>
        <Col span={2}>
          <MailFilled
            style={{ fontSize: "3vw", color: "rgb(2, 3, 39)" }}
            onClick={() => {
              setworkshops(false);
              setresearchPapers(false);
              seProf(false);
              setNotification(true);
            }}
          />
          <Badge
            count={counterN}
            onClick={() => {
              setworkshops(false);
              setresearchPapers(false);
              seProf(false);
              setNotification(true);
            }}
          >
            <a href="#" className="head-example" />
          </Badge>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col  xs={24} sm={24} md={24} lg={5} xl={5}>
          <div className="sideBar">
            <div className="appr">
              <h3>Waiting For Approval</h3>
              <ListGroup>
                <ListGroup.Item
                  action
                  variant="primary"
                  onClick={() => {
                    setNotification(false);
                    setresearchPapers(false);
                    seProf(false);
                    setworkshops(true);
                  }}
                >
                  <Row>
                    <Col span={21}>Workshop Proposals </Col>
                    <Col span={2}>
                      {" "}
                    
                      <Badge count={conterW}>
                        <a href="#" className="head-example" />
                      </Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  variant="primary"
                  onClick={() => {
                    setworkshops(false);
                    setNotification(false);
                    seProf(false);
                    setresearchPapers(true);
                  }}
                >
                  <Row>
                    <Col span={21}>Research Papers</Col>
                    <Col span={2}>
                      {" "}
                   
                      <Badge count={conterR}>
                        <a href="#" className="head-example" />
                      </Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </Col>
        <Col span={19}>
          <div className="reviewerData">
            <div className="reviewerDataIn">
              {workshops && <ReviwerWorkshops workshopData={workshopData} conference={conference}/>}
              {researchPapers && <ReviwerResearchPapers rPaperData={rPapers} conference={conference}/>}
              {notification && (
                <ReviewerNotifications notifications={notifications} />
              )}
              {prof && (
                <div>
                  <h1>
                    {" "}
                    {greet} {profile.username}
                  </h1>
         
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewerDashBoard;
