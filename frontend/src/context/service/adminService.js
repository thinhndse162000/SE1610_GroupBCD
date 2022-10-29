import authFetch from "../../utils/authFetch";
import { CLEAR_JOURNAL_VALUES, ERROR, LOADING, SET_EDIT_JOURNAL, SUCCESS, SUCCESS_NO_MESSAGE } from "../actions";
import { clearAlert, handleChange } from "./utilService";

export const createJournal = ({ journal }) =>
    async (dispatch) => {

        dispatch({ type: LOADING });
        try {
            console.log("Test", journal)
            const { data } = await authFetch.post("/journal/", journal

            );
            console.log("data", data)
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
export const search =
    ({ keyword, fields, page }) =>
        async (dispatch) => {
            dispatch({ type: LOADING });
            try {
                // search
                const data = await authFetch.post("/journal/search", { name: keyword, fields, page });
                dispatch({
                    type: SUCCESS_NO_MESSAGE,
                });
                console.log("data",data.data.result)
                dispatch(
                    handleChange({
                        name: "result",
                        value: data.data.result,
                        type: "admin_search",
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
            dispatch({ type: SET_EDIT_JOURNAL, payload: { id } });
          };
          