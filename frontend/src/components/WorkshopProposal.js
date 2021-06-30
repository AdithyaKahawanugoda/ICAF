import React,{useState,useEffect} from 'react';
import { ListGroup, Button, Col, Form } from "react-bootstrap";
import { Modal }  from "antd";
import axios from "axios";
import FileBase from "react-file-base64";
import { put } from '../../../backend/routes/researcher-routes';
const WorkshopProposal = () => {

  const [proposals,setProposals] = useState([]);
  const [emptyStorage, setEmptyStorage] = useState(true);

  const [pId,setPId] = useState("");
  const [workshopTopic,setWorkshopTopic] = useState("");
  const [workshopDescription,setWorkshopDescription] = useState("");
  const [workshopProposal,setWorkshopProposal] = useState("");
  const [enc2Data, setEnc2Data] = useState(null);

  const [updatevisible, setUpdateVisible] = useState(false);
  const [addvisible, setAddVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  const handleOk =() => {
    setConfirmLoading(true);
    updateWProposalHandler();
    setTimeout(() => {
      setUpdateVisible(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleOk2 =() =>{
    setConfirmLoading(true);
    addWProposalHandler();
    setTimeout(() => {
      setAddVisible(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setUpdateVisible(false);
    setAddVisible(false);
   };

   const addWProposalHandler = async() =>{
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const newWProposal = {
      workshopTopic,
      workshopDescription,
      fileEnc:enc2Data
    };
    try{
      await axios
        .put(
          "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/proposal/add",
          newWProposal,
          config
        )
        .then((res) =>{
          alert("Workshop Proposal added successfully");
        })
        .catch((err) =>{
          alert(err);
        });
    }catch(error){
      alert("Error Occured-" + error);
    }

   };

   const updateWProposalHandler = async() =>{
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let updateProposal ={
      workshopPropId:pId,
      workshopTopic,
      workshopDescription
    };
    try{
      await axios
         put(
           "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/proposal/update",
           updateProposal,
           config
         )
         .then((res) =>{
           alert("Workshop proposal updated Successfully");
         })
         .catch((err) =>{
           alert(err);
         });
    }catch(error){
      alert("Error Occured-" + error);
    }

   };

   useEffect(() =>{
     setEmptyStorage(true);
     const getWorkshopProposal = async () =>{
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
          .get(
            "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor",
            config
          )
          .then((res) =>{
            console.log(res.data);
            setProposals(res.data.workshopConductor);
            setEmptyStorage(false);
          })
          .catch((error)=>{
            alert("Error in Workshop proposals: "+error);
          });

     };
     getWorkshopProposal();
   },[]);

   const removeWorkshopProposal = async(proposalId) =>{
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let wproposal = {
      workshopPropId:proposalId
    };
    try{
      await axios
         .put(
           "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/proposal/delete",
           wproposal,
           config
         )
         .then((res) =>{
           alert("Workshop Proposal deleted Successfully");
         })
         .catch((err) =>{
           alert(err);
         });
    }catch(error){
      alert("Error Occured-" + error);
    }
   };


    return (
        <div>
          <h3>WorkshopProposals</h3>  
          <Button onClick ={()=>{
            setAddVisible(true);
          }}>Add Workshop Proposal</Button>
          {!emptyStorage && (
            <div>
         <Card >
        <ListGroup variant="flush">
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
      </Card>
            
            </div>
          )}
        </div>
    )
}

export default WorkshopProposal
