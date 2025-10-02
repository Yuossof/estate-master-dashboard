import { axiosInstanace } from "../lib/axios"
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";


export const getUnitsService = async (per_page, page, srearchKey, company_id) => {
    // if(!company_id) return
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/company/units?q=${srearchKey}&per_page=${per_page}&page=${page}&company_id=${company_id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        handleApiError(error);
    }
};

export const deleteUnitService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token || !id) return;
        console.log(id)

        const response = await axiosInstanace.delete(`/api/dashboard/company/units/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.log(error)
        handleApiError(error);
    }
};
