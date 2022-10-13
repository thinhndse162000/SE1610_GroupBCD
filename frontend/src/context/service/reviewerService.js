import { LOADING, ERROR, SUCCESS_NO_MESSAGE } from "../actions";
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
