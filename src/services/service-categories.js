import { axiosInstanace } from "../lib/axios"
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";


export const createServiceCategoryService = async (formData) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post("/api/dashboard/service-categories", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        console.log("sc",response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        handleApiError(error);
    }
};

export const getServiceCategoriesService = async (per_page, page, srearchKey) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/service-categories?q=${srearchKey}&per_page=${per_page}&page=${page}`, {
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

export const getServiceCategoryService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/service-categories/${id}`, {
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

export const updateServiceCategoryService = async (formData, id) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post(`/api/dashboard/service-categories/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        console.log("sc",response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        handleApiError(error);
    }
};

export const deleteServiceCategoryService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.delete(`/api/dashboard/service-categories/${id}`, {
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