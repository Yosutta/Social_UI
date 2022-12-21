import Form from "react-bootstrap/Form";

const customStyle = {
  fontSize: "12px",
};

const FormControlFeedbackExtended = (props) => {
  return (
    <Form.Control.Feedback style={{ ...customStyle }} type={props.feedbackType}>
      {props.inputPlaceholder}
    </Form.Control.Feedback>
  );
};

export default FormControlFeedbackExtended;
