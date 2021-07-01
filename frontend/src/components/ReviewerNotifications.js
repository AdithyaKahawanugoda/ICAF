import React, { useState, useEffect } from "react";
import axios from "axios";
import { Divider, Button } from "antd";

const ReviewerNotifications = (props) => {
  const [sentNotifications, setSentNotifications] = useState([]);

  const [readComp, setreadComp] = useState(false);
  const [unreadComp, setUnreadComp] = useState(true);
  const [sentComp, setsentComp] = useState(false);

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

  useEffect(() => {
    const getSentNotification = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/grid/api/reviewerpvt/getSentNotifications",
            config
          )
          .then((res) => {
            setSentNotifications(res.data.notifications);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getSentNotification();
  }, []);
  return (
    <div>
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
          {props.notifications
            .filter((wrk) => wrk.status === "unread")
            .map((notification, index) => (
              <div className="Notification" key={index}>
                heloo
                <h6>Subject: {notification.subject}</h6>
                <p>
                  <small>from : {notification.from.userRole}</small>
                  <small> - #{notification.from.userid}</small>
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
                <Divider />
              </div>
            ))}
        </div>
      )}
      {readComp && (
        <div>
          {props.notifications
            .filter((wrk) => wrk.status === "read")
            .map((notification, index) => (
              <div className="Notification" key={index}>
                <h6>Subject: {notification.subject}</h6>
                <p>
                  <small>from : {notification.from.userRole}</small>
                  <small> - #{notification.from.userid}</small>
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
                <Divider />
              </div>
            ))}
        </div>
      )}
      {sentComp && (
        <div>
          {sentNotifications.map((notification, index) => (
            <div className="Notification" key={index}>
              <h6>Subject: {notification.subject}</h6>
              <p>
                <small>from : {notification.to.userRole}</small>
                <small> - #{notification.to.userid}</small>{" "}
                <Divider type="vertical" />
                <small>status : {notification.status}</small>
              </p>
              <p>{notification.description}</p>

              <Button
                type="primary"
                danger
                onClick={() => {
                  deleteNotifications(notification._id);
                }}
              >
                deleteNotifications
              </Button>
              <Divider />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewerNotifications;
