/* eslint-disable react/prop-types */
import React from 'react'
import Input from '../shared/custom-ui/Input'
import { Plus } from 'lucide-react'

const CreateCompanyUserForm = ({ formData, setFormData, handleSubmit, errors, setErrors, isLoading }) => {

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

                    {/* Email */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="email" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.email[0]}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="password" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.password[0]}</p>}
                    </div>

                    {/* Role */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="role" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Role</label>
                        <Input
                            type="text"
                            placeholder="Role"
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                        />
                        {errors.role && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.role[0]}</p>}
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

export default CreateCompanyUserForm