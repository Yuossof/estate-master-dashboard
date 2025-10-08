/* eslint-disable react/prop-types */
import React from 'react'
import Input from '../shared/custom-ui/Input'
import { Plus } from 'lucide-react'

const CreateUnitForm = ({ formData, setFormData, handleSubmit, errors, setErrors, isLoading }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors(prev => ({ ...prev, [name]: "" }))
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className='mt-6'>
            <div className='flex flex-col gap-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    {/* Name */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="name" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.name[0]}</p>}
                    </div>

                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="email" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
                        <Input
                            type="price"
                            placeholder="Price"
                            name="email"
                            id="email"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.price[0]}</p>}
                    </div>

                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="area" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Area</label>
                        <Input
                            type="area"
                            placeholder="Area"
                            name="area"
                            id="area"
                            value={formData.area}
                            onChange={handleChange}
                        />
                        {errors.area && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.area[0]}</p>}
                    </div>

                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="rooms" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Area</label>
                        <Input
                            type="rooms"
                            placeholder="Rooms"
                            name="rooms"
                            id="rooms"
                            value={formData.rooms}
                            onChange={handleChange}
                        />
                        {errors.rooms && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.rooms[0]}</p>}
                    </div>

                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="bathrooms" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Bathrooms</label>
                        <Input
                            type="bathrooms"
                            placeholder="Bathrooms"
                            name="bathrooms"
                            id="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                        />
                        {errors.bathrooms && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.bathrooms[0]}</p>}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className='mt-6 flex w-full md:justify-end'>
                <button
                    disabled={isLoading}
                    style={{ opacity: isLoading ? "0.6" : "1" }}
                    type="button"
                    className='btn-primary flex items-center gap-3 justify-center h-10 px-3 rounded-md md:w-auto w-full'
                    onClick={handleSubmit}
                >
                    <span>Create</span>
                    <Plus />
                </button>

            </div>
        </div>
    )
}

export default CreateUnitForm