"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Step6ProjectProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch?: UseFormWatch<ApplicationFormData>;
  setValue?: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.project;
  tTe: typeof import("@/lib/translations").translations.te.project;
}

export function Step6Project({ register, errors, watch, setValue, tEn, tTe }: Step6ProjectProps) {
  const marketSurveyDone = watch ? watch("market_survey_done") : false;
  const targetCustomers = watch ? (watch("target_customers") || "") : "";

  const customerOptions = [
    { value: "Local market", label: "Local market / స్థానిక మార్కెట్" },
    { value: "Mandal level", label: "Mandal level / మండల స్థాయి" },
    { value: "District level", label: "District level / జిల్లా స్థాయి" },
    { value: "Online", label: "Online / ఆన్‌లైన్" },
  ];

  // Parse comma-separated string into array for checkbox state
  const selectedCustomers = targetCustomers ? targetCustomers.split(", ").filter(Boolean) : [];

  const handleCustomerToggle = (value: string, checked: boolean) => {
    if (!setValue) return;
    let updated: string[];
    if (checked) {
      updated = [...selectedCustomers, value];
    } else {
      updated = selectedCustomers.filter((c) => c !== value);
    }
    setValue("target_customers", updated.join(", "), { shouldValidate: false });
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
        <h2 className="text-2xl font-semibold">Enterprise Idea & Market Readiness / ఎంటర్ప్రైజ్ ఐడియా & మార్కెట్ సంసిద్ధత</h2>
        <p className="text-muted-foreground">
          {tEn.subtitle} / {tTe.subtitle}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project_interest">
          1. Proposed Enterprise / Project Idea / ప్రతిపాదిత ఎంటర్ప్రైజ్ / ప్రాజెక్ట్ ఐడియా <span className="text-destructive">*</span>
        </Label>
        <Input
          id="project_interest"
          {...register("project_interest")}
          placeholder={`${tEn.enterProjectInterest} / ${tTe.enterProjectInterest}`}
        />
        {errors.project_interest && (
          <p className="text-sm text-destructive">
            {errors.project_interest.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason_for_interest">
          2. Why did you choose this activity? / మీరు ఈ కార్యాచరణను ఎందుకు ఎంచుకున్నారు? <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="reason_for_interest"
          {...register("reason_for_interest")}
          placeholder={`${tEn.enterReason} / ${tTe.enterReason}`}
          rows={3}
        />
        {errors.reason_for_interest && (
          <p className="text-sm text-destructive">
            {errors.reason_for_interest.message}
          </p>
        )}
      </div>

      {/* 3. Market Survey */}
      <div className="space-y-3">
        <Label>3. Have you done any market survey? / మీరు ఏదైనా మార్కెట్ సర్వే చేశారా?</Label>
        <div className="flex gap-4">
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              marketSurveyDone === true
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={marketSurveyDone === true}
              onChange={() => setValue && setValue("market_survey_done", true)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Yes / అవును</span>
          </label>
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              marketSurveyDone === false
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={marketSurveyDone === false}
              onChange={() => setValue && setValue("market_survey_done", false)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">No / లేదు</span>
          </label>
        </div>
      </div>

      {/* 4. Target Customers (checkboxes stored as comma-separated string) */}
      <div className="space-y-2">
        <Label>4. Who are your target customers? / మీ లక్ష్య వినియోగదారులు ఎవరు?</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {customerOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`customer_${option.value}`}
                checked={selectedCustomers.includes(option.value)}
                onCheckedChange={(checked) => handleCustomerToggle(option.value, checked as boolean)}
              />
              <Label htmlFor={`customer_${option.value}`} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="major_competitors">5. Major competitors in your area: / మీ ప్రాంతంలోని ప్రధాన పోటీదారులు:</Label>
        <Input
          id="major_competitors"
          {...register("major_competitors")}
          placeholder="Competitors names / పోటీదారుల పేర్లు"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="expected_monthly_sales">6. Expected monthly sales ({"\u20B9"}): / ఆశించిన నెలవారీ అమ్మకాలు ({"\u20B9"}):</Label>
          <Input
            id="expected_monthly_sales"
            type="number"
            {...register("expected_monthly_sales", { valueAsNumber: true })}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expected_monthly_profit">7. Expected monthly profit ({"\u20B9"}): / ఆశించిన నెలవారీ లాభం ({"\u20B9"}):</Label>
          <Input
            id="expected_monthly_profit"
            type="number"
            {...register("expected_monthly_profit", { valueAsNumber: true })}
            placeholder="0"
          />
        </div>
      </div>
    </motion.div>
  );
}
