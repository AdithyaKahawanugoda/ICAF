import React,{useState,useEffect} from 'react';
import { ListGroup, Button, Form,Card } from "react-bootstrap";
import { Modal }  from "antd";
import axios from "axios";
import FileBase from "react-file-base64";

const WorkshopProposal = () => {

  const [proposals,setProposals] = useState("");
  
  const [pId,setPId] = useState("");
  const [workshopTopic,setWorkshopTopic] = useState("");
  const [workshopDescription,setWorkshopDescription] = useState("");
  const [workshopProposal,setWorkshopProposal] = useState([]);
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
          window.location.reload();
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
         .put(
           "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/proposal/update",
           updateProposal,
           config
         )
         .then((res) =>{
           alert("Workshop proposal updated Successfully");
           window.location.reload();
         })
         .catch((err) =>{
           alert(err);
         });
    }catch(error){
      alert("Error Occured-" + error);
    }

   };

   useEffect(() =>{
  
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
            setWorkshopProposal(res.data.workshopConductor.workshopData);
            console.log(res.data.workshopConductor.workshopData);
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
           window.location.reload();
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
          <Button style={{margin:"1rem"}} onClick ={()=>{
            setAddVisible(true);
          }}>Add Workshop Proposal</Button>
          
          
            <div>
         <Card >
         {workshopProposal.map((proposal,index) => (
            <div key={index}>
            <ListGroup variant="flush">
            <ListGroup.Item><h3>Workshop Topic: {proposal.workshopTopic}</h3>
            <p>Workshop Description: {proposal.workshopDescription}</p>
            <p>Status: {proposal.status}</p></ListGroup.Item>
            <ListGroup.Item>
            {proposal.status==="pending" && (
              <Button style={{marginRight:'2rem'}}
              variant="outline-info"  size="sm"
              onClick={()=>{
                setPId(proposal._id);
                setWorkshopTopic(proposal.workshopTopic);
                setWorkshopDescription(proposal.workshopDescription);
                setUpdateVisible(true);
              }}
              >Edit Workshop Proposal</Button>
              
            )}
            {proposal.status==="pending" && (
              <Button style={{marginRight:'2rem'}}
              variant="outline-danger" size="sm"
              onClick={()=>{
                removeWorkshopProposal(proposal._id);
              }}>
              Delete Workshop Proposal
              </Button>
            )}
            </ListGroup.Item>
            
          </ListGroup>
            </div>

         ))}
  
            
      </Card>
            </div>
         
          <Modal
          title="Update Workshop Proposal"
          visible={updatevisible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          >
          <Form>
          <Form.Group controlId="formGroupUserName">
          <Form.Label>Workshop Topic</Form.Label>
          <Form.Control type="text"  value={workshopTopic}
          onChange={(e) => {
            setWorkshopTopic(e.target.value);
          }}/>
        </Form.Group>
        <Form.Group controlId="formGroupUserName">
          <Form.Label>Workshop Description</Form.Label>
          <Form.Control type="text"  value={workshopDescription}
          onChange={(e) => setWorkshopDescription(e.target.value)} />
        </Form.Group>
          </Form>
          </Modal>
          <Modal
          title="Add Product"
          visible={addvisible}
          onOk={handleOk2}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
        <Form>
          <Form.Group controlId="formGroupUserName">
          <Form.Label>Workshop Topic</Form.Label>
          <Form.Control type="text"  value={workshopTopic}
          onChange={(e) => {
            setWorkshopTopic(e.target.value);
          }}/>
        </Form.Group>
        <Form.Group controlId="formGroupUserName">
          <Form.Label>Workshop Description</Form.Label>
          <Form.Control type="text"  value={workshopDescription}
          onChange={(e) => setWorkshopDescription(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formGroupPhone">
        <Form.Label>Workshop Proposal</Form.Label>
        <h6>**Please do not exceed the amount of file size 25MB </h6>
        <FileBase type="file"  
        multiple={false}
        onDone={({ base64 }) => {
          setEnc2Data(base64); 
        }}/>
        </Form.Group>
          </Form>
        
        </Modal>
        </div>
    )
}

export default WorkshopProposal
