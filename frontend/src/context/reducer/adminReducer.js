import { CLEAR_JOURNAL_VALUES, HANDLE_ADMIN_CHANGE, HANDLE_ADMIN_SEARCH_CHANGE, SET_EDIT_JOURNAL } from "../actions";
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
                    numberOfRound: "",
                    numberOfReviewer: "",
                },
            };

            return {
                ...state,
                ...admin,
            };
        case HANDLE_ADMIN_SEARCH_CHANGE:
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.payload.name]: action.payload.value,
                }
            };
        case HANDLE_ADMIN_CHANGE:
            return {
                ...state,
                newJournal: {
                    ...state.newJournal,
                    [action.payload.name]: action.payload.value,
                }
            }
        case SET_EDIT_JOURNAL:
            const journal1 = state.search.result.find(
                (journal1) => journal1.journalId === action.payload.id
            );

            const { journalId, name,
                introduction, fields,
                organization, issn,
                numberOfRound, numberOfReviewer } = journal1;
            // TODO: link PDF
            return {
                ...state,
                editJournalID: journalId,
                newJournal:
                {
                    name: name,
                    introduction: introduction,
                    organization: organization,
                    issn: issn,
                    journalFields: fields,
                    numberOfRound: numberOfRound,
                    numberOfReviewer: numberOfReviewer,
                },
            }

        default:
            return state;

    }
};

export default adminReducer;