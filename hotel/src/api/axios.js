import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.9:8000', // Replace with your machine's IP address
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;