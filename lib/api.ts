import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApplicationSubmitData {
  full_name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  caste_category: "SC" | "ST" | "OBC" | "General" | "Other";
  education: string;
  address: string;
  phone: string;
  membership_id?: string;
  village: string;
  booth_no?: string;
  mandal: string;
  is_shg_member?: boolean;
  organization_type?: "SERP" | "MEPMA" | "Other";
  group_name?: string;
  is_handicapped: boolean;
  handicap_type?: string;
  current_business: boolean;
  business_nature?: string;
  experience?: number;
  has_bank_account: boolean;
  branch_name?: string;
  annual_income?: number;
  investment_amount?: number;
  existing_loans: boolean;
  loan_amount?: number;
  bank_name?: string;
  family_support: boolean;
  project_interest: string;
  reason_for_interest: string;
  land_status: "Own" | "Lease" | "None" | "No Land Yet";
  land_location?: string;
  survey_details?: string;
  support_required?: string[];
  has_aadhaar: boolean;
  has_bank_passbook: boolean;
  has_photo: boolean;
  has_income_proof: boolean;
  has_pan: boolean;
}

export const submitApplication = async (data: ApplicationSubmitData) => {
  const response = await api.post("/api/submit-application", data);
  return response.data;
};

