import React from "react";
import Form from "react-bootstrap/Form";

const FormControlExtended = (props) => {
  return (
    <Form.Control
      onChange={(event) => {
        props.onChange(event);
      }}
      className={`${props.className}`}
      as={props.inputAs}
      type={props.inputType}
      name={props.inputName}
      placeholder={props.inputPlaceholder}
      value={props.initialValue}
      // autoComplete="off"
    />
  );
};

export default FormControlExtended;
