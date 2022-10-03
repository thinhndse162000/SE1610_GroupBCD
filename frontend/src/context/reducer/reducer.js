import { combineReducers } from "redux";
import baseReducer from "./baseReducer";
import authorReducer from "./authorReducer";
import memberReducer from "./memberReducer";
import { LOGOUT_USER } from "../actions";
import { initialState } from "../state";

const combinedReducer = combineReducers({
  base: baseReducer,
  author: authorReducer,
  member: memberReducer,
});

const reducer = (state, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        ...initialState,
        user: "",
        token: "",
      };
    default:
      return combinedReducer(state, action);
  }
};

export default reducer;
