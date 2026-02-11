"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { applicationSchema, ApplicationFormData } from "@/lib/validations";
import { submitApplication, updateApplication, Application } from "@/lib/api";
import { useTranslation } from "@/lib/translations";
import { ProgressStepper } from "./ProgressStepper";
import { NewStep1 } from "./NewStep1";
import { NewStep2 } from "./NewStep2";
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
      annual_family_income: initialData.annual_family_income ?? undefined,
      own_contribution: initialData.own_contribution ?? undefined,
      loan_required: initialData.loan_required ?? undefined,
      existing_loans: initialData.existing_loans ?? undefined,
      repayment_capacity: initialData.repayment_capacity ?? undefined,
      land_location: initialData.land_location ?? undefined,
      survey_details: initialData.survey_details ?? undefined,
      support_required: initialData.support_required ?? [],
      has_edp_training: initialData.has_edp_training ?? false,
      machinery_required: initialData.machinery_required ?? undefined,
      raw_material_source: initialData.raw_material_source ?? undefined,
      has_power_connection: initialData.has_power_connection ?? false,
      has_water_facility: initialData.has_water_facility ?? false,
      willing_full_time: initialData.willing_full_time ?? false,
      willing_attend_training: initialData.willing_attend_training ?? false,
      signature_data: initialData.signature_data ?? undefined,
    } : {
      is_handicapped: false,
      current_business: false,
      support_required: [],
      has_edp_training: false,
      willing_full_time: false,
      willing_attend_training: false,
      has_aadhaar: false,
      has_bank_passbook: false,
      has_photo: false,
      has_income_proof: false,
      has_pan: false,
      has_power_connection: false,
      has_water_facility: false,
    },
  });

  const totalSteps = 2;

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setSubmitError(null);
      // Scroll to top
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubmitError(null);
      window.scrollTo(0, 0);
    }
  };

  const getFieldsForStep = (step: number): (keyof ApplicationFormData)[] => {
    switch (step) {
      case 1:
        return [
          // Step 1: Personal
          "full_name",
          "age",
          "gender",
          "caste_category",
          "education",
          "address",
          "phone",
          "village",
          "mandal",
          // Step 2: SHG
          "is_shg_member",
          "organization_type",
          "group_name"
        ];
      case 2:
        return [
          // Step 3: Disability
          "is_handicapped", "handicap_type",
          // Step 4: Business
          "current_business", "business_nature", "experience",
          // Step 5: Financial
          "bank_account_number", "annual_family_income", "own_contribution", "loan_required",
          "existing_loans", "repayment_capacity",
          // Step 6: Project
          "project_interest", "reason_for_interest",
          // Training & Support Needs
          "support_required", "has_edp_training",
          // Resource Availability (includes land/premises)
          "land_status", "land_location", "survey_details",
          "machinery_required", "raw_material_source", "has_power_connection", "has_water_facility",
          // Entrepreneurial Competency
          "competency_risk_taking", "competency_leadership", "competency_communication",
          "competency_financial_mgmt", "competency_problem_solving", "competency_willingness_to_learn",
          // Commitment & Declaration
          "willing_full_time", "willing_attend_training",
          // Documents
          "has_aadhaar", "has_bank_passbook", "has_photo", "has_income_proof", "has_pan"
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
        await updateApplication(initialData.id, data);
        setSubmitSuccess(true);
      } else {
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
    const formValues = getValues();
    const hasFormData = Object.values(formValues).some((value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "boolean") return value === true;
      if (typeof value === "number") return value > 0;
      if (typeof value === "string") return value.trim().length > 0;
      return value !== null && value !== undefined;
    });

    if (hasFormData) {
      const confirmed = window.confirm("Are you sure to go to the dashboard page?");
      if (confirmed) router.push("/");
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
      <button
        onClick={handleLogout}
        className="fixed top-6 right-6 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors z-30 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20"
      >
        Logout
      </button>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
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
            totalSteps={totalSteps}
            steps={[
              "Personal & Background / వ్యక్తిగత & నేపథ్యం",
              "Enterprise & Commitment / ఎంటర్ప్రైజ్ & నిబద్ధత"
            ]}
          />

          <div className="glass rounded-2xl p-6 md:p-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <NewStep1
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  tEn={tEn}
                  tTe={tTe}
                />
              )}
              {currentStep === 2 && (
                <NewStep2
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  tEn={tEn}
                  tTe={tTe}
                />
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

              {currentStep < 2 ? (
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

