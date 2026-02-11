import { z } from "zod";

export const applicationSchema = z.object({
  // Personal Information
  full_name: z.string().min(1, "Full name is required").max(255),
  age: z.number().min(18, "Age must be at least 18").max(70, "Age must be at most 70"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  caste_category: z.enum(["BC", "OC", "SC", "ST", "Minority"], {
    required_error: "Caste category is required",
  }),
  caste: z.string().min(1, "Caste is required"),
  education: z.string().min(1, "Education is required").max(255),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  aadhaar_number: z.string().length(12, "Aadhaar number must be exactly 12 digits").regex(/^\d+$/, "Aadhaar number must contain only numbers").optional(),
  membership_id: z.string().optional(),
  village: z.string().min(1, "Village is required").max(255),
  booth_no: z.string().optional(),
  mandal: z.string().min(1, "Mandal is required").max(255),

  // SHG Information (conditional - only if Gender is Female)
  is_shg_member: z.boolean().optional(),
  organization_type: z.enum(["SERP", "MEPMA", "Other"]).optional(),
  group_name: z.string().optional(),

  // Disability Information (conditional - only if Is Handicapped is Yes)
  is_handicapped: z.boolean().default(false),
  handicap_type: z.string().optional(),

  // Business Information
  current_business: z.boolean().default(false),
  business_nature: z.string().optional(),
  experience: z.number().min(0).optional(),
  reason_for_closure: z.string().optional(),
  family_business_in_business: z.boolean().default(false),
  family_business_activity: z.string().optional(),
  business_motivation: z.string().optional(),

  // Financial Information
  bank_account_number: z.string().optional(),
  annual_family_income: z.number().min(0).optional(),
  own_contribution: z.number().min(0).optional(),
  loan_required: z.number().min(0).optional(),
  existing_loans: z.string().optional(),
  repayment_capacity: z.number().min(0).optional(),

  // Project Information
  project_interest: z.string().min(1, "Project interest is required").max(255),
  reason_for_interest: z.string().min(1, "Reason for interest is required"),
  market_survey_done: z.boolean().default(false),
  target_customers: z.string().optional(), // Will store comma separated string or simplified
  major_competitors: z.string().optional(),
  expected_monthly_sales: z.number().min(0).optional(),
  expected_monthly_profit: z.number().min(0).optional(),

  // Land Information (conditional - only if Land Status is not "Not Available")
  land_status: z.enum(["Own", "Rented", "Lease", "Not Available"], {
    required_error: "Land/Premises status is required",
  }),
  land_location: z.string().optional(),
  survey_details: z.string().optional(),

  // Training & Support Needs
  support_required: z.array(z.string()).default([]),
  has_edp_training: z.boolean().default(false),

  // Resource Availability
  machinery_required: z.string().optional(),
  raw_material_source: z.string().optional(),
  has_power_connection: z.boolean().default(false),
  has_water_facility: z.boolean().default(false),

  // Entrepreneurial Competency (Rating Scale 1-5)
  competency_risk_taking: z.number().min(1).max(5).optional(),
  competency_leadership: z.number().min(1).max(5).optional(),
  competency_communication: z.number().min(1).max(5).optional(),
  competency_financial_mgmt: z.number().min(1).max(5).optional(),
  competency_problem_solving: z.number().min(1).max(5).optional(),
  competency_willingness_to_learn: z.number().min(1).max(5).optional(),

  // Commitment & Declaration
  willing_full_time: z.boolean().default(false),
  willing_attend_training: z.boolean().default(false),

  // Documents
  has_aadhaar: z.boolean().default(false),
  has_bank_passbook: z.boolean().default(false),
  has_photo: z.boolean().default(false),
  has_income_proof: z.boolean().default(false),
  has_pan: z.boolean().default(false),

  // Signature
  signature_data: z.string().optional(),
}).refine(
  (data) => {
    // SHG fields required if gender is Female
    if (data.gender === "Female") {
      if (data.is_shg_member === undefined) {
        return false;
      }
      if (data.is_shg_member === true) {
        if (!data.organization_type || !data.group_name) {
          return false;
        }
      }
    }
    return true;
  },
  {
    message: "SHG information is required when gender is Female",
    path: ["is_shg_member"],
  }
).refine(
  (data) => {
    // Disability details required if is_handicapped is true
    if (data.is_handicapped === true) {
      if (!data.handicap_type || data.handicap_type.trim() === "") {
        return false;
      }
    }
    return true;
  },
  {
    message: "Handicap type is required when physical disability is Yes",
    path: ["handicap_type"],
  }
).refine(
  (data) => {
    // Land details required if land_status is not "Not Available"
    if (data.land_status !== "Not Available") {
      if (!data.land_location || data.land_location.trim() === "") {
        return false;
      }
    }
    return true;
  },
  {
    message: "Land location is required when land/premises is available",
    path: ["land_location"],
  }
);

export type ApplicationFormData = z.infer<typeof applicationSchema>;




