export default function validateReviewerSetting(values) {
    let errors = {};

    if (values.fields.length === 0) {
        errors.paperFields = 'Fields is required.'
    } else if (values.fields.length > 5) {
        errors.paperFields = 'You can only include maximum of 5 fields'
    }
    return errors
}
