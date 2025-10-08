import { axiosInstanace } from "../lib/axios";
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";

export const getUsersService = async (per_page, page, srearchKey, signal) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/users?q=${srearchKey}&per_page=${per_page}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            signal
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};


export const getUserService = async (userId, signal) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/users/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            signal
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};


