import {
  HANDLE_MEMBER_CHANGE,
} from "../actions";
import { member } from "../state";

const memberReducer = (state = member, action) => {
  switch (action.type) {
    case HANDLE_MEMBER_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default memberReducer;
