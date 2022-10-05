import {
  JOURNAL_PAPER,
} from "../actions";
import { manager } from "../state";

const managerReducer = (state = manager, action) => {
  switch (action.type) {
    case JOURNAL_PAPER:
      return {
        ...state,
        sentPapers: action.payload.papers,
      };

    default:
      return state;
  }
};

export default managerReducer;
