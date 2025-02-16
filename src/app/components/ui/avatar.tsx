"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { HTMLAttributes, forwardRef } from "react"

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  fallback?: string
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, fallback = "UU", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-700",
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt="Avatar"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <span className="font-medium text-gray-300">
            {(fallback || "UU").slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"

export { Avatar }