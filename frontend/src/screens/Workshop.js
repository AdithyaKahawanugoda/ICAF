import React,{useState,useEffect} from 'react';
import { Button,ListGroup } from "react-bootstrap";
import axios from "axios";
import 'regenerator-runtime/runtime';

const Workshop = (props) => {

        const wId = props.match.params.id;

        const [workshopProposal,setWorkshopProposal] = useState([]);

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
      


    return (
        <div>
        <img src="https://i.ibb.co/MRQ6577/Whats-App-Image-2021-06-27-at-3-51-27-PM.jpg" alt="Whats-App-Image-2021-06-27-at-3-51-27-PM" border="0" height={362} width={1519.2}></img>
          {workshopProposal.filter((wrk)=>wrk._id === wId).map((workshop,index)=>(
              <div>
              <ListGroup style={{margin:"5rem"}}>
              <ListGroup.Item><h3> {workshop.workshopTopic}</h3> </ListGroup.Item>
              <ListGroup.Item>Description: {workshop.workshopDescription}</ListGroup.Item>
              <ListGroup.Item>
              <Button
              variant="danger"
              href={workshop.proposalSecURL}
              >
              Download Workshop Proposal
              </Button>{" "}
              </ListGroup.Item>
              </ListGroup>
              
              </div>
          ))}
           
    
        
        </div>
    )
}

export default Workshop
