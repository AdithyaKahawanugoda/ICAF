import React, { useState, useContext } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Row, Col } from "antd";
import FileBase from "react-file-base64";
import axios from "axios";
import EditorContext from "../context/editor-context";

const EditorConference = (props) => {
  const ctx = useContext(EditorContext);

  const [confSection, setConfSection] = useState(1);
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [about, setAbout] = useState("");
  const [venue, setVenue] = useState("");
  const [encCover, setEncCover] = useState("");

  const [name, setName] = useState("");
  const [associatewith, setAssociatewith] = useState("");
  const [coverletter, setCoverletter] = useState("");
  const [ppEnc, setPpEnc] = useState("");
  const [type, setType] = useState("");
  const [speakerID, setSpeakerID] = useState("");

  const addConferenceHandler = async () => {
    const postObj = {
      title,
      period,
      startingTime,
      about,
      venue,
      encCover,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    await axios
      .post(
        "http://localhost:6500/grid/api/editorpvt/addConference",
        postObj,
        config
      )
      .then((res) => {
        ctx.confData(res.data.conference);
        alert(res.data.result);
      })
      .catch((err) => {
        alert("Error! " + err);
      });
  };

  const updateConferenceHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let postObject = {
      confID: ctx.confData._id,
      title,
      period,
      startingTime,
      about,
      venue,
      status: "pending",
    };
    await axios
      .patch(
        "http://localhost:6500/grid/api/editorpvt/editConference",
        postObject,
        config
      )
      .then((res) => {
        alert("Conference update success! Submited to admin");
        ctx.onConfChange(res.data.updatedConference);
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  const addSpeakerHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let postObject = {
      confID: ctx.confData._id,
      name,
      associatewith,
      coverletter,
      type,
      ppEnc,
    };

    await axios
      .put(
        "http://localhost:6500/grid/api/editorpvt/addSpeaker",
        postObject,
        config
      )
      .then((res) => {
        alert("New speaker added! -Submited to admin");
        ctx.onConfChange(res.data.updatedConference);
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  const updateSpeakerHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let postObject = {
      speakerID,
      confID: ctx.confData._id,
      name,
      associatewith,
      coverletter,
      type,
    };

    if (type !== "" && speakerID !== "") {
      await axios
        .put(
          "http://localhost:6500/grid/api/editorpvt/editSpeaker",
          postObject,
          config
        )
        .then((res) => {
          alert("Speaker data modified! -Submited to admin");
          ctx.onConfChange(res.data.updatedConference);
        })
        .catch((err) => {
          alert("ERROR! " + err);
        });
    }
  };

  const requestRemoveSpeaker = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let postObject = {
      confID: ctx.confData._id,
      speakerID,
      type,
    };

    await axios
      .put(
        "http://localhost:6500/grid/api/editorpvt/requestSpeakerRemove",
        postObject,
        config
      )
      .then((res) => {
        alert("Speaker removal reques submited to admin");
      })
      .catch((err) => {
        alert("ERROR! " + err);
      });
  };

  return (
    <div>
      <h1>Manage Conference</h1>
      <div style={{ marginTop: "4vh" }}>
        <Row>
          <ListGroup horizontal defaultActiveKey="#link1">
            <ListGroup.Item
              href="#link1"
              onClick={() => {
                setConfSection(1);
              }}
            >
              Add New
            </ListGroup.Item>
            <ListGroup.Item
              href="#link2"
              onClick={() => {
                setConfSection(2);
              }}
            >
              Update
            </ListGroup.Item>
            <ListGroup.Item
              href="#link3"
              onClick={() => {
                setConfSection(3);
              }}
            >
              Add Speaker
            </ListGroup.Item>
            <ListGroup.Item
              href="#link4"
              onClick={() => {
                setConfSection(4);
              }}
            >
              Update Speaker
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row style={{ marginTop: "3vh" }}>
          {confSection === 1 && (
            <div>
              <Form onSubmit={addConferenceHandler}>
                {props.errorConf && (
                  <span className="error-message">{props.errorConf}</span>
                )}
                <Form.Row>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Conference Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Time-period</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Period"
                      value={period}
                      onChange={(e) => {
                        setPeriod(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Starting at</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Time"
                      value={startingTime}
                      onChange={(e) => {
                        setStartingTime(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="About"
                      value={about}
                      onChange={(e) => {
                        setAbout(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Venue</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Venue"
                      value={venue}
                      onChange={(e) => {
                        setVenue(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>Cover Image:&nbsp;</Form.Label>
                    <div>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => {
                          setEncCover(base64);
                        }}
                      />
                    </div>
                  </Form.Group>
                </Form.Row>
                <Button variant="warning" type="submit">
                  Add
                </Button>
              </Form>
            </div>
          )}
          {ctx.confData._id && (
            <div>
              {confSection === 2 && (
                <div>
                  <Form onSubmit={updateConferenceHandler}>
                    <Form.Row>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={ctx.confData.title}
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Time-period</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={ctx.confData.period}
                          value={period}
                          onChange={(e) => {
                            setPeriod(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Starting at</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={ctx.confData.startingTime}
                          value={startingTime}
                          onChange={(e) => {
                            setStartingTime(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={ctx.confData.about}
                          value={about}
                          onChange={(e) => {
                            setAbout(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Venue</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={ctx.confData.venue}
                          value={venue}
                          onChange={(e) => {
                            setVenue(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Button variant="warning" type="submit">
                      Update
                    </Button>
                  </Form>
                </div>
              )}
              {confSection === 3 && (
                <div>
                  <Form onSubmit={addSpeakerHandler}>
                    <Form.Row>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Speaker Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Speaker's Position</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Associated Uni./Cop."
                          value={associatewith}
                          onChange={(e) => {
                            setAssociatewith(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Cover letter</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Cover letter"
                          value={coverletter}
                          onChange={(e) => {
                            setCoverletter(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Conference ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={ctx.confData._id}
                          disabled
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Speaker Type</Form.Label>
                        <Form.Check
                          type="radio"
                          required={true}
                          label="Keynote Speaker"
                          onClick={() => {
                            setType("keynotespeaker");
                          }}
                          id="formHorizontalRadios1"
                          name="formHorizontalRadios"
                        />
                        <Form.Check
                          type="radio"
                          required={true}
                          label="Guest Speaker"
                          onClick={() => {
                            setType("guestspeakers");
                          }}
                          id="formHorizontalRadios2"
                          name="formHorizontalRadios"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Image:&nbsp;</Form.Label>
                        <div>
                          <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => {
                              setPpEnc(base64);
                            }}
                          />
                        </div>
                      </Form.Group>
                    </Form.Row>
                    <Button variant="warning" type="submit">
                      Add
                    </Button>
                  </Form>
                </div>
              )}
              {confSection === 4 && (
                <div>
                  <Form onSubmit={updateSpeakerHandler}>
                    <h5>Keynote Speakers</h5>
                    <Form.Group as={Col} md={24}>
                      {ctx.confData.keynoteSpeakers.map((speaker) => {
                        return (
                          <Form.Check
                            key={speaker._id}
                            type="radio"
                            required={true}
                            label={`${speaker.name} - ${speaker._id}`}
                            onClick={() => {
                              setType("keynotespeaker");
                              setSpeakerID(speaker._id);
                            }}
                            name="formHorizontalRadios"
                          />
                        );
                      })}
                    </Form.Group>
                    <h5>Guest Speakers</h5>
                    <Form.Group as={Col} md={24}>
                      {ctx.confData.guestSpeakers.map((speaker) => {
                        return (
                          <Form.Check
                            key={speaker._id}
                            type="radio"
                            required={true}
                            label={`${speaker.name} - ${speaker._id}`}
                            onClick={() => {
                              setType("guestspeakers");
                              setSpeakerID(speaker._id);
                            }}
                            name="formHorizontalRadios"
                          />
                        );
                      })}
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Speaker Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Speaker's Position</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Associated Uni./Cop."
                          value={associatewith}
                          onChange={(e) => {
                            setAssociatewith(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Cover letter</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Cover letter"
                          value={coverletter}
                          onChange={(e) => {
                            setCoverletter(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={12}>
                        <Form.Label>Conference ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={ctx.confData._id}
                          disabled
                        />
                      </Form.Group>
                    </Form.Row>

                    <Button variant="warning" type="submit">
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: "1vh" }}
                      variant="danger"
                      onClick={requestRemoveSpeaker}
                    >
                      Request to Delete
                    </Button>
                  </Form>
                </div>
              )}
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default EditorConference;
