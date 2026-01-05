"use client";

import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressStepper({
  currentStep,
  totalSteps,
  steps,
}: ProgressStepperProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted
                      ? "text-white"
                      : isActive
                      ? "text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                  style={
                    isCompleted
                      ? { backgroundColor: "#416c38" }
                      : isActive
                      ? { 
                          backgroundColor: "#f91723",
                          boxShadow: "0 0 0 4px rgba(249, 23, 35, 0.2)"
                        }
                      : undefined
                  }
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <p
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-[100px]",
                    isActive || isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 flex-1 mx-2 transition-all duration-300",
                    (index + 1) < currentStep ? "" : "bg-muted"
                  )}
                  style={
                    (index + 1) < currentStep
                      ? { backgroundColor: "#416c38" }
                      : undefined
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

