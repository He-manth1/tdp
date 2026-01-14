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
    <div className="w-full mb-12">
      <div className="flex items-center justify-between relative px-2">
        {/* Background Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full" />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative z-10 group cursor-default">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ring-4 ring-white border-2",
                  isCompleted
                    ? "bg-[#416c38] border-[#416c38] text-white shadow-lg shadow-green-200"
                    : isActive
                      ? "bg-[#f91723] border-[#f91723] text-white shadow-lg shadow-red-200 scale-110"
                      : "bg-white border-slate-200 text-slate-400"
                )}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <div className="absolute top-12 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 text-white text-xs py-1 px-3 rounded-lg shadow-xl pointer-events-none">
                {step}
              </div>
              {isActive && (
                <p className="absolute top-14 text-xs font-semibold text-slate-900 whitespace-nowrap">
                  {/* Show current step label specifically if needed, or rely on tooltip */}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center mt-4">
        <p className="text-sm font-medium text-slate-600">
          Step {currentStep} of {totalSteps}: <span className="text-slate-900 font-bold">{steps[currentStep - 1]}</span>
        </p>
      </div>
    </div>
  );
}

