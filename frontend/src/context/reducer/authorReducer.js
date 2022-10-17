import {
  AUTHOR_PAPER,
  CLEAR_PAPER_VALUES,
  SET_EDIT_PAPER,
  HANDLE_AUTHOR_CHANGE,
  PAPER_DETAIL,
  HANDLE_AUTHOR_SEARCH_CHANGE,
} from "../actions";
import { author } from "../state";

const authorReducer = (state = author, action) => {
  switch (action.type) {
    case CLEAR_PAPER_VALUES:
      const author = {
        isEditingPaper: false,
        editPaperId: "",
        newPaper: {
          paperTitle: "",
          paperSummary: "",
          paperJournal: { journalName: "", journalId: "" },
          paperPdfFile: { fileName: "", file: "" },
          paperFields: [],
        },
      };

      return {
        ...state,
        ...author,
      };
    case HANDLE_AUTHOR_CHANGE:
      return {
        ...state,
        newPaper: {
          ...state.newPaper,
          [action.payload.name]: action.payload.value,
        }
      }
    case HANDLE_AUTHOR_SEARCH_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          [action.payload.name]: action.payload.value,
        }
      }
    case SET_EDIT_PAPER:
      const paper = state.submittedPapers.find(
        (paper) => paper.paperId === action.payload.id
      );

      const { paperId, title, summary, linkPDF, journal, fields } = paper;
      // TODO: link PDF
      return {
        ...state,
        editPaperId: paperId,
        newPaper: {
          paperTitle: title,
          paperSummary: summary,
          paperPdfFile: {
            fileName: linkPDF,
            file: "",
          },
          paperJournal: {
            journalId: journal.journalId,
            journalName: journal.name,
          },
          paperFields: fields,
        },
      };
    case AUTHOR_PAPER:
      return {
        ...state,
        submittedPapers: action.payload.papers,
      };
    case PAPER_DETAIL:
      return {
        ...state,
        paperDetail: action.payload.paperDetail,
      }
    default:
      return state;
  }
};

export default authorReducer;
