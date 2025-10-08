import { axiosInstanace } from "../lib/axios";
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";

export const getAllPointUsersService = async (per_page, page, userId, signal) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/points?user_id=${userId}&per_page=${per_page}&page=${page}`, {
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


export const getPointUserService = async (userId, signal) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/points/${userId}`, {
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
