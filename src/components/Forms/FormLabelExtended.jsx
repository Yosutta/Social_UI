import Form from "react-bootstrap/Form";

const FormLabelExtended = (props) => {
  return (
    <Form.Label htmlFor={props.inputName} className={`${props.className}`}>
      {props.inputValue}
    </Form.Label>
  );
};

export default FormLabelExtended;
