import React from "react";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { applyMiddleware, createStore } from "redux";
import { initialState } from "./state";
import thunk from "redux-thunk";

const AppProvider = ({ children }) => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));

    // TODO:
  // const updateUser = async (currentUser) => {
  //   dispatch({ type: UPDATE_USER_BEGIN })
  //   try {
  //     const { data } = await authFetch.patch('/auth/updateUser', currentUser)

  //     const { fullName, token } = data

  //     dispatch({
  //       type: UPDATE_USER_SUCCESS,
  //       payload: { fullName, token },
  //     })
  //     addUserToLocalStorage({ fullName, token })
  //   } catch (error) {
  //     if (error.response.status !== 401) {
  //       dispatch({
  //         type: UPDATE_USER_ERROR,
  //         payload: { msg: error.response.data.msg },
  //       })
  //     }
  //   }
  //   clearAlert()
  // }


  // const deleteJob = async (jobId) => {
  //   dispatch({ type: DELETE_JOB_BEGIN })
  //   try {
  //     await authFetch.delete(`/jobs/${jobId}`)
  //     getJobs()
  //   } catch (error) {
  //     logoutUser()
  //   }
  // }

  return <Provider store={store}>{children}</Provider>;
};

export { AppProvider };
