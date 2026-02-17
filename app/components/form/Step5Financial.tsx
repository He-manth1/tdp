"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

interface Step5FinancialProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.financial;
  tTe: typeof import("@/lib/translations").translations.te.financial;
}

export function Step5Financial({ register, errors, watch, setValue, tEn, tTe }: Step5FinancialProps) {
  const isBpl = watch("is_bpl");
  const hasExistingLoans = watch("has_existing_loans");

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

      {/* 1. BPL */}
      <div className="space-y-2">
        <Label>
          1. {tEn.isBpl} / {tTe.isBpl}
        </Label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="is_bpl_yes"
              checked={isBpl === true}
              onChange={() => setValue("is_bpl", true, { shouldValidate: true })}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="is_bpl_yes">Yes / అవును</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="is_bpl_no"
              checked={isBpl === false}
              onChange={() => {
                setValue("is_bpl", false, { shouldValidate: true });
                setValue("ration_card_number", "");
              }}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="is_bpl_no">No / కాదు</Label>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isBpl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 border-l-2 border-primary pl-4 ml-1"
          >
            <Label htmlFor="ration_card_number">
              {tEn.rationCardNumber} / {tTe.rationCardNumber}
            </Label>
            <Input
              id="ration_card_number"
              {...register("ration_card_number")}
              placeholder={`${tEn.enterRationCardNumber} / ${tTe.enterRationCardNumber}`}
            />
            {errors.ration_card_number && (
              <p className="text-sm text-destructive">{errors.ration_card_number.message}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Bank Account Number */}
      <div className="space-y-2">
        <Label htmlFor="bank_account_number">
          2. {tEn.bankAccountNumber} / {tTe.bankAccountNumber}
        </Label>
        <Input
          id="bank_account_number"
          type="text"
          {...register("bank_account_number")}
          placeholder={`${tEn.enterBankAccountNumber} / ${tTe.enterBankAccountNumber}`}
        />
        {errors.bank_account_number && (
          <p className="text-sm text-destructive">{errors.bank_account_number.message}</p>
        )}
      </div>

      {/* 3. Bank Name and Branch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bank_name">
            3. {tEn.bankName} / {tTe.bankName}
          </Label>
          <Input
            id="bank_name"
            {...register("bank_name")}
            placeholder={`${tEn.enterBankName} / ${tTe.enterBankName}`}
          />
          {errors.bank_name && (
            <p className="text-sm text-destructive">{errors.bank_name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="bank_branch">
            {tEn.bankBranch} / {tTe.bankBranch}
          </Label>
          <Input
            id="bank_branch"
            {...register("bank_branch")}
            placeholder={`${tEn.enterBankBranch} / ${tTe.enterBankBranch}`}
          />
          {errors.bank_branch && (
            <p className="text-sm text-destructive">{errors.bank_branch.message}</p>
          )}
        </div>
      </div>

      {/* 4. Annual Family Income */}
      <div className="space-y-2">
        <Label htmlFor="annual_family_income">
          4. {tEn.annualFamilyIncome} / {tTe.annualFamilyIncome}
        </Label>
        <Input
          id="annual_family_income"
          type="number"
          {...register("annual_family_income", { valueAsNumber: true })}
          placeholder={`${tEn.enterAnnualFamilyIncome} / ${tTe.enterAnnualFamilyIncome}`}
        />
        {errors.annual_family_income && (
          <p className="text-sm text-destructive">{errors.annual_family_income.message}</p>
        )}
      </div>

      {/* 5. Own Contribution */}
      <div className="space-y-2">
        <Label htmlFor="own_contribution">
          5. {tEn.ownContribution} / {tTe.ownContribution}
        </Label>
        <Input
          id="own_contribution"
          type="number"
          {...register("own_contribution", { valueAsNumber: true })}
          placeholder={`${tEn.enterOwnContribution} / ${tTe.enterOwnContribution}`}
        />
        {errors.own_contribution && (
          <p className="text-sm text-destructive">{errors.own_contribution.message}</p>
        )}
      </div>

      {/* 6. Loan Required */}
      <div className="space-y-2">
        <Label htmlFor="loan_required">
          6. {tEn.loanRequired} / {tTe.loanRequired}
        </Label>
        <Input
          id="loan_required"
          type="number"
          {...register("loan_required", { valueAsNumber: true })}
          placeholder={`${tEn.enterLoanRequired} / ${tTe.enterLoanRequired}`}
        />
        {errors.loan_required && (
          <p className="text-sm text-destructive">{errors.loan_required.message}</p>
        )}
      </div>

      {/* 7. Existing Loans */}
      <div className="space-y-2">
        <Label>
          7. {tEn.existingLoans} / {tTe.existingLoans}
        </Label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="has_existing_loans_yes"
              checked={hasExistingLoans === true}
              onChange={() => setValue("has_existing_loans", true, { shouldValidate: true })}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="has_existing_loans_yes">Yes / అవును</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="has_existing_loans_no"
              checked={hasExistingLoans === false}
              onChange={() => {
                setValue("has_existing_loans", false, { shouldValidate: true });
                setValue("existing_loan_type", "");
                setValue("existing_loans", "");
              }}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="has_existing_loans_no">No / కాదు</Label>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hasExistingLoans && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 border-l-2 border-primary pl-4 ml-1"
          >
            {/* Loan Type */}
            <div className="space-y-2">
              <Label>{tEn.loanType} / {tTe.loanType}</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "Home Loan", en: "Home Loan", te: "గృహ రుణం" },
                  { value: "Personal Loan", en: "Personal Loan", te: "వ్యక్తిగత రుణం" },
                  { value: "Agriculture Loan", en: "Agriculture Loan", te: "వ్యవసాయ రుణం" },
                  { value: "Other", en: "Other", te: "ఇతర" },
                ].map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`loan_type_${opt.value}`}
                      value={opt.value}
                      {...register("existing_loan_type")}
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`loan_type_${opt.value}`} className="text-sm">
                      {opt.en} / {opt.te}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.existing_loan_type && (
                <p className="text-sm text-destructive">{errors.existing_loan_type.message}</p>
              )}
            </div>

            {/* Loan Details */}
            <div className="space-y-2">
              <Label htmlFor="existing_loans">
                {tEn.loanDetails} / {tTe.loanDetails}
              </Label>
              <Textarea
                id="existing_loans"
                {...register("existing_loans")}
                placeholder={`${tEn.enterExistingLoans} / ${tTe.enterExistingLoans}`}
                rows={3}
              />
              {errors.existing_loans && (
                <p className="text-sm text-destructive">{errors.existing_loans.message}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Repayment Capacity Per Month */}
      <div className="space-y-2">
        <Label htmlFor="repayment_capacity">
          8. {tEn.repaymentCapacity} / {tTe.repaymentCapacity}
        </Label>
        <Input
          id="repayment_capacity"
          type="number"
          {...register("repayment_capacity", { valueAsNumber: true })}
          placeholder={`${tEn.enterRepaymentCapacity} / ${tTe.enterRepaymentCapacity}`}
        />
        {errors.repayment_capacity && (
          <p className="text-sm text-destructive">{errors.repayment_capacity.message}</p>
        )}
      </div>
    </motion.div>
  );
}
