import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Templates.css";

const Templates = () => {
  const [templates, setTemplates] = useState("");
  useEffect(() => {
    const getTemplates = async () => {
      try {
        await axios
          .get(
            "http://localhost:6500/grid/api/guest/getTemplates"
          )
          .then((res) => {
            setTemplates(res.data.templates);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getTemplates();
  }, []);
  return (
    <div className="templates">
        <h2>Templates</h2>
      <div className="tempCardR">
          <h4>Research Paper Template</h4>
        <a href={templates.pdfSecURL}>
          <img
            src="https://i.ibb.co/xzzFpGB/unnamed.png"
            alt="unnamed"
            border="0"
            width="315vw"
          />
        </a>
      </div>
      <div className="tempCardW">
      <h4>Workshop Proposal Template</h4>
        <a href={templates.pptSecURL}>
          <img
            src="https://i.ibb.co/sR4PyCm/1200px-pptx-icon-2019-png.png"
            alt="1200px-pptx-icon-2019-png"
            border="0"
            width="315vw"
          />
        </a>
      </div>
    </div>
  );
};

export default Templates;
