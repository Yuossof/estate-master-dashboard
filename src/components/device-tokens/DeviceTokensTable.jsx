/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Copy, CopyCheck, Edit, Eye, Trash2 } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { useNavigate } from 'react-router-dom';
import { deleteOptionService } from '../../services/options';
import { formatDate } from '../../utility/date-format';
import { copyText } from '../../utility/copy';

const DeviceTokensTable = ({ columns, deviceTokensRows = [], setDeviceTokensRows, setRefetch, refetch }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [optionId, setOptionId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isCopied, setIsCopied] = useState({
        id: "",
        bool: false
    })

    const handleCopy = (text, id) => {
        copyText(text)
        setIsCopied({
            id,
            bool: true
        })

        setTimeout(() => {
            setIsCopied({
                id: "",
                bool: false
            })
        }, 1000)
    }

    const handleDeleteOption = async () => {
        try {
            setIsLoading(true)
            const data = await deleteOptionService(optionId)
            setIsOpen(false)

            const newOptions = deviceTokensRows.filter((row) => row.id !== optionId)
            setDeviceTokensRows(newOptions)
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
                                {deviceTokensRows.length > 0 && deviceTokensRows.map((row, i) => (
                                    <tr key={i}
                                        className={`align-top ${i % 2 !== 0
                                            ? "bg-blue-50 dark:bg-[#0f172aef]"
                                            : "bg-white dark:bg-[#0f172af7]"
                                            }`}
                                    >

                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                            {row.id}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user_id}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.device_type || "-"}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                            {row.token ? (
                                                <div className="flex items-center gap-2">
                                                    <span title={row.token}>
                                                        {row.token.slice(0, 25)}...
                                                    </span>
                                                    <button
                                                        onClick={() => handleCopy(row.token, row.id)}
                                                        className="text-blue-500 hover:scale-110 transition text-sm"
                                                    >
                                                        {isCopied.bool && row.id === isCopied.id && (
                                                            <CopyCheck size={20} />
                                                        )}

                                                        {isCopied.id !== row.id && (
                                                            <Copy size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </td>

                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user.name || "-"}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user.email || "-"}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user.prefix || ""}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user.points || "-"}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.user.wallet || "-"}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.notifications_channel_id || "-"}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {formatDate(row.user.email_verified_at) || "-"}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {row.notifications_channel_id || "-"}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {formatDate(row.last_used_at)}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {formatDate(row.created_at)}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            {formatDate(row.updated_at)}
                                        </td>

                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            <div className="flex items-center gap-2">
                                                <Edit
                                                    onClick={() => handleNavigate(row)}
                                                    size={20}
                                                    className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                />
                                                <Trash2 onClick={() => {
                                                    return
                                                    setIsOpen(true)
                                                    setOptionId(row.id)
                                                }} size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
                                                <Eye
                                                    onClick={() => {
                                                        setOptionId(row.id)
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

export default DeviceTokensTable