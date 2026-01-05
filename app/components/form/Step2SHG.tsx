"use client";

import { UseFormRegister, FieldErrors, Watch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface Step2SHGProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: Watch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.shg;
  tTe: typeof import("@/lib/translations").translations.te.shg;
  optionsEn: typeof import("@/lib/translations").translations.en.options;
  optionsTe: typeof import("@/lib/translations").translations.te.options;
}

export function Step2SHG({ register, errors, watch, setValue, tEn, tTe, optionsEn, optionsTe }: Step2SHGProps) {
  const gender = watch("gender");
  const isShgMember = watch("is_shg_member");

  const showSHGFields = gender === "Female";

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

      <AnimatePresence>
        {showSHGFields ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_shg_member"
                  checked={isShgMember || false}
                  onCheckedChange={(checked) => {
                    setValue("is_shg_member", checked as boolean, { shouldValidate: true });
                  }}
                />
                <Label htmlFor="is_shg_member">
                  {tEn.isShgMember} / {tTe.isShgMember} <span className="text-destructive">*</span>
                </Label>
              </div>
              {errors.is_shg_member && (
                <p className="text-sm text-destructive">
                  {errors.is_shg_member.message}
                </p>
              )}
            </div>

            <AnimatePresence>
              {isShgMember && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="organization_type">
                      {tEn.organizationType} / {tTe.organizationType} <span className="text-destructive">*</span>
                    </Label>
                    <Select id="organization_type" {...register("organization_type")}>
                      <option value="">{tEn.selectOrgType} / {tTe.selectOrgType}</option>
                      <option value="SERP">{optionsEn.serp} / {optionsTe.serp}</option>
                      <option value="MEPMA">{optionsEn.mepma} / {optionsTe.mepma}</option>
                      <option value="Other">{optionsEn.otherOrg} / {optionsTe.otherOrg}</option>
                    </Select>
                    {errors.organization_type && (
                      <p className="text-sm text-destructive">
                        {errors.organization_type.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="group_name">
                      {tEn.groupName} / {tTe.groupName} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="group_name"
                      {...register("group_name")}
                      placeholder={`${tEn.enterGroupName} / ${tTe.enterGroupName}`}
                    />
                    {errors.group_name && (
                      <p className="text-sm text-destructive">
                        {errors.group_name.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-muted-foreground"
          >
            {tEn.onlyForFemale} / {tTe.onlyForFemale}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

