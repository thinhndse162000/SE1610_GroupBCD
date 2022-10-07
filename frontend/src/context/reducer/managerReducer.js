import {
  PAPER_MANAGER,
  JOURNAL_PAPER,
  SENT_INVITATION,
  AVAILABLE_REVIEWER,
  REMOVE_AVAILABLE_REVIEWER,
  ADD_SENT_INVITATION,
} from "../actions";
import { manager } from "../state";

const managerReducer = (state = manager, action) => {
  switch (action.type) {
    case JOURNAL_PAPER:
      return {
        ...state,
        sentPapers: action.payload.papers,
      };
    case SENT_INVITATION:
      return {
        ...state,
        sentInvitations: action.payload.sentInvitations,
      };
    case AVAILABLE_REVIEWER:
      return {
        ...state,
        availableReviewers: action.payload.availableReviewers,
      };
    case PAPER_MANAGER:
      return {
        ...state,
        paper: action.payload.paper,
      };
    case REMOVE_AVAILABLE_REVIEWER:
      const availableReviewers = state.availableReviewers.filter(
        (reviewer) => reviewer.reviewerId != action.payload.id
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
