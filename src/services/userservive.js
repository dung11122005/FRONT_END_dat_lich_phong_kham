import axios from "../axios"

const handleloginapi = (useremail, userpassword) => {
    return axios.post('/api/login', { email: useremail, password: userpassword })
}

export { handleloginapi }