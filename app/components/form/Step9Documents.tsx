"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue, Watch } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion } from "framer-motion";

interface Step9DocumentsProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  watch: Watch<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.documents;
  tTe: typeof import("@/lib/translations").translations.te.documents;
}

const documentOptions = [
  { id: "has_aadhaar", key: "aadhaar" as const },
  { id: "has_bank_passbook", key: "bankPassbook" as const },
  { id: "has_photo", key: "photo" as const },
  { id: "has_income_proof", key: "incomeProof" as const },
  { id: "has_pan", key: "pan" as const },
];

export function Step9Documents({ setValue, watch, tEn, tTe }: Step9DocumentsProps) {
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
        {documentOptions.map((doc) => {
          const value = watch(doc.id as keyof ApplicationFormData) as boolean;
          return (
            <div key={doc.id} className="flex items-center space-x-2">
              <Checkbox
                id={doc.id}
                checked={value || false}
                onCheckedChange={(checked) => {
                  setValue(doc.id as keyof ApplicationFormData, checked as boolean, {
                    shouldValidate: true,
                  });
                }}
              />
              <Label htmlFor={doc.id} className="cursor-pointer">
                {tEn[doc.key]} / {tTe[doc.key]}
              </Label>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

