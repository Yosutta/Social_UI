import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = (props) => {
  //   console.log(props);
  return (
    <div className="">
      <Link to={`/posts/${props.postId}`} className={props.editingStatus ? "d-none" : undefined}>
        <article className="post">
          <div className="d-inline">
            <h3 className="postTitle">{props.postTitle}</h3>
            <p className="postContent">{props.postContent}</p>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default Post;
