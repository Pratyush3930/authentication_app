import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/auth";

const BASE_URL = "https://authentication-app-o689.onrender.com/api/auth";


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
        common: {
            'Access-Control-Allow-Origin': 'https://664a25498c65b1d1ba4cda78--fluffy-sorbet-25d20f.netlify.app/',
        },

    withCredentials: true
})