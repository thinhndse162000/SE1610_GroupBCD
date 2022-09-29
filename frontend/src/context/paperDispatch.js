import {
    GET_AUTHORPAPER_SUCCESS,
    GET_AUTHORPAPER_BEGIN,
    CLEAR_PAPER_VALUES,
    SET_EDIT_PAPER,
    CREATE_PAPER_SUCCESS,
    CREATE_PAPER_ERROR,
    EDIT_PAPER_SUCCESS,
    EDIT_PAPER_ERROR,
  } from './actions'

  const paperDispatch = (state, action) => {
    if (action.type === CREATE_PAPER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: "success",
          alertText: "New Paper Created!",
        };
      }
    if (action.type === CREATE_PAPER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
    if (action.type === EDIT_PAPER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: "success",
          alertText: "Update Paper Success!",
        };
      }
      if (action.type === EDIT_PAPER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: "danger",
          alertText: action.payload.msg,
        };
      }
  if (action.type === CLEAR_PAPER_VALUES) {
    const initialState = {
      isEditingPaper: false,
      editPaperId: "",
      paperTitle: "",
      paperSummary: "",
      paperJournal: { journalName: "", journalId: null },
      paperPdfFile: { fileName: "", file: null },
      paperFields: [],
    };

    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === SET_EDIT_PAPER) {
    const paper = state.authorPapers.find(
      (paper) => paper.paperId === action.payload.id
    );

    const { paperId, title, summary, linkPDF } = paper;
    return {
      ...state,
      isEditingPaper: true,
      editPaperId: paperId,
      paperId,
      paperTitle: title,
      paperSummary: summary,
      paperJournal: {
        journalId: paper.journal.journalID,
        journalName: paper.journal.name,
      },
    };
  }
  if (action.type === GET_AUTHORPAPER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      authorPapers: action.payload.authorPapers,
    }
  }
  if (action.type === GET_AUTHORPAPER_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false
    }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default paperDispatch