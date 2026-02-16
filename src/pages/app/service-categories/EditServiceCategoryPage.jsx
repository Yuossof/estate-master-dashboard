import React, { useEffect, useState } from "react";
import Card from "../../../components/shared/ui/Card";
import { updateServiceCategoryService } from "../../../services/service-categories";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import EditServiceCategoryForm from "../../../components/service-categories/EditServiceCategoryForm";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
const EditServiceCategoryPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const existingData = location.state.rowData;

    const [serviceCategoryData, setServiceCategoryData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setServiceCategoryData(existingData)
    }, [existingData])

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("name", serviceCategoryData.name);
                formdata.append("name_ar", serviceCategoryData.name_ar);


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
            const data = await updateServiceCategoryService(formdata, existingData.id);

            console.log("Response data:", data);
            toast.success(data.message || data.massage)
            if (data.status === "success") {
                navigate("/service-categories")
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
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Edit Service Category</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your service category</p>
                </div>

                <EditServiceCategoryForm
                    serviceCategories={serviceCategoryData}
                    setServiceCategories={setServiceCategoryData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default EditServiceCategoryPage;
