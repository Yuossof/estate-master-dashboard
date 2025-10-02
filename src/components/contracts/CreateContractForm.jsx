/* eslint-disable react/prop-types */
import React from 'react'
import Input from '../shared/custom-ui/Input'
import { Plus } from 'lucide-react'

const CreateContractForm = ({ contractData, setContractData, handleSubmit, errors, setErrors, isLoading }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors(prev => ({ ...prev, [name]: "" }))
        setContractData(prev => ({
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
                        <label htmlFor="name" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Amount</label>
                        <Input
                            type="text"
                            placeholder="Amount"
                            name="amount"
                            id="amount"
                            value={contractData.amount}
                            onChange={handleChange}
                        />
                        {errors.amount && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.amount[0]}</p>}
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

export default CreateContractForm