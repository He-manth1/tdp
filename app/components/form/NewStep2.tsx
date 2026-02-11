"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Step3Disability } from "./Step3Disability";
import { Step4Business } from "./Step4Business";
import { Step5Financial } from "./Step5Financial";
import { Step6Project } from "./Step6Project";
import { Step8Support } from "./Step8Support";
import { Step9Documents } from "./Step9Documents";
import { Step10ResourceAvailability } from "./Step10ResourceAvailability";
import { StepCommitment } from "./StepCommitment";
import { StepCompetency } from "./StepCompetency";
import { motion } from "framer-motion";

interface NewStep2Props {
    register: UseFormRegister<ApplicationFormData>;
    errors: FieldErrors<ApplicationFormData>;
    watch: UseFormWatch<ApplicationFormData>;
    setValue: UseFormSetValue<ApplicationFormData>;
    tEn: any;
    tTe: any;
}

export function NewStep2({ register, errors, watch, setValue, tEn, tTe }: NewStep2Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Disability */}
            <div className="space-y-6">
                <Step3Disability
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.disability}
                    tTe={tTe.disability}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Business Info */}
            <div className="space-y-6">
                <Step4Business
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.business}
                    tTe={tTe.business}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Project Idea / Enterprise Idea & Market Readiness */}
            <div className="space-y-6">
                <Step6Project
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.project}
                    tTe={tTe.project}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Resource Availability */}
            <div className="space-y-6">
                <Step10ResourceAvailability
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.resource}
                    tTe={tTe.resource}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Financial Info */}
            <div className="space-y-6">
                <Step5Financial
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.financial}
                    tTe={tTe.financial}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Support Needed */}
            <div className="space-y-6">
                <Step8Support
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.support}
                    tTe={tTe.support}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Entrepreneurial Competency (Rating Scale) */}
            <div className="space-y-6">
                <StepCompetency
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.competency}
                    tTe={tTe.competency}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Commitment & Declaration */}
            <div className="space-y-6">
                <StepCommitment
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.commitment}
                    tTe={tTe.commitment}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Documents */}
            <div className="space-y-6">
                <Step9Documents
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    tEn={tEn.documents}
                    tTe={tTe.documents}
                />
            </div>
        </motion.div>
    );
}
