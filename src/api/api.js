import axios from "axios";
let api_url = 'https://backend-multi-vendor-ecommerce-xa4b.onrender.com';
const api = axios.create({
    baseURL: `${api_url}/api`,
    withCredentials:true
})

export default api