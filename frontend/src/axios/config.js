import axios from "axios"

const partyFetch = axios.create({
    baseURL: "https://party-time-me4n.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default partyFetch;
