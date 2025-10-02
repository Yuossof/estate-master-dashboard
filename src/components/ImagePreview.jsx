/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImagePreview = ({ url, alt, isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-65 z-[1000] flex justify-center items-center"
                >
                    <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.18 }}
                        onClick={onClose}
                        className="absolute text-gray-100 top-5 right-5 cursor-pointer hover:rotate-90 transition-all"
                    >
                        <X size={28} />
                    </motion.div>

                    <motion.div
                        key="image"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-[90%] max-h-[90%] flex justify-center items-center"
                    >
                        <img
                            src={url}
                            alt={alt}
                            className="max-w-[90%] max-h-[90%] rounded"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImagePreview;
