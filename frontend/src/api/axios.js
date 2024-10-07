import axios from 'axios'

export default axios.create({
    baseURL: 'https://zti-fm-backend.onrender.com/api/v1/'
})