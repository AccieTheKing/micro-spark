export interface StepOption {
  id: string;
  title: string;
  icon?: string; // Icon name for future use
}

export interface StepConfig {
  question: string;
  options?: StepOption[];
  type: "select" | "text";
  description?: string;
}

export const stepConfiguration: Record<number, StepConfig> = {
  1: {
    question: "What's your primary goal for this MVP?",
    type: "select",
    options: [
      {
        id: "validate-idea",
        title: "Validate market demand",
        icon: "Users",
      },
      {
        id: "test-features",
        title: "Test core features",
        icon: "Lightbulb",
      },
      {
        id: "attract-investors",
        title: "Attract investors",
        icon: "DollarSign",
      },
      {
        id: "early-revenue",
        title: "Generate early revenue",
        icon: "PiggyBank",
      },
    ],
  },
  2: {
    question: "What's your target audience?",
    type: "select",
    options: [
      {
        id: "b2b-enterprise",
        title: "B2B Enterprise",
        icon: "Building2",
      },
      {
        id: "b2b-smb",
        title: "B2B Small Business",
        icon: "Store",
      },
      {
        id: "b2c-consumers",
        title: "B2C Consumers",
        icon: "Users",
      },
      {
        id: "developers",
        title: "Developers",
        icon: "Code",
      },
    ],
  },
  3: {
    question: "What's your development timeline?",
    type: "select",
    options: [
      {
        id: "1-2-weeks",
        title: "1-2 weeks",
        icon: "Clock",
      },
      {
        id: "1-month",
        title: "1 month",
        icon: "Calendar",
      },
      {
        id: "2-3-months",
        title: "2-3 months",
        icon: "CalendarDays",
      },
      {
        id: "flexible",
        title: "Flexible timeline",
        icon: "List",
      },
    ],
  },
  4: {
    question: "Tell us about your project idea",
    type: "text",
    description: "Describe your MVP concept, key features, or any specific requirements you have in mind.",
  },
};

export const getTotalSteps = (): number => Object.keys(stepConfiguration).length;

export const getStepConfig = (step: number): StepConfig | undefined => {
  return stepConfiguration[step];
};

export const getAllStepConfigs = (): Record<number, StepConfig> => {
  return stepConfiguration;
};
