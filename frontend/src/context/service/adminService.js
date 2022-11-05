import authFetch from "../../utils/authFetch";
import {
  CLEAR_JOURNAL_VALUES,
  ERROR,
  LOADING,
  SET_EDIT_JOURNAL,
  SUCCESS,
  SUCCESS_NO_MESSAGE,
} from "../actions";
import { clearAlert, clearAlertNow, handleChange } from "./utilService";

export const createJournal =
  ({ journal }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      await authFetch.post("/journal/", journal);
      dispatch({
        type: SUCCESS,
        payload: { msg: "Create journal successfully" },
      });
      dispatch({ type: CLEAR_JOURNAL_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const editJournal =
  ({ journal }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      await authFetch.put(`/journal/${journal.editJournalID}`, journal);
      dispatch({
        type: SUCCESS,
        payload: { msg: "Edit journal successfully" },
      });
      dispatch({ type: CLEAR_JOURNAL_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };
export const search =
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
      console.log("data",  data)
      dispatch({
        type: SUCCESS_NO_MESSAGE,
      });

      dispatch(
        handleChange({
          name: "result",
          value: data,
          type: "admin_spread_search",
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

export const setEditJournal = (id) => (dispatch) => {
  dispatch(clearAlertNow());
  dispatch({ type: SET_EDIT_JOURNAL, payload: { id } });
};

export const archiveJournal =
  ({ journalId }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      await authFetch.delete(`/journal/${journalId}`);
      dispatch({
        type: SUCCESS,
        payload: { msg: "Archive journal successfully" },
      });
      dispatch({
        type: "HANDLE_JOURNAL_CHANGE",
        payload: {
          id: journalId,
          status: "ARCHIVED",
        }
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };

export const openJournal =
  ({ journalId }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      await authFetch.put(`/journal/${journalId}/open`);
      dispatch({
        type: SUCCESS,
        payload: { msg: "Open journal successfully" },
      });
      dispatch({
        type: "HANDLE_JOURNAL_CHANGE",
        payload: {
          id: journalId,
          status: "OPEN",
        }
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    dispatch(clearAlert());
  };
