import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostView from "../../components/Post/PostView";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./PostDetail.css";
import { StatusCodes } from "http-status-codes";
import HTTPRequestMaker from "../../utils/HTTPRequestMaker";
import { decodeToken } from "react-jwt";
import NotFound from "../NotFound/NotFound";

const PostDetail = (props) => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    id: "",
    title: "",
    content: "",
    createdAt: "",
    userId: "",
  });
  const [postEditable, setPostEditable] = useState(false);
  const [postNotFound, setPostNotFound] = useState(true);

  useEffect(() => {
    async function fetchPostWithId() {
      const response = await HTTPRequestMaker("GET", `/posts/${postId}`);
      let foundPostData;
      if (response.status === StatusCodes.OK) {
        foundPostData = response.data.data.foundPost;
        setPost(foundPostData);
        setPostNotFound(true);
        checkPostEditable(foundPostData);
      } else if (response.status === StatusCodes.NOT_FOUND) {
        setPostNotFound(false);
      }
    }

    function checkPostEditable(foundPostData) {
      const payload = decodeToken(sessionStorage.getItem("jwt_token"));
      if (payload === null) setPostEditable(false);
      else if (foundPostData.userId === payload.id) {
        setPostEditable(true);
      }
    }

    fetchPostWithId();
  }, []);

  return postNotFound ? (
    <Container>
      <Row className="justify-content-center">
        <Col lg={10}>
          <PostView
            key={post.id}
            id={post.id}
            userId={post.userId}
            userName={post.username}
            imageSrc={post.profileImageUrl}
            post={post}
            editable={postEditable}
          />
          {/* CommentView */}
        </Col>
      </Row>
    </Container>
  ) : (
    <NotFound />
  );
};

export default PostDetail;
