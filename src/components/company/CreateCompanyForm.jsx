/* eslint-disable react/prop-types */
import React from 'react'
import Input from '../shared/custom-ui/Input'
import TextArea from '../shared/custom-ui/Textarea'
import { Image, Plus } from 'lucide-react'
import { ColorPicker } from "../shared/custom-ui/ColorPicker"

const CreateCompanyForm = ({ companyData, setCompanyData, handleSubmit, errors, setErrors, isLoading }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors(prev => ({ ...prev, [name]: "" }))
        setCompanyData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className='mt-6'>
            <div className='flex flex-col gap-4'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    {/* Name */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="name" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            value={companyData.name}
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
                            value={companyData.name_ar}
                            onChange={handleChange}
                        />
                        {errors.name_ar && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.name_ar}</p>}
                    </div>


                    {/* Color */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="color" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Color</label>
                        <ColorPicker
                            className="mt-2"
                            value={companyData.color}
                            onChange={(color) =>
                                setCompanyData(prev => ({ ...prev, color }))
                            }
                        />
                        {errors.color && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.color}</p>}
                    </div>

                    {/* Facebook */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="facebook_url" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Facebook</label>
                        <Input
                            type="text"
                            placeholder="https://example.com"
                            name="facebook_url"
                            id="facebook_url"
                            value={companyData.facebook_url}
                            onChange={handleChange}
                        />
                        {errors.facebook_url && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.facebook_url}</p>}
                    </div>

                    {/* About Us */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="about_us_url" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">About Us</label>
                        <Input
                            type="text"
                            placeholder="https://example.com"
                            name="about_us_url"
                            id="about_us_url"
                            value={companyData.about_us_url}
                            onChange={handleChange}
                        />
                        {errors.about_us_url && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.about_us_url}</p>}
                    </div>

                    {/* Privacy Policy */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="privacy_policy_url" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Privacy Policy</label>
                        <Input
                            type="text"
                            placeholder="https://example.com"
                            name="privacy_policy_url"
                            id="privacy_policy_url"
                            value={companyData.privacy_policy_url}
                            onChange={handleChange}
                        />
                        {errors.privacy_policy_url && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.privacy_policy_url}</p>}
                    </div>

                    {/* Instagram */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="instagram_url" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Instagram</label>
                        <Input
                            type="text"
                            placeholder="https://example.com"
                            name="instagram_url"
                            id="instagram_url"
                            value={companyData.instagram_url}
                            onChange={handleChange}
                        />
                        {errors.instagram_url && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.instagram_url}</p>}
                    </div>

                    {/* Twitter */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="twitter_url" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Twitter</label>
                        <Input
                            type="text"
                            placeholder="https://example.com"
                            name="twitter_url"
                            id="twitter_url"
                            value={companyData.twitter_url}
                            onChange={handleChange}
                        />
                        {errors.twitter_url && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.twitter_url}</p>}
                    </div>

                    {/* Youtube */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="youtube_url" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Youtube</label>
                        <Input
                            type="text"
                            placeholder="https://example.com"
                            name="youtube_url"
                            id="youtube_url"
                            value={companyData.youtube_url}
                            onChange={handleChange}
                        />
                        {errors.youtube_url && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.youtube_url}</p>}
                    </div>

                    {/* Website */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="website_url" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Website</label>
                        <Input
                            type="text"
                            placeholder="https://example.com"
                            name="website_url"
                            id="website_url"
                            value={companyData.website_url}
                            onChange={handleChange}
                        />
                        {errors.website_url && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.website_url}</p>}
                    </div>

                    {/* Hotline */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="hotline" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Hotline</label>
                        <Input
                            type="text"
                            placeholder="EX:00000"
                            name="hotline"
                            id="hotline"
                            value={companyData.hotline}
                            onChange={handleChange}
                        />
                        {errors.hotline && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.hotline}</p>}
                    </div>

                    {/* Fees per point */}
                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="fees_per_point" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Fees per point</label>
                        <Input
                            type="text"
                            placeholder="Fees"
                            name="fees_per_point"
                            id="fees_per_point"
                            value={companyData.fees_per_point}
                            onChange={handleChange}
                        />
                        {errors.fees_per_point && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.fees_per_point}</p>}
                    </div>

                    <div className="flex flex-col min-w-[150px]">
                        <label htmlFor="logo" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Logo
                        </label>

                        {/* Custom File Input */}
                        <div className="mt-2 flex flex-col items-center">
                            <label
                                htmlFor="logo"
                                className="flex flex-col items-center justify-center w-full h-32 px-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-blue-500 dark:hover:border-sky-400 transition-colors"
                            >
                                {companyData.image ? (
                                    <img
                                        src={companyData.image instanceof File ? URL.createObjectURL(companyData.image) : companyData.image}
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
                                name="logo"
                                id="logo"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setCompanyData((prev) => ({
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

                {/* Textareas */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex flex-col flex-1 min-w-[150px]">
                        <label htmlFor="description" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
                        <TextArea
                            placeholder="Description"
                            name="description"
                            id="description"
                            value={companyData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.description}</p>}
                    </div>

                    <div className="flex flex-col flex-1 min-w-[150px]">
                        <label htmlFor="description_ar" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">Description Arabic</label>
                        <TextArea
                            placeholder="Description Arabic"
                            name="description_ar"
                            id="description_ar"
                            value={companyData.description_ar}
                            onChange={handleChange}
                        />
                        {errors.description_ar && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.description_ar}</p>}
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

export default CreateCompanyForm