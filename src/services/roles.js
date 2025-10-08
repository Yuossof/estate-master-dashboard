import { axiosInstanace } from "../lib/axios"
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";

export const createRoleService = async (formData) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post("/api/dashboard/roles", formData, {
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


export const getRolesService = async (per_page, page, srearchKey) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/roles?q=${srearchKey}&per_page=${per_page}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const deleteRoleService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token || !id) return;
        const response = await axiosInstanace.delete(`/api/dashboard/roles/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
