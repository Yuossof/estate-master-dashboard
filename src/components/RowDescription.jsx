/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useState } from "react";

const RowDescription = ({ row }) => {
  const [lang, setLang] = useState("en");

  return (
    <div className="relative">
      <div className="relative break-words whitespace-normal text-gray-600 dark:text-gray-300 max-w-[500px] min-w-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={lang} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.14 }}
          >
            {lang === "ar" ? row.description_ar : row.description}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        whileTap={{ scale: 0.8, rotate: 90 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setLang(lang === "en" ? "ar" : "en")}
        className="absolute lg:-top-2 lg:right-1 right-0 top-0 lg:opacity-100 opacity-50 w-8 h-8 hover:opacity-80 shadow-md rounded-full flex justify-center items-center cursor-pointer transition bg-slate-100 dark:bg-slate-700"
      >
        <Languages className="dark:text-gray-300 text-gray-600" />
      </motion.div>
    </div>
  );
};


export default RowDescription