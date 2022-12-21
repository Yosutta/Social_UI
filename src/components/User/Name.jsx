import React from "react";
import "./Name.css";

const Name = (props) => {
  return (
    <span className="user-name">
      {props.userName}
      {props.children}
    </span>
  );
};

export default Name;
