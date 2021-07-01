import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConferenceCover.css";
import Cover from '../components/Cover';
import Shedule from '../components/Shedule';
import Profile from '../components/Profile';
import Workshop from '../components/Workshop';
import Reaserch from '../components/Research';

const ConferenceCover = () => {
  const [conference, setConference] = useState("");
  useEffect(() => {
    const getTimeLine = async () => {
      try {
        await axios
          .get("http://localhost:6500/grid/api/guest/getConference")
          .then((res) => {
            setConference(res.data.latestConference);
          
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
    <div   >
      {conference.status ==='approvedbyadmin' ?
            (<div className="lkconference">
                <Cover  conference={conference} />
                <Shedule conference={conference} />
                <Profile conference={conference} />
                <div style={{textAlign:'center'}}>
                    <h2>Workshops</h2>
                </div>
                {conference.addedWorkshops.map(val =>(
                  <Workshop id={val.workshopID} />
                ))}
                <div style={{textAlign:'center'}}>
                    <h2>Research Papers</h2>
                </div>
                {conference.addedResearchPapers.map(val2 =>(
                  <Reaserch id={val2.researchPaperID}  />
                ))}
            </div>) : (<div style={{margin:'50px'}}><h2>No Conference Available</h2></div>)
      }

    </div>
  );
};

export default ConferenceCover;
