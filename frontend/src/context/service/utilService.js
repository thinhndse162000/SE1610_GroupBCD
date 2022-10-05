import {
  TOGGLE_SIDEBAR,
  CHANGE_VIEW,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  CHANGE_PAGE,
  HANDLE_AUTHOR_CHANGE,
  HANDLE_MEMBER_CHANGE,
  HANDLE_REVIEWER_CHANGE,
} from "../actions";

export const addUserToLocalStorage = ({ user, token }) => {
  localStorage.setItem("user", user);
  localStorage.setItem("token", token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
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
        dispatchType = HANDLE_REVIEWER_CHANGE;
        break;
    }
    dispatch({ type: dispatchType, payload: { name, value } });
  };

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR });
};

export const changePage = (page) => (dispatch) => {
  dispatch({ type: CHANGE_PAGE, payload: { page } });
};
