import React,{useState,useEffect} from 'react';
import { Button,ListGroup} from "react-bootstrap";
import axios from "axios";
import 'regenerator-runtime/runtime';

const Research = (props) => {

    const rID = props.match.params.id;

    const [resPaper,setResPaper] = useState([]);


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
    return (
        <div>
        <img src="https://i.ibb.co/MRQ6577/Whats-App-Image-2021-06-27-at-3-51-27-PM.jpg" alt="Whats-App-Image-2021-06-27-at-3-51-27-PM" border="0" height={362} width={1519.2}></img>
        {resPaper.filter((wrk)=>wrk._id === rID).map((research,index)=>(
            <div>
            <ListGroup style={{margin:"5rem"}}>
            <ListGroup.Item><h3> {research.researchTopic}</h3> </ListGroup.Item>
            <ListGroup.Item>Subject: {research.researchSubject}</ListGroup.Item>
            <ListGroup.Item>Authors: {research.paperAuthors}</ListGroup.Item>
            <ListGroup.Item>Abstract: <br></br> <p>{research.paperAbstract}</p></ListGroup.Item>
            <ListGroup.Item>
            <Button
            variant="danger"
            href={research.paperSecURL}
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

export default Research
