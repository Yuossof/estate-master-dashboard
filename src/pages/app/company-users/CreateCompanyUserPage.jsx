import React, { useEffect, useRef, useState } from "react";
import Card from "../../../components/shared/ui/Card";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/shared/ui/Select";
import { toast } from "react-toastify";
import { getCompaniesService } from "../../../services/company";
import { createCompanyUserService } from "../../../services/company-users";
import CreateCompanyUserForm from "../../../components/company-users/CreateCompanyUserForm";
import { getRolesService } from "../../../services/roles";

const defaultFormData = {
    name: "",
    email: "",
    password: "",
    role: ""
};

const CreateCompanyUserPage = () => {
    const navigate = useNavigate();
    const [companyUserRows, setCommpanyUsersRows] = useState(defaultFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [companyRows, setCompanyRows] = useState([]);
    const [hasMoreCompanies, setHasMoreCompanies] = useState(true);
    const [isFetchCompanyLoading, setIsFetchCompanyLoading] = useState(false);
    const [companyPage, setCompanyPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [searchKeySelect, setSearchKeySelect] = useState("");
    const [debouncedSearchKeySelect, setDebouncedSearchKeySelect] = useState("");
    const optionBoxRef = useRef(null);

    const [roleRows, setRoleRows] = useState([]);
    const [hasMoreRoles, setHasMoreRoles] = useState(true);
    const [isFetchRoleLoading, setIsFetchRoleLoading] = useState(false);
    const [rolePage, setRolePage] = useState(1);
    const [selectedRole, setSelectedRole] = useState({});
    const [searchKeyRoleSelect, setSearchKeyRoleSelect] = useState("");
    const [debouncedSearchKeyRoleSelect, setDebouncedSearchKeyRoleSelect] = useState("");

    useEffect(() => {
        const getCompanies = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchCompanyLoading(true);
                const data = await getCompaniesService(11, companyPage, debouncedSearchKeySelect);
                const items = data.data.items || [];

                if (items.length === 0) {
                    setHasMoreCompanies(false);
                }

                if (companyPage >= data.data.pagination.totalPages) {
                    setHasMoreCompanies(false);
                }

                setCompanyRows(prev => [
                    ...prev,
                    ...items.map(item => ({
                        id: item.id,
                        name: item.name
                    }))
                ]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetchCompanyLoading(false);
            }
        };

        getCompanies();
    }, [companyPage, debouncedSearchKeySelect]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeyRoleSelect(searchKeyRoleSelect);
        }, 350);

        return () => clearTimeout(handler);
    }, [searchKeyRoleSelect]);

    useEffect(() => {
        setRolePage(1);
        setRoleRows([]);
        setHasMoreRoles(true);
    }, [debouncedSearchKeyRoleSelect]);

    const loadMoreRoles = () => {
        if (!hasMoreRoles) return;
        setRolePage(prev => prev + 1);
    };

    useEffect(() => {
        const getRoles = async () => {
            if (!hasMoreRoles) return;
            try {
                setIsFetchRoleLoading(true);
                const data = await getRolesService(11, rolePage, debouncedSearchKeyRoleSelect);
                const items = data.data.items || [];

                if (items.length === 0 || rolePage >= data.data.pagination.totalPages) {
                    setHasMoreRoles(false);
                }

                setRoleRows(prev => [
                    ...prev,
                    ...items.map(item => ({
                        id: item.id,
                        name: item.name,
                    }))
                ]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetchRoleLoading(false);
            }
        };

        getRoles();
    }, [rolePage, debouncedSearchKeyRoleSelect]);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeySelect(searchKeySelect);
        }, 350);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKeySelect]);

    useEffect(() => {
        setCompanyPage(1);
        setCompanyRows([]);
        setHasMoreCompanies(true);
    }, [debouncedSearchKeySelect]);

    const loadMoreCompanies = () => {
        if (!hasMoreCompanies) return;
        setCompanyPage(prev => prev + 1);
    };

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();
            formdata.append("name", companyUserRows.name);
            formdata.append("email", companyUserRows.email);
            formdata.append("password", companyUserRows.password);
            formdata.append("company_id", selectedCompany.id);
            formdata.append("role", selectedRole.name);
            setErrors({});

            setIsLoading(true);
            const data = await createCompanyUserService(formdata);
            toast.success(data.message || data.massage);
            navigate("/company-users");
        } catch (error) {
            setErrors(error.errors)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="md:text-2xl text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Create Company User
                    </h1>
                    <p className="md:text-base text-[14px] text-gray-500 dark:text-gray-400 mt-1">
                        Add a new company user
                    </p>
                </div>

                <div className="flex w-full md:items-center sm:items-end items-center mb-8 md:flex-row flex-col">
                    <div className="flex items-center gap-2 flex-1 md:flex-row flex-col md:w-auto w-full">
                        <div className="w-full">
                            <label
                                htmlFor="clientName"
                                className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Company
                            </label>
                            <Select
                                searchKeySelect={searchKeySelect}
                                onInputChange={(val) => setSearchKeySelect(val)}
                                onChange={(val) => setSelectedCompany(val)}
                                onEndReached={loadMoreCompanies}
                                options={companyRows}
                                value={selectedCompany.name}
                                isLoading={isFetchCompanyLoading}
                                optionBoxRef={optionBoxRef}
                                noResultMessage={"No result"}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="clientName"
                                className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Role
                            </label>
                            <Select
                                searchKeySelect={searchKeyRoleSelect}
                                onInputChange={(val) => setSearchKeyRoleSelect(val)}
                                onChange={(val) => setSelectedRole(val)}
                                onEndReached={loadMoreRoles}
                                options={roleRows}
                                value={selectedRole.name}
                                isLoading={isFetchRoleLoading}
                                optionBoxRef={optionBoxRef}
                                noResultMessage={"No result"}
                            />

                        </div>
                    </div>
                </div>

                <CreateCompanyUserForm
                    formData={companyUserRows}
                    setFormData={setCommpanyUsersRows}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default CreateCompanyUserPage;