import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Col, Row, Table } from "antd";
import axios from "axios";
const EditorGallery = () => {
  const [gallerySection, setGallerySection] = useState(1);
  const galleryColumns = [];

  const addGalleryHandler = async () => {};
  const updateGalleryHandler = async () => {};
  const removeGalleryHandler = async () => {};
  return (
    <div>
      <h1>Gallery</h1>
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
