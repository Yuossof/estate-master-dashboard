import React, { useEffect, useState, useRef } from "react";
import { FileUp, Search, Home } from "lucide-react";
import { getCompaniesService } from "../../../services/company";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import Select from "../../../components/shared/ui/Select";
import { getUnitsService } from "../../../services/units";
import UnitsTable from "../../../components/units/UnitsTable";
import PageHeader from "../../../components/shared/custom-ui/TablesHeader";

const columns = [
    { label: "ID" },
    { label: "Name" },
    { label: "Image" },
    { label: "Location" },
    { label: "Phone" },
    { label: "WhatsApp" },
    { label: "Delivery Date" },
    { label: "Area (m²)" },
    { label: "Price (EGP)" },
    { label: "Rooms" },
    { label: "Bathrooms" },
    { label: "Floor" },
    { label: "Project Media" },
    { label: "Active" },
    { label: "Action" },
];

const UnitsPage = () => {
    const navigate = useNavigate();
    const [unitsRows, setUnitsRows] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);

    const [searchKey, setSearchKey] = useState("");
    const [debouncedSearchKey, setDebouncedSearchKey] = useState("");

    const [refetch, setRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // company select states
    const [companyRows, setCompanyRows] = useState([]);
    const [companyPage, setCompanyPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [searchKeySelect, setSearchKeySelect] = useState("");
    const [debouncedSearchKeySelect, setDebouncedSearchKeySelect] = useState("");
    const [hasMoreCompanies, setHasMoreCompanies] = useState(true);
    const [isFetchCompanyLoading, setIsFetchCompanyLoading] = useState(false);
    const optionBoxRef = useRef(null);

    // debounce for table search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKey(searchKey);
        }, 350);
        return () => clearTimeout(handler);
    }, [searchKey]);

    useEffect(() => {
        setCompanyPage(1);
        setCompanyRows([]);
        setHasMoreCompanies(true);
    }, [debouncedSearchKeySelect]);

    useEffect(() => {
        setPage(1)
    }, [selectedCompany])

    // debounce for company select search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeySelect(searchKeySelect);
        }, 350);
        return () => clearTimeout(handler);
    }, [searchKeySelect]);

    // fetch projects
    useEffect(() => {
        const getUnits = async () => {
            try {
                setIsLoading(true);
                const data = await getUnitsService(8, page, debouncedSearchKey, selectedCompany.id);
                setUnitsRows(data.data.items || []);
                setPagination(data.data.pagination || {});
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getUnits();
    }, [page, refetch, debouncedSearchKey, selectedCompany.id]);

    // fetch companies for select
    useEffect(() => {
        const getCompanies = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchCompanyLoading(true);
                const data = await getCompaniesService(9, companyPage, debouncedSearchKeySelect);
                const items = data.data.items || [];

                if (items.length === 0 || companyPage >= data.data.pagination.totalPages) {
                    setHasMoreCompanies(false);
                }

                setCompanyRows((prev) => [
                    ...prev,
                    ...items.map((item) => ({
                        id: item.id,
                        name: item.name,
                    })),
                ]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetchCompanyLoading(false);
            }
        };

        getCompanies();
    }, [companyPage, debouncedSearchKeySelect]);

    const loadMoreCompanies = () => {
        if (!hasMoreCompanies) return;
        setCompanyPage((prev) => prev + 1);
    };

    return (
        <div>
            <Card noborder>
                {/* Page Header */}
                <PageHeader
                    title="Units Management"
                    icon={<Home size={22} />}
                    total={pagination.total}
                    entityName="unit"
                    actionLabel="Add Unit"
                    onActionClick={() => navigate("/units/create")}
                />

                {/* Filters */}
                <div className="flex w-full md:items-center sm:items-end items-center mb-8 md:flex-row flex-col">
                    <div className="flex items-center gap-2 flex-1 md:flex-row flex-col md:w-auto w-full">
                        <div className="w-full">
                            <label
                                htmlFor="company"
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
                                value={selectedCompany?.name || ""}
                                isLoading={isFetchCompanyLoading}
                                optionBoxRef={optionBoxRef}
                                noResultMessage={"No result"}
                            />
                        </div>
                    </div>
                </div>

                {/* Search + Export */}
                {selectedCompany.id && (
                    <div className="flex justify-between w-full mb-5">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchKey}
                                    onChange={(e) => setSearchKey(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200/80 dark:border-[var(--border-primary)] bg-gray-50/50 dark:bg-[var(--surface-elevated)] text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:border-indigo-300 dark:focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
                            </div>
                        </div>
                        <button className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-gray-200/80 dark:border-[var(--border-primary)] bg-white dark:bg-[var(--surface-elevated)] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[var(--surface-hover)] transition-colors flex-shrink-0">
                            <span className="sm:block hidden">Export</span>
                            <FileUp size={20} />
                        </button>
                    </div>
                )}

                {/* Table */}
                {isLoading ? (
                    <TableSkeleton columns={columns} rows={12} />
                ) : (
                    selectedCompany.id ? (
                        <UnitsTable
                            columns={columns}
                            unitsRows={unitsRows}
                            setUnitsRows={setUnitsRows}
                            refetch={refetch}
                            setRefetch={setRefetch}
                        />
                    ) : (
                        <div className="w-full flex justify-center my-5">
                            <p className="text-gray-500 dark:text-slate-400">Select a company first!</p>
                        </div>
                    )
                )}

                {/* Pagination */}
                {selectedCompany.id && (
                    <div className="my-4 w-full flex justify-center">
                        <Pagination
                            onPageChange={setPage}
                            pagination={pagination}
                            isLoading={isLoading}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default UnitsPage;
