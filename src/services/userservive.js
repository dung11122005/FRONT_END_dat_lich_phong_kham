import axios from "../axios"

const handleloginapi = (useremail, userpassword) => {
    return axios.post('/api/login', { email: useremail, password: userpassword })
}


const getAllusers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}


const createnewUserService = (data) => {
    console.log('check data', data)
    return axios.post('/api/create-new-user', data)
}


const deleteUserService = (userid) => {
    console.log('check data', userid)
    return axios.delete('/api/delete-user', {
        data: {
            id: userid
        }
    })
}


const editUserService = (inputdata) => {
    console.log('check data', inputdata)
    return axios.put('/api/edit-user', inputdata)
}


const getAllcodeservice = (inputdata) => {
    return axios.get(`/api/allcode?type=${inputdata}`)
}




export {
    handleloginapi, getAllusers,
    createnewUserService, deleteUserService,
    editUserService, getAllcodeservice
}