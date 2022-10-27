export default function validateChangePass(values)
 {
    let errors = {};
  
        if (!values.oldPassword)
        errors.oldPassword = "Password is required.";

        if (!values.newPassword) {
            errors.newPassword = "Password is required.";
        } else if (values.newPassword.length < 8) {
            errors.newPassword = "Password needs to be 8 characters or more.";
        } else if (values.newPassword.length > 20) {
            errors.newPassword = "Password cannot exceed more than 20 characters.";
        }

        if (!values.newPasswordRetype) {
            errors.newPasswordRetype = "Password is required.";
        } else if (values.newPassword !== values.newPasswordRetype) {
            errors.newPasswordRetype = "Passwords do not match.";
        } 
    
    return errors;
}
