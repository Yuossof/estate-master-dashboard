/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import Alert from "../shared/custom-ui/Alert";
// import {
//   deleteProjectService,
//   toggleActiveProjectService,
// } from "../../services/projects";
import { useNavigate } from "react-router-dom";

import { ApiError, DEFAULT_API_ERROR } from "../../lib/error";
import { toast } from "react-toastify";
import MultiImagePreviewV2 from "../MultiImagePreviewV2";
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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [contractId, setContractId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imagesPreviewData, setImagesPreviewData] = useState([])
    const [isMultiImagePreviewOpen, setIsMultiImagePreviewOpen] = useState(false)
    const [invoiceData, setInvoiceData] = useState({})


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
            <MultiImagePreviewV2
                isOpen={isMultiImagePreviewOpen}
                images={imagesPreviewData}
                onClose={() => setIsMultiImagePreviewOpen(false)}
            />
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

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle ">
                    <div className="overflow-hidden ">
                        <table className="min-w-full border border-gray-200 table-fixed dark:border-gray-600 border-collapse">
                            <thead>
                                <tr>
                                    {columns.map((column, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="table-th border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
                                        >
                                            <div className="flex items-center justify-between">
                                                {column.label}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white transition-all">
                                {invoicesRows.length > 0 &&
                                    invoicesRows.map((row, i) => (
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
                                                {row.invoice_number || "-"}
                                            </td>


                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.invoice_date || "-"}
                                            </td>

                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.due_date || "-"}
                                            </td>

                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.amount_due || "-"}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.invoice_type_id || "-"}
                                            </td>

                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.is_current ? "True" : "False"}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.notification_2days}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.notification_10days}
                                            </td>
                                            {/* Actions */}
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
                                                            setContractId(row.id);
                                                        }}
                                                        size={20}
                                                        className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    />
                                                    <Eye
                                                        onClick={() => {
                                                            setInvoiceData(row)
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
    );
};

export default InvoicesTable;
