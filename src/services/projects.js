import { axiosInstanace } from "../lib/axios"
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";


export const createProjectService = async (formData) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post("/api/dashboard/company/projects", formData, {
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

export const getProjectsService = async (per_page, page, srearchKey, company_id) => {
    if(!company_id) return
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/company/projects?q=${srearchKey}&per_page=${per_page}&page=${page}&company_id=${company_id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateProjectService = async (formData, id) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post(`/api/dashboard/company/projects/${id}`, formData, {
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

export const deleteProjectService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token || !id) return;
        const response = await axiosInstanace.delete(`/api/dashboard/company/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
