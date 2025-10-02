import { axiosInstanace } from "../lib/axios"
import { handleApiError } from "../lib/error";
import { getCookieVal } from "../lib/token";

export const createShopCategoryService = async (formData) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post("/api/dashboard/shop-categories", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        console.log("shopc", response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        handleApiError(error);
    }
};  


export const updateShopCategoryService = async (formData, id) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.post(`/api/dashboard/shop-categories/${id}`, formData, {
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

export const getShopCategoriesService = async (per_page, page, srearchKey) => {
    try {
        const token = getCookieVal("token");
        if (!token) return;

        const response = await axiosInstanace.get(`/api/dashboard/shop-categories?q=${srearchKey}&per_page=${per_page}&page=${page}`, {
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

export const deleteShopCategoryService = async (id) => {
    try {
        const token = getCookieVal("token");
        if (!token || !id) return;

        const response = await axiosInstanace.delete(`/api/dashboard/shop-categories/${id}`, {
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
