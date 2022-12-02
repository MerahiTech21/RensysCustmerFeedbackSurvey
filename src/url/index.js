import axios from "axios";
let apiClient = axios.create({
    baseURL: 'http://192.1.56.1:5000/',
    headers: {

         Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tokenc')}`,


    }
})

export default apiClient  