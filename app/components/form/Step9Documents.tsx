"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { SignaturePad } from "@/app/components/ui/SignaturePad";
import { motion } from "framer-motion";

interface Step9DocumentsProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
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
  const fullName = watch("full_name") || "";
  const signatureData = watch("signature_data") || "";

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
          const docValue = watch(doc.id as keyof ApplicationFormData) as boolean;
          return (
            <div key={doc.id} className="flex items-center space-x-2">
              <Checkbox
                id={doc.id}
                checked={docValue || false}
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

      {/* Declaration */}
      <div className="mt-6 p-5 bg-amber-50/80 border border-amber-200 rounded-xl">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Declaration / ప్రకటన
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          I hereby declare that the information furnished is true and I am committed to establishing the enterprise.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mt-1">
          నేను అందించిన సమాచారం నిజమని మరియు ఎంటర్‌ప్రైజ్‌ను స్థాపించడానికి నేను కట్టుబడి ఉన్నానని ఇందుమూలంగా ప్రకటిస్తున్నాను.
        </p>
      </div>

      {/* Signature */}
      <div className="mt-6 space-y-3">
        <Label className="text-base font-semibold">
          Signature / సంతకం
        </Label>
        <p className="text-xs text-slate-500">
          Draw your signature or use your name as a signature / మీ సంతకాన్ని గీయండి లేదా మీ పేరును సంతకంగా ఉపయోగించండి
        </p>
        <SignaturePad
          value={signatureData}
          onChange={(dataUrl) => {
            setValue("signature_data", dataUrl, { shouldValidate: true });
          }}
          fullName={fullName}
        />
      </div>
    </motion.div>
  );
}

