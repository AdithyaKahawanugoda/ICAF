import React, { useContext } from "react";
import RegImgContext from "../context/reg-screen-context";

const DynamicImages = () => {
  const ctx = useContext(RegImgContext);

  return (
    <div style={{ textAlign: "center" }}>
      {ctx.imageID === "reg" && (
        <img
          src="https://i.ibb.co/7XM2QH5/taxi-conversation.png"
          width="75%"
          height="75%"
        />
      )}
      {ctx.imageID === "attendee" && (
        <img
          src="https://i.ibb.co/nP82JVC/taxi-online-education.png"
          width="75%"
          height="75%"
        />
      )}
      {ctx.imageID === "researcher" && (
        <img
          src="https://i.ibb.co/VV4vnfj/taxi-school-teacher-near-the-blackboard.png"
          width="75%"
          height="75%"
        />
      )}
      {ctx.imageID === "workshop conductor" && (
        <img
          src="https://i.ibb.co/S0LYLMm/taxi-home-working.png"
          width="75%"
          height="75%"
        />
      )}
    </div>
  );
};

export default DynamicImages;
