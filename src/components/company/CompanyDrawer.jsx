/* eslint-disable react/prop-types */
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Building2, X, Globe } from "lucide-react"
import Spinner from "../Loading"

const CompanyDrawer = ({ isOpen, setIsDrawerOpen, onClose, data, loading }) => {

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
            className="h-full w-full max-w-[650px] bg-white dark:bg-gray-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="relative w-full h-full">
              {/* Close Btn */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors absolute dark:top-3 top-5 right-3"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Content */}
              <div className="overflow-y-auto h-full pb-20">
                {loading ? (
                  <div className="flex flex-col justify-center items-center h-96 space-y-4">
                    <Spinner />
                  </div>
                ) : (
                  <div className="px-6 py-6 space-y-10">
                    {/* Company Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Company Information
                        </h3>
                      </div>

                      {/* Logo + Name */}
                      <div className="flex items-start gap-4 py-4 dark:px-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0">
                          {data?.logo?.[0] ? (
                            <img
                              src={data.logo[0]}
                              alt={data.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building2 className="w-8 h-8 text-blue-600 m-auto" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {data?.name || "No name"}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {data?.name_ar || "لا يوجد اسم بالعربية"}
                          </p>
                        </div>
                      </div>

                      {/* Core Data */}
                      <div className="grid gap-4">
                        <DetailCard label="ID" value={data?.id} />
                        <DetailCard label="App Name" value={data?.app_name} />
                        <DetailCard
                          label="Description"
                          value={data?.description}
                        />
                        <DetailCard
                          label="الوصف بالعربية"
                          value={data?.description_ar}
                        />
                        <DetailCard
                          label="Total Per Point"
                          value={data?.total_per_point}
                        />
                        <DetailCard
                          label="Active Company"
                          value={data?.active_company}
                        />
                        <DetailCard label="Media" value={data?.media} />
                        <DetailCard
                          label="Created At"
                          value={data?.created_at}
                        />
                        <DetailCard
                          label="Updated At"
                          value={data?.updated_at}
                        />
                        <DetailCard
                          label="Deleted At"
                          value={data?.deleted_at}
                        />
                        <DetailCard
                          label="Created By"
                          value={data?.created_by}
                        />
                        <DetailCard
                          label="Updated By"
                          value={data?.updated_by}
                        />
                      </div>
                    </div>

                    {/* Global Settings Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Global Settings
                        </h3>
                      </div>

                      <div className="grid gap-4">
                        <DetailCard
                          label="Color Code"
                          value={data?.global_setting?.color_code}
                          isColorCode={true}
                        />
                        <DetailCard
                          label="Hotline"
                          value={data?.global_setting?.hotline}
                        />
                        <LinkCard
                          label="Website"
                          value={data?.global_setting?.website_url}
                          copyToClipboard={copyToClipboard}
                        />
                        <LinkCard
                          label="Facebook"
                          value={data?.global_setting?.facebook_url}
                          copyToClipboard={copyToClipboard}
                        />
                        <LinkCard
                          label="Instagram"
                          value={data?.global_setting?.instagram_url}
                          copyToClipboard={copyToClipboard}
                        />
                        <LinkCard
                          label="Twitter"
                          value={data?.global_setting?.twitter_url}
                          copyToClipboard={copyToClipboard}
                        />
                        <LinkCard
                          label="YouTube"
                          value={data?.global_setting?.youtube_url}
                          copyToClipboard={copyToClipboard}
                        />
                        <LinkCard
                          label="Privacy Policy"
                          value={data?.global_setting?.privacy_policy_url}
                          copyToClipboard={copyToClipboard}
                        />
                        <LinkCard
                          label="About Us"
                          value={data?.global_setting?.about_us_url}
                          copyToClipboard={copyToClipboard}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/* Reusable DetailCard */
const DetailCard = ({ label, value, isColorCode }) => (
  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <span className="text-sm text-gray-900 dark:text-gray-100 font-medium truncate flex items-center gap-3 max-w-[250px] text-right">
        {isColorCode && (
          <div style={{ backgroundColor: value }} className="w-5 h-5 rounded-md"></div>
        )}
        <p>{typeof value === "object" ? JSON.stringify(value) : value || "Not set"}</p>
      </span>
    </div>
  </div>
)

/* Reusable LinkCard with Copy */
const LinkCard = ({ label, value, copyToClipboard }) => (
  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 hover:underline truncate max-w-[200px]"
        >
          {value || "Not set"}
        </a>

        {value && (
          <button
            onClick={() => copyToClipboard(value)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  </div>
)

export default CompanyDrawer
