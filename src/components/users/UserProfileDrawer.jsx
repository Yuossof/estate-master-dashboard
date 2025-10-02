/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, User, X } from "lucide-react"
import { getUserService } from "../../services/users"
import Spinner from "../Loading"
import { CardSpotlight } from "../ui/card-spotlight"
import { delay } from "../../lib/delay.js"
import useDarkmode from "../../hooks/useDarkMode.js"

const UserProfileDrawer = ({ isOpen, setIsDrawerOpen, onClose, userId }) => {
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false)
  const [isDark] = useDarkmode()

  useEffect(() => {
    if (!userId) return
    const abort = new AbortController()
    const getUserData = async () => {
      try {
        setLoading(true)
        await delay(2000)
        const data = await getUserService(userId, abort.signal)
        setUserData(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getUserData()
    return () => abort.abort()
  }, [userId])

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
            className="h-full w-full max-w-[600px] bg-white dark:bg-gray-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardSpotlight isDark={isDark} className={"bg-transparent w-full !mx-0 !px-0 h-full"}>
              <div className="relative w-full h-full">
                {/* Header */}
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors absolute dark:-top-5 top-3 right-4">
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
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                          <User className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Information</h3>
                        </div>

                        <div className="flex items-start gap-4 py-4 dark:py-4 dark:px-3.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0">
                            {userData.profile_image ? (
                              <img
                                src={userData.profile_image || "/placeholder.svg"}
                                alt={userData.name}
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
                              {userData.name || "No name provided"}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {userData.email || "No email provided"}
                            </p>
                            {userData.role && (
                              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {userData.role}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <DetailCard label="User ID" value={userData.id} />
                          <DetailCard label="Wallet Address" value={userData.wallet || "-"} />
                          <DetailCard label="Points Balance" value={userData.points ? `${userData.points} pts` : "0 pts"} />
                          <DetailCard label="Prefix" value={userData.prefix || "Not set"} />

                          <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Device Token</span>
                              {userData.device_token && (
                                <button
                                  onClick={() => copyToClipboard(userData.device_token)}
                                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  title="Copy to clipboard"
                                >
                                  <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </button>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
                              {userData.device_token || "No device token"}
                            </p>
                          </div>

                          <DetailCard label="Notification Channel" value={userData.notifications_channel_id || "Not configured"} />
                          <DetailCard
                            label="Email Verification"
                            value={userData.email_verified_at ? "Verified" : "Not verified"}
                            status={userData.email_verified_at ? "success" : "warning"}
                          />
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

/* Reusable DetailCard */
const DetailCard = ({ label, value, status }) => (
  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
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

export default UserProfileDrawer