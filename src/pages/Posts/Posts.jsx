import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PostView from "../../components/Post/PostView";
import CreateNewPostForm from "../../components/Post/CreateNewForm/CreateNewPostForm";
import HTTPRequestMaker from "../../utils/HTTPRequestMaker";
import { StatusCodes } from "http-status-codes";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchAllPosts() {
      const response = await HTTPRequestMaker("GET", "/posts");
      if (response.status === StatusCodes.OK) {
        setPosts(response.data.data.foundPosts);
      } else {
        console.log(response);
      }
    }
    fetchAllPosts();
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={4} className="dummyContent order-md-last"></Col>
        <Col sm={12} lg={8} className="postsColumn">
          <CreateNewPostForm loggedInUserImageUrl={props.loggedInUserImageUrl} />
          {posts.map((post) => (
            <PostView
              key={post.id}
              id={post.id}
              userId={post.userId}
              userName={`${post.userUsername}`}
              imageSrc={post.userProfileImageUrl}
              post={post}
              editable={false}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
