/* eslint-disable react/prop-types */
import React, { useState } from "react";

const ExpandableText = ({ text, limit = 150 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;
  const shortText = text.slice(0, limit) + "...";

  return (
    <div className="break-words whitespace-pre-line text-gray-600 dark:text-gray-300 max-w-[500px] min-w-[300px] overflow-hidden"
    >
      {!expanded ? (
        <>
          {isLong ? shortText : text}{" "}
          {isLong && (
            <button
              onClick={() => setExpanded(true)}
              className="text-blue-500 underline ml-1 cursor-pointer"
            >
              more
            </button>
          )}
        </>
      ) : (
        <>
          {text}{" "}
          <button
            onClick={() => setExpanded(false)}
            className="text-blue-500 underline ml-1 cursor-pointer"
          >
            less
          </button>
        </>
      )}
    </div>
  );
};

export default ExpandableText;
