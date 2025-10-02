/* eslint-disable react/prop-types */
import React,{ useState } from "react";

const TextCell = ({ name, limit = 15 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!name) return null;

  const isLong = name.length > limit;
  const displayedName = !expanded && isLong ? name.slice(0, limit) + "..." : name;

  return (
    <div className="flex items-center gap-1">
      <span>{displayedName}</span>
      {isLong && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="text-blue-400 underline text-sm cursor-pointer"
        >
          more
        </button>
      )}
    </div>
  );
};

export default TextCell;
