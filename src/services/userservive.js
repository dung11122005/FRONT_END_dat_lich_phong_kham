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

const getExtraInforDoctorById = (doctorId) => {
    //console.log('check input inputId', inputId)
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    //console.log('check input inputId', inputId)
    return axios.get(`/api/get-pro-file-doctor-by-id?doctorId=${doctorId}`)
}


const postPatientBookAppointment = (data) => {
    //console.log('check data', data)
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    //console.log('check data', data)
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpacialty = (data) => {
    //console.log('check data', data)
    return axios.post('/api/create-new-specialty', data)
}


const getAllSpecialty = () => {
    //console.log('check data', data)
    return axios.get('/api/get-specialty')
}


const getAllDetailSpecialtyById = (data) => {
    //console.log('check data', data)
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}


export {
    handleloginapi, getAllusers,
    createnewUserService, deleteUserService,
    editUserService, getAllcodeservice,
    getTopDoctorHomeService, getAllDoctor,
    saveDetailDoctorService, getDetailInforDoctor,
    savebulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById,
    postPatientBookAppointment, postVerifyBookAppointment,
    createNewSpacialty, getAllSpecialty, getAllDetailSpecialtyById
}