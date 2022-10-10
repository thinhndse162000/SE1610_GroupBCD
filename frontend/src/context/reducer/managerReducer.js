import {
  REMOVE_AVAILABLE_REVIEWER,
  ADD_SENT_INVITATION,
  HANDLE_MANAGER_CHANGE,
} from "../actions";
import { manager } from "../state";

const managerReducer = (state = manager, action) => {
  switch (action.type) {
    case HANDLE_MANAGER_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
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
