import React, { useEffect, useRef, useState } from "react";
import Card from "../../../components/shared/ui/Card";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/shared/ui/Select";
import { toast } from "react-toastify";
import { createContractService } from "../../../services/contracts";
import CreateContractForm from "../../../components/contracts/CreateContractForm";
import DateRangePicker from "../../../components/shared/ui/DateRangePicker";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import { useAuthContext } from "../../../context/AuthProvider";
import { getCompanyUsersService } from "../../../services/company-users";
import { getUnitsService } from "../../../services/units";
import { getCompaniesService } from "../../../services/company";

const defaultContractData = {
    unit_id: "",
    account_id: "",
    contract_number: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    amount: "",
    status: "",
    terms_conditions: "",
    active: false
};

const CreateContractPage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [contractData, setContractData] = useState(defaultContractData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [companyRows, setCompanyRows] = useState([]);
    const [hasMoreCompanies, setHasMoreCompanies] = useState(true);
    const [isFetchCompanyLoading, setIsFetchCompanyLoading] = useState(false);
    const [companyPage, setCompanyPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [searchKeyCompany, setSearchKeyCompany] = useState("");
    const [debouncedSearchKeyCompany, setDebouncedSearchKeyCompany] = useState("");
    const companyBoxRef = useRef(null);

    const [unitRows, setUnitRows] = useState([]);
    const [hasMoreUnits, setHasMoreUnits] = useState(true);
    const [isFetchUnitLoading, setIsFetchUnitLoading] = useState(false);
    const [unitPage, setUnitPage] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState({});
    const [searchKeyUnit, setSearchKeyUnit] = useState("");
    const [debouncedSearchKeyUnit, setDebouncedSearchKeyUnit] = useState("");
    const unitBoxRef = useRef(null);

    const [accountRows, setAccountRows] = useState([]);
    const [accountPage, setAccountPage] = useState(1);
    const [accountPagination, setAccountPagination] = useState({});
    const [selectedAccount, setSelectedAccount] = useState({});
    const [isFetchAccountLoading, setIsFetchAccountLoading] = useState(false);
    const [searchKeyAccount, setSearchKeyAccount] = useState("");
    const [debouncedSearchKeyAccount, setDebouncedSearchKeyAccount] = useState("");
    const accountBoxRef = useRef(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const abort = new AbortController();
        const getCompanies = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchCompanyLoading(true);
                const data = await getCompaniesService(10, companyPage, debouncedSearchKeyCompany, abort.signal);
                const items = data?.data?.items || [];

                if (items.length === 0 || companyPage >= (data?.data?.pagination?.totalPages || 0)) {
                    setHasMoreCompanies(false);
                }

                setCompanyRows(prev => [
                    ...prev,
                    ...items
                        .filter(item => item && item.id)
                        .map(item => ({
                            id: item.id,
                            name: item.name || `Company ${item.id}`
                        }))
                ]);
            } catch (error) {
                if (error instanceof ApiError) {
                    toast.error(error.errors);
                } else {
                    toast.error(DEFAULT_API_ERROR.errors);
                }
            } finally {
                setIsFetchCompanyLoading(false);
            }
        };

        getCompanies();

        return () => abort.abort();
    }, [companyPage, debouncedSearchKeyCompany]);

    useEffect(() => {
        const getUnits = async () => {
            if (!hasMoreUnits || !selectedCompany?.id) return;
            try {
                setIsFetchUnitLoading(true);
                const data = await getUnitsService(10, unitPage, debouncedSearchKeyUnit, selectedCompany.id);
                const items = data?.data?.items || [];

                if (items.length === 0 || unitPage >= (data?.data?.pagination?.totalPages || 0)) {
                    setHasMoreUnits(false);
                }

                setUnitRows(prev => [
                    ...prev,
                    ...items
                        .filter(item => item && item.id)
                        .map(item => ({
                            id: item.id,
                            name: item.name || `Unit ${item.id}`
                        }))
                ]);
            } catch (error) {
                if (error instanceof ApiError) {
                    toast.error(error.errors);
                } else {
                    toast.error(DEFAULT_API_ERROR.errors);
                }
            } finally {
                setIsFetchUnitLoading(false);
            }
        };

        if (selectedCompany?.id) {
            getUnits();
        }
    }, [unitPage, debouncedSearchKeyUnit, selectedCompany]);

    useEffect(() => {
        const getAccounts = async () => {
            try {
                setIsFetchAccountLoading(true);
                const data = await getCompanyUsersService(
                    10,
                    accountPage,
                    debouncedSearchKeyAccount,
                    ""
                );
                const items = data?.data?.items || [];
                
                setAccountRows(prev =>
                    accountPage === 1
                        ? items
                            .filter(item => item && item.id)
                            .map(item => ({
                                id: item.id,
                                name: item?.user?.email || 
                                      item?.company?.name || 
                                      item?.name || 
                                      `User ${item.id}`
                            }))
                        : [
                            ...prev,
                            ...items
                                .filter(item => item && item.id)
                                .map(item => ({
                                    id: item.id,
                                    name: item?.user?.email || 
                                          item?.company?.name || 
                                          item?.name || 
                                          `User ${item.id}`
                                }))
                        ]
                );
                setAccountPagination(data?.data?.pagination || {});
            } catch (error) {
                if (error instanceof ApiError) {
                    toast.error(error.errors);
                } else {
                    toast.error(DEFAULT_API_ERROR.errors);
                }
            } finally {
                setIsFetchAccountLoading(false);
            }
        };

        getAccounts();
    }, [accountPage, debouncedSearchKeyAccount]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeyCompany(searchKeyCompany);
        }, 350);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKeyCompany]);

    useEffect(() => {
        setCompanyPage(1);
        setCompanyRows([]);
        setHasMoreCompanies(true);
    }, [debouncedSearchKeyCompany]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeyUnit(searchKeyUnit);
        }, 350);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKeyUnit]);

    useEffect(() => {
        setUnitPage(1);
        setUnitRows([]);
        setHasMoreUnits(true);
    }, [debouncedSearchKeyUnit, selectedCompany]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeyAccount(searchKeyAccount);
        }, 350);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKeyAccount]);

    useEffect(() => {
        setAccountPage(1);
        setAccountRows([]);
    }, [debouncedSearchKeyAccount]);

    const loadMoreCompanies = () => {
        if (!hasMoreCompanies) return;
        setCompanyPage(prev => prev + 1);
    };

    const loadMoreUnits = () => {
        if (!hasMoreUnits) return;
        setUnitPage(prev => prev + 1);
    };

    const loadMoreAccounts = () => {
        if (accountPagination && accountPage < (accountPagination.totalPages || 0)) {
            setAccountPage(prev => prev + 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();

            formdata.append("unit_id", selectedUnit?.id || "");
            formdata.append("company_user_id", selectedAccount?.id || "");
            formdata.append("start_date", startDate || "");
            formdata.append("end_date", endDate || "");
            formdata.append("amount", contractData?.amount || "");

            if (!user?.id) {
                navigate("/login");
                return;
            }

            setErrors({});

            setIsLoading(true);
            const data = await createContractService(formdata);
            toast.success(data?.message || data?.massage || "Contract created successfully");
            navigate("/contracts");
        } catch (error) {
            if (error instanceof ApiError) {
                setErrors(error.errors || {});
                const firstObjectKey = Object.keys(error.errors || {})[0];
                if (firstObjectKey && error.errors[firstObjectKey]?.[0]) {
                    toast.error(error.errors[firstObjectKey][0]);
                }
            } else {
                toast.error(DEFAULT_API_ERROR.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Create Contract
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                        Add a new contract
                    </p>
                </div>

                <div className="flex w-full md:items-center sm:items-end items-center mb-8 md:flex-row flex-col">
                    <div className="flex flex-col w-full gap-5">
                        <div className="flex items-center gap-2 flex-1 md:flex-row flex-col md:w-auto w-full">
                            <div className="w-full">
                                <label
                                    htmlFor="company"
                                    className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Company
                                </label>
                                <Select
                                    searchKeySelect={searchKeyCompany}
                                    onInputChange={(val) => setSearchKeyCompany(val || "")}
                                    onChange={(val) => setSelectedCompany(val || {})}
                                    onEndReached={loadMoreCompanies}
                                    options={companyRows}
                                    value={selectedCompany?.name || ""}
                                    isLoading={isFetchCompanyLoading}
                                    optionBoxRef={companyBoxRef}
                                    noResultMessage={"No result"}
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="unit"
                                    className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Unit
                                </label>
                                <Select
                                    searchKeySelect={searchKeyUnit}
                                    onInputChange={(val) => setSearchKeyUnit(val || "")}
                                    onChange={(val) => setSelectedUnit(val || {})}
                                    onEndReached={loadMoreUnits}
                                    options={unitRows}
                                    value={selectedUnit?.name || ""}
                                    isLoading={isFetchUnitLoading}
                                    optionBoxRef={unitBoxRef}
                                    noResultMessage={selectedCompany?.id ? "No result" : "Select company first"}
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="account"
                                    className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Company User
                                </label>
                                <Select
                                    searchKeySelect={searchKeyAccount}
                                    onInputChange={(val) => setSearchKeyAccount(val || "")}
                                    onChange={(val) => setSelectedAccount(val || {})}
                                    onEndReached={loadMoreAccounts}
                                    options={accountRows}
                                    value={selectedAccount?.name || ""}
                                    isLoading={isFetchAccountLoading}
                                    optionBoxRef={accountBoxRef}
                                    noResultMessage={"No result"}
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

                <CreateContractForm
                    contractData={contractData}
                    setContractData={setContractData}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    loadMoreAccounts={loadMoreAccounts}
                    isFetchAccountLoading={isFetchAccountLoading}
                />
            </Card>
        </div>
    );
};

export default CreateContractPage;