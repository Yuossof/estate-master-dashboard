import React, { useState } from "react";
import Card from "../../../components/shared/ui/Card";
import CreateCompanyForm from "../../../components/company/CreateCompanyForm";
import { companySchema } from "../../../validation-schemas/companySchema";
import { createCompanyService } from "../../../services/company";
import { useNavigate } from "react-router-dom";
import { ApiError, DEFAULT_API_ERROR } from "../../../lib/error";

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

const CreateCompanyPage = () => {
  const navigate = useNavigate()
  const [companyData, setCompanyData] = useState(defaultCompanyData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
          setErrors(newErrors);
        }
        return;
      }

      setIsLoading(true);
      await createCompanyService(formdata);
      navigate("/companies")
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.errors)
      }else {
        setErrors(DEFAULT_API_ERROR.errors)
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}

      <Card>
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create New Company</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in the details below to register a new company</p>
        </div>

        <CreateCompanyForm
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

export default CreateCompanyPage;
