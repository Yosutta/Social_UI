import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import Router from "./Router";
import "./App.css";
import AuthSignIn from "./pages/Auth/AuthSignIn";
import AuthSignup from "./pages/Auth/AuthSignup";
import axios from "axios";
import HTTPRequestMaker from "./utils/HTTPRequestMaker";
import { StatusCodes } from "http-status-codes";
import { isExpired } from "react-jwt";

function App() {
  useEffect(() => {
    async function checkJWT() {
      const jwt_token = sessionStorage.getItem("jwt_token");
      if (jwt_token !== null) {
        if (isExpired(jwt_token)) sessionStorage.removeItem("jwt_token");
        else {
          const response = await HTTPRequestMaker("POST", "/users/token", { jwt_token });
          console.log(response);
          if (
            response.status === 440 ||
            response.status === StatusCodes.NOT_FOUND ||
            response.status === StatusCodes.UNAUTHORIZED
          ) {
            sessionStorage.removeItem("jwt_token");
          } else if (response.status === StatusCodes.OK && response.data.message === "User token refreshed") {
            sessionStorage.setItem("jwt_token", response.data.data.token);
          }
        }
      }
    }
    checkJWT();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/signin" element={<AuthSignIn />} />
          <Route path="/signup" element={<AuthSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const Main = () => {
  const [sessionProfileImageUrl, setSessionProfileImageUrl] = useState(
    "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
  );

  return (
    <div>
      <Header onLoggedIn={setSessionProfileImageUrl} />
      <Router loggedInUserImageUrl={sessionProfileImageUrl} />
    </div>
  );
};

export default App;
