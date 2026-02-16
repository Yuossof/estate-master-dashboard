import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Card from "../../../components/shared/ui/Card";
import { companySchema } from "../../../validation-schemas/companySchema";
import { createCompanyService } from "../../../services/company";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";
import EditCompanyForm from "../../../components/company/EditCompanyForm";

const defaultCompanyData = {
  name: "",
  name_ar: "",
  description: "",
  description_ar: "",
  color: "#000000",
  facebook_url: "",
  privacy_policy_url: "",
  about_us_url: "",
  instagram_url: "",
  twitter_url: "",
  youtube_url: "",
  website_url: "",
  hotline: "",
  fees_per_point: "",
  image: null,
};

const EditCompanyPage = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const existingData = location.state.rowData;

  const [companyData, setCompanyData] = useState(defaultCompanyData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingData) {
      setCompanyData({
        name: existingData.name || "",
        name_ar: existingData.name_ar || "",
        description: existingData.description || "",
        description_ar: existingData.description_ar || "",
        color: existingData.global_setting.color || "#000000",
        facebook_url: existingData.global_setting.facebook_url || "",
        privacy_policy_url: existingData.global_setting.privacy_policy_url || "",
        about_us_url: existingData.global_setting.about_us_url || "",
        instagram_url: existingData.global_setting.instagram_url || "",
        twitter_url: existingData.global_setting.twitter_url || "",
        youtube_url: existingData.global_setting.youtube_url || "",
        website_url: existingData.global_setting.website_url || "",
        hotline: existingData.global_setting.hotline || "",
        fees_per_point: existingData.global_setting.fees_per_point || "",
        image: existingData.logo || null,
      });
    }
  }, [existingData]);

  const handleSubmit = async () => {
    try {
      const formdata = new FormData();

      try {
        await companySchema.validate(companyData, { abortEarly: false });

        formdata.append("name", companyData.name);
        formdata.append("name_ar", companyData.name_ar);
        formdata.append("description", companyData.description);
        formdata.append("description_ar", companyData.description_ar);
        formdata.append("color", companyData.color);
        formdata.append("facebook_url", companyData.facebook_url);
        formdata.append("privacy_policy_url", companyData.privacy_policy_url);
        formdata.append("about_us_url", companyData.about_us_url);
        formdata.append("instagram_url", companyData.instagram_url);
        formdata.append("twitter_url", companyData.twitter_url);
        formdata.append("youtube_url", companyData.youtube_url);
        formdata.append("website_url", companyData.website_url);
        formdata.append("hotline", companyData.hotline);
        formdata.append("fees_per_point", companyData.fees_per_point);
        formdata.append("images[]", companyData.image);
        setErrors({});

      } catch (error) {
        if (error.inner) {
          const newErrors = {};
          error.inner.forEach((e) => {
            newErrors[e.path] = e.message;
          });
          console.log("Parsed errors:", newErrors);
          setErrors(newErrors);
        }
        return;
      }

      setIsLoading(true);
      const data = await createCompanyService(formdata);

      toast.success(data.message || data.massage)
      if (data.status === "success") {
        navigate("/companies")
      }

    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error(DEFAULT_API_ERROR.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <Card>
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Update Company</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Edit the details below to update this company</p>
        </div>
        <EditCompanyForm
          companyData={companyData}
          setCompanyData={setCompanyData}
          errors={errors}
          setErrors={setErrors}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default EditCompanyPage;