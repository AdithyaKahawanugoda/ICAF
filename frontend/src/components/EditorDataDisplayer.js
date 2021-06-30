import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import EditorContext from "../context/editor-context";

import EditorWelcome from "./EditorWelcome";
import EditorDetailsUpdate from "./EditorDetailsUpdate";
import EditorConference from "./EditorConference";
import EditorTemplates from "./EditorTemplates";
import EditorTimeline from "./EditorTimeline";
import EditorHomeNotices from "./EditorHomeNotices";
import EditorGallery from "./EditorGallery";
import EditorUserGuide from "./EditorUserGuide";

const EditorDataDisplayer = () => {
  const ctx = useContext(EditorContext);

  const [errorConf, setErrorConf] = useState("");

  useEffect(() => {
    const fetchEditorData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get("http://localhost:6500/grid/api/editorpvt/getProfile", config)
        .then((res) => {
          ctx.onProfileChange(res.data.editor);
        })
        .catch((err) => {
          alert("Error!" + err);
          console.log(err);
        });
    };
    fetchEditorData();
    const fetchConferenceData = async () => {
      await axios
        .get("http://localhost:6500/grid/api/guest/getConference")
        .then((res) => {
          if (res.data.latestConference === null) {
            setErrorConf("Currently no conference in admin approved status");
          } else {
            ctx.onConfChange(res.data.latestConference);
            setErrorConf(
              `Currently ${res.data.latestConference.title} is on focus!`
            );
          }
        })
        .catch((err) => {
          alert("Error!" + err);
        });
    };
    fetchConferenceData();
  }, []);

  return (
    <div>
      {ctx.optionID === "" && <EditorWelcome />}
      {ctx.optionID === "Profile" && <EditorDetailsUpdate />}
      {ctx.optionID === "Manage Conference" && (
        <EditorConference errorConf={errorConf} />
      )}
      {ctx.optionID === "Upload Templates" && <EditorTemplates />}
      {ctx.optionID === "Timeline" && <EditorTimeline />}
      {ctx.optionID === "Home Notices" && <EditorHomeNotices />}
      {ctx.optionID === "Gallery" && <EditorGallery />}
      {ctx.optionID === "User Guide" && <EditorUserGuide />}
    </div>
  );
};

export default EditorDataDisplayer;
