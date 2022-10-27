import { combineReducers } from "redux";
import baseReducer from "./baseReducer";
import authorReducer from "./authorReducer";
import memberReducer from "./memberReducer";
import reviewerReducer from "./reviewerReducer";
import managerReducer from "./managerReducer";
import { LOGOUT_USER } from "../actions";
import { initialState } from "../state";
import adminReducer from "./adminReducer";

const combinedReducer = combineReducers({
  base: baseReducer,
  author: authorReducer,
  member: memberReducer,
  reviewer: reviewerReducer,
  manager: managerReducer,
  admin :adminReducer,
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
