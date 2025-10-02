/* eslint-disable react/prop-types */
import React from "react";

export default function NavmenuSkeleton({ count = 9, subCount = 1 }) {
  const items = Array.from({ length: count });

  return (
    <div className="space-y-6">
      {items.map((_, i) => (
        <div key={i} className="space-y-3 px-4">
          {/* main chart block */}
          <div className="h-5 w-full rounded-md bg-slate-400 animate-pulse" />
          {/* sub charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4 ">
            {Array.from({ length: subCount }).map((__, idx) => (
              <div
                key={idx}
                className="h-3 w-full rounded-md bg-slate-400 animate-pulse mt-3"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


