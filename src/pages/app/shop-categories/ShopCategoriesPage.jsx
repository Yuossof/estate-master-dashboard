import React, { useEffect, useState } from "react";
import { FileUp, Search } from "lucide-react";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import { getShopCategoriesService } from "../../../services/shop-categories";
import ShopCategoriesTable from "../../../components/shop-category/ShopCategoriesTable";

const columns = [
  { label: "ID" },
  { label: "Name" },
  { label: "Name Arabic" },
  { label: "Action" },
];

const ShopCategoriesPage = () => {
  const [shopCategoryRows, setShopCategoryRows] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getShopCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getShopCategoriesService(9, page, searchKey);
        setShopCategoryRows(data.data.items || []);
        setPagination(data.data.pagination || {});
        console.log(data)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getShopCategories();
  }, [page, refetch, searchKey]);

  return (
    <div>
      <Card noborder>
        {/* Page Header */}
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="md:text-2xl text-xl font-semibold text-gray-800 dark:text-gray-100">
            Shop Categories
          </h1>
          <p className="md:text-base text-[14px] text-gray-500 dark:text-gray-400 mt-1">
            Browse, search, and manage shop categories
          </p>
        </div>

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
        </div>

        {/* Table */}
        {isLoading ? (
          <TableSkeleton columns={columns} rows={12} />
        ) : (
          <ShopCategoriesTable
            columns={columns}
            shopCategoryRows={shopCategoryRows}
            setShopCategoryRows={setShopCategoryRows}
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

export default ShopCategoriesPage;
