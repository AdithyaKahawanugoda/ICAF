import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimeLine.css";
import { Divider } from "antd";

const TimeLine = () => {
  const [timeline, settimeline] = useState([]);

  useEffect(() => {
    const getTimeLine = async () => {
      try {
        await axios
          .get("http://localhost:6500/grid/api/guest/getTimeline")
          .then((res) => {
            settimeline(res.data.timelines);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getTimeLine();
  }, []);
  return (
    <div>
      <h1>Timeline</h1>
      <Divider/>
      <div className="timeline-container">
        {timeline
          .filter((wrk) => wrk.status === "approvedbyadmin")
          .map((timelines, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-item-content">
                <div className="timeLineCard" key={index}>
                  <h5>{timelines.title}</h5>
                  <p>{timelines.description}</p>
                  <span className="circle"></span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimeLine;
