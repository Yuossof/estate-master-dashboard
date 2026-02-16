/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Checkbox from "../../components/shared/ui/Checkbox";
import { Edit, Trash2, Loader2, Languages, Eye } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { deleteCompanyService, toggleActiveCompanyService } from '../../services/company';
import { useNavigate } from 'react-router-dom';
import ImagePreview from '../ImagePreview';

import { ApiError, DEFAULT_API_ERROR } from '../../lib/error';
import { toast } from 'react-toastify';
import CompanyDrawer from './CompanyDrawer';

const CompaniesTable = ({ columns, companyRows = [], setCompanyRows, setRefetch, refetch }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [companyId, setCompanyId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [toggleLoadingId, setToggleLoadingId] = useState(null)
    const [isImagePreview, setIsImagePreview] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [currentLang, setCurrentLang] = useState("en")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [companyData, setCompanyData] = useState(false)

    const handleToggleLang = () => {
        console.log(currentLang)
        setCurrentLang(prev => prev === "en" ? "ar" : "en")
    }

    const handleToggleActive = async (id, val) => {
        const formdata = new FormData()
        formdata.append("active", val)

        try {
            setToggleLoadingId(id)

            const res = await toggleActiveCompanyService(id, formdata)
            const newActive = res.data.active  

            setCompanyRows(prev =>
                prev.map(row =>
                    row.id === id
                        ? {
                            ...row,
                            active_company: {
                                ...row.active_company,
                                active: newActive
                            }
                        }
                        : row
                )
            )

        } catch (error) {
            console.log(error)
        } finally {
            setToggleLoadingId(null)
        }
    }


    const handleDeleteCompany = async () => {
        try {
            setIsLoading(true)
            if (!companyId) return
            const data = await deleteCompanyService(companyId)
            setIsOpen(false)

            const newCompanyRows = companyRows.filter((row) => row.id !== companyId)
            setCompanyRows(newCompanyRows)
            if (newCompanyRows.length === 0) {
                setRefetch(!refetch);
            }
            setCompanyId(null)
            console.log(data)
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

    useEffect(() => { console.log(companyRows) }, [])

    const handleNavigate = (row) => {
        navigate("/companies/edit", { state: { rowData: row } });
    }

    return (
        <>
            <ImagePreview
                url={imageUrl}
                isOpen={isImagePreview}
                onClose={() => setIsImagePreview(false)}
                alt={"img"}
            />

            <Alert
                onConfirm={handleDeleteCompany}
                onCancel={() => setIsOpen(false)}
                isOpen={isOpen}
                message={"Are you sure you want to delete this item?"}
                confirmText='Delete'
                cancelText='Cancel'
                isLoading={isLoading}
            />

            <CompanyDrawer
                isOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                data={companyData}
                loading={false}
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
                                            className=" table-th border  border-gray-200 dark:bg-gray-800 dark:border-gray-600 "
                                        >
                                            <div className='flex items-center justify-between'>
                                                {column.label}

                                                {column.label === "Description" && (
                                                    <div
                                                        onClick={handleToggleLang}
                                                        className='bg-slate-100 dark:bg-gray-900
                                                        border-[1px] border-slate-200 dark:border-slate-500 w-8 h-8
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
                            <tbody className="bg-white transition-all">
                                {companyRows.length > 0 && companyRows.map((row, i) => (
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
                                            {row.app_name}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                            {row.logo ? (
                                                <img
                                                    src={row.logo}
                                                    alt={`${row.name} logo`}
                                                    className="w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-all active:scale-100  rounded-md border border-gray-200 dark:border-gray-600"
                                                    onClick={() => {
                                                        setIsImagePreview(true)
                                                        setImageUrl(row.logo)
                                                    }}
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">No logo</span>
                                            )}
                                        </td>

                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                            {toggleLoadingId === row.id ? (
                                                <Loader2 className="w-4 h-4 dark:text-white text-gray-800 animate-spin" />
                                            ) : (
                                                <Checkbox
                                                    value={row.id}
                                                    checked={row.active_company?.active === 1 || row.active_company?.active === true}
                                                    onChange={() => handleToggleActive(row.id, row.active_company?.active === null ? 1 : row.active_company?.active === 0 ? 1 : 0)}
                                                />
                                            )}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            <div className="flex items-center gap-2">
                                                <Edit
                                                    onClick={() => handleNavigate(row)}
                                                    size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                />
                                                <Trash2 onClick={() => {
                                                    setCompanyId(row.id)
                                                    setIsOpen(true)
                                                }} size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                />

                                                <Eye
                                                    onClick={() => {
                                                        console.log(row)

                                                        setCompanyData(row)
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
                </div>
            </div>
        </>
    )
}

export default CompaniesTable