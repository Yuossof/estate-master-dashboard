import React, { useEffect, useRef, useState } from "react";
import Card from "../../../components/shared/ui/Card";
import { useNavigate } from "react-router-dom";
import { getCompaniesService } from "../../../services/company";
import { getOptionsService } from "../../../services/options";
import Select from "../../../components/shared/ui/Select";
import { toast } from "react-toastify";
import { createProjectService } from "../../../services/projects";
import CreateProjectForm from "../../../components/projects/CreateProjectForm";
import DateRangePicker from "../../../components/shared/ui/DateRangePicker"
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useAuthContext } from "../../../context/AuthProvider";
const defaultProjectData = {
    company_id: "",
    name: "",
    name_ar: "",
    address: "",
    whatsapp_number: "",
    phone_number: "",
    description: "",
    description_ar: "",
    unit_count: "",
    // starting_from: "",
    city_id: "",
    active: false,
    logo: null,
    media: []
};


const CreateProjectPage = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [projectData, setProjectData] = useState(defaultProjectData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Companies
    const [companyRows, setCompanyRows] = useState([]);
    const [hasMoreCompanies, setHasMoreCompanies] = useState(true);
    const [isFetchCompanyLoading, setIsFetchCompanyLoading] = useState(false);
    const [companyPage, setCompanyPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [searchKeySelect, setSearchKeySelect] = useState("");
    const [debouncedSearchKeySelect, setDebouncedSearchKeySelect] = useState("");
    const optionBoxRef = useRef(null);

    // Options
    const [optionsRows, setOptionsRows] = useState([]);
    const [optionsPage, setOptionsPage] = useState(1);
    const [optionsPagination, setOptionsPagination] = useState({});
    const [selectedOption, setSelectedOption] = useState({});
    const [isFetchOptionsLoading, setIsFetchOptionsLoading] = useState(false);
    const [searchKeyOptions, setSearchKeyOptions] = useState("");
    const [debouncedSearchKeyOptions, setDebouncedSearchKeyOptions] = useState("");
    const optionBoxRef2 = useRef(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // -------- Fetch Companies -------- //
    useEffect(() => {
        const getCompanies = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchCompanyLoading(true);
                const data = await getCompaniesService(10, companyPage, debouncedSearchKeySelect);
                const items = data.data.items || [];

                if (items.length === 0 || companyPage >= data.data.pagination.totalPages) {
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
                if (error instanceof ApiError) {
                    toast.error(error.errors)
                } else {
                    toast.error(DEFAULT_API_ERROR.errors)
                }
            } finally {
                setIsFetchCompanyLoading(false);
            }
        };

        getCompanies();
    }, [companyPage, debouncedSearchKeySelect]);

    // -------- Fetch Options --------
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

    // -------- Debounce Search (Companies) --------
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

    // -------- Debounce Search (Options) --------
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeyOptions(searchKeyOptions);
        }, 350);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKeyOptions]);

    useEffect(() => {
        setOptionsPage(1);
        setOptionsRows([]);
    }, [debouncedSearchKeyOptions, selectedCompany]);

    const loadMoreCompanies = () => {
        if (!hasMoreCompanies) return;
        setCompanyPage(prev => prev + 1);
    };

    const loadMoreOptions = () => {
        if (optionsPagination && optionsPage < optionsPagination.totalPages) {
            setOptionsPage(prev => prev + 1);
        }
    };

    const handleSubmit = async () => {
        console.log("------------------------------------------")
        console.log(selectedCompany)
        console.log("------------------------------------------")
        console.log(selectedOption)
        console.log("------------------------------------------")
        console.log(projectData)
        console.log("------------------------------------------")
        // return
        try {
            const formdata = new FormData();

            formdata.append("company_id", selectedCompany.id);
            formdata.append("name", projectData.name);
            formdata.append("name_ar", projectData.name_ar);
            formdata.append("address", projectData.address);
            formdata.append("whatsapp_number", projectData.whatsapp_number);
            formdata.append("phone_number", projectData.phone_number);
            formdata.append("description", projectData.description);
            formdata.append("description_ar", projectData.description_ar);
            // formdata.append("starting_from", projectData.starting_from);
            formdata.append("city_id", selectedOption.id);
            formdata.append("start_date", startDate);
            formdata.append("end_date", endDate);
            formdata.append("logo", projectData.logo);
            formdata.append("media", projectData.media);
            formdata.append("active", 1);

            if (!user || !user.id) {
                navigate("/login")
                return
            }

            formdata.append("created_by", user.id);

            setErrors({});

            setIsLoading(true);
            const data = await createProjectService(formdata);
            toast.success(data.message || data.massage);
            navigate("/projects")
        } catch (error) {
            if (error instanceof ApiError) {
                setErrors(error.errors)
                const firstObjectKey = Object.keys(error.errors)[0]
                toast.error(error.errors[firstObjectKey][0])
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create Project</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add a new project</p>
                </div>

                <div className="flex w-full md:items-center sm:items-end items-center mb-8 md:flex-row flex-col">
                    <div className="flex flex-col w-full gap-5">
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
                                {/* {errors.company_id && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{"Please select company"}</p>} */}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="clientName"
                                    className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Options
                                </label>
                                <Select
                                    searchKeySelect={searchKeyOptions}
                                    onInputChange={(val) => setSearchKeyOptions(val)}
                                    onChange={(val) => setSelectedOption(val)}
                                    onEndReached={loadMoreCompanies}
                                    options={optionsRows}
                                    value={selectedOption.name}
                                    isLoading={isFetchOptionsLoading}
                                    optionBoxRef={optionBoxRef2}
                                    noResultMessage={selectedCompany.id ? "No result" : "Select company first"}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-5">
                                <DateRangePicker
                                    onChange={(val) => setStartDate(val)}
                                    value={startDate}
                                    label="Start Date"
                                />
                                <DateRangePicker
                                    onChange={(val) => setEndDate(val)}
                                    value={endDate}
                                    label="End Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <CreateProjectForm
                    projectData={projectData}
                    setProjectData={setProjectData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    loadMoreOptions={loadMoreOptions}
                    isFetchOptionsLoading={isFetchOptionsLoading}
                />
            </Card>
        </div>
    );
};

export default CreateProjectPage;
