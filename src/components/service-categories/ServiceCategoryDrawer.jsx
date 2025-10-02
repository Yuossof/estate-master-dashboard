/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Spinner from "../Loading"
import { getServiceCategoryService } from "../../services/service-categories"

const ServiceCategoryDrawer = ({ isOpen, setIsDrawerOpen, onClose, serviceCategoryId }) => {
  const [serviceCategoryData, setServiceCategoryData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!serviceCategoryId) return
    const abort = new AbortController()
    const getUserData = async () => {
      try {
        setLoading(true)
        const data = await getServiceCategoryService(serviceCategoryId, abort.signal)
        console.log(data)
        setServiceCategoryData(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getUserData()
    return () => abort.abort()
  }, [serviceCategoryId])

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
            className="relative h-full w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Service Category Details</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
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
                <div className="px-6 py-6 space-y-8">
                  {/* User Section */}
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <DetailCard label="ID" value={serviceCategoryData.id} />
                      <DetailCard label="Name" value={serviceCategoryData.name || "-"} />
                      <DetailCard label="Name Arabic" value={serviceCategoryData.name_ar || "-"} />
                      <DetailCard label="Created At" value={serviceCategoryData.created_at || "-"} />
                      <DetailCard label="Updated At" value={serviceCategoryData.updated_at || "-"} />
                    </div>
                  </div>
                </div>
              )}
            </div>
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

export default ServiceCategoryDrawer