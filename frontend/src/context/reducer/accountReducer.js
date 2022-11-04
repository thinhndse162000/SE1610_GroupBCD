const accountReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ACCOUNT_PROFILE:
        return { ...state, ...action.payload };
      

        default:
            return state;
    }

};
export default accountReducer;
