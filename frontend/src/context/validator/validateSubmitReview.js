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

    if (!(0 < reviewGrade && reviewGrade <= 10)) {
        errors.reviewGrade = "Grade must be in range of 1-10."
    }

    if (!(0 < reviewConfidentiality && reviewConfidentiality <= 10)) {
        errors.reviewConfidentiality = "Confidentiality must be in range of 1-10."
    }

    if (!reviewVerdict) {
        errors.reviewVerdict = "Review Verdict is required."
    }
    return errors
}
