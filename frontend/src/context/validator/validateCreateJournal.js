export default function validateCreateJournal(values) {
  let errors = {};

  if (!values.name) errors.name = "Name is required.";

  if (values.journalFields.length === 0) {
    errors.journalFields = "Journal fields is required.";
  } else if (values.journalFields.length > 3) {
    errors.journalFields = "Journal fields only include maximum 3 fields";
  }

  if (!values.organization) {
    errors.organization = "Organization is required.";
  } else if (values.organization.length < 2) {
    errors.organization = "Organization needs to be 2 characters or more.";
  } else if (values.organization.length > 500) {
    errors.organization = "Organization cannot exceed more than 20 characters.";
  }

  if (!values.introduction) {
    errors.introduction = "Introduction is required.";
  } else if (values.introduction.length > 1000) {
    errors.introduction = "Introduction cannot exceed more than 1000 characters.";
  }

  if (!values.issn) {
    errors.issn = "ISSN is required.";
  }

  if (!values.journalFields) {
    errors.journalFields = "Journal field is required";
  }

  if (!values.numberOfRound) {
    errors.numberOfRound = "Number of review round is required";
  } else if (!(0 < values.numberOfRound && values.numberOfRound < 10)) {
    errors.numberOfRound = "Number of review round must be between 1 to 10";
  }

  if (!values.numberOfReviewer) {
    errors.numberOfReviewer = "Number of reviewer per round is required";
  } else if (values.numberOfReviewer % 2 == 0) {
    errors.numberOfReviewer = "Number of reviewer per round must be odd";
  }

  return errors;
}
