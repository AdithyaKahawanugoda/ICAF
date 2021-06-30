import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Divider } from "antd";
import { Table } from "react-bootstrap";

const ReviwerResearchPapers = (props) => {
  const [pendingDiv, setPendingDiv] = useState(true);
  const [approvedDiv, setApprovedDiv] = useState(false);

  const approve = async (id, status, userId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const st = status;
    const nid = id;
    const uId = userId;
    let dataObject = {
      newStatus: st,
      fileID: nid,
      userid: uId,
    };
    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/reviewerpvt/approveResearchPapers",
          dataObject,
          config
        )
        .then(() => {
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setApprovedDiv(false);
          setPendingDiv(true);
        }}
      >
        PENDING
      </Button>{" "}
      <Button
        type="primary"
        onClick={() => {
          setPendingDiv(false);
          setApprovedDiv(true);
        }}
      >
        APPROVED AND REJECTED
      </Button>{" "}
      {pendingDiv && (
        <div>
          {props.rPaperData.map((rPaper, index) => (
            <div key={index}>
              <h4>Researcher </h4>
              <p>Researcher ID : {rPaper._id}</p>
              <p>Username : {rPaper.username}</p>

              {rPaper.researchData
                .filter((wrk) => wrk.status === "pending")
                .map((rPaperData, index) => (
                  <div key={index}>
                    <Table striped bordered hover variant="dark">
                      <tbody>
                        <tr>
                          <td>Paper ID</td>
                          <td>{rPaperData._id}</td>
                        </tr>
                        <tr>
                          <td>Paper Status</td>
                          <td>
                            {" "}
                            {rPaperData.status === "approvedbyreviewer" &&
                              "Approved"}
                            {rPaperData.status === "pending" && "Pending"}
                            {rPaperData.status === "rejectedbyreviewer" &&
                              "Rejected"}
                          </td>
                        </tr>
                        <tr>
                          <td>Authors</td>
                          <td>{rPaperData.paperAuthors}</td>
                        </tr>
                        <tr>
                          <td>Topic</td>
                          <td>{rPaperData.researchTopic}</td>
                        </tr>
                        <tr>
                          <td>Subject</td>
                          <td>{rPaperData.researchSubject}</td>
                        </tr>
                        <tr>
                          <td>Abstract</td>
                          <td>{rPaperData.paperAbstract}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button type="primary" danger href={rPaperData.paperSecURL}>
                      Download Research Paper
                    </Button>{" "}
                    <Divider />
                    {props.conference && (<div>
                    <Button
                      type="primary"
                      onClick={() => {
                        approve(
                          rPaperData._id,
                          "approvedbyreviewer",
                          rPaper._id
                        );
                      }}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        approve(
                          rPaperData._id,
                          "rejectedbyreviewer",
                          rPaper._id
                        );
                      }}
                    >
                      Reject
                    </Button>{" "}  </div>
                    )}
                    {!props.conference && (
                      <div style={{ backgroundColor: "red" }}>
                       
                        <h4 style={{ color: "white" }}>
                          You can not approve this now because conference
                          currently not awailable
                        </h4>
                      </div>
                    )}
                    <Divider />
                  </div>
                ))}
              <Divider />
            </div>
          ))}
        </div>
      )}
      {approvedDiv && (
        <div>
          {props.rPaperData.map((rPaper, index) => (
            <div key={index} key={index}>
              <h4>Researcher </h4>
              <p>Researcher ID : {rPaper._id}</p>
              <p>Username : {rPaper.username}</p>

              {rPaper.researchData
                .filter((wrk) => wrk.status !== "pending")
                .map((rPaperData, index) => (
                  <div>
                    <Table striped bordered hover variant="dark">
                      <tbody>
                        <tr>
                          <td>Paper ID</td>
                          <td>{rPaperData._id}</td>
                        </tr>
                        <tr>
                          <td>Paper Status</td>
                          <td>
                            {" "}
                            {rPaperData.status === "approvedbyreviewer" &&
                              "Approved"}
                            {rPaperData.status === "pending" && "Pending"}
                            {rPaperData.status === "rejectedbyreviewer" &&
                              "Rejected"}
                          </td>
                        </tr>
                        <tr>
                          <td>Authors</td>
                          <td>{rPaperData.paperAuthors}</td>
                        </tr>
                        <tr>
                          <td>Topic</td>
                          <td>{rPaperData.researchTopic}</td>
                        </tr>
                        <tr>
                          <td>Subject</td>
                          <td>{rPaperData.researchSubject}</td>
                        </tr>
                        <tr>
                          <td>Abstract</td>
                          <td>{rPaperData.paperAbstract}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button type="primary" danger href={rPaperData.paperSecURL}>
                      Download Research Paper
                    </Button>{" "}
                    <Divider />
                    {props.conference && (
                      <div>
                        {rPaperData.status === "rejectedbyreviewer" && (
                          <Button
                            type="primary"
                            onClick={() => {
                              approve(
                                rPaperData._id,
                                "approvedbyreviewer",
                                rPaper._id
                              );
                            }}
                          >
                            Approve
                          </Button>
                        )}{" "}
                        {rPaperData.status === "approvedbyreviewer" && (
                          <Button
                            type="primary"
                            danger
                            onClick={() => {
                              approve(
                                rPaperData._id,
                                "rejectedbyreviewer",
                                rPaper._id
                              );
                            }}
                          >
                            Reject
                          </Button>
                        )}{" "}
                      </div>
                    )}
                 
                    <Divider />
                  </div>
                ))}

              <Divider />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviwerResearchPapers;
