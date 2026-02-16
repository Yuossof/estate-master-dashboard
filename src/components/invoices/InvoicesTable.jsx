/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Alert from "../shared/custom-ui/Alert";
// import {
//   deleteProjectService,
//   toggleActiveProjectService,
// } from "../../services/projects";
import { useNavigate } from "react-router-dom";

import { ApiError, DEFAULT_API_ERROR } from "../../lib/error";
import { toast } from "react-toastify";
import { deleteContractService } from "../../services/contracts";

const InvoicesTable = ({
    columns,
    invoicesRows = [],
    setInvoicesRows,
    setRefetch,
    refetch,
}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [contractId, setContractId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleDeleteProject = async () => {
        try {
            setIsLoading(true);
            const data = await deleteContractService(contractId);
            setIsOpen(false);
            console.log(data);

            const newRows = invoicesRows.filter((row) => row.id !== contractId);
            setInvoicesRows(newRows);
            if (newRows.length === 0) {
                setRefetch(!refetch);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                toast.error(error.errors);
            } else {
                toast.error(DEFAULT_API_ERROR.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigate = (row) => {
        navigate("/projects/edit", { state: { rowData: row } });
    };

    return (
        <>

            {/* Delete Alert */}
            <Alert
                onConfirm={handleDeleteProject}
                onCancel={() => setIsOpen(false)}
                isOpen={isOpen}
                message={"Are you sure you want to delete this project?"}
                confirmText="Delete"
                cancelText="Cancel"
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
                                            <div className="flex items-center justify-between">
                                                {column.label}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-100 dark:divide-[var(--border-secondary)]">
                                {invoicesRows.length > 0 ? (
                                    invoicesRows.map((row, i) => (
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
                                                {row.invoice_number || "-"}
                                            </td>


                                            <td className="table-td">
                                                {row.invoice_date || "-"}
                                            </td>

                                            <td className="table-td">
                                                {row.due_date || "-"}
                                            </td>

                                            <td className="table-td">
                                                {row.amount_due || "-"}
                                            </td>
                                            <td className="table-td">
                                                {row.invoice_type_id || "-"}
                                            </td>

                                            <td className="table-td">
                                                {row.is_current ? "True" : "False"}
                                            </td>
                                            <td className="table-td">
                                                {row.notification_2days}
                                            </td>
                                            <td className="table-td">
                                                {row.notification_10days}
                                            </td>
                                            {/* Actions */}
                                            <td className="table-td">
                                                <div className="flex items-center gap-2">
                                                    <Edit
                                                        onClick={() => handleNavigate(row)}
                                                        size={20}
                                                        className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    />
                                                    <Trash2
                                                        onClick={() => {
                                                            setIsOpen(true);
                                                            setContractId(row.id);
                                                        }}
                                                        size={20}
                                                        className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    />
                                                    {/* <Eye
                                                        onClick={() => {
                                                            setInvoiceData(row)
                                                            setIsDrawerOpen(true)
                                                        }}
                                                        size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    /> */}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    )) : (
                                    <tr className='bg-gray-50/50 dark:bg-[var(--surface-zebra)]'>
                                        <td
                                            colSpan={10}
                                            className="text-center py-4  text-gray-500 dark:text-gray-400 "
                                        >
                                            No results found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
        </>
    );
};

export default InvoicesTable;
