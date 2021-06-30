import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { Button } from "react-bootstrap";
import "./HomeConfData.css";
import CountDown from "./CountDown";

const HomeConfData = () => {
  const [conference, setConference] = useState("");

  useEffect(() => {
    const getConference = async () => {
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
    getConference();
  }, []);
  return (
    <div className="homeconf">
      {conference && (
        <div className="homeConference" style={{fontSize:"1.1rem"}}>
          <h1 style={{color:"white"}}>{conference.title}</h1>
          <p>{conference.about}</p>
          <p>{conference.period}</p>
          <p>{conference.startingTime}</p>
          <p>At {conference.venue} Premises</p>

          <div className="confrenceWrapper">
            <h4>Keynote Speakers</h4>
            <div className="speakers">
              {conference.keynoteSpeakers.map((keynoteSpeaker, index) => (
                <div key={index} className="keyNoteSpeakerImgdata">
                  <div className="keyNoteSpeakerImg">
                    <Image
                      className="custom-cusprof-pp-img-home-conf "
                      cloudName="grid1234"
                      publicId={keynoteSpeaker.image.imagePublicId}
                    />
                  </div>
                  <div className="keyNoteSpeakerImg">
                    <p>
                      {keynoteSpeaker.name}
                      <br />
                      (Associate With {keynoteSpeaker.associatewith})
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <br />

            <div>
              <h4>Guest Speakers</h4>
              <div className="speakers">
                {conference.guestSpeakers.map((guestSpeaker, index) => (
                  <div key={index} className="keyNoteSpeakerImgdata">
                    <div className="keyNoteSpeakerImg">
                      <Image
                        className="custom-cusprof-pp-img-home-conf"
                        cloudName="grid1234"
                        publicId={guestSpeaker.image.imagePublicId}
                      />
                    </div>
                    <div className="keyNoteSpeakerImg">
                      <p>
                        {guestSpeaker.name}
                        <br />
                        (Associate With {guestSpeaker.associatewith})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <CountDown conference={conference} />
            <Button variant="dark" href="/conference">Learn More</Button>
          </div>
        </div>
      )}

      {!conference && (
        <div className="ConfNotAwailable">
          <h1>There is No Conference Available</h1>
          <h1>We Will Come Back Soon</h1>
        </div>
      )}
    </div>
  );
};

export default HomeConfData;
