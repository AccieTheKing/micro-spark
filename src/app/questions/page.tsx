"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Header } from "~/components/questions/Header";
import { FeatureBar } from "~/components/questions/FeatureBar";
import { StepNavigation } from "~/components/questions/StepNavigation";
import { StepContent } from "~/components/questions/StepContent";

export default function ChatPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const [textInput, setTextInput] = useState("");
  const totalSteps = 4;

  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentStep]: option,
    }));
  };

  const handleTextInputChange = (text: string) => {
    setTextInput(text);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", { selectedOptions, textInput });
  };

  const canProceed =
    currentStep === 4
      ? textInput.trim() !== ""
      : selectedOptions[currentStep] !== undefined;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <FeatureBar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            canGoBack={currentStep > 1}
          />

          <div className="mt-8">
            <StepContent
              step={currentStep}
              selectedOption={selectedOptions[currentStep]}
              onOptionSelect={handleOptionSelect}
              textInput={textInput}
              onTextInputChange={handleTextInputChange}
            />
          </div>

          <div className="mt-8 flex justify-center">
            {isLastStep ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed}
                className="px-8 py-3"
              >
                Start Chat
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="px-8 py-3"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
