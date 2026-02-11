"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Step1Personal } from "./Step1Personal";
import { Step2SHG } from "./Step2SHG";
import { motion } from "framer-motion";

interface NewStep1Props {
    register: UseFormRegister<ApplicationFormData>;
    errors: FieldErrors<ApplicationFormData>;
    watch: UseFormWatch<ApplicationFormData>;
    setValue: UseFormSetValue<ApplicationFormData>;
    tEn: any;
    tTe: any;
}

export function NewStep1({ register, errors, watch, setValue, tEn, tTe }: NewStep1Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Section A: Personal Information */}
            <div className="space-y-6">
                <Step1Personal
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.personal}
                    tTe={tTe.personal}
                    optionsEn={tEn.options}
                    optionsTe={tTe.options}
                />
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Section B: SHG / Background */}
            <div className="space-y-6">
                <Step2SHG
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    tEn={tEn.shg}
                    tTe={tTe.shg}
                    optionsEn={tEn.options}
                    optionsTe={tTe.options}
                />
            </div>
        </motion.div>
    );
}
