import * as React from "react";

import { cn } from "~/lib/utils";

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ currentStep, totalSteps, className, ...props }, ref) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-3", className)}
        {...props}
      >
        {/* Visual Progress Bar */}
        <div className="w-full max-w-md">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-green-500 transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Text Counter */}
        <span className="text-muted-foreground text-sm">
          step {currentStep} of {totalSteps}
        </span>
      </div>
    );
  },
);
Progress.displayName = "Progress";

export { Progress };
