"use client"

import { HTMLAttributes, forwardRef } from "react"
import Image from "next/image"

interface AvatarImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
}

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, className, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        src={src}
        alt="Avatar"
        fill
        className={cn("rounded-full object-cover", className)}
        {...props}
      />
    )
  }
)

AvatarImage.displayName = "AvatarImage"

export { AvatarImage }