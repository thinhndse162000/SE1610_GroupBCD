import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from "../actions";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "./utilService";
import { clearAlert } from "./utilService";
import authFetch from "../../utils/authFetch";

export const login =
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
        let msg = "Wrong email or password";
        dispatch({
          type: SETUP_USER_ERROR,
          payload: { msg },
        });
      }
      dispatch(clearAlert());
    };

export const signup =
  ({ currentUser }) =>
    async (dispatch) => {
      dispatch({ type: SETUP_USER_BEGIN });
      try {
        const { data } = await authFetch.post(`/auth/signup`, currentUser);

        const { fullName, token, role } = data;
        dispatch({
          type: SETUP_USER_SUCCESS,
          payload: {
            user: fullName,
            token,
            role,
            alertText: "Account created successfully",
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

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  removeUserFromLocalStorage();
  window.location.reload();
};
