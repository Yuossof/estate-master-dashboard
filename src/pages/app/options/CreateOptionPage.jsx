import React, { useEffect, useRef, useState } from "react";
import Card from "../../../components/shared/ui/Card";
import { useNavigate } from "react-router-dom";
import CreateOptionForm from "../../../components/options/CreateOptionForm";
import { createOptionService, getKeysService } from "../../../services/options";
import { getCompaniesService } from "../../../services/company";
import Select from "../../../components/shared/ui/Select";
import { toast } from "react-toastify";

const defaultOptionData = {
    item_key: "",
    item_value: "",
    item_value_ar: "",
};


const CreateOptionPage = () => {
    const navigate = useNavigate()
    const [optionData, setOptionData] = useState(defaultOptionData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [companyRows, setCompanyRows] = useState([]);
    const [hasMoreCompanies, setHasMoreCompanies] = useState(true);
    const [isFetchCompanyLoading, setIsFetchCompanyLoading] = useState(false)
    const [companyPage, setCompanyPage] = useState(1)
    const [selectedCompany, setSelectedCompany] = useState({})
    const [searchKeySelect, setSearchKeySelect] = useState("");
    const [debouncedSearchKeySelect, setDebouncedSearchKeySelect] = useState("");

    const [keys, setKeys] = useState([])
    const [selectedKey, setSelectedKey] = useState(null)
    const optionBoxRef = useRef(null)



    useEffect(() => {
        const getCompanies = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchCompanyLoading(true)
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
                setIsFetchCompanyLoading(false)
            }
        };

        getCompanies();
    }, [companyPage, debouncedSearchKeySelect]);

    useEffect(() => {
        const getKeys = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchCompanyLoading(true)
                const data = await getKeysService();
                const items = data.data.keys || [];
                setKeys(prev => [
                    ...prev,
                    ...items.map(item => ({
                        id: item,
                        name: item
                    }))
                ]);
            } catch (error) {
                console.log(error);
            }
        };

        getKeys();
    }, []);

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
        if (!hasMoreCompanies) return
        setCompanyPage(prev => prev + 1);
    };


    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            try {
                // await companySchema.validate(optionData, { abortEarly: false });

                formdata.append("company_id", selectedCompany.id);
                formdata.append("item_key", selectedKey.name);
                formdata.append("item_value", optionData.name);
                formdata.append("item_value_ar", optionData.name_ar);

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
            const data = await createOptionService(formdata);
            toast.success(data.message || data.massage)
            navigate("/options")
        } catch (error) {
            console.log("Error in handleSubmit:", error);

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="space-y-6">

            {/* Page Header */}

            <Card>
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create Option</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add a new option</p>
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
                                Key
                            </label>
                            <Select
                                // searchKeySelect={selectedKey}
                                // onInputChange={(val) => setSearchKeySelect(val)}
                                onChange={(val) => setSelectedKey(val)}
                                // onEndReached={loadMoreCompanies}
                                options={keys}
                                value={selectedKey?.name}
                                isLoading={isFetchCompanyLoading}
                                optionBoxRef={optionBoxRef}
                                noResultMessage={"No result"}
                            />
                        </div>
                    </div>
                </div>

                <CreateOptionForm
                    optionData={optionData}
                    setOptionData={setOptionData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Card>

        </div>
    );
};

export default CreateOptionPage;
