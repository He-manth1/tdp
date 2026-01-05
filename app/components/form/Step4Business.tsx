"use client";

import { UseFormRegister, FieldErrors, Watch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface Step4BusinessProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: Watch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.business;
  tTe: typeof import("@/lib/translations").translations.te.business;
}

export function Step4Business({ register, errors, watch, setValue, tEn, tTe }: Step4BusinessProps) {
  const currentBusiness = watch("current_business");

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
        <div className="flex items-center space-x-2">
          <Checkbox
            id="current_business"
            checked={currentBusiness || false}
            onCheckedChange={(checked) => {
              setValue("current_business", checked as boolean, { shouldValidate: true });
            }}
          />
          <Label htmlFor="current_business">
            {tEn.currentBusiness} / {tTe.currentBusiness}
          </Label>
        </div>
      </div>

      <AnimatePresence>
        {currentBusiness && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="business_nature">{tEn.businessNature} / {tTe.businessNature}</Label>
              <Input
                id="business_nature"
                {...register("business_nature")}
                placeholder={`${tEn.enterBusinessNature} / ${tTe.enterBusinessNature}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">{tEn.experience} / {tTe.experience}</Label>
              <Input
                id="experience"
                type="number"
                {...register("experience", { valueAsNumber: true })}
                placeholder={`${tEn.enterExperience} / ${tTe.enterExperience}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

