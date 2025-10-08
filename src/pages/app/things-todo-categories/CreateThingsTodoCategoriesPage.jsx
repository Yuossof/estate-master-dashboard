import React, { useState } from "react";

import Card from "../../../components/shared/ui/Card";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useNavigate } from "react-router-dom";
import CreateThingsTodoCategoriesForm from "../../../components/things-todo-categories/CreateThingsTodoCategoriesForm";
import { createThingsTodoCategoriesService } from "../../../services/things-todo-categories";

const defaultThingsTodoCategoryData = {
    name: "",
    name_ar: "",
    image: null
};

const CreateThingsTodoCategoriesPage = () => {
    const navigate = useNavigate()
    const [thingsTodoCategoriesData, setThingsTodoCategoriesData] = useState(defaultThingsTodoCategoryData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("name", thingsTodoCategoriesData.name);
                formdata.append("name_ar", thingsTodoCategoriesData.name_ar);
                formdata.append("image", thingsTodoCategoriesData.image);

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
            const data = await createThingsTodoCategoriesService(formdata);
            if (data.status === "success") {
                navigate("/things-todo-categories")
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
                    <h1 className="md:text-2xl text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Create Things Todo Category
                    </h1>
                    <p className="md:text-base text-[14px] text-gray-500 dark:text-gray-400 mt-1">
                        Add a new things todo category
                    </p>
                </div>

                <CreateThingsTodoCategoriesForm
                    thingsTodoCategoryData={thingsTodoCategoriesData}
                    setThingsTodoCategoryData={setThingsTodoCategoriesData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default CreateThingsTodoCategoriesPage;
