import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card} from "react-bootstrap";
import './Resource.css';
import 'regenerator-runtime/runtime';


const Resource = () =>{
    const [workshopProposal,setWorkshopProposal] = useState([]);
    const [resPaper,setResPaper] = useState([]);

    

    const viewWorkshopProposal = (wrkPID) =>{
        window.location = `/workshop/${wrkPID}`
    }

    const viewResearchPaper = (rpID) =>{
        window.location = `/research/${rpID}`
    }

    useEffect(() =>{
        const getWorkshopProposals = async() =>{
            try{
                await axios
                  .get("http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/proposals")
                  .then((res) =>{
                      setWorkshopProposal(res.data.workshopProposal);
                      console.log(res.data.workshopProposal );
                     
                  })
                  .catch((err) =>{
                      console.log(err.message);
                  });
            }catch(err) {
                alert("error: "+err);
            }
        };
        getWorkshopProposals();
    },[]);

    useEffect(() =>{
        const getResarchPapers = async() =>{
            try{
                await axios
                 .get("http://localhost:6500/grid/api/researcherpvt/researchPapers")
                 .then((res) =>{
                    setResPaper(res.data.resPaper);
                     console.log(res.data.resPaper)
                 })
                 .catch((err) =>{
                     alert(err.message);
                 });
            }catch(err){
                alert("error: "+err);
            }
        };
        getResarchPapers();
    },[]);

    return(
        <div className="parent">
            <div className="div1"> 
            <h3 style={{margin:"1rem"}}>Workshop Proposals</h3>
            {workshopProposal.map((workshopData,index) =>(
                <div key={index} style={{margin:"1rem"}}>
                <Card>
                <Card.Body>
                  <Card.Title>Topic: {workshopData.workshopTopic}</Card.Title>
                  <Card.Text>Description: {workshopData.workshopDescription}</Card.Text>
                  <Card.Link href="#"
                  onClick={() =>{
                      viewWorkshopProposal(workshopData._id);
                  }}>View Workshop Proposal</Card.Link>
                </Card.Body>
                </Card>
                </div>
            ))}
          
            </div>

            <div className="div2">
            <h3 style={{margin:"1rem"}}>Research Papers</h3>
            {resPaper.map((researchData,i) =>(
                <div key={i} style={{margin:"1rem"}}>
                <Card>
                <Card.Body>
                  <Card.Title>Topic: {researchData.researchTopic}</Card.Title>
                  <Card.Text>subject: {researchData.researchSubject}</Card.Text>
                  <Card.Link href="#"
                  onClick={()=>{
                      viewResearchPaper(researchData._id);
                  }}
                  >View Research Paper</Card.Link>
                </Card.Body>
                </Card>
                </div>
            ))}
            </div>
           
            
        </div> 
    )

}

export default Resource