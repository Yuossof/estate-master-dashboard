/* eslint-disable react/prop-types */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const Alert = ({ message, isOpen, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", isLoading }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-40 z-[1000] flex justify-center items-start"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -20 }}
                        transition={{ duration: 0.14 }}
                        className="mt-10 bg-white dark:bg-[var(--surface-card)] p-4 rounded-lg shadow-lg w-[370px]"
                    >
                        <p className="text-gray-800 mx-2 dark:text-gray-100 mb-6">{message}</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={onCancel}
                                className="px-3 py-1.5 rounded-md dark:bg-[var(--surface-elevated)] bg-gray-200 dark:text-gray-200 text-gray-700 hover:bg-gray-300 transition"
                            >
                                {cancelText}
                            </button>

                            <button
                                disabled={isLoading}
                                onClick={onConfirm}
                                className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-red-600 text-white 
                               ${!isLoading && "hover:bg-red-500 transition"} 
                               ${isLoading && "opacity-70 cursor-not-allowed"}`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>{confirmText}</span>
                                    </>
                                ) : (
                                    confirmText
                                )}
                            </button>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Alert;
