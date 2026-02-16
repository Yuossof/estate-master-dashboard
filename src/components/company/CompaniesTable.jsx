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
            const data = await toggleActiveCompanyService(id, formdata)

            setCompanyRows(prev =>
                prev.map(row =>
                    row.id === id ? { ...row, active: val } : row
                )
            )
            console.log(data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setToggleLoadingId(null)
        }
    };

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

    useEffect(()=> {console.log(companyRows)}, [])

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

            <div className="overflow-x-auto rounded-lg border border-gray-200/80 dark:border-[var(--border-primary)]">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50/80 dark:bg-[var(--surface-elevated)]">
                            {columns.map((column, i) => (
                                <th
                                    key={i}
                                    scope="col"
                                    className={`px-4 sm:px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 border-b border-gray-200/80 dark:border-[var(--border-primary)] ${
                                        column.label === 'ID' ? 'w-[70px]' :
                                        column.label === 'Image' ? 'w-[80px]' :
                                        column.label === 'Active' ? 'w-[80px]' :
                                        column.label === 'Action' ? 'w-[120px]' : ''
                                    }`}
                                >
                                    <div className='flex items-center justify-between'>
                                        {column.label}

                                        {column.label === "Description" && (
                                            <button
                                                onClick={handleToggleLang}
                                                className="p-1.5 rounded-md bg-gray-100 dark:bg-[var(--surface-elevated)] border border-gray-200/80 dark:border-[var(--border-primary)] hover:bg-gray-200 dark:hover:bg-[var(--surface-hover)] active:scale-95 transition-all duration-200"
                                            >
                                                <Languages className="text-gray-500 dark:text-slate-400" size={16} />
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[var(--border-secondary)]">
                        {companyRows.length > 0 && companyRows.map((row, i) => (
                            <tr
                                key={i}
                                className="bg-white dark:bg-transparent hover:bg-gray-50/60 dark:hover:bg-[var(--surface-hover)] transition-colors duration-150 group"
                            >
                                {/* ID */}
                                <td className="px-4 sm:px-5 py-3.5 text-sm text-gray-400 dark:text-slate-500 font-mono tabular-nums">
                                    #{row.id}
                                </td>

                                {/* Name */}
                                <td className="px-4 sm:px-5 py-3.5 text-sm font-medium text-gray-800 dark:text-slate-100 truncate max-w-[200px]">
                                    {row.name}
                                </td>

                                {/* Arabic Name */}
                                <td className="px-4 sm:px-5 py-3.5 text-sm text-gray-700 dark:text-slate-200 truncate max-w-[200px]" dir="rtl">
                                    {row.name_ar}
                                </td>

                                {/* App Name */}
                                <td className="px-4 sm:px-5 py-3.5">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-[var(--surface-elevated)] text-gray-700 dark:text-slate-300">
                                        {row.app_name}
                                    </span>
                                </td>

                                {/* Logo */}
                                <td className="px-4 sm:px-5 py-3.5">
                                    {row.logo ? (
                                        <img
                                            src={row.logo}
                                            alt={`${row.name} logo`}
                                            className="w-9 h-9 object-contain rounded-lg border border-gray-200/80 dark:border-[var(--border-primary)] cursor-pointer hover:scale-105 hover:shadow-md active:scale-100 transition-all duration-200 bg-white dark:bg-[var(--surface-elevated)]"
                                            onClick={() => {
                                                setIsImagePreview(true)
                                                setImageUrl(row.logo)
                                            }}
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-lg border border-dashed border-gray-300 dark:border-[var(--border-primary)] flex items-center justify-center">
                                            <span className="text-gray-400 dark:text-slate-500 text-xs">N/A</span>
                                        </div>
                                    )}
                                </td>

                                {/* Active Toggle */}
                                <td className="px-4 sm:px-5 py-3.5 text-center">
                                    {toggleLoadingId === row.id ? (
                                        <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                                    ) : (
                                        <Checkbox
                                            value={row.id}
                                            checked={row.active_company?.active === 1 || row.active_company?.active === true}
                                            onChange={() => handleToggleActive(row.id, row.active_company?.active === null ? 1 : row.active_company?.active === 0 ? 1 : 0)}
                                        />
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-4 sm:px-5 py-3.5">
                                    <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-150">
                                        <button
                                            onClick={() => handleNavigate(row)}
                                            className="p-1.5 rounded-md text-gray-400 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/15 transition-colors duration-150"
                                            title="Edit"
                                        >
                                            <Edit size={17} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCompanyId(row.id)
                                                setIsOpen(true)
                                            }}
                                            className="p-1.5 rounded-md text-gray-400 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/15 transition-colors duration-150"
                                            title="Delete"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                console.log(row)
                                                setCompanyData(row)
                                                setIsDrawerOpen(true)
                                            }}
                                            className="p-1.5 rounded-md text-gray-400 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/15 transition-colors duration-150"
                                            title="View Details"
                                        >
                                            <Eye size={17} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {companyRows.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-gray-500 dark:text-slate-400">
                                    No companies found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CompaniesTable