import React, { useEffect, useRef, useState } from "react";
import { FileUp, Search, Smartphone } from "lucide-react";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import Select from "../../../components/shared/ui/Select";
import { getDeviceTokensService } from "../../../services/device-tokens";
import { getUsersService } from "../../../services/users";
import DeviceTokensTable from "../../../components/device-tokens/DeviceTokensTable";
import PageHeader from "../../../components/shared/custom-ui/TablesHeader";

const columns = [
  { label: "ID" },
  { label: "User ID" },
  { label: "Device Type" },
  { label: "Token" },

  { label: "User Name" },
  { label: "User Email" },
  { label: "User Prefix" },
//   { label: "User Device Token" },
  { label: "User Points" },
  { label: "User Wallet" },
  { label: "User Notifications Channel ID" },
//   { label: "User Profile Image" },
  { label: "User Email Verified At" },

  { label: "Last Used At" },
  { label: "Created At" },
  { label: "Updated At" },
];


const DeviceTokensPage = () => {
    const [deviceTokensRows, setDeviceTokensRows] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const [debouncedSearchKey, setDebouncedSearchKey] = useState("");
    const [refetch, setRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectUser, setSelectedUser] = useState({
        id: "",
        name: "",
        email: "",
    });

    const [itemKey, setItemKey] = useState("");
    const [usersRows, setUsersRows] = useState([]);
    const [hasMoreCompanies, setHasMoreCompanies] = useState(true);
    const [isFetchUserLoading, setIsFetchUserLoading] = useState(false)
    const [userPage, setUserPage] = useState(1)
    const [searchKeySelect, setSearchKeySelect] = useState("");
    const [debouncedSearchKeySelect, setDebouncedSearchKeySelect] = useState("");
    const optionBoxRef = useRef(null)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKeySelect(searchKeySelect);
        }, 350);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKeySelect]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchKey(searchKey);
        }, 350);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKey]);

    useEffect(() => {
        setUserPage(1);
        setUsersRows([]);
        setHasMoreCompanies(true);
    }, [debouncedSearchKeySelect]);

    useEffect(() => {
        const getOptions = async () => {
            try {
                setIsLoading(true);
                const data = await getDeviceTokensService(11, page, selectUser.id, itemKey, debouncedSearchKey);
                setDeviceTokensRows(data.data.items || []);
                setPagination(data.data.pagination || {});
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getOptions();
    }, [page, refetch, debouncedSearchKey, selectUser.id]);

    useEffect(() => {
        const getCompanies = async () => {
            if (!hasMoreCompanies) return;
            try {
                setIsFetchUserLoading(true)
                const data = await getUsersService(10, userPage, debouncedSearchKeySelect);
                const items = data.data.items || [];

                if (items.length === 0) {
                    setHasMoreCompanies(false);
                }

                if (userPage >= data.data.pagination.totalPages) {
                    setHasMoreCompanies(false);
                }

                setUsersRows(prev => [
                    ...prev,
                    ...items.map(item => ({
                        id: item.id,
                        name: item.name
                    }))
                ]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetchUserLoading(false)
            }
        };

        getCompanies();
    }, [userPage, debouncedSearchKeySelect]);


    const loadMoreCompanies = () => {
        if (!hasMoreCompanies) return
        setUserPage(prev => prev + 1);
    };

    return (
        <div>
            <Card noborder>
                {/* Page Header */}
                <PageHeader
                    title="Device Tokens"
                    icon={<Smartphone size={22} />}
                    total={pagination.total}
                    entityName="device token"
                />

                {/* Filters */}
                <div className="flex w-full md:items-center sm:items-end items-center mb-8 md:flex-row flex-col">
                    <div className="flex items-center gap-2 flex-1 md:flex-row flex-col md:w-auto w-full">
                        <div className="w-full">
                            <label
                                htmlFor="clientName"
                                className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Users
                            </label>
                            <Select
                                searchKeySelect={searchKeySelect}
                                onInputChange={(val) => setSearchKeySelect(val)}
                                onChange={(val) => setSelectedUser(val)}
                                onEndReached={loadMoreCompanies}
                                options={usersRows}
                                value={selectUser.name}
                                isLoading={isFetchUserLoading}
                                optionBoxRef={optionBoxRef}
                                noResultMessage={"No result"}
                            />
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gray-100 dark:bg-[var(--border-secondary)] my-3 mb-4"></div>

                {/* Search + Export */}
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

                {/* Table */}
                {isLoading ? (
                    <TableSkeleton columns={columns} rows={12} />
                ) : (
                    <DeviceTokensTable
                        columns={columns}
                        deviceTokensRows={deviceTokensRows}
                        setDeviceTokensRows={setDeviceTokensRows}
                        refetch={refetch}
                        setRefetch={setRefetch}
                    />
                )}

                {/* Pagination */}
                <div className="my-4 w-full flex justify-center">
                    <Pagination
                        onPageChange={setPage}
                        pagination={pagination}
                        isLoading={isLoading}
                    />
                </div>
            </Card>
        </div>

    );
};

export default DeviceTokensPage;
