import axios from 'axios';
//setups up dotenv

const api = axios.create({
    baseURL: 'https://api.fontier.pro/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;