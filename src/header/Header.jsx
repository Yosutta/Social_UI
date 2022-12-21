import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import HTTPRequestMaker from "../utils/HTTPRequestMaker";
import { decodeToken } from "react-jwt";
import { StatusCodes } from "http-status-codes";
import ProfileImageMedium from "../components/User/ProfileImageMedium";

import Dropdown from "react-bootstrap/Dropdown";

const Header = (props) => {
  const [showHeader, setShowHeader] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    async function fetchUserData() {
      const jwt_token = sessionStorage.getItem("jwt_token");
      if (jwt_token) {
        const userId = decodeToken(jwt_token).id;
        const response = await HTTPRequestMaker("GET", `/users/${userId}`, undefined, {
          Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}`,
        });
        if (response.status === StatusCodes.OK) {
          setLoggedInUser(response.data.data.foundUserInfo);
          props.onLoggedIn(response.data.data.foundUserInfo.profileImageUrl);
        } else {
          console.error("ERROR");
          console.log(response);
        }
      }
    }
    fetchUserData();
  }, []);

  async function handleOnClickLogout() {
    const response = await HTTPRequestMaker("POST", `/users/logout`, undefined, {
      Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}`,
    });
    if (response.status === StatusCodes.OK) {
      sessionStorage.removeItem("jwt_token");
      props.onLoggedIn("");
      window.location.reload();
    } else {
      console.error("ERROR");
      console.log(response.data.error.name);
    }
  }

  function hideHeader() {
    setShowHeader(false);
  }
  return (
    <header className={showHeader === false ? "d-none" : "p-1 mb-3 border-bottom"}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Nav defaultActiveKey="/" className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <Nav.Item>
              <Link className="nav-link px-2 link-secondary" to="/">
                Posts
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link px-2 link-dark" to="/user">
                User
              </Link>
            </Nav.Item>
          </Nav>

          <Form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-5" role="search">
            <Form.Control type="search" placeholder="Search..." aria-label="Search" />
          </Form>

          {loggedInUser ? (
            <span>
              <Dropdown>
                <Dropdown.Toggle className="p-0" variant="transparent" id="dropdown-basic">
                  <ProfileImageMedium imageSrc={loggedInUser.profileImageUrl} className="position-relative" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/user">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">My Post</Dropdown.Item>
                  <Dropdown.Item onClick={handleOnClickLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          ) : (
            <Link to="/signin" onClick={hideHeader}>
              <Button variant="outline-primary">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
