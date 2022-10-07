import {
  LOADING,
  ERROR,
  SUCCESS_NO_MESSAGE,
  AVAILABLE_REVIEWER,
} from "../actions";
import { clearAlert } from "./utilService";
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
      dispatch({
        type: AVAILABLE_REVIEWER,
        payload: {
          availableReviewers: data,
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        msg: error.response.data.message,
      });
    }
    dispatch(clearAlert());
  };
