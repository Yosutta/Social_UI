import React from "react";
import "./Logo.css";

const LogoLarge = (props) => {
  return (
    <img
      className="logolarge"
      src={
        props.logoSrc ||
        "https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384e89d1d54d704ece7_3437c10597c1526c3dbd98c737c2bcae.svg"
      }
      alt=""
    />
  );
};

export default LogoLarge;
