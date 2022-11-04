import {
  REMOVE_AVAILABLE_REVIEWER,
  ADD_SENT_INVITATION,
  HANDLE_MANAGER_CHANGE,
  HANDLE_MANAGER_SEARCHPAPER_CHANGE,
  HANDLE_MANAGER_SEARCHINVITATION_CHANGE,
  HANDLE_MANAGER_PUBLISHISSUE_CHANGE,
} from "../actions";
import { manager } from "../state";

const managerReducer = (state = manager, action) => {
  switch (action.type) {
    case HANDLE_MANAGER_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case HANDLE_MANAGER_PUBLISHISSUE_CHANGE:
      return {
        ...state,
        publishIssue: {
          ...state.publishIssue,
          [action.payload.name]: action.payload.value,
        },
      }
    case "HANDLE_MANAGER_SPREAD_PUBLISHISSUE_CHANGE":
      return {
        ...state,
        publishIssue: {
          ...state.publishIssue,
          ...action.payload.value,
        },
      }
    case HANDLE_MANAGER_SEARCHPAPER_CHANGE:
      return {
        ...state,
        searchPaper: {
          ...state.searchPaper,
          [action.payload.name]: action.payload.value,
        }
      };
    case "HANDLE_MANAGER_SPREAD_SEARCHPAPER_CHANGE":
      return {
        ...state,
        searchPaper: {
          ...state.searchPaper,
          ...action.payload.value,
        }
      };
    case HANDLE_MANAGER_SEARCHINVITATION_CHANGE:
      return {
        ...state,
        searchInvitation: {
          ...state.searchInvitation,
          [action.payload.name]: action.payload.value,
        }
      };
    case REMOVE_AVAILABLE_REVIEWER:
      const availableReviewers = state.availableReviewers.filter(
        (reviewer) => reviewer.reviewerId !== action.payload.id
      );
      return {
        ...state,
        availableReviewers,
      };
    case ADD_SENT_INVITATION:
      let sentInvitations = state.sentInvitations;
      sentInvitations.push(action.payload.invitation);

      return {
        ...state,
        sentInvitations,
      };
    default:
      return state;
  }
};

export default managerReducer;
