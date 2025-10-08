import { axiosInstanace } from "../lib/axios"
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";


export const createContractService = async (formData) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post("/api/dashboard/company/contracts", formData, {
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

export const getContractsService = async (per_page, page, srearchKey, company_id, signal) => {
    if (!company_id) return
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/company/contracts?q=${srearchKey}&per_page=${per_page}&page=${page}&company_id=${company_id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            signal
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};


export const deleteContractService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token || !id) return;
        const response = await axiosInstanace.delete(`/api/dashboard/company/contracts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
