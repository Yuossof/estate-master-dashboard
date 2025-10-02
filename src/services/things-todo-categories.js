
import { axiosInstanace } from "../lib/axios"
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";


export const createThingsTodoCategoriesService = async (formData) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post("/api/dashboard/things-to-do-categories", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.log(error)
        handleApiError(error);
    }
};


export const getThingsTodoCategoriesService = async (per_page, page, srearchKey) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/things-to-do-categories?q=${srearchKey}&per_page=${per_page}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateThingsTodoCategoriesService = async (formData,id) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post(`/api/dashboard/things-to-do-categories/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });

        console.log("update res",response.data)

        return response.data;
    } catch (error) {
        console.log(error)
        handleApiError(error);
    }
};


export const deleteThingsTodoCategoriesService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token || !id) return;

        const response = await axiosInstanace.delete(`/api/dashboard/things-to-do-categories/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        console.log("data", response.data)
        return response.data;
    } catch (error) {
        console.log("delete error:", error);
        handleApiError(error);
    }
};
