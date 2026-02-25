"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Label } from "@/app/components/ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepCommitmentProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: any;
  tTe: any;
}

export function StepCommitment({
  register,
  errors,
  watch,
  setValue,
  tEn,
  tTe,
}: StepCommitmentProps) {
  const willingFullTime = watch("willing_full_time");
  const willingAttendTraining = watch("willing_attend_training");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Commitment & Declaration / నిబద్ధత & ప్రకటన
        </h2>
        <p className="text-muted-foreground">
          Please confirm your commitment / దయచేసి మీ నిబద్ధతను నిర్ధారించండి
        </p>
      </div>

      {/* 1. Willing to work full-time */}
      <div className="space-y-3">
        <Label>
          1. Are you willing to work full-time in this enterprise? / మీరు ఈ ఎంటర్‌ప్రైజ్‌లో పూర్తి సమయం పనిచేయడానికి సిద్ధంగా ఉన్నారా?
        </Label>
        <div className="flex gap-4">
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              willingFullTime === true
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={willingFullTime === true}
              onChange={() => setValue("willing_full_time", true)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Yes / అవును</span>
          </label>
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              willingFullTime === false
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={willingFullTime === false}
              onChange={() => setValue("willing_full_time", false)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">No / లేదు</span>
          </label>
        </div>
      </div>

      {/* 2. Willing to attend training */}
      <div className="space-y-3">
        <Label>
          2. Are you willing to attend training for 15–30 days? / మీరు 15–30 రోజుల శిక్షణకు హాజరవడానికి సిద్ధంగా ఉన్నారా?
        </Label>
        <div className="flex gap-4">
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              willingAttendTraining === true
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={willingAttendTraining === true}
              onChange={() => setValue("willing_attend_training", true)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Yes / అవును</span>
          </label>
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              willingAttendTraining === false
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={willingAttendTraining === false}
              onChange={() => setValue("willing_attend_training", false)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">No / లేదు</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}






