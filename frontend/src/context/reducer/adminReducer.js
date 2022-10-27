import { CLEAR_JOURNAL_VALUES, HANDLE_ADMIN_CHANGE, SET_EDIT_JOURNAL } from "../actions";
import { admin } from "../state";

const adminReducer = (state = admin, action) => {
    switch (action.type) {
        case CLEAR_JOURNAL_VALUES:
            const admin = {
                newJournal: {
                    name: "",
                    introduction: "",
                    organization: "",
                    issn: "",
                    journalFields: [],
                },
            };

            return {
                ...state,
                ...admin,
            };
        case HANDLE_ADMIN_CHANGE:
            return {
                ...state,
                newJournal: {
                    ...state.newJournal,
                    [action.payload.name]: action.payload.value,
                }
            }
      
    
       
        default:
            return state;
    }
};

export default adminReducer;