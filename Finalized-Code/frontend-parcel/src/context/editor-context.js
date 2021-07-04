import React, { useState } from "react";

const EditorContext = React.createContext({
  optionID: "",
  email: "",
  username: "",
  confData: {},
  onOptionChange: (option) => {},
  onProfileChange: (editor) => {},
  onConfChange: (conf) => {},
});

export default EditorContext;

export const EditorCtxProvider = (props) => {
  const [optionID, setOptionID] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confData, setConfData] = useState("");

  const optionHandler = (option) => {
    setOptionID(option);
  };
  const dataHandler = (editor) => {
    setEmail(editor.email);
    setUsername(editor.username);
  };
  const confHandler = (conf) => {
    setConfData(conf);
  };

  return (
    <EditorContext.Provider
      value={{
        optionID,
        username,
        email,
        confData,
        onOptionChange: optionHandler,
        onProfileChange: dataHandler,
        onConfChange: confHandler,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};
