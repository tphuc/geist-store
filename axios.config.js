import axios from 'axios'

const defaultURL = 'http://localhost:5000' 

const instance = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'https://geist-node.vercel.app/' : defaultURL,
    timeout: 10000,
});


export {
    instance as axiosInstance
}