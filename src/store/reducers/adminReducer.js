import actionTypes from '../actions/actionTypes';



const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGender = true
            console.log('hoi dan it fire fetch gender start: ', action)
            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCSESS:

            state.genders = action.data
            state.isLoadingGender = false
            console.log('hoi dan it fire fetch gender sucsess: ', action)
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            state.genders = []
            console.log('hoi dan it fire fetch gender failed: ', action)
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCSESS:
            state.positions = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCSESS:
            state.roles = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;