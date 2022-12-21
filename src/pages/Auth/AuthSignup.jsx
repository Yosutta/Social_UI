import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import FormLabelExtended from "../../components/Forms/FormLabelExtended";
import FormControlExtended from "../../components/Forms/FormControlExtended";
import FormControlFeedbackExtended from "../../components/Forms/FormControlFeebackExtended";
import LogoMedium from "../../components/Others/LogoMedium";
import { Link, useNavigate } from "react-router-dom";
import "./AuthSignup.css";
import HTTPRequestMaker from "../../utils/HTTPRequestMaker";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import validateForm from "../../utils/validation/validateForm.js";

const AuthSignup = () => {
  // const [preview, setPreview] = useState();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    birthdate: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState();
  const [errorValidations, setErrorValidations] = useState({});
  const [validValidations, setValidValidations] = useState({});

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    console.log(objectUrl);
    setPreview(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImage]);

  function handleUpload(event) {
    const name = event.target.name;
    const imageFile = event.target.files[0];
    console.log(imageFile);
    setSelectedImage(imageFile);
    setSignUpData((prevValue) => {
      return { ...prevValue, [name]: imageFile };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setSignUpData((prevValue) => {
      const trimValue = value.replaceAll(/\s/g, "");
      return { ...prevValue, [name]: trimValue };
    });
  }

  async function handleSubmit(event) {
    const signUpSchema = {
      email: ["email", true, 7, 64],
      username: [null, true, 4, 32],
      password: [null, true, 5, 20],
      firstname: [null, true, 2, 16],
      lastname: [null, true, 2, 16],
    };
    const validation = validateForm(signUpSchema, signUpData);
    setValidValidations(validation.validValidations);
    setErrorValidations(validation.errorValidations);

    if (validation.validated === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const response = await HTTPRequestMaker("POST", "/users/signup", signUpData, {
        "Content-Type": "multipart/form-data",
      });
      console.log(response);
      if (response.status === StatusCodes.OK) {
        navigate("/signin");
      }
    }
  }

  return (
    <main className="container-fluid row signUpContainer justify-content-center align-items-center">
      <Form className="signUpForm col-lg-7" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="text-center" id="heading">
          <LogoMedium />
          <h4 className="mt-3">Create your new account</h4>
        </div>

        <Row className="mt-3">
          <Col className="col-md-7 col-lg-7">
            <h6 className="mb-0 pt-3">Login information</h6>
            <Col lg="12" className="mt-0">
              <Form.Group className="input-group-sm">
                <FormControl
                  onChange={handleChange}
                  className="signUpInput"
                  type="email"
                  name="email"
                  as="input"
                  placeholder="Email*"
                />
                <span style={{ color: "red" }}>{errorValidations.email}</span>
                <span style={{ color: "green" }}>{validValidations.email}</span>
              </Form.Group>
            </Col>
            <Row>
              <Form.Group className="input-group-sm">
                <FormControl
                  onChange={handleChange}
                  className="signUpInput"
                  type="text"
                  name="username"
                  as="input"
                  placeholder="Username*"
                />
                <span style={{ color: "red" }}>{errorValidations.username}</span>
                <span style={{ color: "green" }}>{validValidations.username}</span>
              </Form.Group>
              <Form.Group className="input-group-sm">
                <FormControl
                  onChange={handleChange}
                  className="signUpInput"
                  type="password"
                  name="password"
                  as="input"
                  placeholder="Password*"
                />
                <span style={{ color: "red" }}>{errorValidations.password}</span>
                <span style={{ color: "green" }}>{validValidations.password}</span>
              </Form.Group>
            </Row>
            <h6 className="mb-0 pt-3">Personal information</h6>
            <Row>
              <Form.Group className="input-group-sm">
                <FormControl
                  onChange={handleChange}
                  className="signUpInput"
                  type="text"
                  name="firstname"
                  as="input"
                  placeholder="Firstname*"
                />
                <span style={{ color: "red" }}>{errorValidations.firstname}</span>
                <span style={{ color: "green" }}>{validValidations.firstname}</span>
              </Form.Group>
              <Form.Group className="input-group-sm">
                <FormControl
                  onChange={handleChange}
                  className="signUpInput"
                  type="text"
                  name="lastname"
                  as="input"
                  placeholder="Lastname*"
                />
                <span style={{ color: "red" }}>{errorValidations.lastname}</span>
                <span style={{ color: "green" }}>{validValidations.lastname}</span>
              </Form.Group>
            </Row>
            <Col lg="12">
              <InputGroup size="sm" className="mt-2">
                <InputGroup.Text className="" id="inputGroup-sizing-sm">
                  Date of birth
                </InputGroup.Text>
                <Form.Control
                  onChange={handleChange}
                  className=""
                  type="date"
                  name="birthdate"
                  as="input"
                  placeholder="Date of birth*"
                  aria-label="DOB"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
            </Col>
          </Col>
          <Col className="col-md-5 col-lg-5 mb-3 text-center">
            <Form.Group controlId="formFileSm">
              <h6>Profile Image</h6>
              <Image
                fluid
                src={preview || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"}
                className="imagePreview mt-1 mb-2"
              />
              <Form.Control className="mt-2" onChange={handleUpload} name="profileImage" type="file" size="sm" />
            </Form.Group>
          </Col>
          <Button className="btn mt-3 signUpBtn" type="submit">
            Sign me up!
          </Button>
          <Link to="/signin" className="text-center mt-2">
            <span>Already have an account? Sign in here.</span>
          </Link>
        </Row>
      </Form>
    </main>
  );
};

export default AuthSignup;
