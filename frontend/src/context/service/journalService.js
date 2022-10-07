import authFetch from "../../utils/authFetch";
import { LOADING, SUCCESS_NO_MESSAGE, JOURNAL_PAPER, ERROR } from "../actions";
import { clearAlert } from "./utilService";

export const getSentPaper = () => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.get("/journal/paper");
      // TODO:
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch({
        type: JOURNAL_PAPER,
        payload: {
          papers: data,
        },
      });
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
};

export const sendInvitation =
  ({ paperId, reviewerId }) =>
  async (dispatch) => {};
