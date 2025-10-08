import React, { useState } from "react";

import Card from "../../../components/shared/ui/Card";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useNavigate } from "react-router-dom";
import { createRoleService } from "../../../services/roles";
import CreateRoleForm from "../../../components/roles/CreateRoleForm";

const defaultRoleData = {
    name: "",
    guard_name: "",
};

const CreateRolePage = () => {
    const navigate = useNavigate()
    const [roleData, setRoleData] = useState(defaultRoleData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("name", roleData.name);
                formdata.append("name_ar", roleData.name_ar);


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
            const data = await createRoleService(formdata);
            if (data.status === "success") {
                navigate("/roles")
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
                        Create Role
                    </h1>
                    <p className="md:text-base text-[14px] text-gray-500 dark:text-gray-400 mt-1">
                        Add a new role
                    </p>
                </div>

                <CreateRoleForm
                    roleData={roleData}
                    setRoleData={setRoleData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default CreateRolePage;
