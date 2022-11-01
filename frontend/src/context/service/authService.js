import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  LOADING,
  SUCCESS,
  ERROR,
} from "../actions";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "./utilService";
import { clearAlert } from "./utilService";
import authFetch from "../../utils/authFetch";

export const  login =
  ({ currentUser }) =>
  async (dispatch) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.post(`auth`, currentUser);

      const { fullName, token, role } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user: fullName,
          token,
          role,
          alertText: "Login Successfully! Redirecting",
        },
      });
      addUserToLocalStorage({ user: fullName, token, role });
      window.location.reload();
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const signup =
  ({ currentUser }) =>
  async (dispatch) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      await authFetch.post(`/auth/signup`, currentUser);

      dispatch({
        type: SUCCESS,
        payload: {
          msg: "Account create successfully. A verify link has been send to your email. Please verify your email"
        },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const verifyAccount =
  ({ token }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      await authFetch.put(`/auth/verify/${token}`);

      dispatch({
        type: SUCCESS,
        payload: {
          msg: "Verify account successfully. Please login again to the system"
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { msg: "Your verify link has expired. A new email has been sent" },
      });
    }
    dispatch(clearAlert());
  };

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  removeUserFromLocalStorage();
  window.location.reload();
};
