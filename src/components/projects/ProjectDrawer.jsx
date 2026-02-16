/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MapPin, Phone, ImageIcon } from "lucide-react"
import ExpandableText from "../ExpandableText"
import Spinner from "../Loading"

const ProjectDrawer = ({ isOpen, setIsDrawerOpen, onClose, data: project }) => {

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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Project Details
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-full pb-20">
              {!project ? (
                <div className="flex flex-col justify-center items-center h-96 space-y-4">
                  <Spinner />
                </div>
              ) : (
                <div className="px-6 py-6 space-y-8">
                  {/* Project Info */}
                  <div className="space-y-6">
                    {/* Logo + Name */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-[var(--surface-card)] rounded-lg">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0">
                        {project.project_logo ? (
                          <img
                            src={project.project_logo}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-blue-600 m-auto" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {project.name}
                        </h4>
                        {project.address && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {project.address}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid gap-4">
                      <DetailCard
                        label="Project ID"
                        value={project.id || "N/A"}
                      />
                      <DetailCard
                        label="Phone Number"
                        value={project.phone_number || "N/A"}
                        icon={<Phone className="w-4 h-4 text-gray-500" />}
                      />
                      <DetailCard
                        label="WhatsApp"
                        value={project.whatsapp_number || "N/A"}
                      />
                      <DetailCard
                        label="Start Date"
                        value={project.start_date}
                        icon={<Calendar className="w-4 h-4 text-gray-500" />}
                      />
                      <DetailCard
                        label="End Date"
                        value={project.end_date}
                        icon={<Calendar className="w-4 h-4 text-gray-500" />}
                      />
                      <DetailCard
                        label="Active"
                        value={project.active ? "Yes" : "No"}
                        status={project.active ? "success" : "warning"}
                      />
                      <DetailCard
                        label="Units Count"
                        value={project.unit_count || 0}
                      />
                      <DetailCard
                        label="Starting From"
                        value={project.starting_from || 0}
                      />

                      {/* Description */}
                      {project.description && (
                        <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Description
                          </h5>
                          <ExpandableText
                            text={project.description}
                            limit={150}
                            className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                          />
                        </div>
                      )}

                      {project.description_ar && (
                        <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Description Arabic
                          </h5>
                          <ExpandableText
                            text={project.description_ar}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/* Reusable DetailCard */
const DetailCard = ({ label, value, status, icon }) => (
  <div className="p-4 bg-white dark:bg-[var(--surface-card)] border border-gray-200 dark:border-[var(--border-primary)] rounded-lg">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
        {icon} {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
          {value}
        </span>
        {status === "success" && (
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        )}
        {status === "warning" && (
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        )}
      </div>
    </div>
  </div>
)

export default ProjectDrawer
