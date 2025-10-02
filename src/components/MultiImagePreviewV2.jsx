/* eslint-disable react/prop-types */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Carousel from "@/components/ui/carousel";

const MultiImagePreviewV2 = ({ images = [], isOpen, onClose }) => {
  const slideData = images.map((url) => ({
    src: url,
  }));

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
          <div
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-6 sm:right-8 md:top-9 md:right-11 
                     p-2 sm:p-3 text-slate-200 hover:rotate-90 cursor-pointer 
                     transition-all duration-300 z-10 bg-black/30 rounded-full 
                     backdrop-blur-sm hover:bg-black/50"
          >
            <X size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
          </div>

          <div
            className="w-full h-full flex items-center justify-center mt-20"
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
                <Carousel slides={slideData} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MultiImagePreviewV2;