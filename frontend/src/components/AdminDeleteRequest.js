import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Divider } from "antd";
import Table from "react-bootstrap/Table";

const AdminDeleteRequest = (props) => {
  const [searchTerm, setsearchTerm] = useState("");
  const [ignoreId, setIgnoreId] = useState("");

  const deleteHomeContent = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const nID = id;

    try {
      await axios
        .delete(
          `http://localhost:6500/grid/api/adminpvt/deleteHomeContent/${nID}`,config
        )
        .then((res) => {
          ignore(nID);
          window.location.reload(false);
        });
    } catch (err) {
      alert("error" + err);
    }
  };

  const deleteTimeLine = async (id) => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const nID = id;
    
    try {
      await axios
        .delete(
          `http://localhost:6500/grid/api/adminpvt/deleteTimelines/${nID}`,config
        )
        .then((res) => {
          ignore(nID);
          window.location.reload(false);
        });
    } catch (err) {
      alert("error" + err);
    }
  };

  const deleteUserGuide = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const nID = id;
 
    try {
      await axios
        .delete(
          `http://localhost:6500/grid/api/adminpvt/deleteUserGuidContent/${nID}`,config
        )
        .then((res) => {
          ignore(nID);
          window.location.reload(false);
        });
    } catch (err) {
      alert("error" + err);
    }
  };

  const ignore = (id) => {
    for (let i = 0; i < props.delNotifications.length; i++) {
      if (props.delNotifications[i].description.includes(id)) {
        setIgnoreId(props.delNotifications[i]._id);
        ignoreRequest(props.delNotifications[i]._id);
      }
    }
  };

  const ignoreRequest = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const nID = id;
    try {
      await axios
        .delete(
          `http://localhost:6500/grid/api/notifi/deleteNotification/${nID}`, config
        )
        .then((res) => {
          window.location.reload(false);
        });
    } catch (err) {
      alert("error" + err);
    }
  };

  return (
    <div>
      <div>
        <h1>Delete Requests</h1>
        
        {props.delNotifications.length > 0 && (
          <div>
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
            <div>
              <h6>Home Notices</h6>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Status</th>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>

                <tbody>
                  {props.homenotice
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (val._id.includes(searchTerm)) {
                        return val;
                      }
                    })
                    .filter((val) => {
                      for (let i = 0; i < props.ids.length; i++) {
                        if (val._id.includes(props.ids[i])) {
                          return val;
                        }
                      }
                    })
                    .map((homenotices, index) => (
                      <tr key={index}>
                        <td>{homenotices._id}</td>
                        <td>{homenotices.status}</td>
                        <td>{homenotices.title}</td>
                        <td>{homenotices.description}</td>
                        <tr>
                          <td>
                            <Button
                              type="primary"
                              danger
                              onClick={() => {
                                deleteHomeContent(homenotices._id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>

                          <td>
                            <Button
                              type="primary"
                              danger
                              onClick={() => {
                                ignore(homenotices._id);
                              }}
                            >
                              Ignore
                            </Button>
                          </td>
                        </tr>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <Divider />
            <div>
              <h6>Time Line</h6>

              <br />
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr >
                    <th>id</th>
                    <th>Status</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created Time</th>
                  </tr>
                </thead>
                <tbody>
                  {props.timeline
                    .filter((val) => {
                      if (searchTerm == "") {
                        return val;
                      } else if (val._id.includes(searchTerm)) {
                        return val;
                      }
                    })
                    .filter((val) => {
                      for (let i = 0; i < props.ids.length; i++) {
                        if (val._id.includes(props.ids[i])) {
                          return val;
                        }
                      }
                    })
                    .map((tm, index) => (
                      <tr key={index}>
                        <td>{tm._id}</td>
                        <td>{tm.status}</td>
                        <td>{tm.title}</td>
                        <td>{tm.description}</td>
                        <td>{tm.createdAt}</td>

                        <tr>
                          <td>
                            <Button
                              type="primary"
                              danger
                              onClick={() => {
                                deleteTimeLine(tm._id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>

                          <td>
                            <Button
                              type="primary"
                              danger
                              onClick={() => {
                                ignore(tm._id);
                              }}
                            >
                              Ignore
                            </Button>
                          </td>
                        </tr>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <Divider />
            <div>
              <h6>User Guide</h6>
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
                  {props.userGuide
                    .filter((val) => {
                      if (searchTerm == "") {
                        return val;
                      } else if (val._id.includes(searchTerm)) {
                        return val;
                      }
                    })
                    .filter((val) => {
                      for (let i = 0; i < props.ids.length; i++) {
                        if (val._id.includes(props.ids[i])) {
                          return val;
                        }
                      }
                    })
                    .map((userGuides, index) => (
                      <tr key={index}>
                        <td>{userGuides._id}</td>
                        <td>{userGuides.status}</td>
                        <td>{userGuides.sectionTitle}</td>
                        <td>{userGuides.articleTitle}</td>
                        <td>{userGuides.description}</td>
                        <p>{userGuides.createdAt}</p>

                        <tr>
                          <td>
                            <Button
                              type="primary"
                              danger
                              onClick={() => {
                                deleteUserGuide(userGuides._id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>

                          <td>
                            <Button
                              type="primary"
                              danger
                              onClick={() => {
                                ignore(userGuides._id);
                              }}
                            >
                              Ignore
                            </Button>
                          </td>
                        </tr>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}

        {props.delNotifications.length < 1 && <div>There are no any Delete Requests</div>}
      </div>
    </div>
  );
};

export default AdminDeleteRequest;
