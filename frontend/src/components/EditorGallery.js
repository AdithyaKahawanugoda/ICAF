import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Col, Row, Table, Modal } from "antd";
import axios from "axios";

const EditorGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [userGuideData, setUserGuideData] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  const [fileEnc, setFileEnc] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    const fetchgalleryData = async () => {
      await axios
        .get("http://localhost:6500/grid/api/guest/getGalleryImages")
        .then((res) => {
          setGalleryData(res.data.gallery);
        })
        .catch((err) => {
          alert("Error! " + err);
        });
    };
    fetchgalleryData();
    const fetchUserGuideData = async () => {
      await axios
        .get("http://localhost:6500/grid/api/guest/getGuideData")
        .then((res) => {
          setUserGuideData(res.data.guides);
        })
        .catch((err) => {
          alert("Error! " + err);
        });
    };
    fetchUserGuideData();
  }, [dataStatus]);

  const addGalleryHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let postObject = { fileEnc };
    await axios
      .post(
        "http://localhost:6500/grid/api/editorpvt/addGallery",
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

  const galleryColumns = [];

  return (
    <div>
      <h1>Gallery &amp; User Guide</h1>
      <div style={{ marginTop: "4vh" }}>
        <Row>
          <ListGroup horizontal defaultActiveKey="#link1">
            <ListGroup.Item
              href="#link1"
              onClick={() => {
                setGallerySection(1);
              }}
            >
              Add New
            </ListGroup.Item>
            <ListGroup.Item
              href="#link2"
              onClick={() => {
                setGallerySection(2);
              }}
            >
              Update/Delete
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row style={{ marginTop: "4vh" }}>
          {gallerySection === 1 && <div>Add New</div>}
          {gallerySection === 2 && <div>Update/Delete</div>}
        </Row>
      </div>
    </div>
  );
};

export default EditorGallery;
