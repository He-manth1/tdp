"use client";

import { UseFormRegister, FieldErrors, Watch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface Step5FinancialProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: Watch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.financial;
  tTe: typeof import("@/lib/translations").translations.te.financial;
}

export function Step5Financial({ register, errors, watch, setValue, tEn, tTe }: Step5FinancialProps) {
  const hasBankAccount = watch("has_bank_account");
  const existingLoans = watch("existing_loans");
  const familySupport = watch("family_support");

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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_bank_account"
              checked={hasBankAccount || false}
              onCheckedChange={(checked) => {
                setValue("has_bank_account", checked as boolean, { shouldValidate: true });
              }}
            />
            <Label htmlFor="has_bank_account">{tEn.hasBankAccount} / {tTe.hasBankAccount}</Label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="existing_loans"
              checked={existingLoans || false}
              onCheckedChange={(checked) => {
                setValue("existing_loans", checked as boolean, { shouldValidate: true });
              }}
            />
            <Label htmlFor="existing_loans">{tEn.existingLoans} / {tTe.existingLoans}</Label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="family_support"
              checked={familySupport || false}
              onCheckedChange={(checked) => {
                setValue("family_support", checked as boolean, { shouldValidate: true });
              }}
            />
            <Label htmlFor="family_support">{tEn.familySupport} / {tTe.familySupport}</Label>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hasBankAccount && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="bank_name">{tEn.bankName} / {tTe.bankName}</Label>
              <Input
                id="bank_name"
                {...register("bank_name")}
                placeholder={`${tEn.enterBankName} / ${tTe.enterBankName}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch_name">{tEn.branchName} / {tTe.branchName}</Label>
              <Input
                id="branch_name"
                {...register("branch_name")}
                placeholder={`${tEn.enterBranchName} / ${tTe.enterBranchName}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="annual_income">{tEn.annualIncome} / {tTe.annualIncome}</Label>
          <Input
            id="annual_income"
            type="number"
            {...register("annual_income", { valueAsNumber: true })}
            placeholder={`${tEn.enterAnnualIncome} / ${tTe.enterAnnualIncome}`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="investment_amount">{tEn.investmentAmount} / {tTe.investmentAmount}</Label>
          <Input
            id="investment_amount"
            type="number"
            {...register("investment_amount", { valueAsNumber: true })}
            placeholder={`${tEn.enterInvestmentAmount} / ${tTe.enterInvestmentAmount}`}
          />
        </div>
      </div>

      <AnimatePresence>
        {existingLoans && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="loan_amount">{tEn.loanAmount} / {tTe.loanAmount}</Label>
              <Input
                id="loan_amount"
                type="number"
                {...register("loan_amount", { valueAsNumber: true })}
                placeholder={`${tEn.enterLoanAmount} / ${tTe.enterLoanAmount}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank_name_loan">{tEn.bankName} / {tTe.bankName}</Label>
              <Input
                id="bank_name_loan"
                {...register("bank_name")}
                placeholder={`${tEn.enterBankName} / ${tTe.enterBankName}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch_name_loan">{tEn.branchName} / {tTe.branchName}</Label>
              <Input
                id="branch_name_loan"
                {...register("branch_name")}
                placeholder={`${tEn.enterBranchName} / ${tTe.enterBranchName}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

