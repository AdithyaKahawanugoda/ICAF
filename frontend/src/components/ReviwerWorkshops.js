import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Divider } from "antd";
import { Table } from "react-bootstrap";


const ReviwerWorkshops = (props) => {
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
    }
    try {
      await axios
        .put("http://localhost:6500/grid/api/reviewerpvt/approveWorkshops", 
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
          {props.workshopData
          
          .map((Workshop, index) => (
            <div key={index}>
               <h4>Workshop Conductor </h4>
              <p>Workshop Conducror ID : {Workshop._id}</p>
              <p>Username : {Workshop.username}</p>

              {Workshop.workshopData
                .filter((wrk) => wrk.status === "pending")
                .map((WorkshopData, index) => (
                  
                  <div key={index}>
                   
                     <Table striped bordered hover variant="dark">
                    <tbody>
                      <tr>
                        <td>Workshop ID</td>
                        <td>{WorkshopData._id}</td>
                      </tr>
                      <tr>
                        <td>Workshop Status</td>
                        <td>
                          {" "}
                          {WorkshopData.status === "approvedbyreviewer" &&
                            "Approved"}
                          {WorkshopData.status === "pending" && "Pending"}
                          {WorkshopData.status === "rejectedbyreviewer" && "Rejected"}
                        </td>
                      </tr>
                      <tr>
                        <td>Topic</td>
                        <td>{WorkshopData.workshopTopic}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{WorkshopData.workshopDescription}</td>
                      </tr>
                    </tbody>
                  </Table>
                   
                    <Button
                      type="primary"
                      danger
                      href={WorkshopData.proposalSecURL}
                    >
                      Download Workshop Proposal
                    </Button>{" "}
<Divider />
                    {props.conference && (<div>
                    <Button
                      type="primary"
                      onClick={() => {
                        approve(WorkshopData._id, "approvedbyreviewer", Workshop._id);
                      }}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        approve(WorkshopData._id, "rejectedbyreviewer", Workshop._id);
                      }}
                    >
                      Reject
                    </Button>{" "} </div>
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
          {props.workshopData
          .map((Workshop, index) => (
            <div key={index}>
               <h4>Workshop Conductor </h4>
              <p>Workshop Conductor ID : {Workshop._id}</p>
              <p>Username : {Workshop.username}</p>

              {Workshop.workshopData
                .filter((wrk) => wrk.status !== "pending")
                .map((WorkshopData, index) => (
                  <div key={index}>
                           <Table striped bordered hover variant="dark">
                    <tbody>
                      <tr>
                        <td>Workshop ID</td>
                        <td>{WorkshopData._id}</td>
                      </tr>
                      <tr>
                        <td>Workshop Status</td>
                        <td>
                          {" "}
                          {WorkshopData.status === "approvedbyreviewer" &&
                            "Approved"}
                          {WorkshopData.status === "pending" && "Pending"}
                          {WorkshopData.status === "rejectedbyreviewer" && "Rejected"}
                        </td>
                      </tr>
                      <tr>
                        <td>Topic</td>
                        <td>{WorkshopData.workshopTopic}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{WorkshopData.workshopDescription}</td>
                      </tr>
                    </tbody>
                  </Table>
                    <Button
                      type="primary"
                      danger
                      href={WorkshopData.proposalSecURL}
                    >
                      Download Workshop Proposal
                    </Button>{" "}
                    <Divider />
                    {props.conference && (<div>
                    {WorkshopData.status === "rejectedbyreviewer" && (
                      <Button
                        type="primary"
                        onClick={() => {
                          approve(WorkshopData._id, "approvedbyreviewer", Workshop._id);
                        }}
                      >
                        Approve
                      </Button>
                    )}{" "}
                    {WorkshopData.status === "approvedbyreviewer" && (
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          approve(WorkshopData._id, "rejectedbyreviewer", Workshop._id);
                        }}
                      >
                        Reject
                      </Button>
                    )}{" "} </div>)}
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

export default ReviwerWorkshops;
