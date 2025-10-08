import { axiosInstanace } from "../lib/axios"
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";


// ----------------- Services -----------------

export const createCompanyService = async (formData) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post("/api/dashboard/companies", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateCompanyService = async (id, formData) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.put(`/api/dashboard/companies/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });

        console.log("update res",response.data)

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getCompaniesService = async (per_page, page, srearchKey, signal) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/companies?q=${srearchKey}&per_page=${per_page}&page=${page}`, {
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

export const toggleActiveCompanyService = async (id, formData) => {
    try {
        const token = getCookieVal("token");
        if (!token || !id) return;
        const response = await axiosInstanace.patch(`/api/dashboard/companies/${id}/active`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteCompanyService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token || !id) return;

        const response = await axiosInstanace.delete(`/api/dashboard/companies/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
