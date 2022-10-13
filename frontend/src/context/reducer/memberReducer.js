import { HANDLE_MEMBER_CHANGE, MEMBER_JOURNAL_ID } from "../actions";
import { member } from "../state";

const memberReducer = (state = member, action) => {
  switch (action.type) {
    case HANDLE_MEMBER_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case MEMBER_JOURNAL_ID:
      if (state.journalDetailId !== action.payload.journalId) {
        return {
          ...state,
          journalDetailId: action.payload.journalId,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default memberReducer;
