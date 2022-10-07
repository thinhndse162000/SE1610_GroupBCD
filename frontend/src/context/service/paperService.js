import {
  SET_EDIT_PAPER,
  CLEAR_PAPER_VALUES,
  LOADING,
  LOADING_ALERT,
  SUCCESS,
  ERROR,
  AUTHOR_PAPER,
  SUCCESS_NO_MESSAGE,
  SEARCH_RESULT,
  PAPER_DETAIL,
  SENT_INVITATION,
  PAPER_MANAGER,
} from "../actions";
import { clearAlert } from "./utilService";
import authFetch from "../../utils/authFetch";
import fileDownload from 'js-file-download';

export const setEditPaper = (id) => (dispatch) => {
  dispatch({ type: SET_EDIT_PAPER, payload: { id } });
};

export const deletePaper = (id) => {};

export const getAuthorPaper = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/author/paper");
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch({
      type: AUTHOR_PAPER,
      payload: {
        papers: data,
      },
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

export const getPaperDetail = (paperId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/author/paper/${paperId}`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch({
      type: PAPER_DETAIL,
      payload: {
        paperDetail: data,
      },
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

export const getPaper = (paperId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/paper/${paperId}`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch({
      type: PAPER_MANAGER,
      payload: {
        paper: data,
      },
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

export const createPaper = (paper) => async (dispatch) => {
  dispatch({ type: LOADING_ALERT });
  try {
    const { paperTitle, paperSummary, paperJournal, paperPdfFile } = paper;
    let formData = new FormData();

    formData.append("file", paperPdfFile.file);
    formData.append("title", paperTitle);
    formData.append("summary", paperSummary);
    formData.append("journalId", paperJournal.journalId);

    await authFetch.post("/paper", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: SUCCESS,
      payload: { msg: "Create paper successfully" },
    });
    dispatch({ type: CLEAR_PAPER_VALUES });
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};

export const editPaper = (paper) => async (dispatch) => {
  dispatch({ type: LOADING_ALERT });
  try {
    const { editPaperId, paperTitle, paperSummary, paperPdfFile } = paper;
    let formData = new FormData();
    formData.append("file", paperPdfFile.file);
    formData.append("title", paperTitle);
    formData.append("summary", paperSummary);

    await authFetch.put(`/paper/${editPaperId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: SUCCESS,
      payload: { msg: "Edit paper successfully" },
    });
    dispatch({ type: CLEAR_PAPER_VALUES });
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};

export const clearPaperValues = () => (dispatch) => {
  dispatch({ type: CLEAR_PAPER_VALUES });
};

export const search =
  ({ keyword, type }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      // search
      let data = {};
      if (type === "Journal") {
        data = await authFetch.get("/journal/search", {
          params: { name: keyword },
        });
      } else {
        data = await authFetch.post("/paper/search", {
          params: { title: keyword },
        });
      }
      dispatch({
        type: SUCCESS_NO_MESSAGE,
      });
      dispatch({
        type: SEARCH_RESULT,
        payload: {
          searchResult: data.data,
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

export const listInvitation = (paperId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/paper/${paperId}/invitation`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch({
      type: SENT_INVITATION,
      payload: {
        sentInvitations: data,
      },
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

export const downloadFile = (paperId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/paper/${paperId}/download`, {
      responseType: "blob",
    });
    dispatch({ type: SUCCESS_NO_MESSAGE });
    fileDownload(data, "randome.pdf")
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};
