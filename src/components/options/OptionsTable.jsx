/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { useNavigate } from 'react-router-dom';
import { deleteOptionService } from '../../services/options';
import { toast } from 'react-toastify';
const OptionsTable = ({ columns, optionsRows = [], setOptionsRows, setRefetch, refetch }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [optionId, setOptionId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteOption = async () => {
        try {
            setIsLoading(true)
            const data = await deleteOptionService(optionId)
            toast.success(data.massage || data.message)
            setIsOpen(false)

            const newOptions = optionsRows.filter((row) => row.id !== optionId)
            setOptionsRows(newOptions)
            if (newOptions.length === 0) {
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
        navigate("/options/edit", { state: { rowData: row } });
    }

    return (
        <>
            {/* <ServiceCategoryDrawer
                setIsDrawerOpen={setIsDrawerOpen}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                serviceCategoryId={serviceCategoryId}
            /> */}
            <Alert
                onConfirm={handleDeleteOption}
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
                                {optionsRows.length > 0 && optionsRows.map((row, i) => (
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
                                            {row.company_id}
                                        </td>
                                        <td className="table-td">
                                            {row.item_key}
                                        </td>
                                        <td className="table-td">
                                            {row.item_value}
                                        </td>
                                        <td className="table-td">
                                            {row.item_value_ar}
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
                                                    setOptionId(row.id)
                                                }} size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
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

export default OptionsTable