import React from "react";
import { useState } from "react";
import { loginService } from "../../../services/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../../lib/error";
import useAuthStore from "../../../zustand/useAuthStore";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { setToken, setUser } = useAuthStore();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    const formdata = new FormData()
    formdata.append("email", loginData.email)
    formdata.append("password", loginData.password)
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginService(formdata)
      const token = data.data.token
      Cookies.set("token", token)
      setToken(token)
      setUser(data.data.user)
      navigate("/dashboard")
    } catch (error) {
      console.log(error, "message")
      if (error instanceof ApiError) {
        if (error.status === 401) {
          toast.error(error.errors)
          return
        }
        setErrors(error.errors)
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4  bg-gray-50 dark:bg-[var(--surface-elevated)] p-3 rounded-lg">
      {/* Email */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="px-3 py-2 text-sm border w-full rounded-md 
        bg-gray-100 dark:bg-[var(--surface-elevated)]
        border-gray-300 dark:border-[var(--border-primary)] 
        shadow-sm hover:border-gray-400 dark:hover:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500
        text-gray-900 dark:text-gray-100 mt-2"
        />
        {errors.email && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.email[0]}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleChange}
          disabled={isLoading}
          className="px-3 py-2 text-sm border w-full rounded-md 
        bg-gray-100 dark:bg-[var(--surface-elevated)]
        border-gray-300 dark:border-[var(--border-primary)] 
        shadow-sm hover:border-gray-400 dark:hover:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500
        text-gray-900 dark:text-gray-100 mt-2"
        />
        {errors.password && <p className='text-[13px] text-red-500 mt-2 ml-1'>*{errors.password[0]}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full text-center py-2 rounded-md flex items-center justify-center gap-2
         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-blue-500
         hover:bg-blue-500 transition"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>

  );
};

export default LoginForm;
