import React, { useEffect, useState, useRef } from "react";
import { FileUp, Search } from "lucide-react";
import { getCompaniesService } from "../../../services/company";
import { getProjectsService } from "../../../services/projects";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import Select from "../../../components/shared/ui/Select";
import ProjectsTable from "../../../components/projects/ProjectsTable";

const columns = [
  { label: "ID" },
  { label: "Name" },
  { label: "Image" },
  { label: "Address" },
  { label: "Phone" },
  { label: "WhatsApp" },
  { label: "Start Date" },
  { label: "End Date" },
  { label: "Project Media" },
  { label: "Active" },
  { label: "Action" },
];

const ProjectsPage = () => {
  const [projectRows, setProjectRows] = useState([]);
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
    if (!selectedCompany.id) return
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchKey]);

  // debounce for company select search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKeySelect(searchKeySelect);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchKeySelect]);

  // fetch projects
  useEffect(() => {
    const getProjects = async () => {
      try {
        setIsLoading(true);
        const data = await getProjectsService(9, page, debouncedSearchKey, selectedCompany.id);
        setProjectRows(data.data.items || []);
        setPagination(data.data.pagination || {});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProjects();
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

  useEffect(() => {
    setCompanyPage(1);
    setCompanyRows([]);
    setHasMoreCompanies(true);
  }, [debouncedSearchKeySelect]);

  const loadMoreCompanies = () => {
    if (!hasMoreCompanies) return;
    setCompanyPage((prev) => prev + 1);
  };

  return (
    <div>
      <Card noborder>
        {/* Page Header */}
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Projects Management
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
            Browse, search, and manage registered projects
          </p>
        </div>

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
                value={selectedCompany.name}
                isLoading={isFetchCompanyLoading}
                optionBoxRef={optionBoxRef}
                noResultMessage={"No result"}
              />
            </div>
          </div>
        </div>

        {/* Search + Export */}
        <div className="flex justify-between w-full mb-5">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="border dark:border-slate-600 border-slate-300 py-1 dark:bg-gray-900 px-2 pr-9 rounded-md w-full outline-none"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
          </div>
          <button className="btn-danger ml-5 sm:ml-0 flex items-center gap-2 py-1.5 px-2 rounded-md">
            <span className="sm:block hidden">Export</span>
            <FileUp size={20} />
          </button>
        </div>

        {/* Table */}
        {isLoading ? (
          <TableSkeleton columns={columns} rows={12} />
        ) : (
          <ProjectsTable
            columns={columns}
            projectRows={projectRows}
            setProjectRows={setProjectRows}
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

export default ProjectsPage;
