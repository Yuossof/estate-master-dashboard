/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const RowExpandableText = ({ text, limit = 150, expanded, onToggle }) => {
  if (!text) return null;
  const [height, setHeight] = useState("auto");

  const fullRef = useRef(null);
  const shortRef = useRef(null);

  if (!text) return null;

  const isLong = text.length > limit;
  const shortText = text.slice(0, limit) + (isLong ? "..." : "");

  useEffect(() => {
    const target = expanded ? fullRef.current : shortRef.current;
    if (target) {
      setHeight(target.scrollHeight);
    }
  }, [expanded, text]);

  return (
    <div className="relative">
      {/* container with animated height */}
      <motion.div
        animate={{ height }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="break-words whitespace-pre-line text-gray-600 dark:text-gray-300 max-w-[500px] min-w-[300px] overflow-hidden"
      >
        {/* short version */}
        <div ref={shortRef} style={{ display: expanded ? "none" : "block" }}>
          {shortText}
        </div>

        {/* full version */}
        <div ref={fullRef} style={{ display: expanded ? "block" : "none" }}>
          {text}
        </div>
      </motion.div>

      {/* toggle button */}
      {isLong && (
        <button
          onClick={onToggle}
          className="text-blue-500 underline ml-1 cursor-pointer"
        >
          {expanded ? "less" : "more"}
        </button>
      )}
    </div>
  );
};

export default RowExpandableText;
