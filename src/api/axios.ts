import axios from 'axios';
//setups up dotenv
import dotenv from 'dotenv';
dotenv.config();

const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST || 'http://localhost:4422',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;