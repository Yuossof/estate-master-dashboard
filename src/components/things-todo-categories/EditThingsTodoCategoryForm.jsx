/* eslint-disable react/prop-types */
import React from 'react'
import Input from '../shared/custom-ui/Input'
import { Edit, Image } from 'lucide-react'
import CancelButton from '../CancelButton'

const EditThingsTodoCategoryForm = ({ thingsTodoCategoryData, setThingsTodoCategoryData, handleSubmit, errors, setErrors, isLoading }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors(prev => ({ ...prev, [name]: "" }))
        setThingsTodoCategoryData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className='mt-6'>
            <div className='flex flex-col gap-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>

                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="name" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            value={thingsTodoCategoryData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.name[0]}</p>}
                    </div>

                    {/* Name Arabic */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="name_ar" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name Arabic</label>
                        <Input
                            type="text"
                            placeholder="Name Arabic"
                            name="name_ar"
                            id="name_ar"
                            value={thingsTodoCategoryData.name_ar}
                            onChange={handleChange}
                        />
                        {errors.name_ar && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.name_ar[0]}</p>}
                    </div>

                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="image" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Image
                        </label>

                        {/* Custom File Input */}
                        <div className="mt-2 flex flex-col items-center">
                            <label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center w-full h-32 px-3 border-2 border-dashed border-gray-300 dark:border-[var(--border-primary)] rounded-md cursor-pointer hover:border-blue-500 dark:hover:border-sky-400 transition-colors"
                            >
                                {thingsTodoCategoryData.image ? (
                                    <img
                                        src={thingsTodoCategoryData.image instanceof File ? URL.createObjectURL(thingsTodoCategoryData.image) : thingsTodoCategoryData.image}
                                        alt="Company Logo"
                                        className="w-20 h-20 object-contain mb-2 border-[1px] border-slate-200 rounded-md"
                                    />
                                ) : (
                                    <Image size={40} className="mb-2 text-gray-400" />
                                )}

                                <span className="text-gray-500 dark:text-gray-300 text-sm">
                                    Update Image
                                </span>
                            </label>

                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setThingsTodoCategoryData((prev) => ({
                                        ...prev,
                                        image: file,
                                        imagePreview: file ? URL.createObjectURL(file) : null,
                                    }));
                                }}
                            />
                        </div>

                        {errors.image && (
                            <p className="text-[13px] text-red-500 mt-2 ml-1">*{errors.image}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className='mt-6 flex w-full md:justify-end'>
                <CancelButton />
                <button
                    disabled={isLoading}
                    style={{ opacity: isLoading ? "0.6" : "1" }}
                    type="button"
                    className='btn-primary flex items-center gap-3 justify-center h-9 px-3 rounded-md md:w-auto w-full'
                    onClick={handleSubmit}
                >
                    <span>Update</span>
                    <Edit />
                </button>

            </div>
        </div>
    )
}

export default EditThingsTodoCategoryForm