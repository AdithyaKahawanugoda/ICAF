import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Button, Col, Divider, Modal } from "antd";
import { Table } from "react-bootstrap";
import { Image } from "cloudinary-react";
import "./AdminSideBar.css";

const AdminSideBar = () => {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [visible4, setVisibles] = React.useState(false);
  const [sideBar, setSideBar] = useState(true);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  const [homenotice, sethomenotice] = useState([]);
  const [userGuide, setuserGuide] = useState([]);
  const [timeline, settimeline] = useState([]);
  const [galleryImg, setGalleryImg] = useState([]);

  const [hcounter, setHCounter] = useState(0);
  const [ucounter, setUCounter] = useState(0);
  const [tcounter, setTCounter] = useState(0);
  const [gcounter, setGCounter] = useState(0);
  let count = 0,
    count2 = 0,
    count3 = 0,
    count4 = 0;

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
    setVisible3(true);
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
      setVisible3(false);
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
    setVisible3(false);
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
          window.location.reload(false);
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
          for (var i = 0; i < res.data.homenotices.length; i++) {
            if (res.data.homenotices[i].status === "pending") {
              count++;
              setHCounter(count);
            }
          }
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
          for (var i = 0; i < res.data.userGuideData.length; i++) {
            if (res.data.userGuideData[i].status === "pending") {
              count2++;
              setUCounter(count2);
            }
          }
          setuserGuide(res.data.userGuideData);
        })
        .catch((err) => {
          alert(err.message);
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
          for (var i = 0; i < res.data.gallery.length; i++) {
            if (res.data.gallery[i].status === "pending") {
              count4++;
              setGCounter(count4);
            }
          }
          setGalleryImg(res.data.gallery);
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
          for (var i = 0; i < res.data.newsTimelineData.length; i++) {
            if (res.data.newsTimelineData[i].status === "pending") {
              count3++;
              setTCounter(count3);
            }
          }
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
    const getSideBar = async () => {
      getHomeNotices();
      getUserGuide();
      getTimeLine();
      getGalleryImg();
    };
    getSideBar();
  }, []);

  return (
    <div className="sdbar">
      {sideBar && (
        <div>
          <h3>Waiting for Approval</h3>
          <Divider />
          {hcounter > 0 && (
            <div className="sideBarCard">
              <Row onClick={showModal}>
                <Col span={18} xs={24} sm={24} md={24} lg={24} xl={18}>
                  Home Notices
                </Col>
                <Col span={6} xs={24} sm={24} md={24} lg={24} xl={6}>
                  <Button
                    type="primary"
                    shape="circle"
                    danger
                    onClick={showModal}
                  >
                    {hcounter}
                  </Button>
                </Col>
              </Row>
            </div>
          )}
          {ucounter > 0 && (
            <div className="sideBarCard">
              <Row onClick={showModal2}>
                <Col span={18} xs={24} sm={24} md={24} lg={24} xl={18}>
                  User Guides
                </Col>
                <Col span={6} xs={24} sm={24} md={24} lg={24} xl={6}>
                  <Button
                    type="primary"
                    shape="circle"
                    danger
                    onClick={showModal2}
                  >
                    {ucounter}
                  </Button>
                </Col>
              </Row>
            </div>
          )}
          {tcounter > 0 && (
            <div className="sideBarCard">
              <Row onClick={showModal3}>
                <Col span={18} xs={24} sm={24} md={24} lg={24} xl={18}>
                Time Lines
                </Col>
                <Col span={6} xs={24} sm={24} md={24} lg={24} xl={6}>
                  <Button
                    type="primary"
                    shape="circle"
                    danger
                    onClick={showModal3}
                  >
                    {tcounter}
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {gcounter > 0 && (
            <div className="sideBarCard">
              <Row onClick={showModal4}>
                <Col span={18} xs={24} sm={24} md={24} lg={18} xl={18}>
                  Gallery
                </Col>
                <Col span={6} xs={24} sm={24} md={24} lg={6} xl={6}>
                  <Button
                    type="primary"
                    shape="circle"
                    danger
                    onClick={showModal4}
                  >
                    {gcounter}
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          <Modal
            title="Title"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>
              {homenotice
                .filter((wrk) => wrk.status === "pending")
                .map((homenotices, index) => (
                  <div key={index}>
                    <Table striped bordered hover variant="dark">
                      <tbody>
                        <tr>
                          <td>Id</td>
                          <td>{homenotices._id}</td>
                        </tr>
                        <tr>
                          <td>Title</td>
                          <td>{homenotices.title}</td>
                        </tr>
                        <tr>
                          <td>Description</td>
                          <td>{homenotices.description}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        approveHomeN(homenotices._id, "approvedbyadmin");
                      }}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        approveHomeN(homenotices._id, "rejectedbyadmin");
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                ))}
            </p>
          </Modal>

          <Modal
            title="Title"
            visible={visible2}
            onOk={handleOk2}
            confirmLoading={confirmLoading}
            onCancel={handleCancel2}
          >
            <p>
              {userGuide
                .filter((wrk) => wrk.status === "pending")
                .map((userGuides, index) => (
                  <div key={index}>
                    <Table striped bordered hover variant="dark">
                      <tbody>
                        <tr>
                          <td>Id</td>
                          <td>{userGuides._id}</td>
                        </tr>
                        <tr>
                          <td>Section Title</td>
                          <td>{userGuides.sectionTitle}</td>
                        </tr>
                        <tr>
                          <td>Artical Title</td>
                          <td>{userGuides.articleTitle}</td>
                        </tr>
                        <tr>
                          <td>Description</td>
                          <td>{userGuides.description}</td>
                        </tr>
                        <tr>
                          <td>Created At</td>
                          <td>{userGuides.createdAt}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        approveU(userGuides._id, "approvedbyadmin");
                      }}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        approveU(userGuides._id, "rejectedbyadmin");
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                ))}
            </p>
          </Modal>

          <Modal
            title="Title"
            visible={visible3}
            onOk={handleOk3}
            confirmLoading={confirmLoading}
            onCancel={handleCancel3}
          >
            <p>
              {timeline
                .filter((wrk) => wrk.status === "pending")
                .map((timeline, index) => (
                  <div key={index}>
                    <Table striped bordered hover variant="dark">
                      <tbody>
                        <tr>
                          <td>Id</td>
                          <td>{timeline._id}</td>
                        </tr>
                        <tr>
                          <td> Title</td>
                          <td>{timeline.title}</td>
                        </tr>
                        <tr>
                          <td>Description</td>
                          <td>{timeline.description}</td>
                        </tr>
                        <tr>
                          <td>Created At</td>
                          <td>{timeline.createdAt}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        approveT(timeline._id, "approvedbyadmin");
                      }}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        approveT(timeline._id, "rejectedbyadmin");
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                ))}
            </p>
          </Modal>

          <Modal
            title="Title"
            visible={visible3}
            onOk={handleOk3}
            confirmLoading={confirmLoading}
            onCancel={handleCancel3}
          >
            <p>
              {galleryImg
                .filter((wrk) => wrk.status === "pending")
                .map((gallery, index) => (
                  <div className="pendingGallery" key={index}>
                    <div className="galleryImg" key={index}>
                      <Image
                        className="custom-cusprof-pp-img-adminglry "
                        cloudName="grid1234"
                        publicId={gallery.galleryImage.imagePublicId}
                      />

                      <div>
                        <Button
                          type="primary"
                          danger
                          onClick={() => {
                            approveG(gallery._id, "approvedbyadmin");
                          }}
                        >
                          Approve
                        </Button>{" "}
                        <Button
                          type="primary"
                          danger
                          onClick={() => {
                            approveG(gallery._id, "rejectedbyadmin");
                          }}
                        >
                          Reject
                        </Button>
                        <Divider />
                      </div>
                    </div>
                  </div>
                ))}
            </p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AdminSideBar;
