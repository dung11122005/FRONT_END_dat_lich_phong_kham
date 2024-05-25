import axios from "../axios"

const handleloginapi = (useremail, userpassword) => {
    return axios.post('/api/login', { email: useremail, password: userpassword })
}


const getAllusers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
export { handleloginapi, getAllusers }