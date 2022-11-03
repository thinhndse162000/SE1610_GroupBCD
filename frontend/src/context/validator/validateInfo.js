export default function validateInfo(values) {
  let errors = {};
  var bday = values.dateOfBirth
  bday = bday.split("-");
  var date = new Date();
  var year = date.getFullYear()
  // let regSpace = new RegExp(/\s/)
  if ((year - parseInt(bday[0])) <= 18 && (year - parseInt(bday[0]) >= 0)) {
    errors.dateOfBirth = "You must be more than 18 years old."
  } else if (bday.length === 1) {
    errors.dateOfBirth = "Date of birth is required."
  } else if ((parseInt(bday[0]) - year) > 0) {
    errors.dateOfBirth = "Your date of birth is not valid."
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@[A-Za-z]+\./.test(values.email)) {
    errors.email = "Email address is invalid.";
  }

  if (!values.firstName) {
    errors.firstName = "First name is required.";
  } else if (!values.firstName.match(/[a-zA-Z]/)) {
    errors.firstName = "Please provide valid first name.";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is required.";
  } else if (!values.lastName.match(/[a-zA-Z]/)) {
    errors.lastName = "Please provide valid last name.";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required.";
  } else if (!values.phone.match("[0-9]")) {
    errors.phone = "Please provide valid phone number.";
  } else if (values.phone.length !== 10) {
    errors.phone = "Phone number must have 10 digit."
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password needs to be 8 characters or more.";
  } else if (values.password.length > 20) {
    errors.password = "Password cannot exceed more than 20 characters.";
  }

  if (!values.passwordRetype) {
    errors.passwordRetype = "Please type your password again.";
  } else if (values.password !== values.passwordRetype) {
    errors.passwordRetype = "Passwords do not match.";
  } else if (values.passwordRetype.length < 8) {
    errors.passwordRetype = "Password needs to be 8 characters or more.";
  } else if (values.passwordRetype.length > 20) {
    errors.passwordRetype = "Password cannot exceed more than 20 characters.";
  }

  if (!values.organization) {
    errors.organization = "Organization is required.";
  } else if (!values.organization.match(/[a-zA-Z]/)) {
    errors.organization = "Please provied valid organization.";
  }
  return errors;
}
