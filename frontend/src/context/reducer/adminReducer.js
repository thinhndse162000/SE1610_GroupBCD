import {
  CLEAR_JOURNAL_VALUES,
  HANDLE_ADMIN_CHANGE,
  HANDLE_ADMIN_SEARCH_CHANGE,
  SET_EDIT_JOURNAL,
} from "../actions";
import { admin } from "../state";

const adminReducer = (state = admin, action) => {
  switch (action.type) {
    case CLEAR_JOURNAL_VALUES:
      const admin = {
        newJournal: {
          name: "",
          introduction: "",
          organization: "",
          issn: "",
          managerEmail: "",
          journalFields: [],
          numberOfRound: "",
          numberOfReviewer: "",
        },
      };

      return {
        ...state,
        ...admin,
      };
    case HANDLE_ADMIN_SEARCH_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          [action.payload.name]: action.payload.value,
        },
      };

    case "HANDLE_JOURNAL_CHANGE":
      let journals = state.search.result.map((journal) => {
        if (journal.journalId === action.payload.id) {
          return { ...journal, status: action.payload.status };
        }
        return journal;
      });

      return {
        ...state,
        search: {
          ...state.search,
          result: journals,
        },
      };

    case "HANDLE_ADMIN_SPREAD_SEARCH_CHANGE":
      return {
        ...state,
        search: {
          ...state.search,
          ...action.payload.value,
        },
      };
    case HANDLE_ADMIN_CHANGE:
      return {
        ...state,
        newJournal: {
          ...state.newJournal,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_EDIT_JOURNAL:
      const journal1 = state.search.result.find(
        (journal1) => journal1.journalId === action.payload.id
      );

      const {
        journalId,
        name,
        introduction,
        fields,
        organization,
        issn,
        managerEmail,
        numberOfRound,
        numberOfReviewer,
      } = journal1;
      // TODO: link PDF
      return {
        ...state,
        editJournalID: journalId,
        newJournal: {
          name: name,
          introduction: introduction,
          organization: organization,
          issn: issn,
          managerEmail,
          journalFields: fields,
          numberOfRound: numberOfRound,
          numberOfReviewer: numberOfReviewer,
        },
      };

    default:
      return state;
  }
};

export default adminReducer;
