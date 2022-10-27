import authFetch from "../../utils/authFetch";
import { CLEAR_JOURNAL_VALUES, ERROR, LOADING, SUCCESS, SUCCESS_NO_MESSAGE } from "../actions";
import { clearAlert } from "./utilService";

export const createJournal = ({ journal }) =>
    async (dispatch) => {
      
        dispatch({ type: LOADING });
        try {
          console.log ("Test",journal)
            const { data } = await authFetch.post("/journal",
                journal
            );

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
export const editJournal = ({ journal }) =>
    async (dispatch) => {

        dispatch({ type: LOADING });
        try {
            const { data } = await authFetch.put(`/journal/${journal.editJournalID}`, journal);
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