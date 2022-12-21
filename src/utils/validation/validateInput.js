function validateInput(input, type, required, lengthConstraints) {
  const key = Object.keys(input)[0];
  const value = Object.values(input)[0];

  // Check if input is required and input does exists
  if (required && value.length === 0) {
    return [false, [key], `${key} can not be empty.`];
  }

  // Check if input is a correct type
  if (type !== null) {
    const EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (type === "email" && String(value).toLowerCase().match(EMAIL_REGEX) === null) {
      return [false, [key], `A valid ${key} is required.`];
    }
  }

  // Check for input length constraints
  if (lengthConstraints !== null) {
    if (value.length < lengthConstraints.minLength) {
      return [false, [key], `${key} should be at least ${lengthConstraints.minLength} characters long.`];
    }
    if (value.length > lengthConstraints.maxLength) {
      return [false, [key], `${key} can not be longer than ${lengthConstraints.maxLength} characters.`];
    }
  }
  return [true, key, "Looks good"];
}

export default validateInput;
