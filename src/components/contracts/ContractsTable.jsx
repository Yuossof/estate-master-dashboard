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

const ContractsTable = ({
    columns,
    contractsRows = [],
    setContractsRows,
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
    const [contractData, setContractData] = useState({})

    const handleDeleteProject = async () => {
        try {
            setIsLoading(true);
            const data = await deleteContractService(contractId);
            setIsOpen(false);
            console.log(data);

            const newRows = contractsRows.filter((row) => row.id !== contractId);
            setContractsRows(newRows);
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
                                {contractsRows.length > 0 ? (

                                    contractsRows.map((row, i) => (
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
                                                {row.contract_status || "-"}
                                            </td>


                                            <td className="table-td">
                                                {row.natural_id || "-"}
                                            </td>

                                            <td className="table-td">
                                                {row.presenter || "-"}
                                            </td>

                                            <td className="table-td">
                                                {row.rest_money || "-"}
                                            </td>
                                            <td className="table-td">
                                                {row.amount || "-"}
                                            </td>

                                            <td className="table-td">
                                                {row.contract_num || "-"}
                                            </td>
                                            <td className="table-td">
                                                {row.con_id || "-"}
                                            </td>
                                            <td className="table-td">
                                                {row.all_media ? (
                                                    <img
                                                        src={row.media[0]}
                                                        alt={` media`}
                                                        className="w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-all active:scale-100 rounded-md border border-gray-200 dark:border-[var(--border-primary)]"
                                                        onClick={() => {
                                                            setImagesPreviewData(row.all_media)
                                                            setIsMultiImagePreviewOpen(true)
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-gray-400 italic">No image</span>
                                                )}
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
                                                    <Eye
                                                        onClick={() => {
                                                            setContractData(row)
                                                            setIsDrawerOpen(true)
                                                        }}
                                                        size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
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

export default ContractsTable;
