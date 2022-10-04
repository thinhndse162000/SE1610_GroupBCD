import { INVITATION } from "../actions";
import { reviewer } from "../state";

const reviewerReducer = (state = reviewer, action) => {
  switch (action.type) {
    case INVITATION:
      return {
        ...state,
        invitations: action.payload.invitations,
      };
    default:
      return state;
  }
};

export default reviewerReducer
