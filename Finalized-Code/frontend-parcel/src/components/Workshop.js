import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Workshop.css";
import { Container } from "react-bootstrap";
import { Card } from "antd";

function Workshop({ id }) {
  const [workshop, setWorkshop] = useState([]);
  const [conductName, setConductName] = useState("");
  const [approve, setApprove] = useState(true);
  const dataset = [];

  useEffect(() => {
    const getWorkshops = async (id) => {
      try {
        await axios
          .get(
            `http://localhost:6500/grid/api/guest/getWorkshop/${id}`
          )
          .then((res) => {
            setWorkshop(res.data.workshop.workshopData);
            setConductName(res.data.workshop.username);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getWorkshops(id);
    checkAprroved();
  }, [id]);

  useEffect(() => {
    checkAprroved();
  }, [dataset]);

  const checkAprroved = () => {
    {
      workshop.map((element2) => {
        if (element2.status === "approvedbyreviewer") {
          dataset.push("true");
        } else {
          dataset.push("false");
        }
      });
    }

    if (dataset.includes("true")) {
      setApprove(true);
    } else {
      setApprove(false);
    }
  };

  return (
    <div className="lkworkshop">
      <Container>
        {workshop.map((item, workshoppp) => {
          return (
            <div key={workshoppp}>
              {item.status === "approvedbyreviewer" && (
                <Card
                  className="lkcardworkshop"
                  hoverable
                  style={{ marginBottom: 16 }}
                >
                  <div>
                    <div className="lktexts">
                      <h2>Workshop Topic :- {item.workshopTopic}</h2>
                    </div>
                    <h3>Conducted by {conductName}</h3>
                    <h4>Descrption: </h4>
                    <h6>{item.workshopDescription}</h6>
                  </div>
                </Card>
              )}
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default Workshop;
