import axios from 'axios';
//setups up dotenv

const api = axios.create({
    baseURL: 'http://vos.wtf:6968',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;