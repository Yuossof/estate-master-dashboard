/* eslint-disable react/prop-types */
import React from 'react'
import Input from '../shared/custom-ui/Input'
import { Edit } from 'lucide-react'
import CancelButton from '../CancelButton'

const EditOptionForm = ({ options, setOptions, handleSubmit, errors, setErrors, isLoading }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors(prev => ({ ...prev, [name]: "" }))
        setOptions(prev => ({
            ...prev,
            [name]: value,
            item_value_ar: "hellllo"
        }))
    }

    return (
        <div className='mt-6'>
            <div className='flex flex-col gap-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>

                    {/* Item Key */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="item_key" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Item Key</label>
                        <Input
                            type="text"
                            placeholder="Item Key"
                            name="item_key"
                            id="item_key"
                            value={options.item_key}
                            onChange={handleChange}
                        />
                        {errors.item_key && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.item_key}</p>}
                    </div>

                    {/* Item value */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="item_value" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Item Value</label>
                        <Input
                            type="text"
                            placeholder="Item Value"
                            name="item_value"
                            id="item_value"
                            value={options.item_value}
                            onChange={handleChange}
                        />
                        {errors.item_value && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.item_value}</p>}
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

export default EditOptionForm