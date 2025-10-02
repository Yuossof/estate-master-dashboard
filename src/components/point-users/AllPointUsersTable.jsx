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
                            <tbody className="bg-white ">
                                {userRows.length > 0 && userRows.map((row, i) => (
                                    <tr key={i}
                                        className={`align-top ${i % 2 !== 0
                                            ? "bg-blue-50 dark:bg-[#0f172aef]"
                                            : "bg-white dark:bg-[#0f172af7]"
                                            }`}
                                    >

                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                            {row.user?.id}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user?.name}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user?.email}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.points}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user.wallet}
                                        </td>
                                        {row.description && (
                                            <td className="table-td border border-gray-200 transition-all dark:bg-gray-800 dark:border-gray-600">
                                                <RowExpandableText
                                                    text={currentLang === "en" ? row.description : row.description_ar}
                                                    limit={200}
                                                    expanded={activeRow === row.id}
                                                    onToggle={() => setActiveRow(activeRow === row.id ? null : row.id)}
                                                />
                                            </td>
                                        )}
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
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
                </div>
            </div>
        </>
    )
}

export default AllPointUsersTable
