/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Input from "../shared/custom-ui/Input";
import { Edit, Image as ImageIcon } from "lucide-react";
import TextArea from "../shared/custom-ui/Textarea";
import ToggleSelect from "../shared/custom-ui/ToggleSelect";
import CancelButton from "../CancelButton";

const EditProjectForm = ({
  project,
  setProject,
  handleSubmit,
  errors,
  setErrors,
  isLoading,
}) => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [mediaPreviews, setMediaPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setErrors((prev) => ({ ...prev, logo: "" }));
    setProject((prev) => ({
      ...prev,
      logo: file || null,
    }));
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files || []);
    setErrors((prev) => ({ ...prev, media: "" }));
    setProject((prev) => ({
      ...prev,
      media: files,
    }));
  };

  // Logo preview
  useEffect(() => {
    if (typeof project?.project_logo === "string" && project.project_logo) {
      setLogoPreview(project.project_logo);
      return;
    }

    if (project?.project_logo instanceof File) {
      const url = URL.createObjectURL(project.project_logo);
      setLogoPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    setLogoPreview(null);
  }, [project?.logo]);

  // Media previews
  useEffect(() => {
    if (Array.isArray(project?.all_media) && project.all_media.length > 0) {
      const urls = project.all_media.map((file) =>
        file instanceof File ? URL.createObjectURL(file) : file
      );
      setMediaPreviews(urls);

      return () => {
        urls.forEach((url) => {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
        });
      };
    }
    setMediaPreviews([]);
  }, [project?.media]);

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {/* Name */}
          <div className="flex flex-col min-w-[150px]">
            <label
              htmlFor="name"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Name
            </label>
            <Input
              type="text"
              placeholder="Project Name"
              name="name"
              id="name"
              value={project.name || ""}
              onChange={handleChange}
            />
          </div>

          {/* Name Arabic */}
          <div className="flex flex-col min-w-[150px]">
            <label
              htmlFor="name_ar"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Name Arabic
            </label>
            <Input
              type="text"
              placeholder="Project Name Arabic"
              name="name_ar"
              id="name_ar"
              value={project.name_ar || ""}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col min-w-[150px]">
            <label
              htmlFor="address"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Address
            </label>
            <Input
              type="text"
              placeholder="Address"
              name="address"
              id="address"
              value={project.address || ""}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col min-w-[150px]">
            <label
              htmlFor="phone_number"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Phone Number
            </label>
            <Input
              type="text"
              placeholder="Phone number"
              name="phone_number"
              id="phone_number"
              value={project.phone_number || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <ToggleSelect
              label="Active"
              value={project.active}
              onChange={(val) =>
                setProject((prev) => ({ ...prev, active: val }))
              }
            />
          </div>

          {/* WhatsApp Number */}
          <div className="flex flex-col min-w-[150px]">
            <label
              htmlFor="whatsapp_number"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              WhatsApp Number
            </label>
            <Input
              type="text"
              placeholder="Whatsapp number"
              name="whatsapp_number"
              id="whatsapp_number"
              value={project.whatsapp_number || ""}
              onChange={handleChange}
            />
          </div>

          {/* Unit Count */}
          <div className="flex flex-col min-w-[150px]">
            <label
              htmlFor="unit_count"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Unit Count
            </label>
            <Input
              type="text"
              placeholder="Count"
              name="unit_count"
              id="unit_count"
              value={project.unit_count || ""}
              onChange={handleChange}
            />
          </div>

          {/* Starting From */}
          <div className="flex flex-col min-w-[150px]">
            <label
              htmlFor="starting_from"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Starting From
            </label>
            <Input
              type="text"
              placeholder="Starting From"
              name="starting_from"
              id="starting_from"
              value={project.starting_from || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Description */}
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label
              htmlFor="description"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <TextArea
              placeholder="Description"
              name="description"
              id="description"
              value={project.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-[13px] text-red-500 mt-2 ml-1">
                *{errors.description}
              </p>
            )}
          </div>

          {/* Description Arabic */}
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label
              htmlFor="description_ar"
              className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description Arabic
            </label>
            <TextArea
              placeholder="Description Arabic"
              name="description_ar"
              id="description_ar"
              value={project.description_ar}
              onChange={handleChange}
            />
            {errors.description_ar && (
              <p className="text-[13px] text-red-500 mt-2 ml-1">
                *{errors.description_ar}
              </p>
            )}
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col min-w-[150px]">
          <label
            htmlFor="project_logo"
            className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Project Logo
          </label>

          <div className="mt-2 flex flex-col items-center">
            <label
              htmlFor="project_logo"
              className="flex flex-col items-center justify-center w-full h-32 px-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-blue-500 dark:hover:border-sky-400 transition-colors"
              aria-label="Upload project logo"
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Project Logo"
                  className="w-20 h-20 object-contain mb-2 border-[1px] border-slate-200 rounded-md bg-white"
                />
              ) : (
                <ImageIcon size={40} className="mb-2 text-gray-400" />
              )}

              <span className="text-gray-500 dark:text-gray-300 text-sm">
                Upload / Update Logo
              </span>
            </label>

            <input
              type="file"
              name="project_logo"
              id="project_logo"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {errors?.project_logo && (
            <p className="text-[13px] text-red-500 mt-2 ml-1">
              *{errors.project_logo}
            </p>
          )}
        </div>

        {/* Media */}
        <div className="flex flex-col min-w-[150px]">
          <label
            htmlFor="media"
            className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Project Media
          </label>

          <div className="mt-2 flex flex-col items-center">
            <label
              htmlFor="all_media"
              className="flex flex-col items-center justify-center w-full min-h-[130px] px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-blue-500 dark:hover:border-sky-400 transition-colors"
              aria-label="Upload media images"
            >
              {mediaPreviews.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-6 gap-3 w-full">
                  {mediaPreviews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-full aspect-square rounded-md overflow-hidden border bg-white shadow-sm"
                    >
                      <img
                        src={src}
                        alt={`Media ${idx + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <ImageIcon size={40} className="mb-2 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-300 text-sm">
                    Upload / Update Media
                  </span>
                </>
              )}
            </label>

            <input
              type="file"
              name="all_media"
              id="all_media"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleMediaChange}
            />
          </div>

          {errors?.all_media && (
            <p className="text-[13px] text-red-500 mt-2 ml-1">
              *{errors.all_media}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex w-full md:justify-end ">
        <CancelButton />
        <button
          disabled={isLoading}
          style={{ opacity: isLoading ? "0.6" : "1" }}
          type="button"
          className="btn-primary flex items-center gap-3 justify-center h-9 px-3 rounded-md md:w-auto w-full"
          onClick={handleSubmit}
        >
          <span>Update</span>
          <Edit />
        </button>
      </div>
    </div>
  );
};

export default EditProjectForm;
