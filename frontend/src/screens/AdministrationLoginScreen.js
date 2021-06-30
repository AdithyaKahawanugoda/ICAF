import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import "./AdministrationLoginScreen.css";

const AdministrationLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginRole, setLoginRole] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    } else if (password.trim().length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please use a valid password");
    } else {
      let postObject = { email, password, role: loginRole };

      await axios
        .post("http://localhost:6500/grid/api/auth/login", postObject)
        .then((res) => {
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("userRole", res.data.user.role);
          window.location = `/profile/${res.data.user.role}`;
        })
        .catch((err) => {
          setError(err.response.data.desc);
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    }
  };

  return (
    <div style={{ paddingTop: "10vh", margin: "auto", width: "40vw" }}>
      <Form onSubmit={loginHandler} className="admin-login-form-body">
        {error && <span className="error-message">{error}</span>}
        <h2>Administration Login Panel</h2>
        <Form.Label as="legend" column sm={12}>
          Login as:
        </Form.Label>
        <Col sm={12} style={{ paddingLeft: "3vw", marginBottom: "3vh" }}>
          <Form.Check
            type="radio"
            required={true}
            label="Admin"
            onClick={() => {
              setLoginRole("admin");
            }}
            id="formHorizontalRadios1"
            name="formHorizontalRadios"
          />
          <Form.Check
            type="radio"
            required={true}
            label="Editor"
            onClick={() => {
              setLoginRole("editor");
            }}
            id="formHorizontalRadios2"
            name="formHorizontalRadios"
          />
          <Form.Check
            type="radio"
            required={true}
            label="Reviewer"
            onClick={() => {
              setLoginRole("reviewer");
            }}
            id="formHorizontalRadios3"
            name="formHorizontalRadios"
          />
        </Col>
        <Form.Group as={Col} md={12} controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md={12} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md={12} className="login-btn">
          <Button variant="primary" type="submit" block>
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AdministrationLogin;
