import authFetch from "../../utils/authFetch";
import { clearAlert } from "./utilService";
import { LOADING, SUCCESS_NO_MESSAGE, INVITATION, SUCCESS } from "../actions";

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
    console.log(error);
    console.log("error getting invitation");
  }
  dispatch(clearAlert());
};

export const updateInvitationStatus =
  (invitationId, status) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await authFetch.put(
        `/reviewer/invitation/${invitationId}/status`,
        {
          status,
        }
      );
      let msg = (status === "ACCEPTED") ? "Accept invitation" : "Reject invitation";
      dispatch({ type: SUCCESS, payload: { msg } });
    } catch (error) {
      console.log(error);
      console.log("error update invitation");
    }
    dispatch(clearAlert());
  };
