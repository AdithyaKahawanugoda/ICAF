import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Col, Row, Table } from "antd";
import axios from "axios";

const EditorHomeNotices = () => {
  const [noticeSection, setNoticeSection] = useState(1);
  const [noticeData, setNoticeData] = useState([]);

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
  }, []);

  const noticeColumns = [];

  const addNoticeHandler = async () => {};
  const updateNoticeHandler = async () => {};
  const removeNoticeHandler = async () => {};

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
          {noticeSection === 1 && <div>Add New</div>}
          {noticeSection === 2 && <div>Update/Delete</div>}
        </Row>
      </div>
    </div>
  );
};

export default EditorHomeNotices;
