import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Divider, Badge } from "antd";
import { MailFilled } from "@ant-design/icons";

const AdminNotifications = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const [readComp, setreadComp] = useState(false);
  const [unreadComp, setUnreadComp] = useState(true);
  const [sentComp, setsentComp] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [sentNotifications, setSentNotifications] = useState([]);
  const [counter, setCounter] = useState(0);
  const [counterS, setCounterS] = useState(0);
  let count = 0;
  let countS = 0;

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

  const markAsRead = async (id) => {
    const nID = id;
    try {
      await axios
        .put("http://localhost:6500/grid/api/notifi/editNotification", {
          nID: nID,
        })
        .then(() => {
          window.location.reload(false);
        });
    } catch (err) {
      alert("error" + err);
    }
  };

  const deleteNotifications = async (id) => {
    const nID = id;
    try {
      await axios
        .delete(
          `http://localhost:6500/grid/api/notifi/deleteNotification/${nID}`
        )
        .then(() => {
          window.location.reload(false);
        });
    } catch (err) {
      alert("error" + err);
    }
  };

  const getSentNotifications = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get(
          "http://localhost:6500/grid/api/adminpvt/getSentNotifications",
          config
        )
        .then((res) => {
          for (var i = 0; i < res.data.notifications.length; i++) {
            if (res.data.notifications[i].status === "unread") {
              countS++;
              setCounterS(countS);
            }
          }

          setSentNotifications(res.data.notifications);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };
  const getNotification = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/grid/api/adminpvt/getNotification", config)
        .then((res) => {
          for (var i = 0; i < res.data.notifications.length; i++) {
            if (res.data.notifications[i].status === "unread") {
              count++;
              setCounter(count);
            }
          }

          setNotifications(res.data.notifications);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    const getNotifications = async () => {
      getNotification();
      getSentNotifications();
    };
    getNotifications();
  }, []);
  return (
    <div>
      <div>
        <MailFilled
          style={{ fontSize: "3.5vw", color: "rgb(2, 3, 39)" }}
          onClick={showModal}
        />
        <Badge count={counter} onClick={showModal}>
          <a href="#" className="head-example" />
        </Badge>
      </div>

      <Modal
        title="Notifications"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Button
          type="primary"
          danger
          onClick={() => {
            setUnreadComp(true);
            setreadComp(false);
            setsentComp(false);
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
            setsentComp(false);
          }}
        >
          Read
        </Button>
        <Divider type="vertical" />
        <Button
          type="primary"
          danger
          onClick={() => {
            setUnreadComp(false);
            setreadComp(false);
            setsentComp(true);
          }}
        >
          Sent
        </Button>
        <Divider />
        {unreadComp && (
          <div>
            <h2>Unread Notifications</h2>
            <Divider />
            {notifications
              .filter((wrk) => wrk.status === "unread")
              .map((notification, index) => (
                <div className="Notification" key={index}>
                  <h6>Subject: {notification.subject}</h6>
                  <p>
                    <small>from : {notification.from.userRole}</small>
                  </p>
                  <p>{notification.description}</p>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      markAsRead(notification._id);
                    }}
                  >
                    Mark As Read
                  </Button>{" "}
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteNotifications(notification._id);
                    }}
                  >
                    Delete
                  </Button>
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
                <div className="Notification" key={index}>
                  <h6>Subject: {notification.subject}</h6>
                  <p>
                    <small>from : {notification.from.userRole}</small>
                  </p>
                  <p>{notification.description}</p>

                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteNotifications(notification._id);
                    }}
                  >
                    Delete
                  </Button>
                  <Divider />
                </div>
              ))}
          </div>
        )}
        {sentComp && (
          <div>
            <h2>Sent Notifications</h2>
            {sentNotifications.map((notification, index) => (
              <div className="Notification" key={index}>
                <h6>Subject: {notification.subject}</h6>
                <p>
                  <small>To : {notification.to.userRole}</small>
                  <Divider type="vertical" />
                  <small>Status : {notification.status}</small>
                </p>
                <p>{notification.description}</p>

                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    deleteNotifications(notification._id);
                  }}
                >
                  Delete
                </Button>
                <Divider />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminNotifications;
