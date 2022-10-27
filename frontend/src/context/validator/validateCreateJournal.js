export default function validateCreateJournal(values)
 {
    let errors = {};
       
        if (!values.name)
        errors.name = "Name is required.";

        if (values.journalFields.length === 0) {
            errors.journalFields = 'Journal fields is required.'
        } else if (values.journalFields.length > 3) {
            errors.journalFields = 'Journal fields only include maximum 3 fields'
        }

        if (!values.organization) {
            errors.organization = "Organization is required.";
        } else if (values.organization.length < 2) {
            errors.organization = "Organization needs to be 2 characters or more.";
        } else if (values.organization.length > 500) {
            errors.organization = "Organization cannot exceed more than 20 characters.";
        }
        
        if (!values.introduction) {
            errors.introduction = "introduction is required.";
        } else if (values.introduction.length < 8) {
            errors.introduction = "Password needs to be 8 characters or more.";
        } else if (values.introduction.length > 500) {
            errors.introduction = "Password cannot exceed more than 20 characters.";
        }
        
        if (!values.issn) {
            errors.issn = "ISSN is required.";
        }
        //  else if (values.newPassword.length < 8) {
        //     errors.newPassword = "Password needs to be 8 characters or more.";
        console.log ("error",errors)

   
    
    return errors;
}
