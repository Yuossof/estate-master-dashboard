import React, { useState } from "react";
import { toast } from "react-toastify";

import Card from "../../../components/shared/ui/Card";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useLocation, useNavigate } from "react-router-dom";
import EditUserRoleForm from "../../../components/users/EditUserRoleForm";
import { updateUserRole } from "../../../services/users";

const EditUsersRolePage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const existingData = location.state.rowData;

    const [selectedRole, setSelectedRole] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        console.log(selectedRole, "selected role")
        console.log(existingData, "EXITST")
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(companyData, { abortEarly: false });

                formdata.append("role", selectedRole.role);

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
            const data = await updateUserRole(formdata, existingData.user_id);
            toast.success(data.message || data.massage)
            if (data.status === "success") {
                navigate("/users")
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
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Edit Company Accounts</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your company accounts</p>
                </div>

                <EditUserRoleForm
                    existingData={existingData}
                    setSelectedRole={setSelectedRole}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default EditUsersRolePage;
