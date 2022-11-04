export default function validateSubmitPaper(values) {
    const { paperTitle, paperSummary, paperFields, paperJournal, paperPdfFile } = values;
    let errors = {};

    if (!paperTitle) {
        errors.paperTitle = 'Title is required.'
    } else if (paperTitle.length > 255) {
        errors.paperTitle = "Title must be less than 255 characters. "
    } else if (paperTitle.trim().length === 0) {
        errors.paperTitle = "Can not use whitespace for title paper."
    }
    if (!paperSummary) {
        errors.paperSummary = 'Abstract is required.'
    } else if (paperSummary.length > 5000) {
        errors.paperSummary = 'Abstract must be less than 5000 characters.'
    } else if (paperSummary.trim().length === 0) {
        errors.paperSummary = 'Can not use whitespace for abstract paper'
    }
    // if (paperJournal.journalId === '') {
    //     errors.paperJournal = 'Paper journal is required.'
    // }
    if (paperFields.length === 0) {
        errors.paperFields = 'Paper fields is required.'
    } else if (paperFields.length > 3) {
        errors.paperFields = 'Paper fields only include maximum 3 fields'
    }
    if (paperPdfFile.file === '') {
        errors.paperPdfFile = 'PDF File is required.'
    } else if (paperPdfFile.file.type !== 'application/pdf') {
        errors.paperPdfFile = 'You can only upload PDF file.'
    }
    return errors
}
