export default function validateSubmitReview(values) {
    let errors = {}
    const { reviewNote, reviewConfidentiality, reviewGrade, reviewVerdict } = values
    // reviewNote,
    //   reviewGrade,
    //   reviewConfidentiality,
    //   reviewVerdict,
    if (!reviewNote) {
        errors.reviewNote = "Review note is required."
    } else if (reviewNote.trim().length === 0) {
        errors.reviewNote = "Can not use whitespace for note."
    }

    if (reviewGrade < 0) {
        errors.reviewGrade = "Grade can not be negative number."
    } else if (reviewGrade > 10) {
        errors.reviewGrade = "Grade must be in range of 0-10."
    }
    if (reviewConfidentiality < 0) {
        errors.reviewConfidentiality = "Confidentiality can not be negative number."
    } else if (reviewConfidentiality > 10) {
        errors.reviewConfidentiality = "Confidentiality must be in the range of 0-10."
    }
    if (!reviewVerdict) {
        errors.reviewVerdict = "Review Verdict is required."
    }
    return errors
}