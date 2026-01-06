"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { applicationSchema, ApplicationFormData } from "@/lib/validations";
import { submitApplication } from "@/lib/api";
import { Language, useTranslation } from "@/lib/translations";
import { ProgressStepper } from "./ProgressStepper";
import { Step1Personal } from "./Step1Personal";
import { Step2SHG } from "./Step2SHG";
import { Step3Disability } from "./Step3Disability";
import { Step4Business } from "./Step4Business";
import { Step5Financial } from "./Step5Financial";
import { Step6Project } from "./Step6Project";
import { Step7Land } from "./Step7Land";
import { Step8Support } from "./Step8Support";
import { Step9Documents } from "./Step9Documents";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const tEn = useTranslation("en");
  const tTe = useTranslation("te");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    defaultValues: {
      is_handicapped: false,
      current_business: false,
      has_bank_account: false,
      existing_loans: false,
      family_support: false,
      support_required: [],
      has_aadhaar: false,
      has_bank_passbook: false,
      has_photo: false,
      has_income_proof: false,
      has_pan: false,
    },
  });

  const totalSteps = 9;

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setSubmitError(null);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubmitError(null);
    }
  };

  const getFieldsForStep = (step: number): (keyof ApplicationFormData)[] => {
    switch (step) {
      case 1:
        return [
          "full_name",
          "age",
          "gender",
          "caste_category",
          "education",
          "address",
          "phone",
          "village",
          "mandal",
        ];
      case 2:
        return ["is_shg_member", "organization_type", "group_name"];
      case 3:
        return ["is_handicapped", "handicap_type"];
      case 4:
        return ["current_business", "business_nature", "experience"];
      case 5:
        return [
          "has_bank_account",
          "branch_name",
          "annual_income",
          "investment_amount",
          "existing_loans",
          "loan_amount",
          "bank_name",
          "family_support",
        ];
      case 6:
        return ["project_interest", "reason_for_interest"];
      case 7:
        return ["land_status", "land_location", "survey_details"];
      case 8:
        return ["support_required"];
      case 9:
        return [
          "has_aadhaar",
          "has_bank_passbook",
          "has_photo",
          "has_income_proof",
          "has_pan",
        ];
      default:
        return [];
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitApplication(data);
      setSubmitSuccess(true);
    } catch (error: any) {
      setSubmitError(
        error.response?.data?.detail || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-600">
            {tEn.successTitle} / {tTe.successTitle}
          </h1>
          <p className="text-lg text-muted-foreground">
            {tEn.successMessage} / {tTe.successMessage}
          </p>
          <Button
            onClick={() => {
              setSubmitSuccess(false);
              setCurrentStep(1);
              window.location.reload();
            }}
            size="lg"
          >
            {tEn.submitAnother} / {tTe.submitAnother}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative">
      {/* Logo in top left corner */}
      <div className="absolute top-4 left-4 z-20">
        <Image
          src="/Assets/7a5bb2c43751a063990d3c59f374b73b.jpg"
          alt="Logo"
          width={120}
          height={60}
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            {tEn.title} / {tTe.title}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <ProgressStepper
            currentStep={currentStep}
            totalSteps={9}
            steps={[
              `${tEn.steps.personal} / ${tTe.steps.personal}`,
              `${tEn.steps.shg} / ${tTe.steps.shg}`,
              `${tEn.steps.disability} / ${tTe.steps.disability}`,
              `${tEn.steps.business} / ${tTe.steps.business}`,
              `${tEn.steps.financial} / ${tTe.steps.financial}`,
              `${tEn.steps.project} / ${tTe.steps.project}`,
              `${tEn.steps.land} / ${tTe.steps.land}`,
              `${tEn.steps.support} / ${tTe.steps.support}`,
              `${tEn.steps.documents} / ${tTe.steps.documents}`,
            ]}
          />

          <div className="min-h-[500px] py-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1Personal register={register} errors={errors} tEn={tEn.personal} tTe={tTe.personal} optionsEn={tEn.options} optionsTe={tTe.options} />
              )}
              {currentStep === 2 && (
                <Step2SHG register={register} errors={errors} watch={watch} setValue={setValue} tEn={tEn.shg} tTe={tTe.shg} optionsEn={tEn.options} optionsTe={tTe.options} />
              )}
              {currentStep === 3 && (
                <Step3Disability
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  tEn={tEn.disability}
                  tTe={tTe.disability}
                />
              )}
              {currentStep === 4 && (
                <Step4Business
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  tEn={tEn.business}
                  tTe={tTe.business}
                />
              )}
              {currentStep === 5 && (
                <Step5Financial
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  tEn={tEn.financial}
                  tTe={tTe.financial}
                />
              )}
              {currentStep === 6 && (
                <Step6Project register={register} errors={errors} tEn={tEn.project} tTe={tTe.project} />
              )}
              {currentStep === 7 && (
                <Step7Land register={register} errors={errors} watch={watch} tEn={tEn.land} tTe={tTe.land} optionsEn={tEn.options} optionsTe={tTe.options} />
              )}
              {currentStep === 8 && (
                <Step8Support
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                  tEn={tEn.support}
                  tTe={tTe.support}
                />
              )}
              {currentStep === 9 && (
                <Step9Documents register={register} errors={errors} setValue={setValue} watch={watch} tEn={tEn.documents} tTe={tTe.documents} />
              )}
            </AnimatePresence>
          </div>

          {submitError && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-md">
              <p className="text-sm text-destructive">{submitError}</p>
            </div>
          )}

          <div className="flex justify-between mt-8 pb-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 border",
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 border-gray-300"
                  : "hover:opacity-90"
              )}
              style={
                currentStep === 1
                  ? undefined
                  : {
                      backgroundColor: "#f91723",
                      color: "white",
                      borderColor: "#f91723",
                    }
              }
            >
              {tEn.previous} / {tTe.previous}
            </button>

            {currentStep < 9 ? (
              <Button 
                type="button"
                variant="default"
                onClick={nextStep} 
                size="lg"
                style={{
                  backgroundColor: "#416c38",
                  color: "white",
                }}
                className="hover:opacity-90 !bg-[#416c38] !text-white"
              >
                {tEn.next} / {tTe.next}
              </Button>
            ) : (
              <Button 
                type="submit"
                variant="default"
                disabled={isSubmitting} 
                size="lg"
                style={{
                  backgroundColor: "#416c38",
                  color: "white",
                }}
                className="hover:opacity-90 !bg-[#416c38] !text-white"
              >
                {isSubmitting ? `${tEn.submitting} / ${tTe.submitting}` : `${tEn.submit} / ${tTe.submit}`}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

