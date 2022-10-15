
export default function validateSubmitPaper(values) {
    const { paperTitle, paperSummary, paperJournal, paperPdfFile } = values;
    let errors = {};

    if (!paperTitle) {
        errors.paperTitle = 'Title required'
    } else if (paperTitle.length > 255) {
        errors.paperTitle = "Title must be less than 255 characters "
    }
    if (!paperSummary) {
        errors.paperSummary = 'Abstract required'
    } else if (paperSummary.length > 1600) {
        errors.paperSummary = 'Abstract must be less than 1600 characters'
    }
    if (paperJournal.journalId === '') {
        errors.paperJournal = 'PaperJournal required'
    }
    if (paperPdfFile.file === '') {
        errors.paperPdfFile = 'PDF File required'
    }
    return errors
}
