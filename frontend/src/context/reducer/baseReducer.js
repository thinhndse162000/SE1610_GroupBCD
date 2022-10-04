import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOADING,
  LOADING_ALERT,
  ERROR,
  SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CHANGE_VIEW,
  SUCCESS_NO_MESSAGE,

} from "../actions";
import { base } from "../state";

const baseReducer = (state = base, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true, showAlert: false };
    case LOADING_ALERT:
      return { ...state, isLoading: true };
    case ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.msg,
      };    
      case SUCCESS_NO_MESSAGE:
      return {
        ...state,
        isLoading: false,
        showAlert: false,

      };
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case SETUP_USER_BEGIN:
      return { ...state, isLoading: true };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: true,
        token: action.payload.token,
        user: action.payload.user,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case UPDATE_USER_BEGIN:
      return { ...state, isLoading: true };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        showAlert: true,
        alertType: "success",
        alertText: "User Profile Updated!",
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      };
    case CHANGE_PAGE:
      return { ...state, page: action.payload.page };
    case CHANGE_VIEW:
      return { ...state, viewType: action.payload.viewType };
    default:
      return state;
  }
};

export default baseReducer;
