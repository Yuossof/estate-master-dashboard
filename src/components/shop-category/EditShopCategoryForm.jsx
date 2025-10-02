/* eslint-disable react/prop-types */
import React from 'react'
import Input from '../shared/custom-ui/Input'
import { Edit } from 'lucide-react'
import CancelButton from '../CancelButton'

const EditShopCategoryForm = ({ shopCategory, setShopCategory, handleSubmit, errors, setErrors, isLoading }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors(prev => ({ ...prev, [name]: "" }))
        setShopCategory(prev => ({
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
                            value={shopCategory.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.name}</p>}
                    </div>

                    {/* Name Arabic */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="name_ar" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name Arabic</label>
                        <Input
                            type="text"
                            placeholder="Name Arabic"
                            name="name_ar"
                            id="name_ar"
                            value={shopCategory.name_ar}
                            onChange={handleChange}
                        />
                        {errors.name_ar && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.name_ar}</p>}
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

export default EditShopCategoryForm