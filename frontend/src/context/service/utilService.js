import {
  LOADING,
  SUCCESS_NO_MESSAGE,
  ERROR,
  TOGGLE_SIDEBAR,
  CHANGE_VIEW,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  CHANGE_PAGE,
  HANDLE_AUTHOR_CHANGE,
  HANDLE_MEMBER_CHANGE,
  HANDLE_REVIEW_CHANGE,
  HANDLE_INVITATION_CHANGE,
} from "../actions";
import authFetch from "../../utils/authFetch";

export const addUserToLocalStorage = ({ user, token, role }) => {
  localStorage.setItem("user", user);
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const changeView = (viewType) => (dispatch) => {
  dispatch({ type: CHANGE_VIEW, payload: { viewType } });
};

export const displayAlert = () => (dispatch) => {
  dispatch({ type: DISPLAY_ALERT });
  clearAlert();
};

export const clearAlert = () => (dispatch) => {
  setTimeout(() => {
    dispatch({ type: CLEAR_ALERT });
  }, 3000);
};

export const handleChange =
  ({ name, value, type }) =>
  (dispatch) => {
    let dispatchType = HANDLE_CHANGE;
    switch (type) {
      case "author":
        dispatchType = HANDLE_AUTHOR_CHANGE;
        break;
      case "member":
        dispatchType = HANDLE_MEMBER_CHANGE;
        break;
      case "reviewer":
        dispatchType = HANDLE_REVIEW_CHANGE;
        break;
      case "invitation":
        dispatchType = HANDLE_INVITATION_CHANGE;
        break;
      default:
        dispatchType = HANDLE_CHANGE;
    }
    dispatch({ type: dispatchType, payload: { name, value } });
  };

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR });
};

export const changePage = (page) => (dispatch) => {
  dispatch({ type: CHANGE_PAGE, payload: { page } });
};

export const getField = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/field");
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(handleChange({ name: "fields", value: data }))
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());

}

