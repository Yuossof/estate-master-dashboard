/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react';
import Alert from "../shared/custom-ui/Alert"
import { useNavigate } from 'react-router-dom';
import { ApiError, DEFAULT_API_ERROR } from '../../lib/error';
import { toast } from 'react-toastify';
import ImagePreview from '../ImagePreview';
import { deleteThingsTodoCategoriesService } from '../../services/things-todo-categories';

const ThingsTodoCategoriesTable = ({ columns, thingsTodoCategories = [], setThingsTodoCategories, setRefetch, refetch }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [thingsTdoCategoryId, setThingsTdoCategoryId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isImagePreview, setIsImagePreview] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    const handleDeleteShopCategoryId = async () => {
        try {
            setIsLoading(true)
            const data = await deleteThingsTodoCategoriesService(thingsTdoCategoryId)
            setIsOpen(false)

            const newThingsTdoCategories = thingsTodoCategories.filter((row) => row.id !== thingsTdoCategoryId)
            setThingsTodoCategories(newThingsTdoCategories)
            if (newThingsTdoCategories.length === 0) {
                setRefetch(!refetch);
            }
            console.log("success data", data)
            // toast.success(data.massage)
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


    const handleNavigate = (row) => {
        navigate("/things-todo-categories/edit", { state: { rowData: row } });
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
                onConfirm={handleDeleteShopCategoryId}
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
                                {thingsTodoCategories.length > 0 && thingsTodoCategories.map((row, i) => (
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
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                            {row.image_url ? (
                                                <img
                                                    src={row.image_url}
                                                    alt={`${row.name} image`}
                                                    className="w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-all active:scale-100  rounded-md border border-gray-200 dark:border-gray-600"
                                                    onClick={() => {
                                                        setIsImagePreview(true)
                                                        setImageUrl(row.image_url)
                                                    }}
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">No Image</span>
                                            )}
                                        </td>
                                        <td className="table-td border border-gray-200 dark:bg-gray-800 dark:border-gray-600 ">
                                            <div className="flex items-center gap-2">
                                                <Edit
                                                    onClick={() => handleNavigate(row)}
                                                    size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                />
                                                <Trash2 onClick={() => {
                                                    setIsOpen(true)
                                                    setThingsTdoCategoryId(row.id)
                                                }} size={20} className="dark:text-gray-400 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
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

export default ThingsTodoCategoriesTable