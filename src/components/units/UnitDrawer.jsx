/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MapPin, Phone, ImageIcon   } from "lucide-react"
import ExpandableText from "../ExpandableText"
import Spinner from "../Loading"
import { Icon } from "@iconify/react/dist/iconify.js"

const UnitDrawer = ({ isOpen, setIsDrawerOpen, onClose, data: unit }) => {

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
                        className="relative h-full w-full max-w-[600px] bg-white dark:bg-gray-900 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Unit Details
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto h-full pb-20">
                            {!unit ? (
                                <div className="flex flex-col justify-center items-center h-96 space-y-4">
                                    <Spinner />
                                </div>
                            ) : (
                                <div className="px-6 py-6 space-y-8">
                                    {/* Unit Info */}
                                    <div className="space-y-6">
                                        {/* Image + Name */}
                                        <div className="flex items-start gap-4 py-4 dark:px-3.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0">
                                                {unit.main_image ? (
                                                    <img
                                                        src={unit.main_image}
                                                        alt={unit.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <ImageIcon className="w-8 h-8 text-blue-600 m-auto" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                    {unit.name}
                                                </h4>
                                                {unit.location && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" /> {unit.location}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="grid gap-4">
                                            <DetailCard label="Unit Code" value={unit.unit_code || "N/A"} />
                                            <DetailCard label="Floor" value={unit.floor || "N/A"} />
                                            <DetailCard label="Rooms" value={unit.rooms || 0} />
                                            <DetailCard label="Bathrooms" value={unit.bathrooms || 0} />
                                            <DetailCard label="Area" value={`${unit.area} m²`} />
                                            <DetailCard label="Price" value={`${unit.price} EGP`} />
                                            <DetailCard
                                                label="Phone Number"
                                                value={unit.phone_number || "N/A"}
                                                icon={<Phone className="w-4 h-4 text-gray-500" />}
                                            />
                                            <DetailCard
                                                label="WhatsApp"
                                                value={unit.whatsapp_number || "N/A"}
                                                icon={<Icon icon={"unit.whatsapp_number"}/>}
                                            />
                                            <DetailCard
                                                label="Delivery Date"
                                                value={unit.delivery_date}
                                                icon={<Calendar className="w-4 h-4 text-gray-500" />}
                                            />
                                            <DetailCard
                                                label="Active"
                                                value={unit.active ? "Yes" : "No"}
                                                status={unit.active ? "success" : "warning"}
                                            />

                                            {/* Description */}
                                            {unit.description && (
                                                <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                                        Description
                                                    </h5>
                                                    <ExpandableText
                                                        text={unit.description}
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
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                {icon} {label}
            </span>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                    {value}
                </span>
                {status === "success" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                {status === "warning" && <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>}
            </div>
        </div>
    </div>
)

export default UnitDrawer
