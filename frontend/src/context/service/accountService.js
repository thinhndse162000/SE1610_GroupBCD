import authFetch from "../../utils/authFetch";
import {
  ERROR,
  LOADING,
  SETUP_USER_ERROR,
  SUCCESS,
  SUCCESS_NO_MESSAGE,
} from "../actions";
import { clearAlert, handleChange } from "./utilService";

export const getAccountProfile = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/account/profile");
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(handleChange({ name: "profile", value: data, type: "member" }));
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};

export const chagePassword =
  ({ currentPassword }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.put(
        "/account/password",
        currentPassword
      );

      dispatch({
        type: SUCCESS,
        payload: { msg: "Change password successfully!!" },
      });
      window.location.reload();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };
