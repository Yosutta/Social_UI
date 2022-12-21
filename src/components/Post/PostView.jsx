import React, { useState, useEffect } from "react";
import Name from "../User/Name";
import "./PostView.css";
import PostCreatedAt from "./CreatedAt/PostCreatedAt";
import EditForm from "./EditForm/EditForm";
import Post from "./Post";
import { Link, useNavigate, useParams } from "react-router-dom";
import DropDown from "./Dropdown";
import HTTPRequestMaker from "../../utils/HTTPRequestMaker";
import { StatusCodes } from "http-status-codes";
import axios from "axios";
import ProfileImageSmall from "../User/ProfileImageSmall";

const PostView = (props) => {
  const navigate = useNavigate();
  const [editingStatus, setEditingStatus] = useState(false);
  const [editPostData, setEditPostData] = useState({ title: props.post.title, content: props.post.content });

  function enableEditForm() {
    setEditingStatus(true);
  }

  function disableEditForm() {
    setEditingStatus(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditPostData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  async function editPost() {
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}` },
    };
    const response = await axios.put(`http://localhost:8000/posts/${props.post.id}`, editPostData, config);
    if (response.status === StatusCodes.OK) {
      window.location.reload();
    } else {
      console.log(response);
    }
  }

  async function deletePost() {
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}` },
    };
    const response = await axios.delete(`http://localhost:8000/posts/${props.post.id}`, config);
    if (response.status === StatusCodes.OK) {
      navigate("/");
    } else {
      console.log(response);
    }
  }

  return (
    <section className="postHolder">
      <div className="userInfo">
        <Link to={`/users/${props.userId}`}>
          <ProfileImageSmall imageSrc={props.imageSrc} />
          <Name userName={props.userName}>
            <PostCreatedAt postCreatedAt={props.post.createdAt} />
          </Name>
        </Link>
      </div>
      {props.editable && (
        <DropDown
          editingStatus={editingStatus}
          dropdownEditOnClick={enableEditForm}
          dropdownDeleteOnClick={deletePost}
        />
      )}
      <Post
        key={props.post.id}
        postId={props.post.id}
        postTitle={props.post.title}
        postContent={props.post.content}
        editable={props.editable}
        editingStatus={editingStatus}
      />
      <EditForm
        editingStatus={editingStatus}
        editFormOnSubmit={editPost}
        btnCancelOnClick={disableEditForm}
        editPostData={editPostData}
        inputOnChange={handleChange}
      />
    </section>
  );
};

export default PostView;
