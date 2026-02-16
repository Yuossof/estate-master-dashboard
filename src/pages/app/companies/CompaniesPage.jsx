import React, { useEffect, useState } from "react";
import { FileUp, Search, Building2 } from "lucide-react";
import { getCompaniesService } from "../../../services/company";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import CompaniesTable from "@/components/company/CompaniesTable";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import PageHeader from "../../../components/shared/custom-ui/TablesHeader";

const columns = [
  { label: "ID" },
  { label: "Name" },
  { label: "Arabic Name" },
  { label: "App Name" },
  { label: "Image" },
  // { label: "Description" },
  { label: "Active" },
  { label: "Action" },
];

const CompaniesPage = () => {
  const navigate = useNavigate();
  const [companyRows, setCompanyRows] = useState([]);
  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchKey, setDebouncedSearchKey] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [searchKey]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        setIsLoading(true);
        const data = await getCompaniesService(9, page, debouncedSearchKey);
        setCompanyRows(data.data.items || []);
        setPagination(data.data.pagination || {});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCompanies();
  }, [page, refetch, debouncedSearchKey]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Companies"
        icon={<Building2 size={22} />}
        total={pagination.total}
        entityName="company"
        actionLabel="Add Company"
        onActionClick={() => navigate("/companies/create")}
      />


      {/* Content Card */}
      <Card noborder bodyClass="p-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 dark:border-[var(--border-secondary)]">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200/80 dark:border-[var(--border-primary)] bg-gray-50/50 dark:bg-[var(--surface-elevated)] text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:bg-white dark:focus:bg-[var(--surface-hover)] focus:border-indigo-300 dark:focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
          </div>
          <button className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-gray-200/80 dark:border-[var(--border-primary)] bg-white dark:bg-[var(--surface-elevated)] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[var(--surface-hover)] transition-colors flex-shrink-0">
            <FileUp size={15} />
            <span className="hidden sm:block">Export</span>
          </button>
        </div>

        {/* Table */}
        <div className="px-5 py-4">
          {isLoading ? (
            <TableSkeleton columns={columns} rows={9} />
          ) : (
            <CompaniesTable
              columns={columns}
              companyRows={companyRows}
              setCompanyRows={setCompanyRows}
              refetch={refetch}
              setRefetch={setRefetch}
            />
          )}
        </div>

        {/* Footer: Pagination + Info */}
        {!isLoading && pagination.last_page > 1 && (
          <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-t border-gray-100 dark:border-[var(--border-secondary)]">
            <p className="text-xs text-gray-400 dark:text-slate-500 hidden sm:block">
              Page {pagination.current_page} of {pagination.last_page}
            </p>
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

export default CompaniesPage;
