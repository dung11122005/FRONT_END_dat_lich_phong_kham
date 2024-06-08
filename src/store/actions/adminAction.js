import actionTypes from './actionTypes';
import { getAllcodeservice, createnewUserService } from '../../services/userservive'

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            //dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllcodeservice('GENDER')
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch(fetchGenderSucsess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart error', e)
        }
    }

}
export const fetchGenderSucsess = (genderdata) => ({
    type: actionTypes.FETCH_GENDER_SUCSESS,
    data: genderdata
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})





export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeservice('POSITION')
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch(fetchPositionSucsess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionFailed error', e)
        }
    }

}
export const fetchPositionSucsess = (positiondata) => ({
    type: actionTypes.FETCH_POSITION_SUCSESS,
    data: positiondata
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})




export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeservice('ROLE')
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch(fetchRoleSucsess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleFailed error', e)
        }
    }

}
export const fetchRoleSucsess = (roledata) => ({
    type: actionTypes.FETCH_ROLE_SUCSESS,
    data: roledata
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})



export const createNewuser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createnewUserService(data)
            console.log('hoidanit check create user redux: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch(saveUserSuccess(res.data))
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed error', e)
        }
    }

}
export const saveUserSuccess = (roledata) => ({
    type: actionTypes.CREATE_USER_SUCSESS,
    data: roledata
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})




