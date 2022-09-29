import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CHANGE_VIEW,
  GET_AUTHORPAPER_BEGIN,
  GET_AUTHORPAPER_SUCCESS,
  CLEAR_PAPER_VALUES,
  SET_EDIT_PAPER,
  CREATE_BEGIN,
  SHOW_BEGIN,
  CREATE_PAPER_SUCCESS,
  EDIT_PAPER_SUCCESS,
  EDIT_PAPER_ERROR,
} from './actions'

const user = ""
const token = localStorage.getItem('token')
const paperState = {
  authorPapers: [],
  isEditingPaper: false,
  editPaperId: '',
  paperTitle: '',
  paperSummary: '',
  paperJournal: { journalName: '', journalId: null },
  paperPdfFile: { fileName: '', file: null },
  paperFields: [],
  paperStatusOptions: ['pending', 'accepted', 'rejected']
}

const reviewState = {}

const journalState = {}

const initialState = {
  ...paperState,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  viewType: 'author',
  fields: [],
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: 'http://localhost:8080/',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )
  
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', user)
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const login = async ({ currentUser }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await authFetch.post(`auth`, currentUser)

      const { fullName, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user: fullName, token, alertText: "Login Successfully! Redirecting" },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      let msg = "Wrong email or password";
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg },
      })
    }
    clearAlert()
  }

  const signup = async ({ currentUser }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await authFetch.post(`/auth/signup`, currentUser)

      const { fullName, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user: fullName , token, alertText: "Account created successfully" },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.message },
      })
    }
    clearAlert()
  }

  const showAuthorPaper = async () => {
    dispatch({ type: GET_AUTHORPAPER_BEGIN })
    try {
      const { data } = await authFetch.get('/author/paper')
      dispatch({
        type: GET_AUTHORPAPER_SUCCESS,
        payload: {
          authorPapers: data,
        },
      })
    } catch (error) {
      console.log("error getting paper")
    }
    clearAlert()
  }

  const clearPaperValues = () => {
    dispatch({ type: CLEAR_PAPER_VALUES })
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      })
      addUserToLocalStorage({ token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const createPaper = async () => {
    dispatch({ type: CREATE_BEGIN })
    try {
      const { paperTitle, paperSummary, paperJournal, paperPdfFile } = state
      let formData = new FormData()

      formData.append('file', paperPdfFile.file)
      formData.append('title', paperTitle)
      formData.append('summary', paperSummary)
      formData.append('journalId', paperJournal.journalId)

      await authFetch.post(
        "/paper",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({ type: CREATE_PAPER_SUCCESS })
      dispatch({ type: CLEAR_PAPER_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.message },
      })
    }
    clearAlert()
  }

  const editPaper = async () => {
    dispatch({ type: CREATE_BEGIN })
    try {
      const { paperTitle, paperSummary, paperPdfFile } = state
      let formData = new FormData()

      formData.append('file', paperPdfFile.file)
      formData.append('title', paperTitle)
      formData.append('summary', paperSummary)

      await authFetch.post(
        `/paper/${state.editPaperId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      dispatch({ type: EDIT_PAPER_SUCCESS })
      dispatch({ type: CLEAR_PAPER_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_PAPER_ERROR,
        payload: { msg: error.response.data.message },
      })
    }
    clearAlert()
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      const { position, company, jobLocation, jobType, status } = state
      await authFetch.post('/jobs', {
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: CREATE_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_JOBS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { jobs, totalJobs, numOfPages } = data
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }

  const setEditPaper = (id) => {
    dispatch({ type: SET_EDIT_PAPER, payload: { id } })
  }
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })

    try {
      const { position, company, jobLocation, jobType, status } = state
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: EDIT_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN })
    try {
      await authFetch.delete(`/jobs/${jobId}`)
      getJobs()
    } catch (error) {
      logoutUser()
    }
  }
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/jobs/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
  const changeView = (viewType) => {
    dispatch({ type: CHANGE_VIEW, payload: { viewType } })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        login,
        signup,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        setEditPaper,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        changeView,
        showAuthorPaper,
        clearPaperValues,
        createPaper,
        editPaper
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
