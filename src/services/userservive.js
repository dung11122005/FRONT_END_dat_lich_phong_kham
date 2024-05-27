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
export { handleloginapi, getAllusers, createnewUserService }