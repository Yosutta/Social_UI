import React from "react";
import "./ProfileImage.css";

const ProfileImageLarge = (props) => {
  return (
    <img
      src={props.imageSrc || "https://pbs.twimg.com/profile_images/1000625703543435270/8Rhyqusf_400x400.jpg"}
      className="user-image-large"
      alt=""
    />
  );
};

export default ProfileImageLarge;
