import React from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts/Posts";
import PostDetail from "./pages/PostView/PostDetail";
import User from "./pages/User/User";

const Router = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<Posts loggedInUserImageUrl={props.loggedInUserImageUrl} />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};

export default Router;
