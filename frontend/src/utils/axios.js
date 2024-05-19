import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/auth";

const BASE_URL = "https://authentication-app-o689.onrender.com/";


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
        common: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        },

    withCredentials: true
})