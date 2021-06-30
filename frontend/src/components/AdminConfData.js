import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Divider } from "antd";
import { Image } from "cloudinary-react";
import { Table } from "react-bootstrap";
import "./AdminConfData.css";

const AdminConfData = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [visible4, setVisible4] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  // const [conferences, setConferences] = useState([]);
  // const [CurrentConf, setCurrentConf] = useState("");
  const [keynoteSpeakers, setKeynoteSpeakers] = useState([]);
  const [guestSpeakers, setGuestSpeakers] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);

  const [searchTerm, setsearchTerm] = useState("");

  const setKeySpeakers = (id) => {
    for (let i = 0; i < props.conference.length; i++) {
      if (props.conference[i]._id == id) {
        setKeynoteSpeakers(props.conference[i].keynoteSpeakers);
        showModal();
      }
    }
  };

  const setGSpeakers = (id) => {
    for (let i = 0; i < props.conference.length; i++) {
      if (props.conference[i]._id == id) {
        setGuestSpeakers(props.conference[i].guestSpeakers);
        showModal4();
      }
    }
  };
  const setW = (id) => {
    for (let i = 0; i < props.conference.length; i++) {
      if (props.conference[i]._id == id) {
        setWorkshops(props.conference[i].addedWorkshops);
        showModal2();
      }
    }
  };
  const setR = (id) => {
    for (let i = 0; i < props.conference.length; i++) {
      if (props.conference[i]._id == id) {
        setResearchPapers(props.conference[i].addedResearchPapers);
        showModal3();
      }
    }
  };

  const approve = async (status, id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const st = status;
    const nid = id;
    let dataObject = {
      status: st,
      nid: nid,
    };
    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/adminpvt/manageConfContent",
          dataObject,
          config
        )
        .then(() => {
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const showModal2 = () => {
    setVisible2(true);
  };

  const showModal3 = () => {
    setVisible3(true);
  };

  const showModal4 = () => {
    setVisible4(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    });
  };
  const handleOk2 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible2(false);
      setConfirmLoading(false);
    });
  };

  const handleOk3 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible3(false);
      setConfirmLoading(false);
    });
  };

  const handleOk4 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible4(false);
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const handleCancel2 = () => {
    console.log("Clicked cancel button");
    setVisible2(false);
  };

  const handleCancel3 = () => {
    console.log("Clicked cancel button");
    setVisible3(false);
  };

  const handleCancel4 = () => {
    console.log("Clicked cancel button");
    setVisible4(false);
  };

  return (
    <div className="Data">
      <div className="DataCard">
        <Divider />
        {props.CurrentConf && (
          <div>
            <h3>Current Conference</h3>
            
            <Table striped bordered hover variant="dark">
              <tbody>
                <tr>
                  <td>Conference ID</td>
                  <td>{props.CurrentConf._id}</td>
                </tr>
                <tr>
                  <td>Conference status</td>
                  <td>
                    {" "}
                    {props.CurrentConf.status === "approvedbyadmin" &&
                      "Approved"}
                    {props.CurrentConf.status === "pending" && "Pending"}
                  </td>
                </tr>

                <tr>
                  <td>Conference Title</td>
                  <td>{props.CurrentConf.title}</td>
                </tr>
                <tr>
                  <td>Time Period</td>
                  <td>{props.CurrentConf.period}</td>
                </tr>
                <tr>
                  <td>Conference Starting Time</td>
                  <td>{props.CurrentConf.startingTime}</td>
                </tr>
                <tr>
                  <td>Conference Venue</td>
                  <td>{props.CurrentConf.venue}</td>
                </tr>
                <tr>
                  <td>Conference Description</td>
                  <td>{props.CurrentConf.about}</td>
                </tr>
                <tr>
                  <td>Ticket Price</td>
                  <td>{props.CurrentConf.ticketPrice}</td>
                </tr>
                <tr>
                  <td>Research Paper Charge</td>
                  <td>{props.CurrentConf.researchPaperCharge}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              type="primary"
              danger
              onClick={() => {
                setKeySpeakers(props.CurrentConf._id);
              }}
            >
              View keynote Speakers
            </Button>{" "}
            <Button
              type="primary"
              danger
              onClick={() => {
                setGSpeakers(props.CurrentConf._id);
              }}
            >
              View Guest Speakers
            </Button>{" "}
            <br />
            <br />
            <Button
              type="primary"
              onClick={() => {
                setW(props.CurrentConf._id);
              }}
            >
              View added Workshops
            </Button>{" "}
            <Button
              type="primary"
              onClick={() => {
                setR(props.CurrentConf._id);
              }}
            >
              View added Research Papers
            </Button>{" "}
            {props.CurrentConf.status === "approvedbyadmin" && (
              <Button
                type="primary"
                danger
                onClick={() => {
                  approve("pending", props.CurrentConf._id);
                }}
              >
                Reject
              </Button>
            )}
            {props.CurrentConf.status === "pending" && (
              <Button
                type="primary"
                danger
                onClick={() => {
                  approve("approvedbyadmin", props.conference._id);
                }}
              >
                Approve
              </Button>
            )}
            <Divider />
          </div>
        )}

        <h3>All Conferences</h3>

        <input
          type="text"
          className="form-control"
          id="code"
          placeholder="Enter Conference Id Or Title"
          onChange={(event) => {
            setsearchTerm(event.target.value);
          }}
        />
        <br />

        {props.conference
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val._id.includes(searchTerm)
            ) {
              return val;
            }
          })
          .map((conference, index) => (
            <div key={index}>
              <Table striped bordered hover variant="dark">
                <tbody>
                  <tr>
                    <td>Conference ID</td>
                    <td>{conference._id}</td>
                  </tr>
                  <tr>
                    <td>Conference status</td>
                    <td>
                      {" "}
                      {conference.status === "approvedbyadmin" && "Approved"}
                      {conference.status === "pending" && "Pending"}
                    </td>
                  </tr>

                  <tr>
                    <td>Conference Title</td>
                    <td>{conference.title}</td>
                  </tr>
                  <tr>
                    <td>Time Period</td>
                    <td>{conference.period}</td>
                  </tr>
                  <tr>
                    <td>Conference Starting Time</td>
                    <td>{conference.startingTime}</td>
                  </tr>
                  <tr>
                    <td>Conference Venue</td>
                    <td>{conference.venue}</td>
                  </tr>
                  <tr>
                    <td>Conference Description</td>
                    <td>{conference.about}</td>
                  </tr>
                  <tr>
                    <td>Ticket Price</td>
                    <td>{conference.ticketPrice}</td>
                  </tr>
                  <tr>
                    <td>Research Paper Charge</td>
                    <td>{conference.researchPaperCharge}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setKeySpeakers(conference._id);
                }}
              >
                View keynote Speakers
              </Button>{" "}
              <Button
                type="primary"
                danger
                onClick={() => {
                  setGSpeakers(conference._id);
                }}
              >
                View Guest Speakers
              </Button>{" "}
              <br />
              <br />
              <Button
                type="primary"
                onClick={() => {
                  setW(conference._id);
                }}
              >
                View added Workshops
              </Button>{" "}
              <Button
                type="primary"
                onClick={() => {
                  setR(conference._id);
                }}
              >
                View added Research Papers
              </Button>{" "}
              {conference.status === "approvedbyadmin" && (
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    approve("pending", conference._id);
                  }}
                >
                  Reject
                </Button>
              )}
              {conference.status === "pending" && (
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    approve("approvedbyadmin", conference._id);
                  }}
                >
                  Approve
                </Button>
              )}
              <Divider />
            </div>
          ))}
        <Divider />

        <Modal
          title="Keynote Speaker"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div>
            {keynoteSpeakers.map((keynoteSpeaker, index) => (
              <div key={index} className="adminSpeakers">
                <div className="keyNoteSpeakerImgadmin ">
                  <Image
                    className="custom-cusprof-pp-img-admin"
                    cloudName="grid1234"
                    publicId={keynoteSpeaker.image.imagePublicId}
                  />
                  <h6>{keynoteSpeaker.name}</h6>
                </div>
                <p>Associate With : {keynoteSpeaker.associatewith}</p>
                <h6>Cover Letter : </h6> <p>{keynoteSpeaker.coverletter}</p>
                <Divider />
              </div>
            ))}
          </div>
        </Modal>
        <Modal
          title="Added Workshops"
          visible={visible2}
          onOk={handleOk2}
          confirmLoading={confirmLoading}
          onCancel={handleCancel2}
        >
          <div>
            {workshops.map((setWorkshop, index) => (
              <div key={index}>
                {props.workshopData.map((workshop, index) => (
                  <div key={index}>
                    {props.workshopData.map((workshop, index) => (
                      <div key={index}>
                        {workshop.workshopData
                          .filter((wrk) => wrk._id === setWorkshop.workshopID)
                          .map((workshops, index) => (
                            <div key={index}>
                              <Table striped bordered hover variant="dark">
                                <tbody>
                                  <tr>
                                    <td>Workshop ID</td>
                                    <td>{workshops._id}</td>
                                  </tr>
                                  <tr>
                                    <td>Topic</td>
                                    <td>{workshops.workshopTopic}</td>
                                  </tr>
                                  <tr>
                                    <td>Description</td>
                                    <td>{workshops.workshopDescription}</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Button
                                type="primary"
                                danger
                                href={workshops.proposalSecURL}
                              >
                                Download Workshop Proposal
                              </Button>{" "}
                              <Divider />
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Modal>
        <Modal
          title="Added Research Papers"
          visible={visible3}
          onOk={handleOk3}
          confirmLoading={confirmLoading}
          onCancel={handleCancel3}
        >
          <div>
            {researchPapers.map((researchPaper, index) => (
              <div key={index}>
                {props.rPaperData.map((rPaper, index) => (
                  <div key={index}>
                    {rPaper.researchData
                      .filter(
                        (wrk) => wrk._id === researchPaper.researchPaperID
                      )
                      .map((rPaperData, index) => (
                        <div key={index}>
                          <Table striped bordered hover variant="dark">
                            <tbody>
                              <tr>
                                <td>Paper ID</td>
                                <td>{rPaperData._id}</td>
                              </tr>

                              <tr>
                                <td>Authors</td>
                                <td>{rPaperData.paperAuthors}</td>
                              </tr>
                              <tr>
                                <td>Topic</td>
                                <td>{rPaperData.researchTopic}</td>
                              </tr>
                              <tr>
                                <td>Subject</td>
                                <td>{rPaperData.researchSubject}</td>
                              </tr>
                              <tr>
                                <td>Abstract</td>
                                <td>{rPaperData.paperAbstract}</td>
                              </tr>
                            </tbody>
                          </Table>{" "}
                          <Button
                            type="primary"
                            danger
                            href={rPaperData.paperSecURL}
                          >
                            Download Research Paper
                          </Button>{" "}
                          <Divider />
                        </div>
                      ))}
                    <Divider />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Modal>
        <Modal
          title="Guest Speakers"
          visible={visible4}
          onOk={handleOk4}
          confirmLoading={confirmLoading}
          onCancel={handleCancel4}
        >
          <div>
            {guestSpeakers.map((guestSpeaker, index) => (
              <div key={index} className="adminSpeakers">
                <div className="keyNoteSpeakerImgadmin">
                  <Image
                    className="custom-cusprof-pp-img-admin "
                    cloudName="grid1234"
                    publicId={guestSpeaker.image.imagePublicId}
                  />
                  <br />
                  <h6>{guestSpeaker.name}</h6>
                </div>

                <p>Associate With : {guestSpeaker.associatewith}</p>
                <h6>Cover Letter : </h6>
                <p>{guestSpeaker.coverletter}</p>
                <Divider />
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminConfData;
