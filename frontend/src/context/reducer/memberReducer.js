import { HANDLE_MEMBER_CHANGE, MEMBER_JOURNAL_ID, HANDLE_MEMBER_SEARCH_CHANGE } from "../actions";
import { member } from "../state";

const memberReducer = (state = member, action) => {
  switch (action.type) {
    case HANDLE_MEMBER_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case HANDLE_MEMBER_SEARCH_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          [action.payload.name]: action.payload.value,
        }
      };
    case MEMBER_JOURNAL_ID:
      if (state.journalSlug !== action.payload.slug) {
        return {
          ...state,
          journalSlug: action.payload.slug,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default memberReducer;
