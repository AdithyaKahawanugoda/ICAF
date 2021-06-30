import React, { useState, useContext } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import FileBase from "react-file-base64";
import "./RegistrationForm.css";
import RegImgContext from "../context/reg-screen-context";

const RegistrationForm = () => {
  const ctx = useContext(RegImgContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState("");
  const [description, setDescription] = useState("");
  const [ppEnc, setPPEnc] = useState("");
  const [fileEnc, setFileEnc] = useState("");
  const [error, setError] = useState("");
  const [section, setSection] = useState(1);

  const registrationHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    } else if (
      username.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    } else if (password.trim().length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please use a password with at least 6 characters");
    } else if (!role === "attendee") {
      if (topic.trim().length === 0 || ppEnc === "" || fileEnc === "") {
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError(
          "Please fill all the fields and select files to upload"
        );
      }
    } else {
      if (role === "researcher") {
        registerResearcher();
      }
      if (role === "workshop conductor") {
        registerWC();
      }
      if (role === "attendee") {
        getConferenceID();
      }
    }
  };

  const registerResearcher = async () => {
    let postObject = {
      username,
      email,
      password,
      topic,
      subject,
      abstract,
      authors,
      ppEnc,
      fileEnc,
    };
    await axios
      .post("http://localhost:6500/grid/api/auth/reg-researcher", postObject)
      .then((res) => {
        alert("Researcher registration Success");
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", "researcher");
        window.location = `/profile/researcher`;
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  const registerWC = async () => {
    let postObject = {
      username,
      email,
      password,
      topic,
      description,
      ppEnc,
      fileEnc,
    };
    await axios
      .post(
        "http://localhost:6500/grid/api/auth/reg-workshopconductor",
        postObject
      )
      .then((res) => {
        alert("Workshop Conductor registration Success");
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", "workshop conductor");
        window.location = `/profile/wconductor`;
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  const getConferenceID = async () => {
    let conferenceID = 0;
    await axios
      .get("http://localhost:6500/grid/api/guest/getConference")
      .then((confRes) => {
        conferenceID = confRes.data.latestConference._id;
        registerAttendee(conferenceID);
      })
      .catch((err) => {
        alert("Error occured! " + err);
      });
  };

  const registerAttendee = async (cID) => {
    let postObject = {
      username,
      email,
      password,
      ppEnc,
      regFee: 3500,
      ticketID: cID,
    };
    await axios
      .post("http://localhost:6500/grid/api/auth/reg-attendee", postObject)
      .then((res) => {
        alert("Attendee registration Success");
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", "attendee");
        window.location = `/profile/attendee`;
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  return (
    <div className="reg-form-body">
      <p className="reg-top-title">Registration</p>
      <Form onSubmit={registrationHandler}>
        {error && <span className="error-message">{error}</span>}
        {section === 1 && (
          <div>
            <Form.Group>
              <Form.Label as="legend" column sm={12}>
                <h3>Register as:</h3>
              </Form.Label>
              <Col sm={12} style={{ fontSize: "1.1rem", paddingLeft: "3vw" }}>
                <Form.Check
                  type="radio"
                  required={true}
                  label="Attendee"
                  onClick={() => {
                    setRole("attendee");
                    ctx.onImgChange("attendee");
                    setTimeout(() => {
                      setSection(2);
                    }, 1000);
                  }}
                  id="formHorizontalRadios1"
                  name="formHorizontalRadios"
                />
                <Form.Check
                  type="radio"
                  required={true}
                  label="Researcher"
                  onClick={() => {
                    setRole("researcher");
                    ctx.onImgChange("researcher");
                    setTimeout(() => {
                      setSection(2);
                    }, 1000);
                  }}
                  id="formHorizontalRadios2"
                  name="formHorizontalRadios"
                />
                <Form.Check
                  type="radio"
                  required={true}
                  label="Workshop-Conductor"
                  onClick={() => {
                    setRole("workshop conductor");
                    ctx.onImgChange("workshop conductor");
                    setTimeout(() => {
                      setSection(2);
                    }, 1000);
                  }}
                  id="formHorizontalRadios3"
                  name="formHorizontalRadios"
                />
              </Col>
            </Form.Group>
          </div>
        )}
        {section === 2 && (
          <div>
            <Button
              variant="warning"
              onClick={() => {
                setSection(1);
                ctx.onImgChange("reg");
              }}
              style={{ marginBottom: "2vh" }}
            >
              Back
            </Button>
            <Form.Row>
              <Form.Group as={Col} md={6} controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We won't share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={6} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password with at least 6 characters"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            {role === "attendee" && (
              <div>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Profile picture:&nbsp;</Form.Label>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setPPEnc(base64);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <p>
                  Attendees should complete the payment process to get signed up
                  with ICAF
                </p>
                <Button
                  onClick={() => {
                    setSection(3);
                  }}
                >
                  Proceed with payment
                </Button>
              </div>
            )}
            {role === "researcher" && (
              <div>
                <Form.Row>
                  <Form.Group as={Col} md={6} controlId="topic">
                    <Form.Label>Paper Title</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      value={topic}
                      onChange={(e) => {
                        setTopic(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6} controlId="authors">
                    <Form.Label>Contributed Authors</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      value={authors}
                      onChange={(e) => {
                        setAuthors(e.target.value);
                      }}
                    />
                    <span className="reg-screen-subtext">
                      *Use commas to seperate each author name
                    </span>
                  </Form.Group>
                  <Form.Group controlId="abstract" as={Col} md={6}>
                    <Form.Label>Paper Abstract</Form.Label>
                    <Form.Control
                      as="textarea"
                      required={true}
                      value={abstract}
                      onChange={(e) => {
                        setAbstract(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Profile picture:&nbsp;</Form.Label>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setPPEnc(base64);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Research paper:&nbsp;</Form.Label>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setFileEnc(base64);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
              </div>
            )}
            {role === "workshop conductor" && (
              <div>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Workshop Title</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      value={topic}
                      onChange={(e) => {
                        setTopic(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Profile picture:&nbsp;</Form.Label>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setPPEnc(base64);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Workshop proposal:&nbsp;</Form.Label>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setFileEnc(base64);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
              </div>
            )}
            {role !== "attendee" && <Button type="submit">Submit</Button>}
          </div>
        )}
        {section === 3 && (
          <div>
            <Button
              variant="warning"
              onClick={() => {
                setSection(2);
              }}
              style={{ marginBottom: "2vh" }}
            >
              Back
            </Button>
            <div style={{ fontSize: "1.3rem", marginBottom: "2vh" }}>
              Payment Gateway
            </div>
            <Form.Row>
              <Form.Group as={Col} md={6}>
                <Form.Label>Card no.</Form.Label>
                <Form.Control
                  type="number"
                  required={true}
                  placeholder="Enter credit card no."
                />
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <Form.Label>Card holder</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  placeholder="Enter card owner's name"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={6}>
                <Form.Label>Bill amount</Form.Label>
                <Form.Control disabled placeholder="LKR 3500.00" />
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <Form.Label>CVC no.</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cvc no. on card back"
                  required={true}
                  minLength={3}
                  maxLength={3}
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit</Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default RegistrationForm;
