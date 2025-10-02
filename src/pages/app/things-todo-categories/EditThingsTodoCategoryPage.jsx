import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Card from "../../../components/shared/ui/Card";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useLocation, useNavigate } from "react-router-dom";
import EditThingsTodoCategoryForm from "../../../components/things-todo-categories/EditThingsTodoCategoryForm";
import { updateThingsTodoCategoriesService } from "../../../services/things-todo-categories";


const EditThingsTodoCategoryPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const existingData = location.state.rowData;

    const [thingsTodoCategoryData, setThingsTodoCategoryData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setThingsTodoCategoryData(existingData)
        console.log("ex", existingData)
    }, [existingData])

    const handleSubmit = async () => {
        console.log(thingsTodoCategoryData)
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("name", thingsTodoCategoryData.name);
                formdata.append("name_ar", thingsTodoCategoryData.name_ar);
                formdata.append("image", thingsTodoCategoryData.image);

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
            const data = await updateThingsTodoCategoriesService(formdata, thingsTodoCategoryData.id);
            toast.success(data.message || data.massage)
            if (data.status === "success") {
                navigate("/things-todo-categories")
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
                        Edit Things Todo Category
                    </h1>
                    {/* <p className="text-gray-600 text-sm dark:text-gray-400 mt-2">
                    </p> */}
                </div>

                <EditThingsTodoCategoryForm
                    thingsTodoCategoryData={thingsTodoCategoryData}
                    setThingsTodoCategoryData={setThingsTodoCategoryData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default EditThingsTodoCategoryPage;
