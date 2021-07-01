import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button } from "antd";
import Table from "react-bootstrap/Table";
import AdminDeleteRequest from "./AdminDeleteRequest";
import { Image } from "cloudinary-react";
import "./AdminWebContent.css";
const AdminWebContent = () => {
  const [homenotice, sethomenotice] = useState([]);
  const [userGuide, setuserGuide] = useState([]);
  const [timeline, settimeline] = useState([]);
  const [galleryImg, setGalleryImg] = useState([]);

  const [homenoticeDiv, sethomenoticeDiv] = useState(false);
  const [userGuideDiv, setuserGuideDiv] = useState(false);
  const [timelineDiv, settimelineDiv] = useState(false);
  const [deleteDiv, setDeleteDiv] = useState(true);
  const [galleryDiv, setGalleryDiv] = useState(false);

  const [searchTerm, setsearchTerm] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [delNotifications, setDelNotifications] = useState([]);
  const [ids, setIds] = useState([]);

  const deleteGalleryImg = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const nID = id;
    alert(nID);
    try {
      await axios
        .delete(
          `http://localhost:6500/grid/api/adminpvt/deleteGalleryContent/${nID}`,
          config
        )
        .then((res) => {
          // window.location.reload(false);
          alert("deleted");
        });
    } catch (err) {
      alert("error" + err);
    }
  };

  const approveHomeN = async (id, status) => {
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
          "http://localhost:6500/grid/api/adminpvt/manageHomeContent",
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

  const approveU = async (id, status) => {
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
          "http://localhost:6500/grid/api/adminpvt/manageUserGuidContent",
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

  const approveG = async (id, status) => {
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
          "http://localhost:6500/grid/api/adminpvt/manageGalleryContent",
          dataObject,
          config
        )
        .then(() => {
          // window.location.reload(false);
          alert("ok");
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const approveT = async (id, status) => {
    const st = status;
    const nid = id;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let dataObject = {
      status: st,
      nid: nid,
    };
    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/adminpvt/manageNewsTimelines",
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

  const getGalleryImg = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/grid/api/adminpvt/getGalleryImages", config)
        .then((res) => {
          setGalleryImg(res.data.gallery);
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
        .get("http://localhost:6500/grid/api/adminpvt/getNotification", config)
        .then((res) => {
          for (let i = 0; i < res.data.notifications.length; i++) {
            if (res.data.notifications[i].subject.includes("Request")) {
              setNotifications(res.data.notifications[i]);
              // alert(res.data.notifications[i]);
              delNotifications.push(res.data.notifications[i]);
            }
          }
          let id;
          for (let i = 0; i < delNotifications.length; i++) {
            let temp = delNotifications[i].description.split(": ");

            id = temp[1].split(" ");
            alert(id[0]);
            ids.push(id[0]);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getHomeNotices = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/grid/api/adminpvt/getHomeContent", config)
        .then((res) => {
          sethomenotice(res.data.homenotices);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getUserGuide = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get(
          "http://localhost:6500/grid/api/adminpvt/getUserGuideContent",
          config
        )
        .then((res) => {
          setuserGuide(res.data.userGuideData);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getTimeLine = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/grid/api/adminpvt/getNewsTimelines", config)
        .then((res) => {
          settimeline(res.data.newsTimelineData);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    const getWebContent = async () => {
      getNotification();
      getHomeNotices();
      getUserGuide();
      getTimeLine();
      getGalleryImg();
    };
    getWebContent();
  }, []);

  return (
    <div>
      <Row>
        <div>
          <Button
            type="primary"
            danger
            onClick={() => {
              settimelineDiv(false);
              setuserGuideDiv(false);
              setDeleteDiv(false);
              setGalleryDiv(false);
              sethomenoticeDiv(true);
            }}
          >
            Home Notices
          </Button>{" "}
          <Button
            type="primary"
            danger
            onClick={() => {
              setuserGuideDiv(false);
              sethomenoticeDiv(false);
              setDeleteDiv(false);
              setGalleryDiv(false);
              settimelineDiv(true);
            }}
          >
            Time Line
          </Button>{" "}
          <Button
            type="primary"
            danger
            onClick={() => {
              sethomenoticeDiv(false);
              settimelineDiv(false);
              setDeleteDiv(false);
              setGalleryDiv(false);
              setuserGuideDiv(true);
            }}
          >
            User Guide
          </Button>{" "}
          <Button
            type="primary"
            danger
            onClick={() => {
              sethomenoticeDiv(false);
              settimelineDiv(false);
              setuserGuideDiv(false);
              setGalleryDiv(false);
              setDeleteDiv(true);
            }}
          >
            Delete Requests
          </Button>{" "}
          <Button
            type="primary"
            danger
            onClick={() => {
              sethomenoticeDiv(false);
              settimelineDiv(false);
              setuserGuideDiv(false);
              setDeleteDiv(false);
              setGalleryDiv(true);
            }}
          >
            Gallery
          </Button>{" "}
        </div>
      </Row>
      <br />

      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <div>
            {homenoticeDiv && (
              <div>
                <h1>Home Notices</h1>
                <Row>
                  <Col span="5"></Col>

                  <Col span="10">
                    <input
                      type="text"
                      className="form-control"
                      id="code"
                      placeholder="Enter Id...."
                      onChange={(event) => {
                        setsearchTerm(event.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                    <th><p>Waiting For Approval</p></th>
                    </tr>
                    <tr>
                      <th>id</th>
                      <th>Status</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homenotice
                      .filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        } else if (val._id.includes(searchTerm)) {
                          return val;
                        }
                      })
                      .filter((wrk) => wrk.status === "pending")
                      .map((homenotices, index) => (
                        <tr key={index}>
                          <td>{homenotices._id}</td>
                          <td>{homenotices.status}</td>
                          <td>{homenotices.title}</td>
                          <td>{homenotices.description}</td>
                          <tr>
                            <td>
                              {" "}
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  approveHomeN(
                                    homenotices._id,
                                    "approvedbyadmin"
                                  );
                                }}
                              >
                                Approve
                              </Button>{" "}
                            </td>
                            <td>
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  approveHomeN(
                                    homenotices._id,
                                    "rejectedbyadmin"
                                  );
                                }}
                              >
                                Reject
                              </Button>
                            </td>
                          </tr>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                    <th><p>Approved and Rejected</p></th>
                    </tr>
                    <tr>
                      <th>id</th>
                      <th>Status</th>
                      <th>Title</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homenotice
                      .filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        } else if (val._id.includes(searchTerm)) {
                          return val;
                        }
                      })
                      .filter((wrk) => wrk.status !== "pending")
                      .map((homenotices, index) => (
                        <tr key={index}>
                          <td>{homenotices._id}</td>
                          <td>{homenotices.status}</td>
                          <td>{homenotices.title}</td>
                          <td>{homenotices.description}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            )}

            {userGuideDiv && (
              <div>
                <h1>User Guide</h1>
                <Row>
                  <Col span="5"></Col>

                  <Col span="10">
                    <input
                      type="text"
                      className="form-control"
                      id="code"
                      placeholder="Enter Id...."
                      onChange={(event) => {
                        setsearchTerm(event.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                    <th><p>Waiting For Approval</p></th>
                    </tr>
                    <tr>
                      <th>id</th>
                      <th>Status</th>
                      <th>Section Title</th>
                      <th>Artical Title</th>
                      <th>Description</th>
                      <th>Created Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userGuide
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (val._id.includes(searchTerm)) {
                          return val;
                        }
                      })
                      .filter((wrk) => wrk.status === "pending")
                      .map((userGuides, index) => (
                        <tr key={index}>
                          <td>{userGuides._id}</td>
                          <td>{userGuides.status}</td>
                          <td>{userGuides.sectionTitle}</td>
                          <td>{userGuides.articleTitle}</td>
                          <td>{userGuides.description}</td>
                          <td>{userGuides.createdAt}</td>
                          <tr>
                            <td>
                              {" "}
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  approveU(userGuides._id, "approvedbyadmin");
                                }}
                              >
                                Approve
                              </Button>{" "}
                            </td>
                            <td>
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  approveU(userGuides._id, "rejectedbyadmin");
                                }}
                              >
                                Reject
                              </Button>
                            </td>
                          </tr>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Status</th>
                      <th>Section Title</th>
                      <th>Artical Title</th>
                      <th>Description</th>
                      <th>Created Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userGuide
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (val._id.includes(searchTerm)) {
                          return val;
                        }
                      })
                      .filter((wrk) => wrk.status !== "pending")
                      .map((userGuides, index) => (
                        <tr key={index}>
                          <td>{userGuides._id}</td>
                          <td>{userGuides.status}</td>
                          <td>{userGuides.sectionTitle}</td>
                          <td>{userGuides.articleTitle}</td>
                          <td>{userGuides.description}</td>
                          <td>{userGuides.createdAt}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            )}

            {timelineDiv && (
              <div>
                <h1>Time Line</h1>
                <Row>
                  <Col span="5"></Col>

                  <Col span="10">
                    <input
                      type="text"
                      className="form-control"
                      id="code"
                      placeholder="Enter Id...."
                      onChange={(event) => {
                        setsearchTerm(event.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                    <th><p> Waiting For Approval</p></th>
                    </tr>
                    <tr>
                      <th>id</th>
                      <th>Status</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Created Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeline
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (val._id.includes(searchTerm)) {
                          return val;
                        }
                      })
                      .filter((wrk) => wrk.status === "pending")
                      .map((tm, index) => (
                        <tr key={index}>
                          <td>{tm._id}</td>
                          <td>{tm.status}</td>
                          <td>{tm.title}</td>
                          <td>{tm.description}</td>
                          <td>{tm.createdAt}</td>
                          <tr>
                            <td>
                              {" "}
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  approveT(tm._id, "approvedbyadmin");
                                }}
                              >
                                Approve
                              </Button>{" "}
                            </td>
                            <td>
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  approveT(tm._id, "rejectedbyadmin");
                                }}
                              >
                                Reject
                              </Button>
                            </td>
                          </tr>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Approved and Rejected</th>
                    </tr>
                    <tr>
                      <th>id</th>
                      <th>Status</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Created Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeline
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (val._id.includes(searchTerm)) {
                          return val;
                        }
                      })
                      .filter((wrk) => wrk.status !== "pending")
                      .map((tm, index) => (
                        <tr key={index}>
                          <td>{tm._id}</td>
                          <td>{tm.status}</td>
                          <td>{tm.title}</td>
                          <td>{tm.description}</td>
                          <td>{tm.createdAt}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
          {deleteDiv && (
            <AdminDeleteRequest
              timeline={timeline}
              userGuide={userGuide}
              homenotice={homenotice}
              delNotifications={delNotifications}
              ids={ids}
            />
          )}
          {galleryDiv && (
            <div>
              <h1>Gallery</h1>

              <div className="galleryContainer">
                {galleryImg.map((galleryImgs, index) => (
                  <div className="galleryCard" key={index}>
                    <div className="galleryImg">
                      <Image
                        className="custom-cusprof-pp-img-adminglry "
                        cloudName="grid1234"
                        publicId={galleryImgs.galleryImage.imagePublicId}
                      />
                    </div>
                    <p>Status : {galleryImgs.status}</p>
                    {galleryImgs.status === "approvedbyadmin" && (
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          approveG(galleryImgs._id, "rejectedbyadmin");
                        }}
                      >
                        Reject
                      </Button>
                    )}{" "}
                    {(galleryImgs.status === "pending" ||
                      galleryImgs.status === "rejectedbyadmin") && (
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          approveG(galleryImgs._id, "approvedbyadmin");
                        }}
                      >
                        Approve
                      </Button>
                    )}{" "}
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        deleteGalleryImg(galleryImgs._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Col>

        <Col span={3}></Col>
      </Row>
    </div>
  );
};

export default AdminWebContent;
