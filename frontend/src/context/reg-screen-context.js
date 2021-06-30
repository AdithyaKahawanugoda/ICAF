import React, { useState } from "react";

const RegImgContext = React.createContext({
  imageID: "reg",
  onImgChange: (imgID) => {},
});

export default RegImgContext;

export const RegImgCtxProvider = (props) => {
  const [imageID, setImageID] = useState("reg");
  const imageSwitchHandler = (imgID) => {
    setImageID(imgID);
  };

  return (
    <RegImgContext.Provider
      value={{ imageID: imageID, onImgChange: imageSwitchHandler }}
    >
      {props.children}
    </RegImgContext.Provider>
  );
};
