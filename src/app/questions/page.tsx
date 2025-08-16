"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Header } from "~/components/questions/Header";
import { FeatureBar } from "~/components/questions/FeatureBar";
import { StepNavigation } from "~/components/questions/StepNavigation";
import { StepContent } from "~/components/questions/StepContent";
import { StepService } from "~/services/stepService";

export default function ChatPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatResponse, setChatResponse] = useState("");
  const [generationTime, setGenerationTime] = useState<string>("");
  const [isChatStarted, setIsChatStarted] = useState(false);

  const totalSteps = StepService.getTotalSteps();

  // Helper function to format time in minutes and seconds
  const formatTime = (totalSeconds: number): string => {
    if (totalSeconds < 60) {
      return `${totalSeconds}s`;
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

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
    const nextStep = StepService.getNextStep(currentStep);
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = () => {
    const prevStep = StepService.getPreviousStep(currentStep);
    if (prevStep) {
      setCurrentStep(prevStep);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setChatResponse("");
    setIsChatStarted(true);

    try {
      const userMessage = `${Object.entries(selectedOptions)
        .map(([step, option]) => `Step ${step}: ${option}`)
        .join("\n")} Additional Information: ${textInput}`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle JSON response
      const responseData = (await response.json()) as {
        message: {
          role: string;
          content: string;
        };
        total_duration?: number;
        load_duration?: number;
        prompt_eval_duration?: number;
        eval_duration?: number;
      };

      setChatResponse(responseData.message?.content ?? "No response received");

      // Calculate and format generation time
      if (responseData.total_duration) {
        const totalSeconds = Math.round(
          responseData.total_duration / 1000000000,
        ); // Convert nanoseconds to seconds
        setGenerationTime(formatTime(totalSeconds));
      } else if (responseData.eval_duration) {
        const evalSeconds = Math.round(responseData.eval_duration / 1000000000);
        setGenerationTime(formatTime(evalSeconds));
      } else {
        setGenerationTime("Unknown");
      }
    } catch (error) {
      console.error("Error calling chat API:", error);
      setChatResponse(
        "Sorry, there was an error processing your request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed =
    StepService.getStepType(currentStep) === "text"
      ? textInput.trim() !== ""
      : selectedOptions[currentStep] !== undefined;
  const isLastStep = StepService.isLastStep(currentStep);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <FeatureBar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {!isChatStarted ? (
            <>
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
                    disabled={!canProceed || isLoading}
                    className="px-8 py-3"
                  >
                    {isLoading ? "Processing..." : "Start Chat"}
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
            </>
          ) : (
            <div className="mt-8">
              <div className="mb-4">
                <Button
                  onClick={() => {
                    setIsChatStarted(false);
                    setChatResponse("");
                    setGenerationTime("");
                    setCurrentStep(1);
                    setSelectedOptions({});
                    setTextInput("");
                  }}
                  variant="outline"
                  className="mb-4"
                >
                  Start Over
                </Button>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">AI Response</h2>
                {isLoading ? (
                  <div className="text-gray-600">Generating response...</div>
                ) : (
                  <>
                    {generationTime && (
                      <div className="mb-3 text-sm text-gray-500">
                        ⚡ Generated in {generationTime}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-gray-800">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: chatResponse || "No response received",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Display user's answers */}
              <div className="mt-6 rounded-lg bg-gray-50 p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold text-gray-700">
                  Your Answers
                </h3>
                <div className="space-y-3">
                  {Object.entries(selectedOptions).map(([step, option]) => (
                    <div key={step} className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                        {step}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-600">
                          {StepService.getStepQuestion(parseInt(step))}
                        </div>
                        <div className="text-gray-800">{option}</div>
                      </div>
                    </div>
                  ))}
                  {textInput && (
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-600">
                        +
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-600">
                          Additional Information
                        </div>
                        <div className="text-gray-800">{textInput}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
