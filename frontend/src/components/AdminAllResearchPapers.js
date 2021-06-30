import React, { useState, useEffect } from "react";
import { Button, Divider } from "antd";
import { Table } from "react-bootstrap";
import "./AdminConfData.css";

const AdminAllResearchPapers = (props) => {
  const [searchTerm, setsearchTerm] = useState("");
  return (
    <div>
      <div>
        <div className="Data">
          <div className="DataCard">
            <Divider />
            <input
              type="text"
              className="form-control"
              id="code"
              placeholder="Search Researcher"
              onChange={(event) => {
                setsearchTerm(event.target.value);
              }}
            />
            <Divider />
            {props.rPaperData
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (val._id.includes(searchTerm)) {
                  return val;
                }
              })
              .map((rPaper, index) => (
                <div key={index}>
                  <h6>Reasercher ID : {rPaper._id}</h6>
                  <h6>Reasercher : {rPaper.username}</h6>

                  {rPaper.researchData.map((rPaperData, index) => (
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
                            <td>Payment Status</td>
                            <td>{rPaperData.payment}</td>
                          </tr>
                          {rPaperData.payment === "payementsuccessfull" && (
                            <tr>
                              {" "}
                              <td>Payed Amount</td>
                              <td>Rs.{rPaperData.paymentHistory.amount}</td>
                            </tr>
                          )}

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
                      <Button
                        type="primary"
                        danger
                        href={rPaperData.paperSecURL}
                      >
                        Download Research Paper
                      </Button>{" "}
                      <Divider />
                    </div>
                  ))}
                  <Divider />
                </div>
              ))}

            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllResearchPapers;
