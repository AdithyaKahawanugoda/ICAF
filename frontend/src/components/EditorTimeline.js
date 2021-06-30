import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Col, Row, Table, Modal } from "antd";
import axios from "axios";

const EditorTimeline = () => {
  const [timelineSection, setTimelineSection] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timelineData, setTimelineData] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setSelectedID("");
    setVisible(false);
  };

  useEffect(() => {
    const fetchTimelineData = async () => {
      await axios
        .get("http://localhost:6500/grid/api/guest/getTimeline")
        .then((res) => {
          setTimelineData(res.data.allNews);
        })
        .catch((err) => {
          alert("Error! " + err);
        });
    };
    fetchTimelineData();
  }, [dataStatus]);

  const addTimelineHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let postObject = { title, description };
    await axios
      .post(
        "http://localhost:6500/grid/api/editorpvt/addNews",
        postObject,
        config
      )
      .then((res) => {
        alert("New Timeline added!");
        setDataStatus(!dataStatus);
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };
  const updateTimelineHandler = async () => {
    setConfirmLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const postObj = { ntID: selectedID, title, description, status: "pending" };
    await axios
      .put("http://localhost:6500/grid/api/editorpvt/editNews", postObj, config)
      .then((res) => {
        alert("Timeline update request sent to admin!");
        setConfirmLoading(false);
        handleCancel();
        setDataStatus(!dataStatus);
      })
      .catch((err) => {
        alert("ERROR! " + err);
        setConfirmLoading(false);
        handleCancel();
      });
  };
  const removeTimelineHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const postObj = { nID: id };
    await axios
      .put(
        "http://localhost:6500/grid/api/editorpvt/requestNewsRemove",
        postObj,
        config
      )
      .then((res) => {
        alert("Timeline delete request sent to admin!");
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  const timelineColumns = [
    {
      title: "Notice Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: " ",
      dataIndex: "",
      key: "actions",
      render: (item) => (
        <div>
          <Button
            size="sm"
            style={{ margin: "1vh" }}
            onClick={() => {
              setSelectedID(item._id);
              showModal(true);
            }}
          >
            Update
          </Button>
          <Button
            size="sm"
            variant="danger"
            style={{ margin: "1vh" }}
            onClick={() => {
              removeTimelineHandler(item._id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Timeline</h1>
      <div style={{ marginTop: "4vh" }}>
        <Row>
          <ListGroup horizontal defaultActiveKey="#link1">
            <ListGroup.Item
              href="#link1"
              onClick={() => {
                setTimelineSection(1);
              }}
            >
              Add New
            </ListGroup.Item>
            <ListGroup.Item
              href="#link2"
              onClick={() => {
                setTimelineSection(2);
              }}
            >
              Update/Delete
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row style={{ marginTop: "4vh" }}>
          {timelineSection === 1 && (
            <div>
              <Form onSubmit={addTimelineHandler}>
                <Form.Row>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Timeline Event Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Event Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Button variant="warning" type="submit">
                  Add
                </Button>
              </Form>
            </div>
          )}
          {timelineSection === 2 && (
            <div>
              <Table
                style={{ width: "50vw" }}
                size="medium"
                columns={timelineColumns}
                dataSource={timelineData}
                pagination={{ pageSize: 4 }}
                rowKey="_id"
              />
            </div>
          )}
        </Row>
      </div>
      <Modal
        title="Update Data"
        visible={visible}
        onOk={updateTimelineHandler}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        closable={false}
        width="30vw"
      >
        <Form.Group as={Col} md={12}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Timeline Event Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md={12}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Event Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
      </Modal>
    </div>
  );
};

export default EditorTimeline;
