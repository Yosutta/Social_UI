import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const DropDown = (props) => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      variant="outline-secondary"
      size="sm"
      title="Edit"
      className="float-end"
      disabled={props.editingStatus}
    >
      <Dropdown.Item onClick={props.dropdownEditOnClick}>Edit post</Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          props.dropdownDeleteOnClick();
        }}
      >
        Delete post
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default DropDown;
