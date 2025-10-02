import { UNEXPECTED_ERROR } from "../constants/api"
import { useEffect, useState } from "react"
import { meService } from "../services/auth"
import { ApiError } from "../lib/error"
import useAuthStore from "../zustand/useAuthStore"
import Cookies from "js-cookie"

export const useAuth = () => {
    const { token } = useAuthStore()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getUserInfo = async () => {
            if (!token) {
                setUser(null)
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            
            try {
                const cookieToken = Cookies.get("token")
                if(!cookieToken) return
                const data = await meService(token)
                setUser(data.data)
            } catch (error) {
                if (error instanceof ApiError) {
                    setError({ errors: error.errors, status: error.status })
                } else {
                    setError(UNEXPECTED_ERROR)
                }
            } finally {
                setIsLoading(false)
            }
        }

        getUserInfo()
    }, [token])

    return { user, isLoading, error }
}