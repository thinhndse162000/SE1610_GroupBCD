import {
    GET_JOURNAL_SUCCESS,
    GET_JOURNAL_ERROR,
    GET_PAPER_SUCCESS,
    GET_PAPER_ERROR,
} from './actions'

const journalDispatch = (state, action) => {
  if (action.type === GET_JOURNAL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      searchResult: action.payload.journals,
    }
  }
  if (action.type === GET_JOURNAL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }
  if (action.type === GET_PAPER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      searchResult: action.payload.papers,
    }
  }
  if (action.type === GET_PAPER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default journalDispatch