import * as React from "react"
import { cn } from "~/lib/utils"

interface SelectionCardProps {
  icon: React.ReactNode
  title: string
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

const SelectionCard = React.forwardRef<HTMLDivElement, SelectionCardProps>(
  ({ icon, title, isSelected = false, onClick, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-3 p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md",
          isSelected
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full",
          isSelected ? "text-primary" : "text-muted-foreground"
        )}>
          {icon}
        </div>
        <span className={cn(
          "text-sm font-medium text-center",
          isSelected ? "text-primary" : "text-foreground"
        )}>
          {title}
        </span>
      </div>
    )
  }
)
SelectionCard.displayName = "SelectionCard"

export { SelectionCard } 