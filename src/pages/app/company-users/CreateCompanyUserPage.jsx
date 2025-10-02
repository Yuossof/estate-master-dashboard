import React, { useEffect, useRef, useState } from "react";
import Card from "../../../components/shared/ui/Card";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/shared/ui/Select";
import { toast } from "react-toastify";
import { getCompaniesService } from "../../../services/company";
import { createCompanyUserService } from "../../../services/company-users";
import CreateCompanyUserForm from "../../../components/company-users/CreateCompanyUserForm";

const defaultFormData = {
    name: "",
    email: "",
    password: "",
    role: ""
};

const CreateCompanyUserPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(defaultFormData);
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

    useEffect(() => {
        const getCompanies = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchCompanyLoading(true);
                const data = await getCompaniesService(7, companyPage, debouncedSearchKeySelect);
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

            try {
                formdata.append("name", formData.name);
                formdata.append("email", formData.email);
                formdata.append("password", formData.password);
                formdata.append("company_id", selectedCompany.id);
                formdata.append("role", formData.role);

                setErrors({});
            } catch (error) {
                console.log("Validation error:", error);

                if (error.inner) {
                    const newErrors = {};
                    error.inner.forEach((e) => {
                        newErrors[e.path] = e.message;
                    });
                    console.log("Parsed errors:", newErrors);
                    setErrors(newErrors);
                }
                return;
            }

            setIsLoading(true);
            const data = await createCompanyUserService(formdata);
            toast.success(data.message || data.massage);
            navigate("/company-users");
        } catch (error) {
            console.log("Error in handleSubmit:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Create Company User
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
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
                    </div>
                </div>

                <CreateCompanyUserForm
                    formData={formData}
                    setFormData={setFormData}
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