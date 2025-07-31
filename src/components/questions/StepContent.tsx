import {
  Lightbulb,
  PiggyBank,
  List,
  DollarSign,
  Clock,
  Users,
  Building2,
  Store,
  Code,
  Calendar,
  CalendarDays,
  MessageSquare,
} from "lucide-react";
import { SelectionCard } from "~/components/ui/selection-card";
import { cn } from "~/lib/utils";

interface StepContentProps {
  step: number;
  selectedOption?: string;
  onOptionSelect: (option: string) => void;
  textInput?: string;
  onTextInputChange?: (text: string) => void;
}

interface OptionStep {
  question: string;
  options: {
    id: string;
    title: string;
    icon: React.ReactElement;
  }[];
}

interface TextStep {
  question: string;
  description: string;
}

type StepData = OptionStep | TextStep;

const stepData: Record<number, StepData> = {
  1: {
    question: "What's your primary goal for this MVP?",
    options: [
      {
        id: "validate-idea",
        title: "Validate market demand",
        icon: <Users className="h-6 w-6" />,
      },
      {
        id: "test-features",
        title: "Test core features",
        icon: <Lightbulb className="h-6 w-6" />,
      },
      {
        id: "attract-investors",
        title: "Attract investors",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        id: "early-revenue",
        title: "Generate early revenue",
        icon: <PiggyBank className="h-6 w-6" />,
      },
    ],
  },
  2: {
    question: "What's your target audience?",
    options: [
      {
        id: "b2b-enterprise",
        title: "B2B Enterprise",
        icon: <Building2 className="h-6 w-6" />,
      },
      {
        id: "b2b-smb",
        title: "B2B Small Business",
        icon: <Store className="h-6 w-6" />,
      },
      {
        id: "b2c-consumers",
        title: "B2C Consumers",
        icon: <Users className="h-6 w-6" />,
      },
      {
        id: "developers",
        title: "Developers",
        icon: <Code className="h-6 w-6" />,
      },
    ],
  },
  3: {
    question: "What's your development timeline?",
    options: [
      {
        id: "1-2-weeks",
        title: "1-2 weeks",
        icon: <Clock className="h-6 w-6" />,
      },
      {
        id: "1-month",
        title: "1 month",
        icon: <Calendar className="h-6 w-6" />,
      },
      {
        id: "2-3-months",
        title: "2-3 months",
        icon: <CalendarDays className="h-6 w-6" />,
      },
      {
        id: "flexible",
        title: "Flexible timeline",
        icon: <List className="h-6 w-6" />,
      },
    ],
  },
  4: {
    question: "Tell us about your project idea",
    description:
      "Describe your MVP concept, key features, or any specific requirements you have in mind.",
  },
};

function isOptionStep(step: StepData): step is OptionStep {
  return "options" in step;
}

function isTextStep(step: StepData): step is TextStep {
  return "description" in step;
}

export function StepContent({
  step,
  selectedOption,
  onOptionSelect,
  textInput = "",
  onTextInputChange,
}: StepContentProps) {
  const currentStepData = stepData[step];

  if (!currentStepData) {
    return <div>Step not found</div>;
  }

  // Handle text input step
  if (step === 4 && isTextStep(currentStepData)) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-foreground text-2xl font-bold">
            {currentStepData.question}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            {currentStepData.description}
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <MessageSquare className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
            <textarea
              value={textInput}
              onChange={(e) => onTextInputChange?.(e.target.value)}
              placeholder="Describe your project idea here..."
              className={cn(
                "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 pl-10 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                "h-32 resize-none",
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  // Handle option steps
  if (isOptionStep(currentStepData)) {
    return (
      <div className="space-y-8">
        <h2 className="text-foreground text-center text-2xl font-bold">
          {currentStepData.question}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {currentStepData.options.map((option) => (
            <SelectionCard
              key={option.id}
              icon={option.icon}
              title={option.title}
              isSelected={selectedOption === option.id}
              onClick={() => onOptionSelect(option.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return <div>Step not found</div>;
}
