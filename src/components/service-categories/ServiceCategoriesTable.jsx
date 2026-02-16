/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Edit, Eye, Trash2 } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { deleteServiceCategoryService } from '../../services/service-categories';
import ServiceCategoryDrawer from './ServiceCategoryDrawer';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utility/date-format';

const ServiceCategoriesTable = ({ columns, serviceCategoryRows = [], setServiceCategoryRows, setRefetch, refetch }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [serviceCategoryId, setServiceCategoryId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleDeleteServiceCategory = async () => {
        try {
            setIsLoading(true)
            const data = await deleteServiceCategoryService(serviceCategoryId)
            setIsOpen(false)

            const newServiceCategories = serviceCategoryRows.filter((row) => row.id !== serviceCategoryId)
            setServiceCategoryRows(newServiceCategories)
            if (newServiceCategories.length === 0) {
                setRefetch(!refetch);
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleNavigate = (row) => {
        navigate("/service-categories/edit", { state: { rowData: row } });
    }


    return (
        <>
            <ServiceCategoryDrawer
                setIsDrawerOpen={setIsDrawerOpen}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                serviceCategoryId={serviceCategoryId}
            />
            <Alert
                onConfirm={handleDeleteServiceCategory}
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
                                {serviceCategoryRows.length > 0 && serviceCategoryRows.map((row, i) => (
                                    <tr key={i}
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
                                           {formatDate(row.created_at)}
                                        </td>
                                        <td className="table-td">
                                           {formatDate(row.updated_at)}
                                        </td>

                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                <Edit
                                                    onClick={() => handleNavigate(row)}
                                                    size={20}
                                                    className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                />
                                                <Trash2 onClick={() => {
                                                    setIsOpen(true)
                                                    setServiceCategoryId(row.id)
                                                }} size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
                                                <Eye
                                                    onClick={() => {
                                                        setServiceCategoryId(row.id)
                                                        setIsDrawerOpen(true)
                                                    }}
                                                    size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
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

export default ServiceCategoriesTable