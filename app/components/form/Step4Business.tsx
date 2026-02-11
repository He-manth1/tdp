"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface Step4BusinessProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
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
        <h2 className="text-2xl font-semibold">Entrepreneurial Background / ఔత్సాహిక నేపథ్యం</h2>
        <p className="text-muted-foreground">
          {tEn.subtitle} / {tTe.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>1. Have you ever run a business earlier? / మీరు ఇంతకు ముందు ఎప్పుడైనా వ్యాపారం నడిపారా?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="current_business_yes"
                value="yes"
                checked={currentBusiness === true}
                onChange={() => setValue("current_business", true, { shouldValidate: true })}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="current_business_yes">Yes / అవును</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="current_business_no"
                value="no"
                checked={currentBusiness === false}
                onChange={() => setValue("current_business", false, { shouldValidate: true })}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="current_business_no">No / లేదు</Label>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {currentBusiness && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 border-l-2 border-primary pl-4 ml-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="reason_for_closure">Reason for closure (if closed) / మూసివేతకు కారణం (మూసివేయబడితే)</Label>
                <Input
                  id="reason_for_closure"
                  {...register("reason_for_closure")}
                  placeholder="Reason for closure / మూసివేతకు కారణం"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>2. Family background: Any family member in business? / కుటుంబ నేపథ్యం: కుటుంబ సభ్యులెవరైనా వ్యాపారంలో ఉన్నారా?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="family_business_yes"
                checked={watch("family_business_in_business") === true}
                onChange={() => setValue("family_business_in_business", true, { shouldValidate: true })}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="family_business_yes">Yes / అవును</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="family_business_no"
                checked={watch("family_business_in_business") === false}
                onChange={() => setValue("family_business_in_business", false, { shouldValidate: true })}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="family_business_no">No / లేదు</Label>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {watch("family_business_in_business") && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 border-l-2 border-primary pl-4 ml-1"
            >
              <Label htmlFor="family_business_activity">Specify activity / కార్యకలాపాన్ని పేర్కొనండి</Label>
              <Input
                id="family_business_activity"
                {...register("family_business_activity")}
                placeholder="Specify activity / కార్యకలాపాన్ని పేర్కొనండి"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        <Label>3. What motivated you to start a business? / వ్యాపారాన్ని ప్రారంభించడానికి మిమ్మల్ని ప్రేరేపించినది ఏమిటి?</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Unemployment / నిరుద్యోగం", "Additional income / అదనపు ఆదాయం", "Family tradition / కుటుంబ సంప్రదాయం", "Opportunity identified / అవకాశం గుర్తించబడింది", "Other / ఇతర"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`motivation_${option}`}
                value={option.split(" / ")[0]}
                {...register("business_motivation")}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor={`motivation_${option}`}>{option}</Label>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

