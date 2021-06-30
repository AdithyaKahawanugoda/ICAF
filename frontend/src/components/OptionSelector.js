import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import "./OptionSelector.css";
import EditorContext from "../context/editor-context";

const OptionSelector = (props) => {
  const ctx = useContext(EditorContext);
  return (
    <div>
      <ListGroup
        className="custom-prof-navigation-panel"
        style={{ padding: "2vh", borderRadius: "8px" }}
      >
        {props.options.map((item) => {
          return (
            <div key={item.name}>
              <ListGroup.Item
                href={`#link${item.counter}`}
                onClick={() => {
                  ctx.onOptionChange(item.name);
                }}
              >
                {item.name}
              </ListGroup.Item>
            </div>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default OptionSelector;
