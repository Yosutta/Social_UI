import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FormControlExtended from "../../components/Forms/FormControlExtended";
import FormLabelExtended from "../../components/Forms/FormLabelExtended";
import LogoLarge from "../../components/Others/LogoLarge";
import HTTPRequestMaker from "../../utils/HTTPRequestMaker";
import { StatusCodes } from "http-status-codes";
import { Link, useNavigate } from "react-router-dom";
import "./AuthSignIn.css";
import validateForm from "../../utils/validation/validateForm.js";
import FormControl from "react-bootstrap/FormControl";

const AuthSignIn = () => {
  const navigate = useNavigate();
  const [signinMessage, setSigninMessage] = useState("");
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setSigninData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const signInSchema = {
      email: [null, true],
      password: [null, true],
    };
    const validation = validateForm(signInSchema, signinData);
    setSigninMessage("Email and password can not be blank");

    if (validation.validated === false) {
      event.stopPropagation();
    } else {
      const response = await HTTPRequestMaker("POST", "/users/login", signinData);
      if (response.status === StatusCodes.OK) {
        sessionStorage.setItem("jwt_token", response.data.data.token);
        navigate("/");
      } else if (response.status === StatusCodes.NOT_FOUND) {
        setSigninMessage(response.data.error.message);
        setSigninData((prevValue) => {
          return { ...prevValue, password: "" };
        });
      }
    }
  }

  return (
    <main className="goler m-auto">
      <Alert variant="danger" className={!signinMessage ? "d-none" : ""} style={{ position: "absolute" }}>
        {signinMessage}
      </Alert>
      <Form className="signInForm" onSubmit={handleSubmit} noValidate>
        <LogoLarge />
        <h1 className="h3 mt-3 mb-4 fw-normal">Please sign in</h1>
        <Form.Group className="form-floating">
          <FormControl
            onChange={handleChange}
            as="input"
            type="email"
            name="email"
            placeholder="example@mail.com"
            className="emailInput"
            initialvalue={signinData.email}
          />
          <Form.Label htmlFor="email">Email Address</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating">
          <FormControl
            onChange={handleChange}
            as="input"
            type="password"
            name="password"
            placeholder="Password"
            className="passwordInput"
            initialvalue={signinData.password}
          />
          <Form.Label htmlFor="password">Password</Form.Label>
        </Form.Group>
        <Button variants="primary" size="lg" className="w-100 btnSubmit" type="submit">
          Sign in
        </Button>
        <Link to="/signup">
          <span>Don't have an account? Sign up here.</span>
        </Link>
      </Form>
    </main>
  );
};

export default AuthSignIn;
