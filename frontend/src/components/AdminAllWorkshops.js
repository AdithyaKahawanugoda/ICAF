import React, { useState } from "react";
import { Button, Divider } from "antd";
import { Table } from "react-bootstrap";
import "./AdminConfData.css";

const AdminAllWorkshops = (props) => {
  const [searchTerm, setsearchTerm] = useState("");
  const [searchTerm2, setsearchTerm2] = useState("");
  return (
    <div>
      <div className="Data">
        <div className="DataCard">
          <Divider />
          <input
            type="text"
            className="form-control"
            id="code"
            placeholder="Search Workshop Conductor"
            onChange={(event) => {
              setsearchTerm(event.target.value);
            }}
          />
          <Divider />
          {props.workshopData
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (val._id.includes(searchTerm)) {
                return val;
              }
            })
            .map((Workshop, index) => (
              <div key={index}>
                <h6>Workshop conductor ID : {Workshop._id}</h6>
                <h6>Workshop conductor : {Workshop.username}</h6>

            

                {Workshop.workshopData
                   
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
                              {WorkshopData.status === "rejectedbyreviewer" &&
                                "Rejected"}
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
                    </div>
                  ))}
                <Divider />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAllWorkshops;
