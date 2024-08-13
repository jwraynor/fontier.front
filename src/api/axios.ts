import axios from 'axios';
//setups up dotenv

const api = axios.create({
    //baseURL: 'http://localhost:6968/api',
    baseURL: 'https://api.fontier.pro/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
