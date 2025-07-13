import * as React from "react"
import { cn } from "@/lib/utils"

const WhiteInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-white text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        style={{ 
          color: 'white !important',
          backgroundColor: 'rgba(45, 55, 72, 0.5)',
          ...style 
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
WhiteInput.displayName = "WhiteInput"

export { WhiteInput }