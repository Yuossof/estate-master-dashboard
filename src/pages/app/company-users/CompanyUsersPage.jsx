import React, { useEffect, useRef, useState } from "react";
import { FileUp, Search } from "lucide-react";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import CompanyUsersTable from "../../../components/company-users/CompanyUsersTable";
import { getCompanyUsersService } from "../../../services/company-users";
import Select from "../../../components/shared/ui/Select";
import { getCompaniesService } from "../../../services/company";

const columns = [
  { label: "ID" },
  { label: "Name" },
  { label: "Email" },
  { label: "Company Name" },
  { label: "Company Name Arabic" },
  { label: "App Name " },
  // { label: "Description" },
  { label: "Logo" },
  { label: "Action" }
];

const CompanyUsersPage = () => {
  const [companyUsersRows, setCompanyUsersRows] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({ name: "", id: "" })
  // const [startDate, setStartDate] = useState(null);
  // const [endtDate, setEndtDate] = useState(null);
  const [companyRows, setCompanyRows] = useState([]);
  const [hasMoreCompanies, setHasMoreCompanies] = useState(true);
  const [isFetchCompanyLoading, setIsFetchCompanyLoading] = useState(false)
  const [searchKeySelect, setSearchKeySelect] = useState("");
  const [debouncedSearchKeySelect, setDebouncedSearchKeySelect] = useState("");
  const [companyPage, setCompanyPage] = useState(1)
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
    const abort = new AbortController()

    const getCompanyUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanyUsersService(9, page, searchKey, selectedCompany.id, abort.signal);
        setCompanyUsersRows(data.data.items || []);
        setPagination(data.data.pagination || {});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCompanyUsers();
    return () => abort.abort()
  }, [page, refetch, searchKey, selectedCompany.id]);


  useEffect(() => {
    const abort = new AbortController()

    const getCompanies = async () => {
      if (!hasMoreCompanies) return;
      try {
        setIsFetchCompanyLoading(true)
        const data = await getCompaniesService(11, companyPage, debouncedSearchKeySelect, abort.signal);
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
        if (optionBoxRef.current) {
          optionBoxRef.current.scrollTop = optionBoxRef.current.scrollHeight;
        }
      }
    };

    getCompanies();

    return () => abort.abort()
  }, [companyPage, debouncedSearchKeySelect]);

  useEffect(() => {
    setCompanyPage(1);
    setCompanyRows([]);
    setHasMoreCompanies(true);
  }, [debouncedSearchKeySelect]);

  useEffect(() => {
    setPage(1)
  }, [selectedCompany])

  const loadMoreCompanies = () => {
    if (!hasMoreCompanies) return
    setCompanyPage(prev => prev + 1);
  };

  return (
    <div>
      <Card noborder>
        {/* Page Header */}
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Company Users Management
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
            Browse, search, and manage registered company users
          </p>
        </div>

        {/* Filters */}
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
              {/* 
              <DateRangePicker
                onChange={(val) => setStartDate(val)}
                value={startDate}
                label="From Date"
              />
              <DateRangePicker
                onChange={(val) => setEndtDate(val)}
                value={endtDate}
                label="To Date"
              /> */}
            </div>
          </div>

          <div className="h-[1px] w-full dark:bg-slate-600 bg-slate-200 my-3 mb-4"></div>

          {/* Search + Export */}
          <div className="flex justify-between w-full mb-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="border dark:border-slate-600 border-slate-300 py-1 dark:bg-gray-900 px-2 pr-9 rounded-md w-full outline-none "
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

        {/* Table */}
        {isLoading ? (
          <TableSkeleton columns={columns} rows={14} />
        ) : (
          <CompanyUsersTable
            columns={columns}
            companyUsersRows={companyUsersRows}
            setCompanyUsersRows={setCompanyUsersRows}
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

export default CompanyUsersPage;
