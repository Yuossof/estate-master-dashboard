/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Edit, Languages, Trash2 } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { Eye } from 'lucide-react';
import TextCell from '../TextCell';
import CompanyUserProfileDrawer from './CompanyUserProfileDrawer';
import { deleteCompanyUserService } from '../../services/company-users';

const CompanyUsersTable = ({ columns, companyUsersRows = [], setCommpanyUsersRows, setRefetch, refetch }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [userId, setUserId] = useState(null)
    const [companyId, setCompanyId] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [currentLang, setCurrentLang] = useState("en")

    const handleToggleLang = () => {
        setCurrentLang(prev => prev === "en" ? "ar" : "en")
    }

    const handleDeleteCompanyUser = async () => {
        const formData = new FormData()
        formData.append("company_id", companyId)
        try {
            setIsLoading(true)
            const data = await deleteCompanyUserService(userId,)
            setIsOpen(false)

            const newUserRows = companyUsersRows.filter((row) => row.id !== userId)
            setCommpanyUsersRows(newUserRows)
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
            <CompanyUserProfileDrawer
                setIsDrawerOpen={setIsDrawerOpen}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                userId={userId}
            />

            <Alert
                onConfirm={handleDeleteCompanyUser}
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
                                {companyUsersRows.length > 0 && companyUsersRows.map((row, i) => (
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
                                            <TextCell name={row.user.name} limit={70} />
                                        </td>
                                        <td className="table-td">
                                            {row.user.email}
                                        </td>
                                        <td className="table-td">
                                            {row.company.name}
                                        </td>
                                        <td className="table-td">
                                            {row.company.name_ar}
                                        </td>
                                        <td className="table-td">
                                            {row.company.app_name}
                                        </td>

                                        <td className="table-td">
                                            {row.company.logo ? (
                                                <img
                                                    src={row.company.logo[0]}
                                                    alt={`${row.company.name} logo`}
                                                    className="w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-all active:scale-100  rounded-md border border-gray-200 dark:border-[var(--border-primary)]"
                                                // onClick={() => {
                                                //     setIsImagePreview(true)
                                                //     setImageUrl(row.logo)
                                                // }}
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">No logo</span>
                                            )}
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                <Edit
                                                // onClick={()=> handleNavigate({role: "", user_id: row.user.id})}
                                                 size={20}
                                                  className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
                                                <Trash2 onClick={() => {
                                                    setIsOpen(true)
                                                    setUserId(row.id)
                                                }} size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
                                                <Eye
                                                    onClick={() => {
                                                        setUserId(row.id)
                                                        setCompanyId(row.company.id)
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

export default CompanyUsersTable