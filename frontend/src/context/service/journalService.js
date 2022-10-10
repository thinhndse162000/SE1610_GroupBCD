import authFetch from "../../utils/authFetch";
import { LOADING, SUCCESS_NO_MESSAGE, ERROR } from "../actions";
import { clearAlert, handleChange } from "./utilService";

export const getSentPaper = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/journal/paper");
    // TODO:
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "sentPapers", value: data, type: "manager" })
    );
  } catch (error) {
    console.log(error);
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

export const getJournalFromManager = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/journal");
    console.log(data)
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "journal", value: data, type: "manager" })
    );
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};
