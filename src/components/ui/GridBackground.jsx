import { cn } from "@/lib/utils"
import React from "react"

export function GridBackgroundDemo({ children }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          // Light mode grid → رمادي فاتح
          "[background-image:linear-gradient(to_right,#d4d4d8_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d8_1px,transparent_1px)]",
          // Dark mode grid → رمادي غامق
          "dark:[background-image:linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)]"
        )}
      />

      {/* Overlay mask */}
      <div className="pointer-events-none absolute inset-0 bg-gray-50 dark:bg-gray-800/70 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0"></div>

      {/* محتوى */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
