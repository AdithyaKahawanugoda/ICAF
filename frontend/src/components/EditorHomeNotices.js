import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Col, Row, Table, Modal } from "antd";
import axios from "axios";

const EditorHomeNotices = () => {
  const [noticeSection, setNoticeSection] = useState(1);
  const [noticeData, setNoticeData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    const fetchNoticeData = async () => {
      await axios
        .get("http://localhost:6500/grid/api/guest/getNotices")
        .then((res) => {
          setNoticeData(res.data.allNotices);
        })
        .catch((err) => {
          alert("Error! " + err);
        });
    };
    fetchNoticeData();
  }, [dataStatus]);

  const addNoticeHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let postObject = { title, description };
    await axios
      .post(
        "http://localhost:6500/grid/api/editorpvt/addNotice",
        postObject,
        config
      )
      .then((res) => {
        alert("New Notice added!");
        setDataStatus(!dataStatus);
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };
  const updateNoticeHandler = async () => {
    setConfirmLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const postObj = { nID: selectedID, title, description, status: "pending" };
    await axios
      .put(
        "http://localhost:6500/grid/api/editorpvt/editNotice",
        postObj,
        config
      )
      .then((res) => {
        alert("Notice update request sent to admin!");
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
  const removeNoticeHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const postObj = { nID: id };
    await axios
      .put(
        "http://localhost:6500/grid/api/editorpvt/requestNoticeRemove",
        postObj,
        config
      )
      .then((res) => {
        alert("Notice delete request sent to admin!");
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  const noticeColumns = [
    {
      title: "News Title",
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
              removeNoticeHandler(item._id);
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
      <h1>Home Notices</h1>
      <div style={{ marginTop: "4vh" }}>
        <Row>
          <ListGroup horizontal defaultActiveKey="#link1">
            <ListGroup.Item
              href="#link1"
              onClick={() => {
                setNoticeSection(1);
              }}
            >
              Add New
            </ListGroup.Item>
            <ListGroup.Item
              href="#link2"
              onClick={() => {
                setNoticeSection(2);
              }}
            >
              Update/Delete
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row style={{ marginTop: "4vh" }}>
          {noticeSection === 1 && (
            <div>
              <Form onSubmit={addNoticeHandler}>
                <Form.Row>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Notice Title"
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
                      placeholder="Description"
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
          {noticeSection === 2 && (
            <div>
              <Table
                style={{ width: "50vw" }}
                size="medium"
                columns={noticeColumns}
                dataSource={noticeData}
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
        onOk={updateNoticeHandler}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        closable={false}
        width="30vw"
      >
        <Form.Group as={Col} md={12}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Notice Title"
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
            placeholder="Description"
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

export default EditorHomeNotices;
