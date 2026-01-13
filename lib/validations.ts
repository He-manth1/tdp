import { z } from "zod";

export const applicationSchema = z.object({
  // Personal Information
  full_name: z.string().min(1, "Full name is required").max(255),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be at most 120"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  caste_category: z.enum(["SC", "ST", "OBC", "General", "Other"], {
    required_error: "Caste category is required",
  }),
  education: z.string().min(1, "Education is required").max(255),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
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

  // Financial Information
  has_bank_account: z.boolean().default(false),
  branch_name: z.string().optional(),
  annual_income: z.number().min(0).optional(),
  investment_amount: z.number().min(0).optional(),
  existing_loans: z.boolean().default(false),
  loan_amount: z.number().min(0).optional(),
  bank_name: z.string().optional(),
  family_support: z.boolean().default(false),

  // Project Information
  project_interest: z.string().min(1, "Project interest is required").max(255),
  reason_for_interest: z.string().min(1, "Reason for interest is required"),

  // Land Information (conditional - only if Land Status is not "No Land Yet")
  land_status: z.enum(["Own", "Lease", "None", "No Land Yet"], {
    required_error: "Land status is required",
  }),
  land_location: z.string().optional(),
  survey_details: z.string().optional(),

  // Support Required
  support_required: z.array(z.string()).default([]),

  // Documents
  has_aadhaar: z.boolean().default(false),
  has_bank_passbook: z.boolean().default(false),
  has_photo: z.boolean().default(false),
  has_income_proof: z.boolean().default(false),
  has_pan: z.boolean().default(false),
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
    // Land details required if land_status is not "No Land Yet"
    if (data.land_status !== "No Land Yet") {
      if (!data.land_location || data.land_location.trim() === "") {
        return false;
      }
    }
    return true;
  },
  {
    message: "Land location is required when land status is not 'No Land Yet'",
    path: ["land_location"],
  }
);

export type ApplicationFormData = z.infer<typeof applicationSchema>;



