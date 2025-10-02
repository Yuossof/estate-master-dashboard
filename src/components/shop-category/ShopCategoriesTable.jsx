/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { useNavigate } from 'react-router-dom';
import { deleteShopCategoryService } from '../../services/shop-categories';
import { ApiError, DEFAULT_API_ERROR } from '../../lib/error';
import { toast } from 'react-toastify';

const ShopCategoriesTable = ({ columns, shopCategoryRows = [], setShopCategoryRows, setRefetch, refetch }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [shopCategoryId, setShopCategoryId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteShopCategoryId = async () => {
        try {
            setIsLoading(true)
            const data = await deleteShopCategoryService(shopCategoryId)
            setIsOpen(false)

            const newShopCategoryRow = shopCategoryRows.filter((row) => row.id !== shopCategoryId)
            setShopCategoryRows(newShopCategoryRow)
            if (newShopCategoryRow.length === 0) {
                setRefetch(!refetch);
            }
            console.log("success data", data)
            // toast.success(data.massage)
        } catch (error) {
            console.log("caught error:", error);
            console.log("is ApiError?", error instanceof ApiError);
            console.log("error.constructor.name:", error.constructor.name);
            if (error instanceof ApiError) {
                toast.error("wow", error.errors)
            } else {
                toast.error("wow2", DEFAULT_API_ERROR.errors)
            }
        } finally {
            setIsLoading(false)
        }
    }


    const handleNavigate = (row) => {
        navigate("/shop-categories/edit", { state: { rowData: row } });
    }

    return (
        <>
            <Alert
                onConfirm={handleDeleteShopCategoryId}
                onCancel={() => setIsOpen(false)}
                isOpen={isOpen}
                message={"Are you sure you want to delete this item?"}
                confirmText='Delete'
                cancelText='Cancel'
                isLoading={isLoading}
            />

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle ">
                    <div className="overflow-hidden ">
                        <table className="min-w-full border border-gray-200 table-fixed dark:border-gray-600 border-collapse">
                            <thead className="">
                                <tr>
                                    {columns.map((column, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className=" table-th border border-gray-200 dark:bg-gray-800 dark:border-gray-600 "
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                                {shopCategoryRows.length > 0 && shopCategoryRows.map((row, i) => (
                                    <tr
                                        key={i}
                                        className={`align-top ${i % 2 !== 0
                                            ? "bg-blue-50 dark:bg-[#0f172aef]"
                                            : "bg-white dark:bg-[#0f172af7]"
                                            }`}
                                    >
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                            {row.id}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.name}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.name_ar}
                                        </td>

                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            <div className="flex items-center gap-2">
                                                <Edit
                                                    onClick={() => handleNavigate(row)}
                                                    size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                />
                                                <Trash2 onClick={() => {
                                                    setIsOpen(true)
                                                    setShopCategoryId(row.id)
                                                }} size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCategoriesTable