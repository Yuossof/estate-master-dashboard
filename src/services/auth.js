import { isAxiosError } from "axios"
import { axiosInstanace } from "../lib/axios"
import { DEFAULT_API_ERROR } from "../lib/error"
import { ApiError } from "../lib/error"

export const loginService = async (formData) => {
    try {
        const response = await axiosInstanace.post("/api/dashboard/auth/login", formData, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {        
        let apiErr = { ...DEFAULT_API_ERROR };

        if (isAxiosError(error)) {
            const status = error.response?.status;
            const err = error.response?.data;

            if (err?.errors || err?.error && Object.keys(err.errors || err.error).length > 0) {
                apiErr.errors = err.errors;
                apiErr.status = status;
            } else {
                apiErr.errors = err?.message || DEFAULT_API_ERROR.errors;
                apiErr.status = status;
            }
        }

        throw new ApiError(apiErr.errors, apiErr.status);
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
        let apiErr = { ...DEFAULT_API_ERROR };

        if (isAxiosError(error)) {
            const status = error.response?.status;
            const err = error.response?.data;

            if (err?.errors || err?.error && Object.keys(err.errors || err.error).length > 0) {
                apiErr.errors = err.errors;
                apiErr.status = status;
            } else {
                apiErr.errors = err?.message || DEFAULT_API_ERROR.errors;
                apiErr.status = status;
            }
        }

        throw new ApiError(apiErr.errors, apiErr.status);
    }
}

