"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { motion } from "framer-motion";

interface Step1PersonalProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.personal;
  tTe: typeof import("@/lib/translations").translations.te.personal;
  optionsEn: typeof import("@/lib/translations").translations.en.options;
  optionsTe: typeof import("@/lib/translations").translations.te.options;
}

export function Step1Personal({ register, errors, tEn, tTe, optionsEn, optionsTe }: Step1PersonalProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="full_name">
            {tEn.fullName} / {tTe.fullName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="full_name"
            {...register("full_name")}
            placeholder={`${tEn.enterFullName} / ${tTe.enterFullName}`}
          />
          {errors.full_name && (
            <p className="text-sm text-destructive">{errors.full_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">
            {tEn.age} / {tTe.age} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            placeholder={`${tEn.enterAge} / ${tTe.enterAge}`}
          />
          {errors.age && (
            <p className="text-sm text-destructive">{errors.age.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">
            {tEn.gender} / {tTe.gender} <span className="text-destructive">*</span>
          </Label>
          <Select id="gender" {...register("gender")}>
            <option value="">{tEn.selectGender} / {tTe.selectGender}</option>
            <option value="Male">{optionsEn.male} / {optionsTe.male}</option>
            <option value="Female">{optionsEn.female} / {optionsTe.female}</option>
            <option value="Other">{optionsEn.other} / {optionsTe.other}</option>
          </Select>
          {errors.gender && (
            <p className="text-sm text-destructive">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="caste_category">
            {tEn.casteCategory} / {tTe.casteCategory} <span className="text-destructive">*</span>
          </Label>
          <Select id="caste_category" {...register("caste_category")}>
            <option value="">{tEn.selectCaste} / {tTe.selectCaste}</option>
            <option value="SC">{optionsEn.sc} / {optionsTe.sc}</option>
            <option value="ST">{optionsEn.st} / {optionsTe.st}</option>
            <option value="OBC">{optionsEn.obc} / {optionsTe.obc}</option>
            <option value="General">{optionsEn.general} / {optionsTe.general}</option>
            <option value="Other">{optionsEn.otherCaste} / {optionsTe.otherCaste}</option>
          </Select>
          {errors.caste_category && (
            <p className="text-sm text-destructive">
              {errors.caste_category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">
            {tEn.education} / {tTe.education} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="education"
            {...register("education")}
            placeholder={`${tEn.enterEducation} / ${tTe.enterEducation}`}
          />
          {errors.education && (
            <p className="text-sm text-destructive">
              {errors.education.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            {tEn.phone} / {tTe.phone} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder={`${tEn.enterPhone} / ${tTe.enterPhone}`}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">
            {tEn.address} / {tTe.address} <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="address"
            {...register("address")}
            placeholder={`${tEn.enterAddress} / ${tTe.enterAddress}`}
            rows={3}
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="village">
            {tEn.village} / {tTe.village} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="village"
            {...register("village")}
            placeholder={`${tEn.enterVillage} / ${tTe.enterVillage}`}
          />
          {errors.village && (
            <p className="text-sm text-destructive">{errors.village.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mandal">
            {tEn.mandal} / {tTe.mandal} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="mandal"
            {...register("mandal")}
            placeholder={`${tEn.enterMandal} / ${tTe.enterMandal}`}
          />
          {errors.mandal && (
            <p className="text-sm text-destructive">{errors.mandal.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="membership_id">{tEn.membershipId} / {tTe.membershipId}</Label>
          <Input
            id="membership_id"
            {...register("membership_id")}
            placeholder={`${tEn.enterMembershipId} / ${tTe.enterMembershipId}`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="booth_no">{tEn.boothNo} / {tTe.boothNo}</Label>
          <Input
            id="booth_no"
            {...register("booth_no")}
            placeholder={`${tEn.enterBoothNo} / ${tTe.enterBoothNo}`}
          />
        </div>
      </div>
    </motion.div>
  );
}

