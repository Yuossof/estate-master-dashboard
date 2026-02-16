import React, { useEffect, useState } from "react";
import { FileUp, Search, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/shared/ui/Card";
import Pagination from "@/components/Pagination";
import TableSkeleton from "../../../components/shared/skeleton/TableSkeleton";
import { getShopCategoriesService } from "../../../services/shop-categories";
import ShopCategoriesTable from "../../../components/shop-category/ShopCategoriesTable";
import PageHeader from "../../../components/shared/custom-ui/TablesHeader";

const columns = [
  { label: "ID" },
  { label: "Name" },
  { label: "Name Arabic" },
  { label: "Action" },
];

const ShopCategoriesPage = () => {
  const navigate = useNavigate();
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
        <PageHeader
          title="Shop Categories"
          icon={<ShoppingBag size={22} />}
          total={pagination.total}
          entityName="shop category"
          actionLabel="Add Category"
          onActionClick={() => navigate("/shop-categories/create")}
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
