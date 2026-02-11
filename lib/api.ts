import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApplicationSubmitData {
  // Personal Information
  full_name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  caste_category: "BC" | "OC" | "SC" | "ST" | "Minority";
  caste?: string;
  education: string;
  address: string;
  phone: string;
  aadhaar_number?: string;
  membership_id?: string;
  village: string;
  booth_no?: string;
  mandal: string;

  // SHG Information
  is_shg_member?: boolean;
  organization_type?: "SERP" | "MEPMA" | "Other";
  group_name?: string;

  // Disability Information
  is_handicapped: boolean;
  handicap_type?: string;

  // Business Information
  current_business: boolean;
  business_nature?: string;
  experience?: number;
  reason_for_closure?: string;
  family_business_in_business: boolean;
  family_business_activity?: string;
  business_motivation?: string;

  // Financial Information
  bank_account_number?: string;
  annual_family_income?: number;
  own_contribution?: number;
  loan_required?: number;
  existing_loans?: string;
  repayment_capacity?: number;

  // Project Information
  project_interest: string;
  reason_for_interest: string;
  market_survey_done?: boolean;
  target_customers?: string;
  major_competitors?: string;
  expected_monthly_sales?: number;
  expected_monthly_profit?: number;

  // Land Information
  land_status: "Own" | "Rented" | "Lease" | "Not Available";
  land_location?: string;
  survey_details?: string;

  // Training & Support Needs
  support_required?: string[];
  has_edp_training: boolean;

  // Resource Availability
  machinery_required?: string;
  raw_material_source?: string;
  has_power_connection: boolean;
  has_water_facility: boolean;

  // Entrepreneurial Competency (1-5)
  competency_risk_taking?: number;
  competency_leadership?: number;
  competency_communication?: number;
  competency_financial_mgmt?: number;
  competency_problem_solving?: number;
  competency_willingness_to_learn?: number;

  // Commitment & Declaration
  willing_full_time: boolean;
  willing_attend_training: boolean;

  // Documents
  has_aadhaar: boolean;
  has_bank_passbook: boolean;
  has_photo: boolean;
  has_income_proof: boolean;
  has_pan: boolean;

  // Signature
  signature_data?: string;
}

export interface Application extends ApplicationSubmitData {
  id: number;
  created_at: string;
  status: string;
}

export const submitApplication = async (data: ApplicationSubmitData) => {
  const response = await api.post("/api/submit-application", data);
  return response.data;
};

export const updateApplication = async (id: number, data: ApplicationSubmitData) => {
  const response = await api.put(`/api/applications/${id}`, data);
  return response.data;
};

export const fetchApplications = async (): Promise<Application[]> => {
  const response = await api.get("/api/applications");
  return response.data;
};

export const fetchApplication = async (id: number): Promise<Application> => {
  const response = await api.get(`/api/applications/${id}`);
  return response.data;
};
