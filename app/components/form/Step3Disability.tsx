"use client";

import { UseFormRegister, FieldErrors, Watch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface Step3DisabilityProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: Watch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.disability;
  tTe: typeof import("@/lib/translations").translations.te.disability;
}

export function Step3Disability({ register, errors, watch, setValue, tEn, tTe }: Step3DisabilityProps) {
  const isHandicapped = watch("is_handicapped");

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
            id="is_handicapped"
            checked={isHandicapped || false}
            onCheckedChange={(checked) => {
              setValue("is_handicapped", checked as boolean, { shouldValidate: true });
            }}
          />
          <Label htmlFor="is_handicapped">
            {tEn.isHandicapped} / {tTe.isHandicapped}
          </Label>
        </div>
        {errors.is_handicapped && (
          <p className="text-sm text-destructive">
            {errors.is_handicapped.message}
          </p>
        )}
      </div>

      <AnimatePresence>
        {isHandicapped && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <Label htmlFor="handicap_type">
              {tEn.handicapType} / {tTe.handicapType} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="handicap_type"
              {...register("handicap_type")}
              placeholder={`${tEn.enterHandicapType} / ${tTe.enterHandicapType}`}
            />
            {errors.handicap_type && (
              <p className="text-sm text-destructive">
                {errors.handicap_type.message}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

