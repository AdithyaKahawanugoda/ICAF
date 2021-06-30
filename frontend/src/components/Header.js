import React, { useState } from "react";
import { Navbar, Nav, Form, Col } from "react-bootstrap";
import {
  UserAddOutlined,
  UserSwitchOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { Modal } from "antd";
import axios from "axios";

const Header = () => {
  let hasToken;
  let hasRole;

  if (localStorage.getItem("authToken")) {
    hasToken = localStorage.getItem("authToken");
  }
  if (localStorage.getItem("userRole")) {
    hasRole = localStorage.getItem("userRole");
  }

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    window.location = "/login";
  };

  //login configurations
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loginRole, setLoginRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    if (password.length > 5 && email.length !== 0 && loginRole !== "") {
      setError("");
      loginHandler();
    } else {
      setConfirmLoading(false);
      setError("Invalid credentials! Please check your email & password.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const loginHandler = async () => {
    let postObject = { email, password, role: loginRole };

    await axios
      .post("http://localhost:6500/grid/api/auth/login", postObject)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);
        setVisible(false);
        setConfirmLoading(false);
        if (res.data.user.role === "workshop conductor") {
          window.location = `/profile/wconductor`;
        } else {
          window.location = `/profile/${res.data.user.role}`;
        }
      })
      .catch((err) => {
        alert("Unauthorized access detected!");
        window.location = "/";
      });
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setVisible(false);
  };

  return (
    <div>
      <Navbar
        className="custome-nav-bar-styles"
        expand="lg"
        variant="dark"
        collapseOnSelect
      >
        <Navbar.Brand href="/">
          <div className="web-brand-name">GRID-ICAF</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {hasToken && (
              <Nav.Link
                href={`/profile/${hasRole}`}
                className="custom-style-header-navlinks"
              >
                <UserOutlined style={{ fontSize: "1.5em" }} />
                Profile
              </Nav.Link>
            )}

            {!hasToken && (
              <Nav.Link
                href="/registration"
                className="custom-style-header-navlinks"
              >
                <UserAddOutlined style={{ fontSize: "1.5em" }} />
                SignUp
              </Nav.Link>
            )}

            {!hasToken && (
              <Nav.Link
                className="custom-style-header-navlinks"
                style={{ paddingRight: "10vw" }}
                onClick={showModal}
              >
                <UserSwitchOutlined style={{ fontSize: "1.5em" }} />
                Login
              </Nav.Link>
            )}

            {hasToken && (
              <Nav.Link
                onClick={logOutHandler}
                className="custom-style-header-navlinks"
                style={{ paddingRight: "10vw" }}
              >
                <PoweroffOutlined style={{ fontSize: "1.5em" }} />
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        title="Login"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        closable={false}
        width="20vw"
      >
        <Form.Group>
          {error && <span className="error-message">{error}</span>}
          <Form.Label as="legend" column sm={12}>
            Login as:
          </Form.Label>
          <Col sm={12}>
            <Form.Check
              type="radio"
              required={true}
              label="Attendee"
              onClick={() => {
                setLoginRole("attendee");
              }}
              id="formHorizontalRadios1"
              name="formHorizontalRadios"
            />
            <Form.Check
              type="radio"
              required={true}
              label="Researcher"
              onClick={() => {
                setLoginRole("researcher");
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />
            <Form.Check
              type="radio"
              required={true}
              label="Workshop-Conductor"
              onClick={() => {
                setLoginRole("workshop conductor");
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />
          </Col>
          <Form.Control
            type="email"
            placeholder="Enter email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: "3vh" }}
          />
          <Form.Control
            type="password"
            placeholder="Password.."
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "3vh" }}
          />
        </Form.Group>
      </Modal>
    </div>
  );
};

export default Header;
