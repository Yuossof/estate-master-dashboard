import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Card from "../../../components/shared/ui/Card";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useLocation, useNavigate } from "react-router-dom";
import EditShopCategoryForm from "../../../components/shop-category/EditShopCategoryForm";
import { updateShopCategoryService } from "../../../services/shop-categories";


const EditShopCategoriesPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const existingData = location.state.rowData;

    const [shopCategoryData, setShopCategoryData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setShopCategoryData(existingData)
        console.log("ex", existingData)
    }, [existingData])

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("name", shopCategoryData.name);
                formdata.append("name_ar", shopCategoryData.name_ar);


                setErrors({});
            } catch (error) {

                if (error.inner) {
                    const newErrors = {};
                    error.inner.forEach((e) => {
                        newErrors[e.path] = e.message;
                    });
                    setErrors(newErrors);
                }
                return;
            }

            setIsLoading(true);
            const data = await updateShopCategoryService(formdata, existingData.id);
            toast.success(data.message || data.massage)
            if(data.status === "success") {
                navigate("/shop-categories")
            }
        } catch (error) {
            if (error instanceof ApiError) {
                setErrors(error.errors)
            } else {
                setErrors(DEFAULT_API_ERROR.errors)
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            {/* Page Header */}

            <Card>
                <div className="mb-8 mt-2">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Create Service Category
                    </h1>
                    <p className="text-gray-600 text-sm dark:text-gray-400 mt-2">
                        Add a new CIL
                    </p>
                </div>

                <EditShopCategoryForm
                    shopCategory={shopCategoryData}
                    setShopCategory={setShopCategoryData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default EditShopCategoriesPage;
