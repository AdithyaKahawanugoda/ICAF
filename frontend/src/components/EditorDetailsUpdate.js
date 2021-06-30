import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import EditorContext from "../context/editor-context";
import axios from "axios";

const EditorDetailsUpdate = () => {
  const ctx = useContext(EditorContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const updateProfileHandler = async () => {
    if (username.trim().length === 0 && email.trim().length === 0) {
      setTimeout(() => {
        setError("");
      }, 5000);
      setError("Invalid input! please try again.");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      let postObject = { email, username };
      await axios
        .patch(
          "http://localhost:6500/grid/api/editorpvt/editProfile",
          postObject,
          config
        )
        .then((res) => {
          alert("Profile update success");
          ctx.onProfileChange(res.data.updatedUser);
        })
        .catch((err) => {
          alert("ERROR! " + err);
        });
    }
  };

  return (
    <div>
      <h1>Update profile details</h1>
      <div style={{ marginTop: "4vh" }}>
        <Form onSubmit={updateProfileHandler}>
          {error && <span className="error-message">{error}</span>}
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder={`New Username - (current: ${ctx.username})`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder={`New Email - (current: ${ctx.email})`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </div>
    </div>
  );
};

export default EditorDetailsUpdate;
