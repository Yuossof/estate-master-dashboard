import { isAxiosError } from "axios";

export class ApiError extends Error {
    status;
    errors;
    constructor(errors, status) {
        super("Validation Error"); 
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}


export const DEFAULT_API_ERROR = {
    errors: "Something went wrong",
    status: undefined,
};


export const handleApiError = (error) => {
  let apiErr = { ...DEFAULT_API_ERROR };

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const err = error.response?.data;

    if ((err?.errors && Object.keys(err.errors).length > 0) || (err?.error && Object.keys(err.error).length > 0)) {
      apiErr.errors = err.errors || err.error;
      apiErr.status = status;
    } else {
      apiErr = { ...DEFAULT_API_ERROR };
    }
  } else {
    apiErr = { ...DEFAULT_API_ERROR };
  }


  throw new ApiError(apiErr.errors, apiErr.status);
};
