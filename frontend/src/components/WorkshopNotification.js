import React,{useState,useEffect} from 'react';
import { ListGroup,Card,Button } from "react-bootstrap";
import axios from "axios";

const WorkshopNotification = () => {

    const [notifications, setNotifications] = useState([]);
    const [emptyStorage, setEmptyStorage] = useState(true);

    const deleteNotifications = async (id) => {
        const nID = id;
        try {
          await axios
            .delete(
              `http://localhost:6500/grid/api/notifi/deleteNotification/${nID}`
            )
            .then(() => {
                alert("Notification Deleted");
              window.location.reload(false);
            });
        } catch (err) {
          alert("error" + err);
        }
      };

    useEffect(()=>{
        setEmptyStorage(true);
        const getNotification = async() =>{
            
            const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              };
              try{
                  await axios
                    .get(
                        "http://localhost:6500/grid/api/workshopconductorpvt/workshopconductor/proposal/notify",
                        config
                    )
                    .then((res)=>{
                       setNotifications(res.data.notifications);
                       setEmptyStorage(false);
                    })
                    .catch((err)=>{
                       console.log(err.message);
                    });
              }catch(err){
                alert("error :" + err);
              } 
        }
        getNotification();
    },[]);
    return (
        <div>
            <h3>Notification</h3>
            {!emptyStorage && (
            <Card>
            {notifications.map((notification,index) =>(
                <div key={index}>
                <ListGroup variant="flush">
                <ListGroup.Item>
                <h3>Subject: {notification.Subject}</h3>
                <p>
                    <small>from : {notification.from.userRole}</small>
                </p>
                <p>{notification.description}</p>
              <hr></hr>
              <Button
                    variant="danger"
                    onClick={() => {
                      deleteNotifications(notification._id);
                    }}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
                </ListGroup>
                </div>
            ))}
            </Card>
            )}
        </div>
    )
}

export default WorkshopNotification
