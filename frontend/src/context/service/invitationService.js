import authFetch from "../../utils/authFetch";
import { clearAlert } from "./utilService";
import {
  REMOVE_AVAILABLE_REVIEWER,
  ERROR,
  LOADING,
  SUCCESS_NO_MESSAGE,
  INVITATION,
  SUCCESS,
  HANDLE_INVITATION_CHANGE,
  ADD_SENT_INVITATION,
} from "../actions";

export const getInvitation = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.get("/reviewer/invitation");

    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch({
      type: INVITATION,
      payload: {
        invitations: data,
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

export const updateInvitationStatus =
  (invitationId, status) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      await authFetch.put(`/reviewer/invitation/${invitationId}/status`, {
        status,
      });
      let msg =
        status === "ACCEPTED" ? "Accept invitation" : "Reject invitation";
      dispatch({ type: SUCCESS, payload: { msg } });
      dispatch({
        type: HANDLE_INVITATION_CHANGE,
        payload: { id: invitationId, status },
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

export const sendInvitation =
  ({ paperId, reviewerId }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.post(
        `/reviewer/${reviewerId}/invitation`,
        {
          paperId,
        }
      );
      // TODO: add to sent invitation
      dispatch({
        type: SUCCESS,
        payload: { msg: "Send invitation successfully" },
      });
      dispatch({
        type: ADD_SENT_INVITATION,
        payload: { invitation: data },
      });

      dispatch({
        type: REMOVE_AVAILABLE_REVIEWER,
        payload: { id: reviewerId },
      });
    } catch (error) {
      let msg = error.response.data.message;
      if (error.response.status === 401) return;
      if (error.response.status === 409) {
        msg = "Already sent invitation to reviewer";
      }
      dispatch({
        type: ERROR,
        payload: { msg },
      });
    }
    dispatch(clearAlert());
  };
