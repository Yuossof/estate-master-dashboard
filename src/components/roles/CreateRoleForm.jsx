/* eslint-disable react/prop-types */
import React from 'react'
import Input from '../shared/custom-ui/Input'
import { Plus } from 'lucide-react'

const CreateRoleForm = ({ roleData, setRoleData, handleSubmit, errors, setErrors, isLoading }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors(prev => ({ ...prev, [name]: "" }))
        setRoleData(prev => ({
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
                            value={roleData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.name[0]}</p>}
                    </div>

                    {/* Name Arabic */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="name_ar" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name Arabic</label>
                        <Input
                            type="text"
                            placeholder="Guard Name"
                            name="guard_name"
                            id="guard_name"
                            value={roleData.guard_name}
                            onChange={handleChange}
                        />
                        {errors.name_ar && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.name_ar[0]}</p>}
                    </div>

                </div>
            </div>

            {/* Submit Button */}
            <div className='mt-6 flex w-full md:justify-end'>
                <button
                disabled={isLoading}
                style={{opacity: isLoading ? "0.6" : "1"}}
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

export default CreateRoleForm