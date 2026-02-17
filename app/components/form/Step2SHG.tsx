"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface Step2SHGProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.shg;
  tTe: typeof import("@/lib/translations").translations.te.shg;
  optionsEn: typeof import("@/lib/translations").translations.en.options;
  optionsTe: typeof import("@/lib/translations").translations.te.options;
}

export function Step2SHG({ register, errors, watch, setValue, tEn, tTe, optionsEn, optionsTe }: Step2SHGProps) {
  const isShgMember = watch("is_shg_member");
  const hasShgLoan = watch("has_shg_loan");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate year options (last 20 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString());

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

      {/* SHG Membership Question */}
      <div className="space-y-2">
        <Label>
          {tEn.isShgMember} / {tTe.isShgMember} <span className="text-destructive">*</span>
        </Label>
        <div className="flex items-center gap-6 mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shg_member_radio"
              checked={isShgMember === true}
              onChange={() => setValue("is_shg_member", true, { shouldValidate: true })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm">Yes / అవును</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shg_member_radio"
              checked={isShgMember === false}
              onChange={() => {
                setValue("is_shg_member", false, { shouldValidate: true });
                setValue("shg_member_relation", "");
                setValue("organization_type", undefined);
                setValue("group_name", "");
                setValue("has_shg_loan", false);
                setValue("shg_loan_bank_branch", "");
                setValue("shg_loan_amount", undefined);
                setValue("shg_loan_year", "");
                setValue("shg_loan_month", "");
                setValue("shg_outstanding_months", undefined);
                setValue("shg_outstanding_amount", undefined);
              }}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm">No / కాదు</span>
          </label>
        </div>
        {errors.is_shg_member && (
          <p className="text-sm text-destructive">{errors.is_shg_member.message}</p>
        )}
      </div>

      <AnimatePresence>
        {isShgMember && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Relation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="shg_member_relation">
                  {tEn.relation} / {tTe.relation} <span className="text-destructive">*</span>
                </Label>
                <Select id="shg_member_relation" {...register("shg_member_relation")}>
                  <option value="">{tEn.selectRelation} / {tTe.selectRelation}</option>
                  <option value="Self">Self / స్వయం</option>
                  <option value="Wife">Wife / భార్య</option>
                  <option value="Sister">Sister / సోదరి</option>
                  <option value="Mother">Mother / తల్లి</option>
                  <option value="Daughter">Daughter / కూతురు</option>
                  <option value="Daughter-in-law">Daughter-in-law / కోడలు</option>
                  <option value="Other">Other / ఇతర</option>
                </Select>
                {errors.shg_member_relation && (
                  <p className="text-sm text-destructive">{errors.shg_member_relation.message}</p>
                )}
              </div>

              {/* Organization Type */}
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
                  <p className="text-sm text-destructive">{errors.organization_type.message}</p>
                )}
              </div>

              {/* Group Name */}
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
                  <p className="text-sm text-destructive">{errors.group_name.message}</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-slate-200" />

            {/* SHG Loan Question */}
            <div className="space-y-2">
              <Label>
                {tEn.hasShgLoan} / {tTe.hasShgLoan}
              </Label>
              <div className="flex items-center gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shg_loan_radio"
                    checked={hasShgLoan === true}
                    onChange={() => setValue("has_shg_loan", true, { shouldValidate: true })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Yes / అవును</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shg_loan_radio"
                    checked={hasShgLoan === false || hasShgLoan === undefined}
                    onChange={() => {
                      setValue("has_shg_loan", false, { shouldValidate: true });
                      setValue("shg_loan_bank_branch", "");
                      setValue("shg_loan_amount", undefined);
                      setValue("shg_loan_year", "");
                      setValue("shg_loan_month", "");
                      setValue("shg_outstanding_months", undefined);
                      setValue("shg_outstanding_amount", undefined);
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">No / కాదు</span>
                </label>
              </div>
            </div>

            <AnimatePresence>
              {hasShgLoan && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-slate-700 mb-1">
                      {tEn.shgLoanDetails} / {tTe.shgLoanDetails}
                    </p>
                  </div>

                  {/* Bank and Branch */}
                  <div className="space-y-2">
                    <Label htmlFor="shg_loan_bank_branch">
                      {tEn.bankBranch} / {tTe.bankBranch}
                    </Label>
                    <Input
                      id="shg_loan_bank_branch"
                      {...register("shg_loan_bank_branch")}
                      placeholder={`${tEn.enterBankBranch} / ${tTe.enterBankBranch}`}
                    />
                  </div>

                  {/* Loan Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="shg_loan_amount">
                      {tEn.loanAmount} / {tTe.loanAmount}
                    </Label>
                    <Input
                      id="shg_loan_amount"
                      type="number"
                      {...register("shg_loan_amount", { valueAsNumber: true })}
                      placeholder={`${tEn.enterLoanAmount} / ${tTe.enterLoanAmount}`}
                      min={0}
                    />
                  </div>

                  {/* Year of Loan */}
                  <div className="space-y-2">
                    <Label htmlFor="shg_loan_year">
                      {tEn.loanYear} / {tTe.loanYear}
                    </Label>
                    <Select id="shg_loan_year" {...register("shg_loan_year")}>
                      <option value="">{tEn.selectYear} / {tTe.selectYear}</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </Select>
                  </div>

                  {/* Month of Loan */}
                  <div className="space-y-2">
                    <Label htmlFor="shg_loan_month">
                      {tEn.loanMonth} / {tTe.loanMonth}
                    </Label>
                    <Select id="shg_loan_month" {...register("shg_loan_month")}>
                      <option value="">{tEn.selectMonth} / {tTe.selectMonth}</option>
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </Select>
                  </div>

                  {/* Outstanding Months */}
                  <div className="space-y-2">
                    <Label htmlFor="shg_outstanding_months">
                      {tEn.outstandingMonths} / {tTe.outstandingMonths}
                    </Label>
                    <Input
                      id="shg_outstanding_months"
                      type="number"
                      {...register("shg_outstanding_months", { valueAsNumber: true })}
                      placeholder={`${tEn.enterOutstandingMonths} / ${tTe.enterOutstandingMonths}`}
                      min={0}
                    />
                  </div>

                  {/* Outstanding Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="shg_outstanding_amount">
                      {tEn.outstandingAmount} / {tTe.outstandingAmount}
                    </Label>
                    <Input
                      id="shg_outstanding_amount"
                      type="number"
                      {...register("shg_outstanding_amount", { valueAsNumber: true })}
                      placeholder={`${tEn.enterOutstandingAmount} / ${tTe.enterOutstandingAmount}`}
                      min={0}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
