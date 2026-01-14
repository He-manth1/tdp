"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { applicationSchema, ApplicationFormData } from "@/lib/validations";
import { submitApplication, updateApplication, Application } from "@/lib/api";
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

interface WizardProps {
  initialData?: Application;
}

export function Wizard({ initialData }: WizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const tEn = useTranslation("en");
  const tTe = useTranslation("te");
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    getValues,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    defaultValues: initialData ? {
      ...initialData,
      // Sanitize nulls to undefined or matching types for Zod
      membership_id: initialData.membership_id ?? undefined,
      booth_no: initialData.booth_no ?? undefined,
      is_shg_member: initialData.is_shg_member ?? undefined,
      organization_type: initialData.organization_type ?? undefined,
      group_name: initialData.group_name ?? undefined,
      handicap_type: initialData.handicap_type ?? undefined,
      business_nature: initialData.business_nature ?? undefined,
      experience: initialData.experience ?? undefined,
      branch_name: initialData.branch_name ?? undefined,
      annual_income: initialData.annual_income ?? undefined,
      investment_amount: initialData.investment_amount ?? undefined,
      loan_amount: initialData.loan_amount ?? undefined,
      bank_name: initialData.bank_name ?? undefined,
      land_location: initialData.land_location ?? undefined,
      survey_details: initialData.survey_details ?? undefined,
      support_required: initialData.support_required ?? [],
    } : {
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
      if (isEditing && initialData?.id) {
        // Update existing
        await updateApplication(initialData.id, data);
        // For edit, maybe we don't show success screen but redirect or show generic success? 
        // Let's keep success screen but change text?
        setSubmitSuccess(true);
      } else {
        // Create new
        await submitApplication(data);
        setSubmitSuccess(true);
      }
    } catch (error: any) {
      setSubmitError(
        error.response?.data?.detail || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const handleLogoClick = () => {
    // Check if form has any data filled
    const formValues = getValues();
    const hasFormData = Object.values(formValues).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === "boolean") {
        return value === true;
      }
      if (typeof value === "number") {
        return value > 0;
      }
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined;
    });

    if (hasFormData) {
      const confirmed = window.confirm("Are you sure to go to the dashboard page?");
      if (confirmed) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-sm text-destructive hover:underline cursor-pointer z-30"
        >
          Logout
        </button>
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-600">
            {isEditing ? "Updated Successfully" : tEn.successTitle} / {isEditing ? "Updated Successfully" : tTe.successTitle}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isEditing ? "Application details have been updated." : tEn.successMessage}
          </p>
          <Button
            onClick={() => {
              if (isEditing) {
                router.push("/record");
              } else {
                setSubmitSuccess(false);
                setCurrentStep(1);
                window.location.reload();
              }
            }}
            size="lg"
          >
            {isEditing ? "Back to Records" : tEn.submitAnother}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative pb-12">
      {/* Logo in top left corner */}
      <div
        className="fixed top-6 left-6 z-20 cursor-pointer bg-white/50 backdrop-blur-sm p-2 rounded-xl border border-white/20 hover:bg-white/80 transition-all"
        onClick={handleLogoClick}
      >
        <Image
          src="/Assets/7a5bb2c43751a063990d3c59f374b73b.jpg"
          alt="Logo"
          width={100}
          height={50}
          className="object-contain"
          priority
        />
      </div>
      {/* Logout button in top right corner */}
      <button
        onClick={handleLogout}
        className="fixed top-6 right-6 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors z-30 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20"
      >
        Logout
      </button>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <div className="mb-10 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            {tEn.title} <span className="text-slate-300 mx-2">/</span> {tTe.title}
          </h1>
          <p className="text-slate-500">
            Please fill out the form below carefully to submit your application.
          </p>
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

          <div className="glass rounded-2xl p-6 md:p-8 min-h-[500px]">
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

            {submitError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-sm font-medium text-red-800">{submitError}</p>
              </div>
            )}

            <div className="flex justify-between items-center mt-8 pt-8 border-t border-slate-100">
              <Button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={cn(
                  "w-32 shadow-lg transition-all",
                  currentStep === 1
                    ? "bg-gray-200 text-gray-400 border-gray-300"
                    : "bg-[#f91723] hover:bg-[#d00f19] text-white shadow-red-200"
                )}
              >
                {tEn.previous} / {tTe.previous}
              </Button>

              {currentStep < 9 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-32 bg-[#416c38] hover:bg-[#2f5028] text-white shadow-lg shadow-green-200/50"
                  style={{ backgroundColor: "#416c38" }}
                >
                  {tEn.next} / {tTe.next}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-40 bg-[#416c38] hover:bg-[#2f5028] text-white shadow-lg shadow-green-200/50"
                  style={{ backgroundColor: "#416c38" }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : `${tEn.submit} / ${tTe.submit}`}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

