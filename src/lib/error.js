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
  console.log(error)
  let apiErr = { ...DEFAULT_API_ERROR };

  const status = error.response?.status;
  if (isAxiosError(error)) {
    const err = error.response?.data;

    if(status === 401) {
      apiErr.errors = err.message
      apiErr.status = status
    }

    if ((err?.errors && Object.keys(err.errors).length > 0) || (err?.error && Object.keys(err.error).length > 0) && err.status_code !== 401) {
      apiErr.errors = err.errors || err.error;
      apiErr.status = status;
    } else {
      if(err.status_code !== 401) {
        apiErr = { ...DEFAULT_API_ERROR };
      }
    }

  } else {
    apiErr = { ...DEFAULT_API_ERROR };
  }


  throw new ApiError(apiErr.errors, apiErr.status);
};
