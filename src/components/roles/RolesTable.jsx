/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { useNavigate } from 'react-router-dom';
import { ApiError, DEFAULT_API_ERROR } from '../../lib/error';
import { toast } from 'react-toastify';
import { deleteRoleService } from '../../services/roles';
import { formatDate } from '../../utility/date-format';

const RolesTable = ({ columns, roleRows = [], setRoleRows, setRefetch, refetch }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [roleId, setRoleId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteRole = async () => {
        try {
            setIsLoading(true)
            const data = await deleteRoleService(roleId)
            setIsOpen(false)

            const newRoleRows = roleRows.filter((row) => row.id !== roleId)
            setRoleRows(newRoleRows)
            if (newRoleRows.length === 0) {
                setRefetch(!refetch);
            }
            console.log("success data", data)
            // toast.success(data.massage)
        } catch (error) {
            console.log("caught error:", error);
            console.log("is ApiError?", error instanceof ApiError);
            console.log("error.constructor.name:", error.constructor.name);
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
        navigate("/roles/edit", { state: { rowData: row } });
    }

    return (
        <>
            <Alert
                onConfirm={handleDeleteRole}
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
                            <tbody className="bg-white">
                                {roleRows.length > 0 ? (
                                    roleRows.map((row, i) => (
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
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.name}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.guard_name}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.role_service}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {formatDate(row.created_at)}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {formatDate(row.updated_at)}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Edit
                                                        onClick={() => handleNavigate(row)}
                                                        size={20}
                                                        className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    />
                                                    <Trash2
                                                        onClick={() => {
                                                            setIsOpen(true);
                                                            setRoleId(row.id);
                                                        }}
                                                        size={20}
                                                        className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className='bg-blue-50 dark:bg-[#0f172af7]'>
                                        <td
                                            colSpan={7}
                                            className="text-center py-4  text-gray-500 dark:text-gray-400"
                                        >
                                            No results found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RolesTable