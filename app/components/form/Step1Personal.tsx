"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ApplicationFormData } from "@/lib/validations";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import locations from "../../../lib/locations.json";
import casteDataRaw from "../../../lib/caste.json";

interface Step1PersonalProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
  setValue: UseFormSetValue<ApplicationFormData>;
  tEn: typeof import("@/lib/translations").translations.en.personal;
  tTe: typeof import("@/lib/translations").translations.te.personal;
  optionsEn: typeof import("@/lib/translations").translations.en.options;
  optionsTe: typeof import("@/lib/translations").translations.te.options;
}

export function Step1Personal({ register, errors, watch, setValue, tEn, tTe, optionsEn, optionsTe }: Step1PersonalProps) {
  const [district, setDistrict] = useState<string>("");
  const [parliament, setParliament] = useState<string>("");
  const [assembly, setAssembly] = useState<string>("");

  // Cast locations to the correct type to avoid TS errors
  const locationsData = locations as any;

  const districts = Object.keys(locationsData);
  const parliaments = district ? Object.keys(locationsData[district] || {}) : [];
  const assemblies = parliament ? Object.keys(locationsData[district]?.[parliament] || {}) : [];
  const mandals = assembly ? Object.keys(locationsData[district]?.[parliament]?.[assembly] || {}) : [];
  const villages = (assembly && watch("mandal")) ? (locationsData[district]?.[parliament]?.[assembly]?.[watch("mandal")] || []) : [];

  // Caste Logic
  const casteData = casteDataRaw as Record<string, string[]>;
  const casteCategories = Object.keys(casteData);
  const selectedCasteCategory = watch("caste_category");
  const availableCastes = selectedCasteCategory ? (casteData[selectedCasteCategory] || []) : [];

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDistrict(val);
    setParliament("");
    setAssembly("");
    setValue("mandal", "");
    setValue("village", "");
  };

  const handleParliamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParliament(val);
    setAssembly("");
    setValue("mandal", "");
    setValue("village", "");
  };

  const handleAssemblyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setAssembly(val);
    setValue("mandal", "");
    setValue("village", "");
  };

  const handleMandalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setValue("mandal", val);
    setValue("village", "");
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setValue("village", val);

    // Auto-populate address when village is selected (or when any part is sufficiently filled, but village implies completion)
    if (district && parliament && assembly && watch("mandal") && val) {
      const addressString = `${val}, ${watch("mandal")}, ${assembly}, ${parliament}, ${district}`;
      setValue("address", addressString);
    }
  };

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
            min={18}
            max={70}
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
          <Select
            id="caste_category"
            {...register("caste_category")}
            onChange={(e) => {
              register("caste_category").onChange(e);
              setValue("caste", ""); // Reset caste when category changes
            }}
          >
            <option value="">{tEn.selectCaste} / {tTe.selectCaste}</option>
            {casteCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          {errors.caste_category && (
            <p className="text-sm text-destructive">
              {errors.caste_category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="caste">
            Subcaste / కులం <span className="text-destructive">*</span>
          </Label>
          <Select
            id="caste"
            {...register("caste")}
            disabled={!selectedCasteCategory}
          >
            <option value="">Select Caste / కులాన్ని ఎంచుకోండి</option>
            {availableCastes.map((caste) => (
              <option key={caste} value={caste}>{caste}</option>
            ))}
          </Select>
          {errors.caste && (
            <p className="text-sm text-destructive">
              {errors.caste.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">
            {tEn.education} / {tTe.education} <span className="text-destructive">*</span>
          </Label>
          <Select
            id="education"
            {...register("education")}
          >
            <option value="">Select Education</option>
            <option value="None">None</option>
            <option value="SSC">SSC</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Graduation">Graduation</option>
            <option value="Post graduation">Post graduation</option>
          </Select>
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

        <div className="space-y-2">
          <Label htmlFor="aadhaar_number">
            Aadhaar Number / ఆధార్ సంఖ్య
          </Label>
          <Input
            id="aadhaar_number"
            {...register("aadhaar_number")}
            placeholder="Enter Aadhaar Number / ఆధార్ సంఖ్యను నమోదు చేయండి"
            maxLength={12}
          />
          {errors.aadhaar_number && (
            <p className="text-sm text-destructive">{errors.aadhaar_number.message}</p>
          )}
        </div>

        {/* Location Dropdowns */}
        <div className="space-y-2">
          <Label>District <span className="text-destructive">*</span></Label>
          <Select value={district} onChange={handleDistrictChange}>
            <option value="">Select District</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Parliament Constituency <span className="text-destructive">*</span></Label>
          <Select value={parliament} onChange={handleParliamentChange} disabled={!district}>
            <option value="">Select Parliament</option>
            {parliaments.map(p => <option key={p} value={p}>{p}</option>)}
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Assembly Constituency <span className="text-destructive">*</span></Label>
          <Select value={assembly} onChange={handleAssemblyChange} disabled={!parliament}>
            <option value="">Select Assembly</option>
            {assemblies.map(a => <option key={a} value={a}>{a}</option>)}
          </Select>
        </div>

        {/* Existing Mandal/Village fields tied to Form State but driven by Selects */}
        <div className="space-y-2">
          <Label htmlFor="mandal">
            {tEn.mandal} / {tTe.mandal} <span className="text-destructive">*</span>
          </Label>
          <Select
            id="mandal"
            value={watch("mandal") || ""}
            onChange={handleMandalChange}
            disabled={!assembly}
          >
            <option value="">{tEn.enterMandal} / {tTe.enterMandal}</option>
            {mandals.map(m => <option key={m} value={m}>{m}</option>)}
          </Select>
          <input type="hidden" {...register("mandal")} />
          {errors.mandal && (
            <p className="text-sm text-destructive">{errors.mandal.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="village">
            {tEn.village} / {tTe.village} <span className="text-destructive">*</span>
          </Label>
          <Select
            id="village"
            value={watch("village") || ""}
            onChange={handleVillageChange}
            disabled={!watch("mandal")}
          >
            <option value="">{tEn.enterVillage} / {tTe.enterVillage}</option>
            {villages.map((v: string) => <option key={v} value={v}>{v}</option>)}
          </Select>
          <input type="hidden" {...register("village")} />
          {errors.village && (
            <p className="text-sm text-destructive">{errors.village.message}</p>
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

