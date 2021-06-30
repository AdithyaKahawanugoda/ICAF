import React, { useState, useEffect } from "react";
import { Row, Col ,Card ,Button } from "antd";
import { Container } from "react-bootstrap";
import Editreseaechppr from "../components/Editreseaechppr";

import "./Researchpapers.css"
import axios from "axios";

const Researcherprofile = () => {
  const [rPapers, setrPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();


  useEffect(() => {
    setLoading(true);
    const getResearcherData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/grid/api/researcherpvt/getProfile",
            config
          )
          
          .then((res) => {
            setrPapers(res.data.researcher);            
            

          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
        } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getResearcherData();
  }, []);

  if (loading) {
    return <p>Data is loading...</p>;
  }
  if (error) {
    return <p>There was an error loading your data!</p>;
  }


  return (
    <div >
      <Row>
        <Col >
          <Row>
            <Container>
           <h1>Added Research Papers</h1>
          {rPapers.researchData && rPapers.researchData.length > 0
                ? rPapers.researchData.map(item => {
            return <div key={item.id}>
              
              
              <Card hoverable style={{ marginBottom: 16 }} >
                    <div className="lkex1">
                      <h2 className="color-profile-text">Status: {item.status}</h2>
                      <h5>Authors: {item.paperAuthors}</h5>
                      <h5>Topic:{item.researchTopic}</h5>
                      <h5>Subject:{item.researchSubject}</h5>
                      <h4>Abstract:</h4><p> {item.paperAbstract}</p>
                      <Button
                        type="primary"
                        
                        href={item.paperSecURL}
                      >
                         Research Paper 
                      </Button>{" "}
                      {item.status==="pending" && (
                      <Editreseaechppr
                       resresearchTopic={item.researchTopic} 
                       resresearchSubject={item.researchSubject}
                       respaperAbstract={item.paperAbstract}
                       resid={item._id}
                       resstatus={item.status}
                      />
                      )}
                    </div>
                    </Card>
              
              
              </div>;
          })
        : "Loading..."}   
            </Container>
          </Row>
        </Col>
    
      </Row>
    </div>
  );
};

export default Researcherprofile;
