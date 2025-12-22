import axios from "axios"

const partyFetch = axios.create({
    baseURL: "https://party-time-me4n.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

partyFetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);


export default partyFetch;
