import axios from "axios";
let api_url = 'https://multi-vendor-eccomerce-backend-1.onrender.com';
const api = axios.create({
    baseURL: `${api_url}/api`,
    withCredentials:true
})

export default api