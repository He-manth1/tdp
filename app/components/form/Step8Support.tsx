"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue, Watch } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion } from "framer-motion";

interface Step8SupportProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  watch: Watch<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.support;
  tTe: typeof import("@/lib/translations").translations.te.support;
}

const supportOptions = [
  "Loan",
  "Subsidy",
  "Training",
  "Market Linkage",
  "Raw Material",
  "Machinery",
  "Mentoring",
];

export function Step8Support({ register, setValue, watch, tEn, tTe }: Step8SupportProps) {
  const supportRequired = watch("support_required") || [];

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const current = supportRequired || [];
    if (checked) {
      setValue("support_required", [...current, option]);
    } else {
      setValue("support_required", current.filter((item) => item !== option));
    }
  };

  const getTranslatedLabel = (option: string) => {
    const mapEn: Record<string, string> = {
      "Loan": tEn.loan,
      "Subsidy": tEn.subsidy,
      "Training": tEn.training,
      "Market Linkage": tEn.marketLinkage,
      "Raw Material": tEn.rawMaterial,
      "Machinery": tEn.machinery,
      "Mentoring": tEn.mentoring,
    };
    const mapTe: Record<string, string> = {
      "Loan": tTe.loan,
      "Subsidy": tTe.subsidy,
      "Training": tTe.training,
      "Market Linkage": tTe.marketLinkage,
      "Raw Material": tTe.rawMaterial,
      "Machinery": tTe.machinery,
      "Mentoring": tTe.mentoring,
    };
    return `${mapEn[option] || option} / ${mapTe[option] || option}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{tEn.title} / {tTe.title}</h2>
        <p className="text-muted-foreground">
          {tEn.subtitle} / {tTe.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`support_${option}`}
              checked={supportRequired.includes(option)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option, checked as boolean)
              }
            />
            <Label htmlFor={`support_${option}`} className="cursor-pointer">
              {getTranslatedLabel(option)}
            </Label>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

