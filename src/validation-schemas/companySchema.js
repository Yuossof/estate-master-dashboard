import * as Yup from "yup";

export const companySchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  name_ar: Yup.string()
    .required("Arabic name is required")
    .min(3, "Arabic name must be at least 3 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  description_ar: Yup.string()
    .required("Arabic description is required")
    .min(10, "Arabic description must be at least 10 characters"),

  color: Yup.string()
    .required("Color is required")
    .matches(/^#([0-9A-Fa-f]{6})$/, "Color must be in hex format (#rrggbb)"),

  facebook_url: Yup.string().url("Invalid Facebook URL").nullable(),
  privacy_policy_url: Yup.string().url("Invalid Privacy Policy URL").nullable(),
  about_us_url: Yup.string().url("Invalid About Us URL").nullable(),
  instagram_url: Yup.string().url("Invalid Instagram URL").nullable(),
  twitter_url: Yup.string().url("Invalid Twitter URL").nullable(),
  youtube_url: Yup.string().url("Invalid YouTube URL").nullable(),
  website_url: Yup.string().url("Invalid Website URL").nullable(),

  hotline: Yup.string()
    .required("Hotline is required")
    .matches(/^\d+$/, "Hotline must be a number"),

  fees_per_point: Yup.number()
    .typeError("Fees per point must be a number")
    .required("Fees per point is required")
    .positive("Fees per point must be positive"),

  // image: Yup.mixed()
  //   .required("Image is required")
  //   .test("fileSize", "Image size is too large", (value) => {
  //     if (!value) return true;
  //     return value.size <= 2 * 1024 * 1024; // 2MB
  //   })
  //   .test("fileType", "Unsupported file type", (value) => {
  //     if (!value) return true; 
  //     return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type);
  //   }),
});
