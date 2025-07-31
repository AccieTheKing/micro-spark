import { Check } from "lucide-react";

const features = [
  "Build MVPs in hours, not weeks",
  "AI assisted (duhh)",
  "Rapid prototyping & iteration",
  "Guidance by your own input",
];

export function FeatureBar() {
  return (
    <div className="border-b border-green-100 bg-green-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-8 text-sm text-green-700">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
