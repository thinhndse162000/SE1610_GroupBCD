import { LOADING, ERROR, SUCCESS_NO_MESSAGE, SUCCESS } from "../actions";
import { clearAlert, handleChange } from "./utilService";
import authFetch from "../../utils/authFetch";

export const searchAvailableReviewer =
  ({ paperId, keyword }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.get(
        `/reviewer/paper/${paperId}/search`,
        {
          params: { name: keyword },
        }
      );

      dispatch({
        type: SUCCESS_NO_MESSAGE,
      });
      dispatch(
        handleChange({
          name: "availableReviewers",
          value: data,
          type: "manager",
        })
      );
    } catch (error) {
      dispatch({
        type: ERROR,
        msg: error.response.data.message,
      });
    }
    dispatch(clearAlert());
  };

export const getAuthorProfile =
  ({ slug }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.get(`/author/${slug}`);
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch(
        handleChange({ name: "authorProfile", value: data, type: "member" })
      );
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const getReviewerSetting = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/reviewer");
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "reviewerSetting", value: data, type: "member" })
    );
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};

export const updateReviewerFields =
  ({ fields }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      await authFetch.put("/reviewer/field", { fieldId: fields });
      dispatch({ type: SUCCESS, payload: { msg: "Update successfully" } });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const updateInvitable =
  ({ invitable }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      await authFetch.put(`/reviewer/invitable/${invitable}`);
      dispatch({ type: SUCCESS_NO_MESSAGE });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };
