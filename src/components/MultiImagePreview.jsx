/* eslint-disable react/prop-types */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { X } from "lucide-react";

const MultiImagePreview = ({ images = [], isOpen, onClose }) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Close button */}
                    <div
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-6 sm:right-8 md:top-9 md:right-11 
                                 p-2 sm:p-3 text-slate-200 hover:rotate-90 cursor-pointer 
                                 transition-all duration-300 z-10 bg-black/30 rounded-full 
                                 backdrop-blur-sm hover:bg-black/50"
                    >
                        <X size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>

                    {/* Main container */}
                    <div
                        className="w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative w-full h-full max-h-[90vh]">
                                <Swiper
                                    modules={[Navigation, Pagination, Keyboard]}
                                    navigation={{
                                        enabled: true,
                                        hideOnClick: false,
                                    }}
                                    pagination={{ 
                                        clickable: true,
                                        dynamicBullets: true
                                    }}
                                    keyboard={{ enabled: true }}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    centeredSlides={true}
                                    className="w-full h-full rounded-lg shadow-2xl
                                             [&_.swiper-button-next]:bg-black/50 
                                             [&_.swiper-button-prev]:bg-black/50
                                             [&_.swiper-button-next]:backdrop-blur-sm
                                             [&_.swiper-button-prev]:backdrop-blur-sm
                                             [&_.swiper-button-next]:rounded-full
                                             [&_.swiper-button-prev]:rounded-full
                                             [&_.swiper-button-next]:w-12 [&_.swiper-button-next]:h-12
                                             [&_.swiper-button-prev]:w-12 [&_.swiper-button-prev]:h-12
                                             [&_.swiper-button-next]:text-white [&_.swiper-button-next]:text-xl
                                             [&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:text-xl
                                             [&_.swiper-button-next]:transition-all [&_.swiper-button-next]:duration-300
                                             [&_.swiper-button-prev]:transition-all [&_.swiper-button-prev]:duration-300
                                             [&_.swiper-button-next]:hover:bg-black/70 [&_.swiper-button-next]:hover:scale-110
                                             [&_.swiper-button-prev]:hover:bg-black/70 [&_.swiper-button-prev]:hover:scale-110
                                             sm:[&_.swiper-button-next]:w-14 sm:[&_.swiper-button-next]:h-14
                                             sm:[&_.swiper-button-prev]:w-14 sm:[&_.swiper-button-prev]:h-14
                                             sm:[&_.swiper-button-next]:text-2xl sm:[&_.swiper-button-prev]:text-2xl
                                             md:[&_.swiper-button-next]:w-16 md:[&_.swiper-button-next]:h-16
                                             md:[&_.swiper-button-prev]:w-16 md:[&_.swiper-button-prev]:h-16
                                             md:[&_.swiper-button-next]:text-3xl md:[&_.swiper-button-prev]:text-3xl
                                             max-[480px]:[&_.swiper-button-next]:hidden
                                             max-[480px]:[&_.swiper-button-prev]:hidden
                                             [&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet]:backdrop-blur-sm
                                             [&_.swiper-pagination-bullet-active]:bg-white
                                             [&_.swiper-pagination]:bottom-2 sm:[&_.swiper-pagination]:bottom-4"
                                >
                                    {images.map((url, index) => (
                                        <SwiperSlide key={index} className="flex items-center justify-center">
                                            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="max-w-full max-h-full w-auto h-auto object-contain 
                                                             rounded-lg shadow-lg
                                                             sm:max-h-[75vh] md:max-h-[80vh] lg:max-h-[85vh] xl:max-h-[90vh]"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MultiImagePreview;
