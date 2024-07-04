import actionTypes from '../actions/actionTypes';



const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allrequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGender = true
            //console.log('hoi dan it fire fetch gender start: ', action)
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCSESS:

            state.genders = action.data
            state.isLoadingGender = false
            //console.log('hoi dan it fire fetch gender sucsess: ', action)
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
        case actionTypes.FETCH_ALL_USERS_SUCSESS:
            state.users = action.users
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCSESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCSESS:
            state.allDoctors = action.dataDr
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCSESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = []
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allrequiredDoctorInfor = action.data
            //console.log('hoi dan it fetch required doctor infor action:', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allrequiredDoctorInfor = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;