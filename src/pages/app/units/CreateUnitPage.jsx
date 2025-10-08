import React, { useState } from "react";

import Card from "../../../components/shared/ui/Card";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { createShopCategoryService } from "../../../services/shop-categories";
import CreateShopCategoryForm from "../../../components/shop-category/CreateShopCategoryForm";
import { useNavigate } from "react-router-dom";

const defaultUnitData = {
    project_id: "",
    name: "",
    price: "",
    area: "",
    rooms: "",
    bathrooms: ""
};

const CreateUnitPage = () => {
    const navigate = useNavigate()
    const [unitData, setUnitData] = useState(defaultUnitData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("project_id", unitData.name);
                formdata.append("name", unitData.name);
                formdata.append("price", unitData.price);
                formdata.append("area", unitData.area);
                formdata.append("rooms", unitData.rooms);
                formdata.append("bathrooms", unitData.bathrooms);



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
              <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Create Shop Category
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                        Add a new Shop category
                    </p>
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

export default CreateUnitPage;
