"use client";

import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Label } from "@/app/components/ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepCompetencyProps {
  watch: UseFormWatch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: {
    title: string;
    subtitle: string;
    scaleNote: string;
    riskTaking: string;
    leadership: string;
    communication: string;
    financialMgmt: string;
    problemSolving: string;
    willingnessToLearn: string;
  };
  tTe: {
    title: string;
    subtitle: string;
    scaleNote: string;
    riskTaking: string;
    leadership: string;
    communication: string;
    financialMgmt: string;
    problemSolving: string;
    willingnessToLearn: string;
  };
}

type CompetencyField =
  | "competency_risk_taking"
  | "competency_leadership"
  | "competency_communication"
  | "competency_financial_mgmt"
  | "competency_problem_solving"
  | "competency_willingness_to_learn";

interface RatingItem {
  field: CompetencyField;
  labelEn: string;
  labelTe: string;
}

function RatingScale({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (val: number) => void;
}) {
  const labels = ["Very Low", "Low", "Average", "High", "Very High"];

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onChange(num)}
          className={cn(
            "w-10 h-10 rounded-lg border-2 text-sm font-bold transition-all duration-200",
            "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/30",
            value === num
              ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
          )}
          title={labels[num - 1]}
        >
          {num}
        </button>
      ))}
      {value && (
        <span className="ml-2 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          {labels[value - 1]}
        </span>
      )}
    </div>
  );
}

export function StepCompetency({ watch, setValue, tEn, tTe }: StepCompetencyProps) {
  const ratingItems: RatingItem[] = [
    { field: "competency_risk_taking", labelEn: tEn.riskTaking, labelTe: tTe.riskTaking },
    { field: "competency_leadership", labelEn: tEn.leadership, labelTe: tTe.leadership },
    { field: "competency_communication", labelEn: tEn.communication, labelTe: tTe.communication },
    { field: "competency_financial_mgmt", labelEn: tEn.financialMgmt, labelTe: tTe.financialMgmt },
    { field: "competency_problem_solving", labelEn: tEn.problemSolving, labelTe: tTe.problemSolving },
    { field: "competency_willingness_to_learn", labelEn: tEn.willingnessToLearn, labelTe: tTe.willingnessToLearn },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          {tEn.title} / {tTe.title}
        </h2>
        <p className="text-muted-foreground">
          {tEn.subtitle} / {tTe.subtitle}
        </p>
        <p className="text-sm font-medium text-slate-500 bg-slate-50 inline-block px-3 py-1.5 rounded-lg border border-slate-100">
          ({tEn.scaleNote})
        </p>
      </div>

      <div className="space-y-5">
        {ratingItems.map((item, index) => {
          const currentValue = watch(item.field);
          return (
            <motion.div
              key={item.field}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl border border-slate-100 bg-white/50 space-y-3"
            >
              <Label className="text-sm font-medium">
                {index + 1}. {item.labelEn} / {item.labelTe}
              </Label>
              <RatingScale
                value={currentValue as number | undefined}
                onChange={(val) => setValue(item.field, val)}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

