/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Checkbox from "../../components/shared/ui/Checkbox";
import { Edit, Trash2, Loader2, Languages, Eye } from "lucide-react";
import Alert from "../shared/custom-ui/Alert";
// import {
//   deleteProjectService,
//   toggleActiveProjectService,
// } from "../../services/projects";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../ImagePreview";

import { ApiError, DEFAULT_API_ERROR } from "../../lib/error";
import { toast } from "react-toastify";
import MultiImagePreview from "../MultiImagePreview";
import ExpandableText from "../ExpandableText";
import { deleteProjectService } from "../../services/projects";
import ProjectDrawer from "./ProjectDrawer"
import MultiImagePreviewV2 from "../MultiImagePreviewV2";

const ProjectsTable = ({
    columns,
    projectRows = [],
    setProjectRows,
    setRefetch,
    refetch,
}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [unitId, setUnitId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toggleLoadingId, setToggleLoadingId] = useState(null);
    const [isImagePreview, setIsImagePreview] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [currentLang, setCurrentLang] = useState("en");
    const [imagesPreviewData, setImagesPreviewData] = useState([])
    const [isMultiImagePreviewOpen, setIsMultiImagePreviewOpen] = useState(false)
    const [projectData, setProjectData] = useState({})

    const handleToggleLang = () => {
        setCurrentLang((prev) => (prev === "en" ? "ar" : "en"));
    };

    const handleToggleActive = async (id, val) => {
        const formdata = new FormData();
        formdata.append("active", val);
        try {
            setToggleLoadingId(id);
            //   const data = await toggleActiveProjectService(id, formdata);

            setProjectRows((prev) =>
                prev.map((row) => (row.id === id ? { ...row, active: val } : row))
            );
            //   console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setToggleLoadingId(null);
        }
    };

    const handleDeleteProject = async () => {
        try {
            setIsLoading(true);
            const data = await deleteProjectService(unitId);
            setIsOpen(false);
            console.log(data);

            const newRows = projectRows.filter((row) => row.id !== unitId);
            setProjectRows(newRows);
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
            <ProjectDrawer
                setIsDrawerOpen={setIsDrawerOpen}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                data={projectData}
            />

            {/* Image Preview */}
            <ImagePreview
                url={imageUrl}
                isOpen={isImagePreview}
                onClose={() => setIsImagePreview(false)}
                alt={"Project Image"}
            />

            {/* Multi Image Preview */}
            {/* <MultiImagePreview
                isOpen={isMultiImagePreviewOpen}
                images={imagesPreviewData}
                onClose={() => setIsMultiImagePreviewOpen(false)}
            /> */}

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
                                                {column.label === "Description" && (
                                                    <div
                                                        onClick={handleToggleLang}
                                                        className="bg-slate-100 dark:bg-[var(--surface-elevated)] border-[1px] border-slate-200 dark:border-slate-500 w-8 h-8 cursor-pointer hover:shadow-lg hover:scale-110 active:-rotate-45 shadow-md rounded-full flex justify-center items-center transition-all duration-300"
                                                    >
                                                        <Languages
                                                            className="dark:text-gray-300 text-gray-600"
                                                            size={19}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-100 dark:divide-[var(--border-secondary)]">
                                {projectRows.length > 0 &&
                                    projectRows.map((row, i) => (
                                        <tr
                                            key={i}
                                            className={`align-top ${i % 2 !== 0
                                                ? "bg-gray-50/50 dark:bg-[var(--surface-zebra)]"
                                                : "bg-white dark:bg-transparent"
                                                }`}
                                        >
                                            {/* ID */}
                                            <td className="table-td">
                                                {row.id}
                                            </td>

                                            {/* Name */}
                                            <td className="table-td">
                                                {row.name}
                                            </td>

                                            {/* Image */}
                                            <td className="table-td">
                                                {row.project_logo ? (
                                                    <img
                                                        src={row.project_logo}
                                                        alt={`${row.name} logo`}
                                                        className="w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-all active:scale-100 rounded-md border border-gray-200 dark:border-[var(--border-primary)]"
                                                        onClick={() => {
                                                            setIsImagePreview(true);
                                                            setImageUrl(row.project_logo);
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-gray-400 italic">No image</span>
                                                )}
                                            </td>

                                            {/* Address */}
                                            <td className="table-td">
                                                <ExpandableText text={row.address} />
                                            </td>

                                            {/* Phone */}
                                            <td className="table-td">
                                                {row.phone_number}
                                            </td>

                                            {/* WhatsApp */}
                                            <td className="table-td">
                                                {row.whatsapp_number}
                                            </td>

                                            {/* Start Date */}
                                            <td className="table-td">
                                                {row.start_date}
                                            </td>

                                            {/* End Date */}
                                            <td className="table-td">
                                                {row.end_date}
                                            </td>
                                            <td className="table-td">
                                                {row.all_media ? (
                                                    <img
                                                        src={row.all_media[0]}
                                                        alt={`${row.name} media`}
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

                                            {/* Active */}
                                            <td className="table-td">
                                                {toggleLoadingId === row.id ? (
                                                    <Loader2 className="w-4 h-4 dark:text-white text-gray-800 animate-spin" />
                                                ) : (
                                                    <Checkbox
                                                        value={row.id}
                                                        checked={row.active === 1 || row.active === true}
                                                        onChange={() =>
                                                            handleToggleActive(
                                                                row.id,
                                                                row.active === 1 ? 0 : 1
                                                            )
                                                        }
                                                    />
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
                                                            setUnitId(row.id);
                                                        }}
                                                        size={20}
                                                        className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    />
                                                    <Eye
                                                        onClick={() => {
                                                            setProjectData(row)
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
    );
};

export default ProjectsTable;
