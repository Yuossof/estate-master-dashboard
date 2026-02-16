/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User } from "lucide-react"
import Spinner from "../Loading"
import { getPointUserService } from "../../services/point-users"

const AllPointUsersDrawer = ({ isOpen, setIsDrawerOpen, onClose, userId }) => {
    const [pointUser, setPointUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!userId) return
        const abort = new AbortController()
        const getUserData = async () => {
            try {
                setLoading(true)
                const data = await getPointUserService(userId, abort.signal)
                console.log(data.data)
                // setPointUsers(data.data)
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
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])


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
                        {/* Header */}
                        <div className="sticky top-0 bg-white dark:bg-[var(--surface-elevated)] border-b border-gray-200 dark:border-[var(--border-primary)] px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Profile Details</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

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
                                pointUser && (
                                    <div className="px-6 py-6 space-y-8">
                                        {/* User Section */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-[var(--border-primary)]">
                                                <User className="w-5 h-5 text-blue-600" />
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Information</h3>
                                            </div>

                                            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-[var(--surface-card)] rounded-lg">
                                                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0">
                                                    {pointUser.user.profile_image ? (
                                                        <img
                                                            src={pointUser.user.profile_image}
                                                            alt={pointUser.user.name}
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
                                                        {pointUser.user.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                        {pointUser.user.email}
                                                    </p>
                                                    {pointUser.user.prefix && (
                                                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                            {pointUser.user.prefix}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid gap-4">
                                                <DetailCard label="User ID" value={pointUser.user.id} />
                                                <DetailCard label="Wallet" value={pointUser.user.wallet} />
                                                <DetailCard label="Points Balance" value={`${pointUser.user.points} pts`} />
                                                <DetailCard
                                                    label="Email Verification"
                                                    value={pointUser.user.email_verified_at ? "Verified" : "Not verified"}
                                                    status={pointUser.user.email_verified_at ? "success" : "warning"}
                                                />
                                                <DetailCard
                                                    label="Notification Channel"
                                                    value={pointUser.user.notifications_channel_id || "Not set"}
                                                />
                                            </div>
                                        </div>

                                        {/* Points Transaction Section */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-[var(--border-primary)]">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Points Transaction</h3>
                                            </div>
                                            <DetailCard label="Transaction ID" value={pointUser.id} />
                                            <DetailCard label="Points" value={pointUser.points} />
                                            <DetailCard label="Decrement" value={pointUser.decrement} />
                                            <DetailCard label="Created At" value={new Date(pointUser.created_at).toLocaleString()} />
                                            <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
                                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h5>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{pointUser.description}</p>
                                            </div>
                                            {pointUser.description_ar && (
                                                <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
                                                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الوصف بالعربية</h5>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{pointUser.description_ar}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

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

export default AllPointUsersDrawer
