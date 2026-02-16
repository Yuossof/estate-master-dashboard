/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, X, User, Building2 } from "lucide-react"
import ExpandableText from "../ExpandableText"
import { getCompanyUserService } from "../../services/company-users"
import Spinner from "../Loading"
import { CardSpotlight } from "../ui/card-spotlight"
import useDarkmode from "../../hooks/useDarkMode"

const CompanyUserProfileDrawer = ({ isOpen, setIsDrawerOpen, onClose, userId }) => {
    const [isDark] = useDarkmode()
    const [companyUserData, setCompanyUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const [companyData, setCompanyData] = useState({})

    useEffect(() => {
        if (!userId) return
        const abort = new AbortController()
        const getUserData = async () => {
            try {
                setLoading(true)
                const data = await getCompanyUserService(userId, abort.signal)
                console.log(data.data)
                setCompanyUserData(data.data.user)
                setCompanyData(data.data.company)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getUserData()
        return () => abort.abort()
    }, [userId])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    onClick={() => setIsDrawerOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-[1000]"
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0" onClick={onClose}></div>

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="relative h-full w-full max-w-[600px] bg-white dark:bg-[var(--surface-elevated)] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CardSpotlight isDark={isDark} className={"bg-transparent w-full !mx-0 !px-0 h-full"}>
                            <div className="relative w-full h-full">
                                {/* Header */}
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] rounded-full transition-colors absolute dark:-top-5 top-3 right-4">
                                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </button>

                                {/* Content */}
                                <div className="overflow-y-auto h-full pb-20">
                                    {loading ? (
                                        <div className="flex flex-col justify-center items-center h-96 space-y-4">
                                            <motion.div
                                                className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    duration: 1,
                                                    ease: "linear",
                                                }}
                                            />
                                            <Spinner />
                                        </div>
                                    ) : (
                                        <div className="px-6 py-6 space-y-8">
                                            {/* User Section */}
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-2 pb-5 mb-4 border-b border-gray-100 dark:border-[var(--border-primary)]">
                                                    <User className="w-5 h-5 text-blue-600" />
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Information</h3>
                                                </div>

                                                <div className="flex items-start gap-4 py-4 dark:py-4 dark:px-3.5 bg-gray-50 dark:bg-[var(--surface-card)] rounded-lg">
                                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0">
                                                        {companyUserData.profile_image ? (
                                                            <img
                                                                src={companyUserData.profile_image || "/placeholder.svg"}
                                                                alt={companyUserData.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-full h-full">
                                                                <User className="w-8 h-8 text-blue-600" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                                                            {companyUserData.name || "No name provided"}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                            {companyUserData.email || "No email provided"}
                                                        </p>
                                                        {companyUserData.role && (
                                                            <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                                {companyUserData.role}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid gap-4">
                                                    <DetailCard label="User ID" value={companyUserData.id} />
                                                    <DetailCard label="Wallet" value={companyUserData.wallet} />
                                                    <DetailCard
                                                        label="Points Balance"
                                                        value={companyUserData.points ? `${companyUserData.points} pts` : "0 pts"}
                                                    />
                                                    <DetailCard label="Prefix" value={companyUserData.prefix || "Not set"} />

                                                    <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Device Token</span>
                                                            {companyUserData.device_token && (
                                                                <button
                                                                    onClick={() => copyToClipboard(companyUserData.device_token)}
                                                                    className="p-1 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] rounded transition-colors"
                                                                    title="Copy to clipboard"
                                                                >
                                                                    <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
                                                            {companyUserData.device_token || "No device token"}
                                                        </p>
                                                    </div>

                                                    <DetailCard
                                                        label="Notification Channel"
                                                        value={companyUserData.notifications_channel_id || "Not configured"}
                                                    />
                                                    <DetailCard
                                                        label="Email Verification"
                                                        value={companyUserData.email_verified_at ? "Verified" : "Not verified"}
                                                        status={companyUserData.email_verified_at ? "success" : "warning"}
                                                    />
                                                </div>
                                            </div>

                                            {/* Company Section */}
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-[var(--border-primary)]">
                                                    <Building2 className="w-5 h-5 text-green-600" />
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Company Information</h3>
                                                </div>

                                                <div className="flex items-start gap-4 py-4 dark:py-4 dark:px-3.5 bg-gray-50 dark:bg-[var(--surface-card)] rounded-lg">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex-shrink-0">
                                                        {companyData.logo ? (
                                                            <img
                                                                src={companyData.logo || "/placeholder.svg"}
                                                                alt={companyData.name}
                                                                className="w-full h-full object-contain p-2"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-full h-full">
                                                                <Building2 className="w-8 h-8 text-green-600" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                            {companyData.name || "Company name not available"}
                                                        </h4>
                                                        {companyData.name_ar && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{companyData.name_ar}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid gap-4">
                                                    <DetailCard label="Company ID" value={companyData.id | "Not specified"} />
                                                    <DetailCard label="Application Name" value={companyData.app_name || "Not specified"} />

                                                    {companyData.description && (
                                                        <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
                                                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Description</h5>
                                                            <ExpandableText
                                                                text={companyData.description}
                                                                limit={150}
                                                                className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                            />
                                                        </div>
                                                    )}

                                                    {companyData.description_ar && (
                                                        <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
                                                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Arabic Description</h5>
                                                            <ExpandableText
                                                                text={companyData.description_ar}
                                                                limit={150}
                                                                className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardSpotlight>


                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

/* Enhanced reusable DetailCard component with dark mode support */
const DetailCard = ({ label, value, status }) => (
    <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">{value}</span>
                {status === "success" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                {status === "warning" && <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>}
            </div>
        </div>
    </div>
)

export default CompanyUserProfileDrawer
