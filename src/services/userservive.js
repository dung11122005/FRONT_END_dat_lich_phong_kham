import axios from "../axios"

const handleloginapi = (useremail, userpassword) => {
    return axios.post('/api/login', { email: useremail, password: userpassword })
}


const getAllusers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}


const createnewUserService = (data) => {
    //console.log('check data', data)
    return axios.post('/api/create-new-user', data)
}


const deleteUserService = (userid) => {
    //console.log('check data', userid)
    return axios.delete('/api/delete-user', {
        data: {
            id: userid
        }
    })
}


const editUserService = (inputdata) => {
    //console.log('check data', inputdata)
    return axios.put('/api/edit-user', inputdata)
}


const getAllcodeservice = (inputdata) => {
    return axios.get(`/api/allcode?type=${inputdata}`)
}


const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}


const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctors`)
}


const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}


const getDetailInforDoctor = (inputId) => {
    //console.log('check input inputId', inputId)
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}


const savebulkScheduleDoctor = (data) => {
    //console.log('check input inputId', inputId)
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    //console.log('check input inputId', inputId)
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
export {
    handleloginapi, getAllusers,
    createnewUserService, deleteUserService,
    editUserService, getAllcodeservice,
    getTopDoctorHomeService, getAllDoctor,
    saveDetailDoctorService, getDetailInforDoctor,
    savebulkScheduleDoctor, getScheduleDoctorByDate
}