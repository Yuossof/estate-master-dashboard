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
            console.log("delete shop category result", data)
            setIsOpen(false)

            const newShopCategoryRow = shopCategoryRows.filter((row) => row.id !== shopCategoryId)
            setShopCategoryRows(newShopCategoryRow)
            if (newShopCategoryRow.length === 0) {
                setRefetch(!refetch);
            }

        } catch (error) {
            if (error instanceof ApiError) {
                toast.error(error.errors)
            } else {
                toast.error(DEFAULT_API_ERROR.errors)
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

            <div className="overflow-x-auto rounded-lg border border-gray-200/80 dark:border-[var(--border-primary)]">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    {columns.map((column, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="table-th"
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-100 dark:divide-[var(--border-secondary)]">
                                {shopCategoryRows.length > 0 && shopCategoryRows.map((row, i) => (
                                    <tr
                                        key={i}
                                        className={`align-top ${i % 2 !== 0
                                            ? "bg-gray-50/50 dark:bg-[var(--surface-zebra)]"
                                            : "bg-white dark:bg-transparent"
                                            }`}
                                    >
                                        <td className="table-td">
                                            {row.id}
                                        </td>
                                        <td className="table-td">
                                            {row.name}
                                        </td>
                                        <td className="table-td">
                                            {row.name_ar}
                                        </td>

                                        <td className="table-td">
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
        </>
    )
}

export default ShopCategoriesTable