import React, { useState } from "react";
import Card from "../../../components/shared/ui/Card";
import CreateServiceCategoryForm from "../../../components/service-categories/CreateServiceCategoryForm";
import { createServiceCategoryService } from "../../../services/service-categories";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useNavigate } from "react-router-dom";

const defaultServiceCategoryData = {
    name: "",
    name_ar: "",
};

const CreateServiceCategoryPage = () => {
    const navigate = useNavigate()
    const [serviceCategoryData, setServiceCategoryData] = useState(defaultServiceCategoryData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});


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
            const data = await createServiceCategoryService(formdata);
            console.log(data.status)
            if(data.status === "success") {
                navigate("/service-categories")
            }
        } catch (error) {
            if(error instanceof ApiError) {
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
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create Service Category</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add a new service category</p>
                </div>

                <CreateServiceCategoryForm
                    serviceCategory={serviceCategoryData}
                    setServiceCategory={setServiceCategoryData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default CreateServiceCategoryPage;
