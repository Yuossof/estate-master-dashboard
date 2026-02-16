import React, { useState } from "react";

import Card from "../../../components/shared/ui/Card";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { createShopCategoryService } from "../../../services/shop-categories";
import CreateShopCategoryForm from "../../../components/shop-category/CreateShopCategoryForm";
import { useNavigate } from "react-router-dom";

const defaultShopCategoryData = {
    name: "",
    name_ar: "",
};

const CreateShopCategoryPage = () => {
    const navigate = useNavigate()
    const [shopCategoryData, setShopCategoryData] = useState(defaultShopCategoryData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});


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
            const data = await createShopCategoryService(formdata);
            if(data.status === "success") {
                navigate("/shop-categories")
            }
            console.log("Response data:", data);
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
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create Shop Category</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add a new shop category</p>
                </div>

                <CreateShopCategoryForm
                    shopCategoryData={shopCategoryData}
                    setShopCategoryData={setShopCategoryData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default CreateShopCategoryPage;
