/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Checkbox from "../../components/shared/ui/Checkbox";
import { Edit, Trash2, Loader2, Languages, Eye } from "lucide-react";
import Alert from "../shared/custom-ui/Alert";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../ImagePreview";
import { ApiError, DEFAULT_API_ERROR } from "../../lib/error";
import { toast } from "react-toastify";
import ExpandableText from "../ExpandableText";
import { deleteUnitService } from "../../services/units";
import UnitDrawer from "./UnitDrawer";
import MultiImagePreviewV2 from "../MultiImagePreviewV2";

const UnitsTable = ({
    columns,
    unitsRows = [],
    setUnitsRows,
    setRefetch,
    refetch,
}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [unitId, setUnitId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toggleLoadingId, setToggleLoadingId] = useState(null);
    const [isImagePreview, setIsImagePreview] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [currentLang, setCurrentLang] = useState("en");
    const [isMultiImagePreviewOpen, setIsMultiImagePreviewOpen] = useState(false)
    const [imagesPreviewData, setImagesPreviewData] = useState([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [unitData, setUnitData] = useState({})

    const handleToggleLang = () => {
        setCurrentLang((prev) => (prev === "en" ? "ar" : "en"));
    };

    const handleToggleActive = async (id, val) => {
        const formdata = new FormData();
        formdata.append("active", val);
        try {
            setToggleLoadingId(id);
            setUnitsRows((prev) =>
                prev.map((row) => (row.id === id ? { ...row, active: val } : row))
            );
        } catch (error) {
            console.log(error);
        } finally {
            setToggleLoadingId(null);
        }
    };

    const handleDeleteUnit = async () => {
        try {
            setIsLoading(true);
            const data = await deleteUnitService(unitId);
            setIsOpen(false);
            console.log(data);

            const newRows = unitsRows.filter((row) => row.id !== unitId);
            setUnitsRows(newRows);
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
            <UnitDrawer
                setIsDrawerOpen={setIsDrawerOpen}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                data={unitData}
            />

            {/* Image Preview */}
            <ImagePreview
                url={imageUrl}
                isOpen={isImagePreview}
                onClose={() => setIsImagePreview(false)}
                alt={"Unit Image"}
            />

            <MultiImagePreviewV2
                isOpen={isMultiImagePreviewOpen}
                images={imagesPreviewData}
                onClose={() => setIsMultiImagePreviewOpen(false)}
            />

            {/* Delete Alert */}
            <Alert
                onConfirm={handleDeleteUnit}
                onCancel={() => setIsOpen(false)}
                isOpen={isOpen}
                message={"Are you sure you want to delete this unit?"}
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
                                                {column.label === "Description" && (
                                                    <div
                                                        onClick={handleToggleLang}
                                                        className="bg-slate-100 dark:bg-gray-900 border-[1px] border-slate-200 dark:border-slate-500 w-8 h-8 cursor-pointer hover:shadow-lg hover:scale-110 active:-rotate-45 shadow-md rounded-full flex justify-center items-center transition-all duration-300"
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
                            <tbody className="bg-white transition-all">
                                {unitsRows.length > 0 &&
                                    unitsRows.map((row, i) => (
                                        <tr
                                            key={i}
                                            className={`align-top ${i % 2 !== 0
                                                ? "bg-blue-50 dark:bg-[#0f172aef]"
                                                : "bg-white dark:bg-[#0f172af7]"
                                                }`}
                                        >
                                            {/* ID */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.id}
                                            </td>

                                            {/* Name */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.name}
                                            </td>

                                            {/* Image */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.main_image ? (
                                                    <img
                                                        src={row.main_image}
                                                        alt={`${row.name} logo`}
                                                        className="w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-all active:scale-100 rounded-md border border-gray-200 dark:border-gray-600"
                                                        onClick={() => {
                                                            setIsImagePreview(true);
                                                            setImageUrl(row.main_image);
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-gray-400 italic">
                                                        No image
                                                    </span>
                                                )}
                                            </td>

                                            {/* Location */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                <ExpandableText text={row.location} />
                                            </td>

                                            {/* Phone */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.phone_number}
                                            </td>

                                            {/* WhatsApp */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.whatsapp_number}
                                            </td>

                                            {/* Delivery Date */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.delivery_date}
                                            </td>

                                            {/* Area */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.area} m²
                                            </td>

                                            {/* Price */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.price} EGP
                                            </td>

                                            {/* Rooms */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.rooms}
                                            </td>

                                            {/* Bathrooms */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.bathrooms}
                                            </td>

                                            {/* Floor */}
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.floor}
                                            </td>
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                {row.all_media ? (
                                                    <img
                                                        src={row.all_media[0]}
                                                        alt={`${row.name} media`}
                                                        className="w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-all active:scale-100 rounded-md border border-gray-200 dark:border-gray-600"
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
                                            <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
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
                                                            setUnitId(row.id);
                                                        }}
                                                        size={20}
                                                        className="dark:text-gray-400 text-gray-500 ho  ver:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                    />
                                                    <Eye
                                                        onClick={() => {
                                                            setUnitData(row)
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

export default UnitsTable;
