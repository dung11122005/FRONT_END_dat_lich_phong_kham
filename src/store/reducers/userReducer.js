import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    usersInfo: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCSESS:
            return {
                ...state,
                isLoggedIn: true,
                usersInfo: action.usersInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                usersInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                usersInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;