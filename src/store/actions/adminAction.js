import actionTypes from './actionTypes';
import { getAllcodeservice } from '../../services/userservive'

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
                dispatch(fetchGenderFailer())
            }
        } catch (e) {
            dispatch(fetchGenderFailer())
            console.log('fetchGenderStart error', e)
        }
    }

}
export const fetchGenderSucsess = (genderdata) => ({
    type: actionTypes.FETCH_GENDER_SUCSESS,
    data: genderdata
})
export const fetchGenderFailer = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})





export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeservice('POSITION')
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch(fetchPositionSucsess(res.data))
            } else {
                dispatch(fetchPositionFailer())
            }
        } catch (e) {
            dispatch(fetchPositionFailer())
            console.log('fetchPositionFailer error', e)
        }
    }

}
export const fetchPositionSucsess = (positiondata) => ({
    type: actionTypes.FETCH_POSITION_SUCSESS,
    data: positiondata
})
export const fetchPositionFailer = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})




export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeservice('ROLE')
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch(fetchRoleSucsess(res.data))
            } else {
                dispatch(fetchRoleFailer())
            }
        } catch (e) {
            dispatch(fetchRoleFailer())
            console.log('fetchRoleFailer error', e)
        }
    }

}
export const fetchRoleSucsess = (roledata) => ({
    type: actionTypes.FETCH_ROLE_SUCSESS,
    data: roledata
})
export const fetchRoleFailer = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})





