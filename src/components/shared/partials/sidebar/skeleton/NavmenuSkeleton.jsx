/* eslint-disable react/prop-types */
import React from "react";

export default function NavmenuSkeleton({ count = 8 }) {
  const items = Array.from({ length: count });

  return (
    <div className="space-y-1.5 px-3 py-2">
      {items.map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
          {/* icon placeholder */}
          <div className="h-5 w-5 rounded-md bg-gray-200 dark:bg-[var(--surface-elevated)] animate-pulse flex-shrink-0" />
          {/* text placeholder */}
          <div
            className="h-4 rounded-md bg-gray-200 dark:bg-[var(--surface-elevated)] animate-pulse"
            style={{ width: `${55 + Math.random() * 30}%` }}
          />
        </div>
      ))}
    </div>
  );
}


