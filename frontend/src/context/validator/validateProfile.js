export default function validateProfile(values) {
  let errors = {};

  if (!values.phone) {
    errors.phone = "Phone number is required.";
  } else if (!values.phone.match("[0-9]")) {
    errors.phone = "Please provide valid phone number.";
  } else if (values.phone.length !== 10 && values.phone.length !== 11) {
    errors.phone = "Phone number must have 10 or 11 digits."
  }

  if (!values.organization) {
    errors.organization = "Organization is required.";
  } else if (!values.organization.match(/[a-zA-Z]/)) {
    errors.organization = "Please provied valid organization.";
  }

  return errors;
}
