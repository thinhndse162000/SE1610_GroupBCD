import authFetch from "../../utils/authFetch";
import { LOADING, SUCCESS_NO_MESSAGE, ERROR } from "../actions";
import { clearAlert, handleChange } from "./utilService";

export const getSentPaper =
  ({ keyword: title, startDate, status, page }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.post("/journal/paper/search", {
        title,
        startDate,
        status,
        page,
      });
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch(
        handleChange({ name: "sentPapers", value: data, type: "manager_spread_searchpaper" })
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
    dispatch(handleChange({ name: "journal", value: data, type: "manager" }));
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};

export const getJournalFromMember =
  ({ slug }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.get(`/journal/slug/${slug}`);
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch(handleChange({ name: "journal", value: data, type: "member" }));
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const getJournalIssues =
  ({ slug }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.get(`/journal/slug/${slug}/issue`);
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch(handleChange({ name: "issues", value: data, type: "member" }));
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const getJournalPublishes =
  ({ slug }) =>
  async (dispatch) => {
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
  };

export const getIssuePublish =
  ({ issueId }) =>
  async (dispatch) => {
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
  };

export const getPublish =
  ({ publishId }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.get(`/publish/${publishId}`);
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch(handleChange({ name: "publish", value: data, type: "member" }));
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const getLatestIssue = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/journal/issue/latest");
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({
        name: "latestIssue",
        value: data,
        type: "manager_publishissue",
      })
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

export const getAcceptedPaper =
  ({ title, page }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.post("/journal/paper/search", {
        title,
        page,
        status: "ACCEPTED",
      });
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch(
        handleChange({
          name: "acceptedPapers",
          value: data,
          type: "manager_spread_publishissue",
        })
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

export const createIssue =
  ({ startDate, endDate, publishes }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let pub = publishes.map((p) => ({ paperId: p.paper.paperId, accessLevel: p.accessLevel }));

      await authFetch.post("/journal/issue", {
        startDate,
        endDate,
        publishes: pub,
      });

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

export const searchJournal =
  ({ keyword, fields, page }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      // search
      const { data } = await authFetch.post("/journal/search", {
        name: keyword,
        fieldIds: fields.map((field) => field.fieldId),
        page,
      });

      dispatch({
        type: SUCCESS_NO_MESSAGE,
      });

      dispatch(
        handleChange({
          name: "result",
          value: data,
          type: "author_spread_journal",
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
