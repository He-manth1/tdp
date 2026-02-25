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
  date_of_birth: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  caste_category: "BC" | "OC" | "SC" | "ST" | "Minority";
  caste?: string;
  education: string;
  address: string;
  phone: string;
  aadhaar_number: string;
  pan_number?: string;
  membership_id?: string;
  village: string;
  booth_no?: string;
  mandal: string;
  door_number?: string;
  street_landmark?: string;

  // SHG Information
  is_shg_member?: boolean;
  shg_member_relation?: string;
  organization_type?: "SERP" | "MEPMA" | "Other";
  group_name?: string;

  // SHG Loan Information
  has_shg_loan?: boolean;
  shg_loan_bank_branch?: string;
  shg_loan_amount?: number;
  shg_loan_year?: string;
  shg_loan_month?: string;
  shg_outstanding_months?: number;
  shg_outstanding_amount?: number;

  // Disability Information
  is_handicapped: boolean;
  handicap_type?: string;

  // Business Information
  current_business: boolean;
  business_location?: string;
  business_nature?: string;
  experience?: number;
  reason_for_closure?: string;
  want_to_expand?: boolean;
  expansion_details?: string;
  family_business_in_business: boolean;
  family_business_activity?: string;
  business_motivation?: string;

  // Financial Information
  is_bpl?: boolean;
  ration_card_number?: string;
  bank_account_number?: string;
  bank_name?: string;
  bank_branch?: string;
  annual_family_income?: number;
  own_contribution?: number;
  loan_required?: number;
  has_existing_loans?: boolean;
  is_business_loan?: boolean;
  existing_loan_type?: string;
  existing_loans?: string;
  repayment_capacity?: number;

  // Project Information
  project_interest: string;
  business_sector?: "Agriculture" | "Manufacturing" | "Services" | "Retail" | "Other";
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
  edp_training_details?: string;
  department_to_send?: "Industries" | "MSME" | "Agriculture";

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
  has_other_documents?: boolean;
  other_documents_details?: string;

  // Signature
  signature_data?: string;
}

export interface StatusHistoryEntry {
  changed_at?: string;
  change?: {
    status_from?: string | null;
    status_to?: string | null;
    with_department_from?: string | null;
    with_department_to?: string | null;
  };
  // Backward compatibility
  timestamp?: string;
  status?: string;
  status_recipient?: string | null;
  changes?: string[];
}

export interface Application extends ApplicationSubmitData {
  id: number;
  created_at: string;
  status: string;
  status_recipient?: "Applicant" | "Bank" | "Name" | "Department" | null;
  status_history?: StatusHistoryEntry[] | null;
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
