import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Divider, Badge } from "antd";
import { ListGroup, Button as BTN, Table } from "react-bootstrap";
import "./AdminDashboard.css";

import AdminNotifications from "../components/AdminNotifications";
import AdminSideBar from "../components/AdminSideBar";
import AdminConfData from "../components/AdminConfData";
import AdminAllWorkshops from "../components/AdminAllWorkshops";
import AdminAllResearchPapers from "../components/AdminAllResearchPapers";
import AdminAllUsers from "../components/AdminAllUsers";
import AdminWebContent from "../components/AdminWebContent";

const AdminDashboard = () => {
  const chargeR = 5.75,
    chargeT = 7.25;
  const [conferences, setconferences] = useState(false);
  const [workshops, setworkshops] = useState(false);
  const [researchPapers, setresearchPapers] = useState(false);
  const [revenueComp, setRevenueComp] = useState(true);

  const [conference, setConference] = useState([]);
  const [CurrentConf, setCurrentConf] = useState("");

  const [dashboardComp, setdashboardComp] = useState(true);
  const [contentComp, setContentComp] = useState(false);

  const [workshopData, setworkshopsData] = useState([]);
  const [conterW, setconterW] = useState(0);
  let countW = 0;

  const [rPapers, setrPapers] = useState([]);
  const [conterR, setconterR] = useState(0);
  const [conterRApproved, setconterRApproved] = useState(0);
  let countR = 0,
    countRA = 0;

  const [user, setUser] = useState([]);
  const [researcherCounter, setResearcherCounter] = useState(0);
  const [wCCounter, setWCCounter] = useState(0);
  const [attendeeCounter, setattendeeCounte] = useState(0);
  let count1 = 0,
    count2 = 0,
    count3 = 0;

  const [greet, setgreet] = useState("");

  const greeting = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();

    if (hrs < 12) setgreet("Good Morning");
    else if (hrs >= 12 && hrs <= 17) setgreet("Good Afternoon");
    else if (hrs >= 17 && hrs <= 24) setgreet("Good Evening");
  };

  const getConfData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get(
          "http://localhost:6500/grid/api/adminpvt/getAllConferences",
          config
        )
        .then((res) => {
          setConference(res.data.conferences);
          for (let i = 0; i < res.data.conferences.length; i++) {
            if (res.data.conferences[i].status === "approvedbyadmin")
              setCurrentConf(res.data.conferences[i]);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getAllUsers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/grid/api/adminpvt/getUsersData", config)
        .then((res) => {
          for (var i = 0; i < res.data.allusers.length; i++) {
            if (res.data.allusers[i].role === "researcher") {
              count1++;
              setResearcherCounter(count1);
            }
          }

          for (var i = 0; i < res.data.allusers.length; i++) {
            if (res.data.allusers[i].role === "workshop conductor") {
              count2++;
              setWCCounter(count2);
            }
          }

          for (var i = 0; i < res.data.allusers.length; i++) {
            if (res.data.allusers[i].role === "attendee") {
              count3++;
              setattendeeCounte(count3);
            }
          }

          setUser(res.data.allusers);
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
          "http://localhost:6500/grid/api/adminpvt/getResearchPapers",
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
              countR++;
              setconterR(countR);
            }
          }

          for (var i = 0; i < res.data.researchPapers.length; i++) {
            for (
              var j = 0;
              j < res.data.researchPapers[i].researchData.length;
              j++
            ) {
              if (
                res.data.researchPapers[i].researchData[j].status ===
                "approvedbyreviewer"
              )
                countRA++;
              setconterRApproved(countRA);
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
          "http://localhost:6500/grid/api/adminpvt/getWorkshopProposals",
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
              countW++;
              setconterW(countW);
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
      getWorkshops();
      getRPapers();
      getAllUsers();
      greeting();
      getConfData();
    };
    getData();
  }, []);

  return (
    <div className="admindashboard">
      <Row>
        <Col span={22}>
          <h5>{greet} Admin </h5>
        </Col>
        <Col span={2}>
          <AdminNotifications />
        </Col>
      </Row>
      <Row>
        <Button
          type="primary"
          danger
          onClick={() => {
            setContentComp(false);
            setdashboardComp(true);
          }}
        >
          DashBoard
        </Button>{" "}
        <Divider type="vertical" />
        <Button
          type="primary"
          danger
          onClick={() => {
            setdashboardComp(false);
            setContentComp(true);
          }}
        >
          View Content
        </Button>
      </Row>
      <Divider />
      {dashboardComp && (
        <div>
          <Row>
            <Col span={5} xs={24} sm={24} md={24} lg={5} xl={5}>
              <div className="sidebar">
                <ListGroup>
                { CurrentConf && <ListGroup.Item
                    href="#link1"
                    onClick={() => {
                      setworkshops(false);
                      setresearchPapers(false);
                      setconferences(false);
                      setRevenueComp(true);
                    }}
                  >
                   
                   <h6>Total Revenue Rs{" "} {attendeeCounter * CurrentConf.ticketPrice +
                        conterRApproved * CurrentConf.researchPaperCharge}</h6>
                  </ListGroup.Item>}
                  <ListGroup.Item
                    href="#link2"
                    onClick={() => {
                      setworkshops(false);
                      setresearchPapers(false);
                      setRevenueComp(false);
                      setconferences(true);
                    }}
                  >
                    Conference
                  </ListGroup.Item>
                  <ListGroup.Item
                    href="#link3"
                    onClick={() => {
                      setconferences(false);
                      setresearchPapers(false);
                      setRevenueComp(false);
                      setworkshops(true);
                    }}
                  >
                    <Row>
                      <Col span={21} xs={24} sm={24} md={24} lg={21} xl={21}>
                        Workshops
                      </Col>
                      <Col span={2} xs={24} sm={24} md={24} lg={2} xl={2}>
                        {" "}
                        <Badge count={conterW}>
                          <a href="#" className="head-example" />
                        </Badge>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item
                    href="#link5"
                    onClick={() => {
                      setworkshops(false);
                      setconferences(false);
                      setRevenueComp(false);
                      setresearchPapers(true);
                    }}
                  >
                    <Row>
                      <Col span={21} xs={24} sm={24} md={24} lg={24} xl={21}>
                        Research papers
                      </Col>
                      <Col span={2} xs={24} sm={24} md={24} lg={24} xl={2}>
                        {" "}
                        
                        <Badge count={conterR}>
                          <a href="#" className="head-example" />
                        </Badge>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>

                <br />

                <div className="centerSideBar">
                  <AdminAllUsers
                    user={user}
                    researcherCounter={researcherCounter}
                    wCCounter={wCCounter}
                    attendeeCounter={attendeeCounter}
                  />
                </div>
              </div>
            </Col>

            <Col span={14} xs={24} sm={24} md={24} lg={14} xl={14}>
              <div className="dashboarddataContainor">
                {conferences && (
                  <AdminConfData
                    workshopData={workshopData}
                    rPaperData={rPapers}
                    CurrentConf={CurrentConf}
                    conference = {conference}
                  />
                )}
                {workshops && <AdminAllWorkshops workshopData={workshopData} />}
                {researchPapers && (
                  <AdminAllResearchPapers rPaperData={rPapers} />
                )}
                {revenueComp && CurrentConf && (
                  <div className="revenue">
                    <Divider />
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Approved Research Papers</th>
                          <th>Charge for a Research Papers</th>
                          <th>Tot Revenue from Research Papers</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{conterRApproved}</td>
                          <td>Rs {CurrentConf.researchPaperCharge}</td>
                          <td>
                            Rs{" "}
                            {conterRApproved * CurrentConf.researchPaperCharge}
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Total Attendees</th>
                          <th>Charge for a Ticket</th>
                          <th>Tot Revenue from Attendee</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{attendeeCounter}</td>
                          <td>Rs {CurrentConf.ticketPrice}</td>
                          <td>
                            Rs {attendeeCounter * CurrentConf.ticketPrice}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Divider />
                    <h5>
                      Total revenue Rs
                      {attendeeCounter * CurrentConf.ticketPrice +
                        conterRApproved * CurrentConf.researchPaperCharge}
                    </h5>
                    <Divider />
                  </div>
                )}
              </div>
            </Col>
            <Col span={5} xs={24} sm={24} md={24} lg={5} xl={5}>
              <div className="rightSideBar">
                <AdminSideBar />
              </div>
            </Col>
          </Row>
        </div>
      )}

  

      {contentComp && <AdminWebContent />}
    </div>
  );
};

export default AdminDashboard;
