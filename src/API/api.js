import axios from 'axios';

const api = axios.create({
    baseURL : 'https://671a556aacf9aa94f6aa3b8c.mockapi.io/API',
});

export default api;