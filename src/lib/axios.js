import axios from "axios";

export const axiosInstanace = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
