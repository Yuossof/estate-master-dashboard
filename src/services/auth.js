import { axiosInstanace } from "../lib/axios"
import {  handleApiError } from "../lib/error"


export const loginService = async (formData) => {
    try {
        const response = await axiosInstanace.post("/api/dashboard/auth/login", formData, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);

    }
};

export const meService = async (token) => {
    try {
        const response = await axiosInstanace.get("/api/auth/info", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        handleApiError(error);
    }
}

