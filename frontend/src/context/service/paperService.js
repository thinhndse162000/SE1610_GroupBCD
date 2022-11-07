import {
  SET_EDIT_PAPER,
  CLEAR_PAPER_VALUES,
  LOADING,
  LOADING_ALERT,
  SUCCESS,
  ERROR,
  SUCCESS_NO_MESSAGE,
  PAPER_DETAIL,
} from "../actions";
import { clearAlert, clearAlertNow, handleChange } from "./utilService";
import authFetch from "../../utils/authFetch";
import fileDownload from "js-file-download";

export const setEditPaper = (id) => (dispatch) => {
  dispatch(clearAlertNow());
  dispatch({ type: SET_EDIT_PAPER, payload: { id } });
};

export const deletePaper = (id) => (dispatch) => {};

export const getAuthorPaper =
  ({ keyword: title, startDate, endDate, status, fields, page }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.post("/author/paper/search", {
        title,
        startDate,
        endDate,
        status: status === "ALL" ? null : status,
        fields,
        page,
      });
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch(
        handleChange({
          name: "randome",
          value: data,
          type: "author_spread_search",
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

export const getAuthorPublish =
  ({ id, slug }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      let url = "";
      if (id != null) {
        url = `/author/${id}/publish`;
      } else if (slug != null) {
        url = `/author/slug/${slug}/publish`;
      }

      const { data } = await authFetch.get(url);
      dispatch({ type: SUCCESS_NO_MESSAGE });
      dispatch(
        handleChange({ name: "authorPublish", value: data, type: "member" })
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

export const getPaperDetailManager = (paperId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/author/paper/${paperId}`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch({
      type: "MANAGER_PAPER_DETAIL",
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

export const getEditPaper = (paperId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/author/paper/${paperId}`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch({
      type: "EDIT_PAPER",
      payload: {
        editPaper: data.paper,
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
    dispatch(
      handleChange({
        name: "paper",
        value: data,
        type: "manager",
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

export const createPaper = (paper) => async (dispatch) => {
  dispatch({ type: LOADING_ALERT });
  try {
    const {
      paperTitle,
      paperSummary,
      paperJournal,
      paperPdfFile,
      paperFields,
    } = paper;
    let formData = new FormData();

    formData.append("file", paperPdfFile.file);
    formData.append("title", paperTitle);
    formData.append("summary", paperSummary);
    formData.append("journalId", paperJournal.journalId);
    formData.append(
      "fieldId",
      paperFields.map((f) => f.fieldId)
    );

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
    const { paperId, paperTitle, paperSummary, paperPdfFile } = paper;
    let formData = new FormData();
    if (paperPdfFile.file != null && paperPdfFile.file !== "") {
      formData.append("file", paperPdfFile.file);
    }
    formData.append("title", paperTitle);
    formData.append("summary", paperSummary);

    await authFetch.put(`/paper/${paperId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: SUCCESS,
      payload: { msg: "Edit paper successfully" },
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

export const clearPaperValues = () => (dispatch) => {
  dispatch({ type: CLEAR_PAPER_VALUES });
};

export const search =
  ({ keyword, type, fields, page }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      // search
      let data = {};
      if (type === "Journal") {
        data = await authFetch.post("/journal/search", {
          name: keyword,
          fieldIds: fields.map((field) => field.fieldId),
          page,
        });
      } else {
        data = await authFetch.post("/publish/search", {
          title: keyword,
          fieldIds: fields.map((field) => field.fieldId),
          page,
        });
      }
      dispatch({
        type: SUCCESS_NO_MESSAGE,
      });
      dispatch(
        handleChange({
          name: "result",
          value: { ...data.data, resultType: type },
          type: "member_spread_search",
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

export const listInvitation = (paperId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get(`/paper/${paperId}/invitation`);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({ name: "sentInvitations", value: data, type: "manager" })
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

export const downloadFile =
  ({ paperId, fileName }) =>
  async (dispatch) => {
    try {
      const { data } = await authFetch.get(`/paper/${paperId}/download`, {
        responseType: "blob",
      });
      fileDownload(data, fileName);
    } catch (error) {
      if (error.response.status === 401) return;
    }
  };

export const updatePaperStatus = (paperId, status) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    await authFetch.put(`/paper/${paperId}/status`, {
      status,
    });
    let msg = status === "ACCEPTED" ? "Accept paper" : "Reject paper";
    dispatch({ type: SUCCESS, payload: { msg } });
    dispatch({
      type: "HANDLE_MANAGER_PAPER_CHANGE",
      payload: { id: paperId, status },
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

export const updatePaperStatusBulk = (paperIds, status) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    await authFetch.put("/paper/status", {
      paperIds,
      status,
    });
    let msg = status === "ACCEPTED" ? "Accept paper" : "Reject paper";
    dispatch({ type: SUCCESS, payload: { msg } });
    // dispatch({
    //   type: "HANDLE_MANAGER_PAPER_CHANGE",
    //   payload: { id: paperId, status },
    // });
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};
