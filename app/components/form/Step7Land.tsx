"use client";

import { UseFormRegister, FieldErrors, Watch } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

interface Step7LandProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: Watch<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.land;
  tTe: typeof import("@/lib/translations").translations.te.land;
  optionsEn: typeof import("@/lib/translations").translations.en.options;
  optionsTe: typeof import("@/lib/translations").translations.te.options;
}

export function Step7Land({ register, errors, watch, tEn, tTe, optionsEn, optionsTe }: Step7LandProps) {
  const landStatus = watch("land_status");

  const showLandFields = landStatus && landStatus !== "No Land Yet";

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
        <Label htmlFor="land_status">
          {tEn.landStatus} / {tTe.landStatus} <span className="text-destructive">*</span>
        </Label>
        <Select id="land_status" {...register("land_status")}>
          <option value="">{tEn.selectLandStatus} / {tTe.selectLandStatus}</option>
          <option value="Own">{optionsEn.own} / {optionsTe.own}</option>
          <option value="Lease">{optionsEn.lease} / {optionsTe.lease}</option>
          <option value="None">{optionsEn.none} / {optionsTe.none}</option>
          <option value="No Land Yet">{optionsEn.noLandYet} / {optionsTe.noLandYet}</option>
        </Select>
        {errors.land_status && (
          <p className="text-sm text-destructive">
            {errors.land_status.message}
          </p>
        )}
      </div>

      <AnimatePresence>
        {showLandFields && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="land_location">
                {tEn.landLocation} / {tTe.landLocation} <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="land_location"
                {...register("land_location")}
                placeholder={`${tEn.enterLandLocation} / ${tTe.enterLandLocation}`}
                rows={3}
              />
              {errors.land_location && (
                <p className="text-sm text-destructive">
                  {errors.land_location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="survey_details">{tEn.surveyDetails} / {tTe.surveyDetails}</Label>
              <Input
                id="survey_details"
                {...register("survey_details")}
                placeholder={`${tEn.enterSurveyDetails} / ${tTe.enterSurveyDetails}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

