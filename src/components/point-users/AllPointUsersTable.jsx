/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Edit, Languages, Trash2 } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { deleteCompanyService } from '../../services/company';
import RowExpandableText from '../RowExpandableText';

const AllPointUsersTable = ({ columns, userRows = [], setUserRows, setRefetch, refetch }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [userId, setUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentLang, setCurrentLang] = useState("en")
    const [activeRow, setActiveRow] = useState(null);

    const handleToggleLang = () => {
        setCurrentLang(prev => prev === "en" ? "ar" : "en")
    }


    const handleDeleteCompany = async () => {
        try {
            setIsLoading(true)
            const data = await deleteCompanyService(userId)
            setIsOpen(false)

            const newUserRows = userRows.filter((row) => row.id !== userId)
            setUserRows(newUserRows)
            if (newUserRows.length === 0) {
                setRefetch(!refetch);
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Alert
                onConfirm={handleDeleteCompany}
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
                                            <div className='flex items-center justify-between'>
                                                {column.label}
                                                {column.label === "Description" && (
                                                    <div
                                                        onClick={handleToggleLang}
                                                        className='bg-slate-100 
                                                        border-[1px] border-slate-200 w-8 h-8
                                                        cursor-pointer hover:shadow-lg hover:scale-110
                                                        active:-rotate-45 shadow-md rounded-full flex 
                                                        justify-center items-center transition-all duration-300'
                                                    >
                                                        <Languages className="dark:text-gray-300 text-gray-600" size={19} />
                                                    </div>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-100 dark:divide-[var(--border-secondary)]">
                                {userRows.length > 0 && userRows.map((row, i) => (
                                    <tr key={i}
                                        className={`align-top ${i % 2 !== 0
                                            ? "bg-gray-50/50 dark:bg-[var(--surface-zebra)]"
                                            : "bg-white dark:bg-transparent"
                                            }`}
                                    >

                                        <td className="table-td">
                                            {row.user?.id}
                                        </td>
                                        <td className="table-td">
                                            {row.user?.name}
                                        </td>
                                        <td className="table-td">
                                            {row.user?.email}
                                        </td>
                                        <td className="table-td">
                                            {row.points}
                                        </td>
                                        <td className="table-td">
                                            {row.user.wallet}
                                        </td>
                                        {row.description && (
                                            <td className="table-td border border-gray-200 transition-all dark:bg-[var(--surface-card)] dark:border-[var(--border-primary)]">
                                                <RowExpandableText
                                                    text={currentLang === "en" ? row.description : row.description_ar}
                                                    limit={200}
                                                    expanded={activeRow === row.id}
                                                    onToggle={() => setActiveRow(activeRow === row.id ? null : row.id)}
                                                />
                                            </td>
                                        )}
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                <Edit size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
                                                <Trash2 onClick={() => {
                                                    setIsOpen(true)
                                                    setUserId(row.id)
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

export default AllPointUsersTable
