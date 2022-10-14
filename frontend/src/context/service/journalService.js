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
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};

export const getJournalFromManager = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/journal");
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "journal", value: data, type: "manager" })
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

export const getJournalFromMember = ({ slug }) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/journal/slug/${slug}`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "journal", value: data, type: "member" })
    );
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
}

export const getJournalIssues = ({ slug }) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/journal/slug/${slug}/issue`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "issues", value: data, type: "member" })
    );
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
}

export const getJournalPublishes = ({ slug }) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/journal/slug/${slug}/publish`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "publishes", value: data, type: "member" })
    );
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
}

export const getIssuePublish = ({ issueId }) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/issue/${issueId}`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "issuePublishes", value: data, type: "member" })
    );
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
}

export const getPublish = ({ publishId }) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/publish/${publishId}`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "publish", value: data, type: "member" })
    );
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
}
