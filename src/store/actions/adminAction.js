import actionTypes from './actionTypes';
import {
    getAllcodeservice, createnewUserService,
    getAllusers, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctor, saveDetailDoctorService
} from '../../services/userservive'
import { toast } from "react-toastify";
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
            //console.log('hoidanit check create user redux: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                toast.success("CREATE A NEW USER SUCCESS!");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed error', e)
        }
    }

}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCSESS,
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})




export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllusers('ALL')
            //console.log('hoidanit check create user redux: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                toast.success("FETCH ALL USER SUCCESS!");
                dispatch(fetchAllUsersSucsess(res.users.reverse()))
            } else {
                toast.error("FETCH ALL USER ERROR!");
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed())
            console.log('fetchAllUsersFailed error', e)
        }
    }
}
export const fetchAllUsersSucsess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCSESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})




export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            //console.log('hoidanit check create user redux: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                toast.success("DELETE THE USER SUCCESS!");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("DELETE THE USER ERROR!");
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed())
            console.log('deleteUserFailed error', e)
        }
    }

}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCSESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})




export const EditAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userId)
            //console.log('hoidanit check create user redux: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                toast.success("UPDATE THE USER SUCCESS!");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("UPDATE THE USER ERROR!");
                dispatch(editUserFailed())
            }
        } catch (e) {
            dispatch(editUserFailed())
            console.log('editUserFailed error', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCSESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})



export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            //console.log('hoi dan it chaner check res: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCSESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED:', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}



export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor()
            //console.log('hoi dan it chaner check res: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCSESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED:', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}



export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            //console.log('hoi dan it chaner check res: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                toast.success("SAVE INFOR DETAIL DOCTOR SUCCESS!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCSESS,
                })
            } else {
                console.log('error res:', res)
                toast.error("SAVE INFOR DETAIL DOCTOR ERROR!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTORS_FAILED:', e)
            toast.error("SAVE INFOR DETAIL DOCTOR ERROR!");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
            })
        }
    }
}



export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeservice('TIME')
            //console.log('hoi dan it chaner check res: ', res)
            if (res && res.errcode === 0) {
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCSESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED:', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}




export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllcodeservice('PRICE')
            let resPayment = await getAllcodeservice('PAYMENT')
            let resProvince = await getAllcodeservice('PROVINCE')

            if (resPrice && resPrice.errcode === 0 &&
                resProvince && resProvince.errcode === 0 &&
                resPayment && resPayment.errcode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                //sconsole.log('hoi dan it check get state:', getState)
                dispatch(fetchRequiredDoctorInforSucsess(data))
            } else {
                dispatch(fetchRequiredDoctorInforfailed())
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforfailed())
            console.log('fetchRequiredDoctorInforfailed error', e)
        }
    }
}
export const fetchRequiredDoctorInforSucsess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforfailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})