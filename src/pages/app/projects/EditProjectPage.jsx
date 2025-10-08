import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Card from "../../../components/shared/ui/Card";
import Select from "../../../components/shared/ui/Select";
import EditProjectForm from "../../../components/projects/EditProjectForm";
import DateRangePicker from "../../../components/shared/ui/DateRangePicker"

import { getCompaniesService } from "../../../services/company";
import { updateProjectService } from "../../../services/projects";

import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { getOptionsService } from "../../../services/options";

const EditProjectPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const existingData = location.state?.rowData || {};

    // ===== Project State =====
    const [project, setProject] = useState(existingData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // ===== Companies State =====
    const [companyRows, setCompanyRows] = useState([]);
    const [companyPage, setCompanyPage] = useState(1);
    const [hasMoreCompanies, setHasMoreCompanies] = useState(true);
    const [isFetchCompanyLoading, setIsFetchCompanyLoading] = useState(false);
    const [searchKeySelect, setSearchKeySelect] = useState("");
    const [debouncedSearchKeySelect, setDebouncedSearchKeySelect] = useState("");
    const [selectedCompany, setSelectedCompany] = useState({
        name: existingData.name,
        id: existingData.company_id
    })
    const optionBoxRef = useRef(null);

    // ===== Options State =====
    const [optionsRows, setOptionsRows] = useState([]);
    const [optionsPage, setOptionsPage] = useState(1);
    const [optionsPagination, setOptionsPagination] = useState({});
    const [isFetchOptionsLoading, setIsFetchOptionsLoading] = useState(false);
    const [searchKeyOptions, setSearchKeyOptions] = useState("");
    const [debouncedSearchKeyOptions, setDebouncedSearchKeyOptions] = useState("");
    const [selectedOption, setSelectedOption] = useState({
        id: existingData.city_id
    });
    const optionBoxRef2 = useRef(null);

    // ===== Debounce Search =====
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeySelect(searchKeySelect);
        }, 350);
        return () => clearTimeout(handler);
    }, [searchKeySelect]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeyOptions(searchKeyOptions);
        }, 350);
        return () => clearTimeout(handler);
    }, [searchKeyOptions]);

    // ===== Fetch Companies =====
    useEffect(() => {
        const fetchCompanies = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchCompanyLoading(true);
                const data = await getCompaniesService(
                    7,
                    companyPage,
                    debouncedSearchKeySelect
                );
                const items = data.data.items || [];

                if (items.length === 0 || companyPage >= data.data.pagination.totalPages) {
                    setHasMoreCompanies(false);
                }

                setCompanyRows((prev) => [
                    ...prev,
                    ...items.map((item) => ({ id: item.id, name: item.name })),
                ]);
            } catch (error) {
                toast.error(
                    error instanceof ApiError ? error.errors : DEFAULT_API_ERROR.errors
                );
            } finally {
                setIsFetchCompanyLoading(false);
            }
        };

        fetchCompanies();
    }, [companyPage, debouncedSearchKeySelect]);
    
    useEffect(() => {
        const getOptions = async () => {
            try {
                setIsFetchOptionsLoading(true);
                const data = await getOptionsService(
                    11,
                    optionsPage,
                    selectedCompany.id,
                    "", // item key
                    debouncedSearchKeyOptions
                );

                const items = data.data.items || [];
                setOptionsRows(prev =>
                    optionsPage === 1
                        ? items.map(item => ({
                            id: item.id,
                            name: item.item_value,
                        }))
                        : [
                            ...prev,
                            ...items.map(item => ({
                                id: item.id,
                                name: item.item_value,
                            })),
                        ]
                );
                setOptionsPagination(data.data.pagination || {});
                console.log("options", data)
            } catch (error) {
                if (error instanceof ApiError) {
                    toast.error(error.errors)
                } else {
                    toast.error(DEFAULT_API_ERROR.errors)
                }
            } finally {
                setIsFetchOptionsLoading(false);
            }
        };

        if (selectedCompany.id) {
            getOptions();
        }
    }, [optionsPage, debouncedSearchKeyOptions, selectedCompany]);
    // Reset companies on search
    useEffect(() => {
        setCompanyPage(1);
        setCompanyRows([]);
        setHasMoreCompanies(true);
    }, [debouncedSearchKeySelect]);

    // Reset options when company/search changes
    useEffect(() => {
        setOptionsPage(1);
        setOptionsRows([]);
    }, [debouncedSearchKeyOptions, project.company_id]);

    // ===== Load More =====
    const loadMoreCompanies = () => {
        if (hasMoreCompanies) setCompanyPage((prev) => prev + 1);
    };

    const loadMoreOptions = () => {
        if (optionsPagination && optionsPage < optionsPagination.totalPages) {
            setOptionsPage((prev) => prev + 1);
        }
    };

    // ===== Submit =====
    const handleSubmit = async () => {
        console.log("pr",project)
        console.log("company",selectedCompany)
        console.log(existingData, "ex")
        
        try {
            const formdata = new FormData();

            formdata.append("company_id",   project.id || "");
            formdata.append("name", project.name || "");
            formdata.append("name_ar", project.name_ar || "");
            formdata.append("address", project.address || "");
            formdata.append("whatsapp_number", project.whatsapp_number || "");
            formdata.append("phone_number", project.phone_number || "");
            formdata.append("description", project.description || "");
            formdata.append("description_ar", project.description_ar || "");
            formdata.append("city_id", project.city_id || "");
            formdata.append("start_date", project.start_date || "");
            formdata.append("end_date", project.end_date || "");
            formdata.append("active", project.active ? 1 : 0);
            formdata.append("logo", project.logo);
            formdata.append("media", project.media);
            setErrors({});
            setIsLoading(true);

            const data = await updateProjectService(formdata, existingData.id);

            toast.success(data.message || data.massage);
            if (data.status === "success") {
                navigate("/options");
            }
        } catch (error) {
            setErrors(error instanceof ApiError ? error.errors : DEFAULT_API_ERROR.errors);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                {/* Page Header */}
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="md:text-2xl text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Edit Project
                    </h1>
                    <p className="md:text-base text-[14px] text-gray-500 dark:text-gray-400 mt-1">
                        Update your project details
                    </p>
                </div>

                {/* Company & Options */}
                <div className="flex w-full md:items-center sm:items-end items-center mb-3 md:flex-row flex-col">
                    <div className="flex flex-col w-full gap-3  ">
                        <div className="w-full">
                            <label className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                Company
                            </label>
                            <Select
                                searchKeySelect={searchKeySelect}
                                onInputChange={setSearchKeySelect}
                                onChange={(val) => {
                                    setSelectedCompany(val)
                                    setErrors(prev => ({ ...prev, company_id: "" }))
                                }}
                                onEndReached={loadMoreCompanies}
                                options={companyRows}
                                value={selectedCompany?.name || ""}
                                isLoading={isFetchCompanyLoading}
                                optionBoxRef={optionBoxRef}
                                noResultMessage="No result" 
                            />
                            <div className="h-5">
                                {errors.company_id && (
                                    <p className="text-[13px] mt-1.5 text-red-500 ml-1">
                                        *{errors.company_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                Options
                            </label>
                            <Select
                                searchKeySelect={searchKeyOptions}
                                onInputChange={setSearchKeyOptions}
                                onChange={(val) => {
                                    setErrors(prev => ({ ...prev, option_id: "" }))
                                    setSelectedOption(val)
                                }}
                                onEndReached={loadMoreOptions}
                                options={optionsRows}
                                value={selectedOption?.name || ""}
                                isLoading={isFetchOptionsLoading}
                                optionBoxRef={optionBoxRef2}
                                noResultMessage={
                                    project.company_id ? "No result" : "Select company first"
                                }
                            />
                            <div className="h-5">
                                {errors.option_id && (
                                    <p className="text-[13px] text-red-500 ml-1">
                                        *{errors.option_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-5">
                                <DateRangePicker
                                    onChange={(val) =>
                                        setProject((prev) => ({ ...prev, start_date: val }))
                                    }
                                    value={project.start_date || null}
                                    label="Start Date"
                                />
                                <DateRangePicker
                                    onChange={(val) =>
                                        setProject((prev) => ({ ...prev, end_date: val }))
                                    }
                                    value={project.end_date || null}
                                    label="End Date"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Form */}
                <EditProjectForm
                    project={project}
                    setProject={setProject}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>
        </div>
    );
};

export default EditProjectPage;
