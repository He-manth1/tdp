"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { motion } from "framer-motion";

interface Step6ProjectProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.project;
  tTe: typeof import("@/lib/translations").translations.te.project;
}

export function Step6Project({ register, errors, tEn, tTe }: Step6ProjectProps) {
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

      <div className="space-y-2">
        <Label htmlFor="project_interest">
          {tEn.projectInterest} / {tTe.projectInterest} <span className="text-destructive">*</span>
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
          {tEn.reasonForInterest} / {tTe.reasonForInterest} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="reason_for_interest"
          {...register("reason_for_interest")}
          placeholder={`${tEn.enterReason} / ${tTe.enterReason}`}
          rows={5}
        />
        {errors.reason_for_interest && (
          <p className="text-sm text-destructive">
            {errors.reason_for_interest.message}
          </p>
        )}
      </div>
    </motion.div>
  );
}

