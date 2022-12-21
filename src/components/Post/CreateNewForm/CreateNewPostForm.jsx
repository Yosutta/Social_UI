import React, { useState } from "react";
import HTTPRequestMaker from "../../../utils/HTTPRequestMaker";
import ProfileImage from "../../User/ProfileImageSmall";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateNewPostForm.css";
import FormControlExtended from "../../Forms/FormControlExtended";
import FormControlFeedbackExtended from "../../Forms/FormControlFeebackExtended";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import FormControl from "react-bootstrap/FormControl";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import validateForm from "../../../utils/validation/validateForm.js";

const CreateNewPostForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [validate, setValidated] = useState(false);
  const [errorValidations, setErrorValidations] = useState({});
  const [validValidations, setValidValidations] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleClick(event) {
    event.preventDefault();
    const payload = decodeToken(sessionStorage.getItem("jwt_token"));
    if (payload === null) {
      navigate("/signin");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = decodeToken(sessionStorage.getItem("jwt_token"));
    if (payload === null) {
      navigate("/signin");
    }

    const createPostFormSchema = {
      title: [null, true, 5, 128],
      content: [null, true, 10, 1024],
    };
    const validation = validateForm(createPostFormSchema, formData);
    setValidValidations(validation.validValidations);
    setErrorValidations(validation.errorValidations);

    if (validation.validated === false) {
      event.stopPropagation();
    } else {
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}` },
      };
      const result = await axios.post("http://localhost:8000/posts", formData, config);
      if (result.status === StatusCodes.OK) window.location.reload();
      else {
        console.log(result);
      }
    }
    setValidated(true);
  }

  return (
    <section className="postHolder">
      <ProfileImage imageSrc={props.loggedInUserImageUrl} />
      <Form onSubmit={handleSubmit} className="overflow-hidden postForm">
        <FormControl
          onChange={handleChange}
          onClick={handleClick}
          as="input"
          type="text"
          name="title"
          placeholder="Title"
        />
        <span style={{ color: "red" }}>{errorValidations.title}</span>
        <span style={{ color: "green" }}>{validValidations.title}</span>
        <FormControl
          className="mt-2 postContent"
          onChange={handleChange}
          onClick={handleClick}
          as="textarea"
          type="text"
          name="content"
          placeholder="Content"
        />
        <span style={{ color: "red" }}>{errorValidations.content}</span>
        <span style={{ color: "green" }}>{validValidations.content}</span>
        <Button size="sm" className="mt-3 float-end" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default CreateNewPostForm;
