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
} from "../actions";
import { clearAlert } from "./utilService";
import authFetch from "../../utils/authFetch";

export const setEditPaper = (id) => (dispatch) => {
  dispatch({ type: SET_EDIT_PAPER, payload: { id } });
};

export const deletePaper = (id) => {};

export const showAuthorPaper = () => async (dispatch) => {
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
    console.log(error);
    console.log("error getting paper");
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
    console.log(error);
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

    await authFetch.post(`/paper/${editPaperId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
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

// TODO: combine searching function
