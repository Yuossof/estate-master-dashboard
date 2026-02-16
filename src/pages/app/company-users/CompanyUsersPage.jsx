import React, { useEffect, useRef, useState } from "react";
import { FileUp, Search, Users } from "lucide-react";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import CompanyUsersTable from "../../../components/company-users/CompanyUsersTable";
import { getCompanyUsersService } from "../../../services/company-users";
import Select from "../../../components/shared/ui/Select";
import { getCompaniesService } from "../../../services/company";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/shared/custom-ui/TablesHeader";

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
  const navigate = useNavigate();
  const [companyUsersRows, setCompanyUsersRows] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({ name: "", id: "" })
  const [debouncedSearchKey, setDebouncedSearchKey] = useState("");

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
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [searchKey]);

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
  }, [page, refetch, debouncedSearchKey, selectedCompany.id]);


  useEffect(() => {
    const abort = new AbortController()

    const getCompanies = async () => {
      if (!hasMoreCompanies) return;
      try {
        setIsFetchCompanyLoading(true)
        const data = await getCompaniesService(11, companyPage, debouncedSearchKeySelect, abort.signal);
        console.log(data)
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
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Company Users"
        icon={<Users size={22} />}
        total={pagination.total}
        entityName="company user"
        actionLabel="Add User"
        onActionClick={() => navigate("/company-users/create")}
      />

      <Card noborder>
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

          <div className="h-px w-full bg-gray-100 dark:bg-[var(--border-secondary)] my-3 mb-4"></div>

          {/* Search + Export */}
          <div className="flex justify-between w-full mb-4">
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
