import React, { useEffect, useState } from "react";
import { FileUp, Search, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import { getServiceCategoriesService } from "../../../services/service-categories";
import ServiceCategoriesTable from "../../../components/service-categories/ServiceCategoriesTable";
import PageHeader from "../../../components/shared/custom-ui/TablesHeader";

const columns = [
  { label: "ID" },
  { label: "Name" },
  { label: "Created At" },
  { label: "Updated At" },
  { label: "Action" },
];

const ServiceCategoriesPage = () => {
  const navigate = useNavigate();
  const [serviceCategoryRows, setServiceCategoryRows] = useState([]);
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
        const data = await getServiceCategoriesService(9, page, debouncedSearchKey);
        setServiceCategoryRows(data.data.items || []); 
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
    <div>
      <Card noborder>
        {/* Page Header */}
        <PageHeader
          title="Service Categories"
          icon={<Wrench size={22} />}
          total={pagination.total}
          entityName="service category"
          actionLabel="Add Category"
          onActionClick={() => navigate("/service-categories/create")}
        />

        {/* Filters */}
        <div className="flex items-center w-full flex-col mt-3">
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
        </div>

        {/* Table */}
        {isLoading ? (
          <TableSkeleton columns={columns} rows={12} />
        ) : (
          <ServiceCategoriesTable
            columns={columns}
            serviceCategoryRows={serviceCategoryRows}
            setServiceCategoryRows={setServiceCategoryRows}
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

export default ServiceCategoriesPage;
