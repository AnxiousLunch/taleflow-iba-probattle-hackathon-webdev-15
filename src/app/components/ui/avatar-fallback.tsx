"use client"

import { HTMLAttributes, forwardRef } from "react"

interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {}

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-gray-700",
          className
        )}
        {...props}
      />
    )
  }
)

AvatarFallback.displayName = "AvatarFallback"

export { AvatarFallback }