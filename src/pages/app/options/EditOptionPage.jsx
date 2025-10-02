import React, { useEffect, useState } from "react";
import Card from "../../../components/shared/ui/Card";
import { updateServiceCategoryService } from "../../../services/service-categories";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import EditOptionForm from "../../../components/options/EditOptionForm";
const EditOptionPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const existingData = location.state.rowData;

    const [options, setOptions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setOptions(existingData)
    }, [existingData])

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("item_key", options.item_key);
                formdata.append("item_value", options.item_value)

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
                navigate("/options")
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
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Edit Option
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                        Add a new option to your list
                    </p>
                </div>

                <EditOptionForm
                    options={options}
                    setOptions={setOptions}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>

        </div>
    );
};

export default EditOptionPage;
