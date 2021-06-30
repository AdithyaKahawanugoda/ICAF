import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Divider, Modal } from "antd";
import { Form } from "react-bootstrap";
import { Row, Col } from "antd";

const ResearcherNotifications = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  const [readComp, setreadComp] = useState(false);
  const [unreadComp, setUnreadComp] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [paymentID, setPaymentID] = useState("");
  const [paperamount, setAmount] = useState(4500);
  const [paymentStatus, setPaymentStatus] = useState(false);


  const CheckpaymentStatus = (id) => {

    for(let i = 0; i<props.researchData.length; i++){
      if(props.researchData[i]._id == id){
        if(props.researchData[i].payment === "payementsuccessfull"){
          setPaymentStatus(true)
        }
      }

    }
    
  }

 

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const makePayment = (des) => {
    let temp = des.split("# ");
    let id = temp[1].split(" ");
    setPaymentID(id[0]);
    CheckpaymentStatus(id[0])
    showModal();
  };

  const pay = async() => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const paperID = paymentID;
    const amount = paperamount;
    const status = "payementsuccessfull";

    let dataObject = {
     paperID,
     amount,
     status
    };
    try {
      await axios
        .put(
          "http://localhost:6500/grid/api/researcherpvt/managePayment",
          dataObject,
          config
        )
        .then(() => {
          alert("Payment Successfull !!!")
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    const getNotification = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/grid/api/researcherpvt/notifyresearchdata",
            config
          )
          .then((res) => {
            setNotifications(res.data.notifications);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getNotification();
  }, []);
  return (
    <div>
      <Button
        type="primary"
        danger
        onClick={() => {
          setUnreadComp(true);
          setreadComp(false);
        }}
      >
        Unread
      </Button>{" "}
      <Divider type="vertical" />
      <Button
        type="primary"
        onClick={() => {
          setUnreadComp(false);
          setreadComp(true);
        }}
      >
        Read
      </Button>
      <Divider type="vertical" />
      <Divider />
      {unreadComp && (
        <div>
          <h2>Unread Notifications</h2>
          <Divider />
          {notifications
            .filter((wrk) => wrk.status === "unread")
            .map((notification, index) => (
              <div className="Notification">
                <h6>Subject: {notification.subject}</h6>
                <p>
                  <small>from : {notification.from.userRole}</small>
                </p>
                <p>{notification.description}</p>
                {notification.subject.includes("Approved") && (
                  <Button
                    type="primary"
                    onClick={() => {
                      makePayment(notification.description);
                    }}
                  >
                    Pay Now
                  </Button>
                )}

                <Divider />
              </div>
            ))}
        </div>
      )}
      {readComp && (
        <div>
          <h2>Read Notifications</h2>
          {notifications
            .filter((wrk) => wrk.status === "read")
            .map((notification, index) => (
              <div className="Notification">
                <h6>Subject: {notification.subject}</h6>
                <p>
                  <small>from : {notification.from.userRole}</small>
                </p>
                <p>{notification.description}</p>

                <Divider />
              </div>
            ))}
        </div>
      )}
      <Modal
        title="Notifications"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
         {!paymentStatus && <Form onSubmit={pay}>
            <Form.Row>
              <Form.Group as={Col} md={12}>
                <Form.Label>Paper Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Speaker Name"
                  value={paymentID}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md={12}>
                <Form.Label>Amount(LKR)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Assicuated Uni./Cop."
                  value={paperamount}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md={12}>
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
               
                />
              </Form.Group>
              <Form.Group as={Col} md={12}>
                <Form.Label>Card Holder Name</Form.Label>
                <Form.Control
                  type="text"
                
                />
              </Form.Group>
              <Form.Group as={Col} md={12}>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                
                />
              </Form.Group>
            </Form.Row>
            <Form.Row></Form.Row>
            <Button type="submit" danger onClick={() =>{
              pay();
            }}>
              Pay
            </Button>
          </Form>}
          {paymentStatus && <h4>You Have Already Paid For This Paper !!</h4>}
        </div>
      </Modal>
    </div>
  );
};

export default ResearcherNotifications;
