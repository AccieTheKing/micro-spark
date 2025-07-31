import { ChevronLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
  canGoBack?: boolean;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  canGoBack = true,
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <Button
        variant="ghost"
        onClick={onPrevious}
        disabled={!canGoBack}
        className="text-primary hover:text-primary/80 flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      <Progress currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
}
