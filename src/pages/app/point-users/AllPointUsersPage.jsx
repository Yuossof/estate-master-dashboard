import React from "react";
const columns = [
    { label: "ID" },
    { label: "User Name" },
    { label: "User Email" },
    { label: "Points" },
    { label: "Wallet" },
    { label: "Description" },
    { label: "Action" },
];

import Card from "@/components/shared/ui/Card";
import { FileUp, ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "../../../components/shared/ui/Select";
import DateRangePicker from "../../../components/shared/ui/DateRangePicker";
import Pagination from "../../../components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import AllPointUsersTable from "../../../components/point-users/AllPointUsersTable";
import { getAllPointUsersService } from "../../../services/point-users";

const AllPointUsersPage = () => {
    const [startDate, setStartDate] = useState(null)
    const [endtDate, setEndtDate] = useState(null)

    const [userRows, setUserRows] = useState([])
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [refetch, setRefetch] = useState(false)
    const [searchKey, setSearchKey] = useState("")

    const [debouncedKey, setDebouncedKey] = useState(searchKey);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKey(searchKey);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKey]);

    useEffect(() => {
        const abort = new AbortController()
        const getPointUsers = async () => {
            try {
                setIsLoading(true);
                const data = await getAllPointUsersService(11, currentPage, debouncedKey, abort.signal);
                console.log("points", data);
                setUserRows(data.data.items);
                setPagination(data.data.pagination);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getPointUsers();

        return ()=> abort.abort()
    }, [currentPage, refetch, debouncedKey]);

    const handleSearch = (e) => {
        setSearchKey(e.target.value);
    };


    return (
        <div className=''>
            <Card noborder>
                <div className="flex items-center w-full flex-col">
                    <div className="flex w-full md:items-center sm:items-end items-center mb-8 md:flex-row flex-col">
                        <div className="flex items-center gap-2 flex-1 md:flex-row flex-col md:w-auto w-full">
                            <div className="w-full">
                                <label
                                    htmlFor="clientName"
                                    className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Company
                                </label>
                                <Select value={"Select Company"} />
                            </div>
                            <DateRangePicker onChange={(val) => setStartDate(val)} value={startDate} label="From Date" />
                            <DateRangePicker onChange={(val) => setEndtDate(val)} value={endtDate} label="To Date" />
                        </div>
                        <button className="btn-primary justify-center flex items-center gap-3 mt-8 py-1.5 px-2 rounded-md sm:ml-3 ml-0 sm:w-auto w-full" >
                            <span>Filter</span>
                            <ListFilter />
                        </button>
                    </div>
                    <div className="h-[1px] w-full dark:bg-slate-600 bg-slate-200 my-4"></div>
                    <div className="flex justify-between w-full mb-4">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <div className="relative w-full overflow-hidden">
                                <input
                                    type="text"
                                    onChange={handleSearch}
                                    placeholder="Search..."
                                    className="border dark:border-gray-700 text-md border-gray-200  py-1.5 dark:bg-gray-900 px-2 pr-9 rounded-md w-full outline-none"
                                />
                                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            </div>
                        </div>
                        <button className="btn-danger ml-5 sm:ml-0 flex items-center gap-2 py-1.5 px-2 rounded-md">
                            <span className="sm:block hidden">Export</span>
                            <FileUp size={20} />
                        </button>

                    </div>
                </div>
                <div className="overflow-x-auto ">
                    <div className="inline-block min-w-full align-middle">
                        {isLoading ? (
                            <TableSkeleton columns={columns} rows={11} />
                        ) : (
                            <AllPointUsersTable
                                columns={columns}
                                userRows={userRows}
                                setUserRows={setUserRows}
                                refetch={refetch}
                                setRefetch={setRefetch}
                            />
                        )}

                    </div>
                </div>
                <div className="my-4 w-full flex justify-center">
                    <div className="flex items-center gap-2 mt-6">
                        <Pagination
                            isLoading={isLoading}
                            onPageChange={(page) => setCurrentPage(page)}
                            pagination={pagination}
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default AllPointUsersPage