"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Step10ResourceAvailabilityProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: any;
  tTe: any;
}

export function Step10ResourceAvailability({
  register,
  errors,
  watch,
  setValue,
  tEn,
  tTe,
}: Step10ResourceAvailabilityProps) {
  const landStatus = watch("land_status");
  const hasPower = watch("has_power_connection");
  const hasWater = watch("has_water_facility");

  const showLocationFields = landStatus && landStatus !== "Not Available";

  const landOptions = [
    { value: "Own", labelEn: "Own", labelTe: "సొంత" },
    { value: "Rented", labelEn: "Rented", labelTe: "అద్దె" },
    { value: "Lease", labelEn: "Lease", labelTe: "లీజు" },
    { value: "Not Available", labelEn: "Not Available", labelTe: "అందుబాటులో లేదు" },
  ];

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
          Resource Availability / వనరుల లభ్యత
        </h2>
        <p className="text-muted-foreground">
          Project Idea – Resource Availability / ప్రాజెక్ట్ ఐడియా – వనరుల లభ్యత
        </p>
      </div>

      {/* 1. Land / Premises Available */}
      <div className="space-y-3">
        <Label>
          1. Land / Premises available: / భూమి / ప్రాంగణం అందుబాటులో ఉందా: <span className="text-destructive">*</span>
        </Label>
        <div className="flex flex-wrap gap-3">
          {landOptions.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
                landStatus === option.value
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <input
                type="radio"
                value={option.value}
                checked={landStatus === option.value}
                onChange={() => setValue("land_status", option.value as any, { shouldValidate: true })}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">
                {option.labelEn} / {option.labelTe}
              </span>
            </label>
          ))}
        </div>
        {errors.land_status && (
          <p className="text-sm text-destructive">{errors.land_status.message}</p>
        )}
      </div>

      {/* Conditional Land Location and Survey Details */}
      <AnimatePresence>
        {showLocationFields && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="land_location">
                Land/Premises Location / భూమి/ప్రాంగణం స్థానం <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="land_location"
                {...register("land_location")}
                placeholder="Enter the location details / స్థానం వివరాలను నమోదు చేయండి"
                rows={3}
              />
              {errors.land_location && (
                <p className="text-sm text-destructive">{errors.land_location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="survey_details">
                Survey Details / సర్వే వివరాలు
              </Label>
              <Input
                id="survey_details"
                {...register("survey_details")}
                placeholder="Enter survey number or details / సర్వే నంబర్ లేదా వివరాలను నమోదు చేయండి"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Machinery Required */}
      <div className="space-y-2">
        <Label htmlFor="machinery_required">
          2. Machinery required (list): / అవసరమైన యంత్రాలు (జాబితా):
        </Label>
        <Textarea
          id="machinery_required"
          {...register("machinery_required")}
          placeholder="List the machinery required for your project / మీ ప్రాజెక్ట్‌కు అవసరమైన యంత్రాలను జాబితా చేయండి"
          rows={3}
        />
        {errors.machinery_required && (
          <p className="text-sm text-destructive">{errors.machinery_required.message}</p>
        )}
      </div>

      {/* 3. Raw Material Source */}
      <div className="space-y-2">
        <Label htmlFor="raw_material_source">
          3. Raw material source: / ముడి పదార్థ మూలం:
        </Label>
        <Textarea
          id="raw_material_source"
          {...register("raw_material_source")}
          placeholder="Describe your raw material sources / మీ ముడి పదార్థ మూలాలను వివరించండి"
          rows={3}
        />
        {errors.raw_material_source && (
          <p className="text-sm text-destructive">{errors.raw_material_source.message}</p>
        )}
      </div>

      {/* 4. Power Connection */}
      <div className="space-y-3">
        <Label>
          4. Power connection available? / విద్యుత్ కనెక్షన్ అందుబాటులో ఉందా?
        </Label>
        <div className="flex gap-4">
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              hasPower === true
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={hasPower === true}
              onChange={() => setValue("has_power_connection", true)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Yes / అవును</span>
          </label>
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              hasPower === false
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={hasPower === false}
              onChange={() => setValue("has_power_connection", false)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">No / లేదు</span>
          </label>
        </div>
      </div>

      {/* 5. Water Facility */}
      <div className="space-y-3">
        <Label>
          5. Water facility available? / నీటి సౌకర్యం అందుబాటులో ఉందా?
        </Label>
        <div className="flex gap-4">
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              hasWater === true
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={hasWater === true}
              onChange={() => setValue("has_water_facility", true)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Yes / అవును</span>
          </label>
          <label
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              hasWater === false
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <input
              type="radio"
              checked={hasWater === false}
              onChange={() => setValue("has_water_facility", false)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">No / లేదు</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}
