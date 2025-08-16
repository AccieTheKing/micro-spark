import { stepConfiguration, type StepConfig, type StepOption } from "~/config/steps";

export class StepService {
  /**
   * Get the total number of steps
   */
  static getTotalSteps(): number {
    return Object.keys(stepConfiguration).length;
  }

  /**
   * Get configuration for a specific step
   */
  static getStepConfig(step: number): StepConfig | undefined {
    return stepConfiguration[step];
  }

  /**
   * Get all step configurations
   */
  static getAllStepConfigs(): Record<number, StepConfig> {
    return stepConfiguration;
  }

  /**
   * Get the question text for a specific step
   */
  static getStepQuestion(step: number): string | undefined {
    return stepConfiguration[step]?.question;
  }

  /**
   * Get options for a specific step (if it's a select type)
   */
  static getStepOptions(step: number): StepOption[] | undefined {
    return stepConfiguration[step]?.options;
  }

  /**
   * Get step type (select or text)
   */
  static getStepType(step: number): "select" | "text" | undefined {
    return stepConfiguration[step]?.type;
  }

  /**
   * Check if a step is the last step
   */
  static isLastStep(step: number): boolean {
    return step === this.getTotalSteps();
  }

  /**
   * Check if a step is the first step
   */
  static isFirstStep(step: number): boolean {
    return step === 1;
  }

  /**
   * Get the next step number
   */
  static getNextStep(currentStep: number): number | null {
    const nextStep = currentStep + 1;
    return nextStep <= this.getTotalSteps() ? nextStep : null;
  }

  /**
   * Get the previous step number
   */
  static getPreviousStep(currentStep: number): number | null {
    const prevStep = currentStep - 1;
    return prevStep >= 1 ? prevStep : null;
  }

  /**
   * Validate if a step number is valid
   */
  static isValidStep(step: number): boolean {
    return step >= 1 && step <= this.getTotalSteps();
  }

  /**
   * Get step description (for text input steps)
   */
  static getStepDescription(step: number): string | undefined {
    return stepConfiguration[step]?.description;
  }
}
