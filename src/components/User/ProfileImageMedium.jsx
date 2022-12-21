import React from "react";
import "./ProfileImage.css";

const ProfileImageMedium = (props) => {
  return <img src={props.imageSrc} className={`user-image-medium ${props.className}`} alt="" />;
};

export default ProfileImageMedium;
