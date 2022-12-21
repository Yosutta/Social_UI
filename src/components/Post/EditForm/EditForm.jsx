import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControlExtended from "../../Forms/FormControlExtended";
import { useState } from "react";
import validateForm from "../../../utils/validation/validateForm.js";

const EditForm = (props) => {
  const [errorValidations, setErrorValidations] = useState({});
  const [validValidations, setValidValidations] = useState({});
  const editPostData = props.editPostData;

  async function submitEditPostForm(event) {
    const editPostFormSchema = {
      title: [null, true, 5, 128],
      content: [null, true, 10, 1024],
    };
    const validation = validateForm(editPostFormSchema, editPostData);
    setValidValidations(validation.validValidations);
    setErrorValidations(validation.errorValidations);

    if (validation.validated === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      props.editFormOnSubmit();
    }
  }

  return (
    <Form className={!props.editingStatus ? "d-none" : "post overflow-hidden"} onSubmit={submitEditPostForm}>
      <Form.Group className="mt-2 ms-1 me-1">
        {/* // TODO Add invalid feedback */}
        <FormControlExtended
          onChange={(event) => {
            props.inputOnChange(event);
          }}
          inputAs="input"
          inputType="text"
          inputName="title"
          inputPlaceholder="Title"
          initialValue={props.editPostData.title}
        />
        <span style={{ color: "red" }}>{errorValidations.title}</span>
        <span style={{ color: "green" }}>{validValidations.title}</span>
      </Form.Group>
      <Form.Group className="mt-2 ms-1 me-1">
        <FormControlExtended
          onChange={(event) => {
            props.inputOnChange(event);
          }}
          inputAs="textarea"
          inputType="text"
          inputName="content"
          inputPlaceholder="Content"
          className="mt-2 postContent"
          initialValue={props.editPostData.content}
        />
        <span style={{ color: "red" }}>{errorValidations.content}</span>
        <span style={{ color: "green" }}>{validValidations.content}</span>
      </Form.Group>
      <Button size="sm" className="mt-3 ms-3 float-end" type="submit">
        Update
      </Button>
      <Button
        size="sm"
        onClick={() => {
          props.btnCancelOnClick();
        }}
        variant="danger"
        className="mt-3 float-end"
        type="button"
      >
        Cancel
      </Button>
    </Form>
  );
};

export default EditForm;
