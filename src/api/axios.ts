import axios from 'axios';
//setups up dotenv

const api = axios.create({
    baseURL: 'http://127.0.0.1:6968',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;