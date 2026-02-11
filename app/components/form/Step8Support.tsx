"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion } from "framer-motion";
import { Select } from "@/app/components/ui/select";
import { cn } from "@/lib/utils";

interface Step8SupportProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
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

const loanOptions = [
  "Chai Raasta (Women Franchise)",
  "Chandranna Swayam Upadhi",
  "National Livestock Mission",
  "PM MUDRA (Kishore)",
  "PMEGP",
];

const trainingOptions = [
  "Carpentry",
  "Digital Marketing",
  "Beautician Course",
  "Graphic Design",
  "Mobile Repairing",
  "Tailoring",
  "Web development",
];

const subsidyOptions = [
  "AP Innovation Society (APIS) Grant",
  "PM Vishwakarma",
  "AP MSME Policy 4.0 (One Family One Entrepreneur)",
  "PMFME",
];

const getSubOptions = (category: string) => {
  switch (category) {
    case "Loan":
      return loanOptions;
    case "Training":
      return trainingOptions;
    case "Subsidy":
      return subsidyOptions;
    default:
      return [];
  }
};

export function Step8Support({ register, setValue, watch, tEn, tTe }: Step8SupportProps) {
  const supportRequired = watch("support_required") || [];
  const hasEdpTraining = watch("has_edp_training");

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const current = supportRequired || [];
    if (checked) {
      // Add the category
      setValue("support_required", [...current, option]);
    } else {
      // Remove the category AND any sub-options associated with it
      const prefix = `${option}: `;
      setValue(
        "support_required",
        current.filter((item) => item !== option && !item.startsWith(prefix))
      );
    }
  };

  const handleSubOptionChange = (category: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const current = supportRequired || [];

    // Remove any existing sub-option for this category
    const prefix = `${category}: `;
    const filtered = current.filter((item) => !item.startsWith(prefix));

    // Add the new one if a value is selected
    if (value) {
      setValue("support_required", [...filtered, `${category}: ${value}`]);
    } else {
      setValue("support_required", filtered);
    }
  };

  const getSelectedSubOption = (category: string) => {
    const prefix = `${category}: `;
    const found = supportRequired.find((item) => item.startsWith(prefix));
    return found ? found.replace(prefix, "") : "";
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

      <div className="space-y-4">
        {supportOptions.map((option) => {
          const isChecked = supportRequired.includes(option);
          const subOptions = getSubOptions(option);
          const hasSubOptions = subOptions.length > 0;

          return (
            <div key={option} className="flex flex-col space-y-3 p-4 rounded-lg border border-slate-100 bg-white/50">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`support_${option}`}
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(option, checked as boolean)
                  }
                />
                <Label htmlFor={`support_${option}`} className="cursor-pointer font-medium">
                  {getTranslatedLabel(option)}
                </Label>
              </div>

              {isChecked && hasSubOptions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pl-6 pt-2 w-full max-w-sm"
                >
                  <Select
                    value={getSelectedSubOption(option)}
                    onChange={(e) => handleSubOptionChange(option, e)}
                  >
                    <option value="" disabled>Select {option} Type</option>
                    {subOptions.map((subOpt) => (
                      <option key={subOpt} value={subOpt}>
                        {subOpt}
                      </option>
                    ))}
                  </Select>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* EDP Training Question */}
      <div className="space-y-3 pt-2">
        <Label>
          {tEn.edpTraining} / {tTe.edpTraining}
        </Label>
        <div className="flex gap-4">
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              hasEdpTraining === true
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={hasEdpTraining === true}
              onChange={() => setValue("has_edp_training", true)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Yes / అవును</span>
          </label>
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              hasEdpTraining === false
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={hasEdpTraining === false}
              onChange={() => setValue("has_edp_training", false)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">No / లేదు</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}
