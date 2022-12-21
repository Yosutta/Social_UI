import React from "react";
import "./ProfileImage.css";

const ProfileImageSmall = (props) => {
  return <img src={props.imageSrc} className="user-image-small" alt="" />;
};

export default ProfileImageSmall;
