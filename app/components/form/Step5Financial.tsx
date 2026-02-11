"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { motion } from "framer-motion";

interface Step5FinancialProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.financial;
  tTe: typeof import("@/lib/translations").translations.te.financial;
}

export function Step5Financial({ register, errors, watch, setValue, tEn, tTe }: Step5FinancialProps) {
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

      {/* 1. Bank Account Number */}
      <div className="space-y-2">
        <Label htmlFor="bank_account_number">
          1. {tEn.bankAccountNumber} / {tTe.bankAccountNumber}
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

      {/* 2. Annual Family Income */}
      <div className="space-y-2">
        <Label htmlFor="annual_family_income">
          2. {tEn.annualFamilyIncome} / {tTe.annualFamilyIncome}
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

      {/* 3. Own Contribution */}
      <div className="space-y-2">
        <Label htmlFor="own_contribution">
          3. {tEn.ownContribution} / {tTe.ownContribution}
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

      {/* 4. Loan Required */}
      <div className="space-y-2">
        <Label htmlFor="loan_required">
          4. {tEn.loanRequired} / {tTe.loanRequired}
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

      {/* 5. Existing Loans */}
      <div className="space-y-2">
        <Label htmlFor="existing_loans">
          5. {tEn.existingLoans} / {tTe.existingLoans}
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

      {/* 6. Repayment Capacity Per Month */}
      <div className="space-y-2">
        <Label htmlFor="repayment_capacity">
          6. {tEn.repaymentCapacity} / {tTe.repaymentCapacity}
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
