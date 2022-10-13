export default function ValidateInfo(values) {
  let errors = {};

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.firstName) {
    errors.firstName = "FirstName required";
  } else if (!values.firstName.match(/[a-zA-Z]/)) {
    errors.firstName = "Please provide valid First Name";
  }

  if (!values.lastName) {
    errors.lastName = "LastName required";
  } else if (!values.lastName.match(/[a-zA-Z]/)) {
    errors.lastName = "Please provide valid Last Name";
  }

  if (!values.phone) {
    errors.phone = "Phone required";
  } else if (!values.phone.match("[0-9]{10}")) {
    errors.phone = "Please provide valid phone number";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  } else if (values.password.length > 20) {
    errors.password = "Password cannot exceed more than 20 characters";
  }

  if (!values.passwordRetype) {
    errors.passwordRetype = "Please type your password again";
  } else if (values.password !== values.passwordRetype) {
    errors.passwordRetype = "Passwords do not match";
  }

  if (!values.organization) {
    errors.organization = "Organization is required";
  } else if (!values.organization.match(/[a-zA-Z]/)) {
    errors.organization = "Please provied valid Organization";
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Date Of Birth is required";
  }

  return errors;
}
