import validateInput from "./validateInput.js";
import _ from "lodash";

function validateForm(schema, formData) {
  let validated = true;
  let errorValidations = {};
  let validValidations = {};
  for (let key in schema) {
    const params = schema[key];
    let lengthConstraints = null;
    if (params[2] && params[3]) {
      lengthConstraints = {
        minLength: params[2],
        maxLength: params[3],
      };
    }

    const validationResult = validateInput({ [key]: formData[key] }, params[0], params[1], lengthConstraints);
    if (!validationResult[0]) {
      validated = false;
      errorValidations[validationResult[1]] = _.capitalize(validationResult[2]);
    } else {
      validValidations[validationResult[1]] = _.capitalize(validationResult[2]);
    }
  }

  return { validated, errorValidations, validValidations };
}

export default validateForm;
