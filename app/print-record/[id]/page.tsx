"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchApplication, Application } from "@/lib/api";
import { Loader2, Printer } from "lucide-react";
import Image from "next/image";

export default function PrintRecordPage() {
    const params = useParams();
    const id = Number(params.id);
    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        loadApplication();
    }, [id]);

    const loadApplication = async () => {
        try {
            setLoading(true);
            const data = await fetchApplication(id);
            setApplication(data);
            // Small delay to ensure render is complete before printing
            setTimeout(() => {
                window.print();
            }, 500);
        } catch (err) {
            console.error("Error loading application:", err);
            setError("Failed to load application details.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-2" />
                    <p className="text-slate-500">Preparing document...</p>
                </div>
            </div>
        );
    }

    if (error || !application) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <p>{error || "Application not found"}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black p-8 max-w-[210mm] mx-auto">
            {/* Print Controls - Hidden when printing */}
            <div className="print:hidden flex justify-end gap-4 mb-8">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Printer className="h-4 w-4" />
                    Print Application
                </button>
                <button
                    onClick={() => window.close()}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                    Close
                </button>
            </div>

            {/* Header */}
            <header className="border-b-2 border-black pb-4 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 relative">
                        <Image
                            src="/Assets/TDPBADGEAsset2_1024x1024.webp"
                            alt="TDP Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-wide">Cadre Empowerment Application</h1>
                        <p className="text-sm text-slate-600 font-medium">Application ID: #{application.id}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold">Date: {new Date(application.created_at).toLocaleDateString()}</p>
                    <span className="inline-block px-3 py-1 border border-black rounded text-sm font-bold mt-1">
                        {application.status}
                    </span>
                </div>
            </header>

            {/* Content Grid */}
            <div className="space-y-6 text-sm">
                {/* Personal Details */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Personal Details</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Full Name:</span>
                            <span className="col-span-2 font-medium">{application.full_name}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Age / Gender:</span>
                            <span className="col-span-2 font-medium">{application.age} / {application.gender}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Phone:</span>
                            <span className="col-span-2 font-medium">{application.phone}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Caste Category:</span>
                            <span className="col-span-2 font-medium">{application.caste_category}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Caste:</span>
                            <span className="col-span-2 font-medium">{application.caste || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Education:</span>
                            <span className="col-span-2 font-medium">{application.education}</span>
                        </div>
                        {application.aadhaar_number && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Aadhaar Number:</span>
                                <span className="col-span-2 font-medium">{application.aadhaar_number}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Membership ID:</span>
                            <span className="col-span-2 font-medium">{application.membership_id || "N/A"}</span>
                        </div>
                    </div>
                </section>

                {/* Location Details */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Location Details</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Address:</span>
                            <span className="col-span-2 font-medium">{application.address}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Village:</span>
                            <span className="col-span-2 font-medium">{application.village}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Mandal:</span>
                            <span className="col-span-2 font-medium">{application.mandal}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Booth No:</span>
                            <span className="col-span-2 font-medium">{application.booth_no || "N/A"}</span>
                        </div>
                    </div>
                </section>

                {/* SHG Information - only if applicable */}
                {application.is_shg_member && (
                    <section>
                        <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">SHG Information</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">SHG Member:</span>
                                <span className="col-span-2 font-medium">Yes</span>
                            </div>
                            {application.organization_type && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Organization Type:</span>
                                    <span className="col-span-2 font-medium">{application.organization_type}</span>
                                </div>
                            )}
                            {application.group_name && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Group Name:</span>
                                    <span className="col-span-2 font-medium">{application.group_name}</span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Disability Information - only if applicable */}
                {application.is_handicapped && (
                    <section>
                        <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Disability Information</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Physically Handicapped:</span>
                                <span className="col-span-2 font-medium">Yes</span>
                            </div>
                            {application.handicap_type && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Type:</span>
                                    <span className="col-span-2 font-medium">{application.handicap_type}</span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Entrepreneurial Background */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Entrepreneurial Background</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Current Business:</span>
                            <span className="col-span-2 font-medium">{application.current_business ? "Yes" : "No"}</span>
                        </div>
                        {application.business_nature && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Nature of Business:</span>
                                <span className="col-span-2 font-medium">{application.business_nature}</span>
                            </div>
                        )}
                        {application.experience != null && application.experience > 0 && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Experience (Years):</span>
                                <span className="col-span-2 font-medium">{application.experience}</span>
                            </div>
                        )}
                        {application.reason_for_closure && (
                            <div className="grid grid-cols-3 col-span-2">
                                <span className="font-semibold text-gray-600">Reason for Closure:</span>
                                <span className="col-span-2 font-medium">{application.reason_for_closure}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Family in Business:</span>
                            <span className="col-span-2 font-medium">{application.family_business_in_business ? "Yes" : "No"}</span>
                        </div>
                        {application.family_business_activity && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Family Business Activity:</span>
                                <span className="col-span-2 font-medium">{application.family_business_activity}</span>
                            </div>
                        )}
                        {application.business_motivation && (
                            <div className="grid grid-cols-3 col-span-2">
                                <span className="font-semibold text-gray-600">Business Motivation:</span>
                                <span className="col-span-2 font-medium">{application.business_motivation}</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Enterprise Idea & Market Readiness */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Enterprise Idea & Market Readiness</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="grid grid-cols-3 col-span-2">
                            <span className="font-semibold text-gray-600">Interested Project:</span>
                            <span className="col-span-2 font-medium text-lg">{application.project_interest}</span>
                        </div>
                        <div className="grid grid-cols-3 col-span-2">
                            <span className="font-semibold text-gray-600">Reason for Interest:</span>
                            <span className="col-span-2 font-medium">{application.reason_for_interest}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Market Survey Done:</span>
                            <span className="col-span-2 font-medium">{application.market_survey_done ? "Yes" : "No"}</span>
                        </div>
                        {application.target_customers && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Target Customers:</span>
                                <span className="col-span-2 font-medium">{application.target_customers}</span>
                            </div>
                        )}
                        {application.major_competitors && (
                            <div className="grid grid-cols-3 col-span-2">
                                <span className="font-semibold text-gray-600">Major Competitors:</span>
                                <span className="col-span-2 font-medium">{application.major_competitors}</span>
                            </div>
                        )}
                        {application.expected_monthly_sales != null && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Expected Monthly Sales:</span>
                                <span className="col-span-2 font-medium">{"\u20B9"}{application.expected_monthly_sales.toLocaleString()}</span>
                            </div>
                        )}
                        {application.expected_monthly_profit != null && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Expected Monthly Profit:</span>
                                <span className="col-span-2 font-medium">{"\u20B9"}{application.expected_monthly_profit.toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Resource Availability */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Resource Availability</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Land/Premises:</span>
                            <span className="col-span-2 font-medium">{application.land_status}</span>
                        </div>
                        {application.land_location && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Location:</span>
                                <span className="col-span-2 font-medium">{application.land_location}</span>
                            </div>
                        )}
                        {application.survey_details && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Survey Details:</span>
                                <span className="col-span-2 font-medium">{application.survey_details}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Power Connection:</span>
                            <span className="col-span-2 font-medium">{application.has_power_connection ? "Yes" : "No"}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Water Facility:</span>
                            <span className="col-span-2 font-medium">{application.has_water_facility ? "Yes" : "No"}</span>
                        </div>
                        {application.machinery_required && (
                            <div className="grid grid-cols-3 col-span-2">
                                <span className="font-semibold text-gray-600">Machinery Required:</span>
                                <span className="col-span-2 font-medium">{application.machinery_required}</span>
                            </div>
                        )}
                        {application.raw_material_source && (
                            <div className="grid grid-cols-3 col-span-2">
                                <span className="font-semibold text-gray-600">Raw Material Source:</span>
                                <span className="col-span-2 font-medium">{application.raw_material_source}</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Financial Information */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Financial Information</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {application.bank_account_number && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Bank Account No:</span>
                                <span className="col-span-2 font-medium">{application.bank_account_number}</span>
                            </div>
                        )}
                        {application.annual_family_income != null && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Annual Family Income:</span>
                                <span className="col-span-2 font-medium">{"\u20B9"}{application.annual_family_income.toLocaleString()}</span>
                            </div>
                        )}
                        {application.own_contribution != null && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Own Contribution:</span>
                                <span className="col-span-2 font-medium">{"\u20B9"}{application.own_contribution.toLocaleString()}</span>
                            </div>
                        )}
                        {application.loan_required != null && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Loan Required:</span>
                                <span className="col-span-2 font-medium">{"\u20B9"}{application.loan_required.toLocaleString()}</span>
                            </div>
                        )}
                        {application.existing_loans && (
                            <div className="grid grid-cols-3 col-span-2">
                                <span className="font-semibold text-gray-600">Existing Loans:</span>
                                <span className="col-span-2 font-medium">{application.existing_loans}</span>
                            </div>
                        )}
                        {application.repayment_capacity != null && (
                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-gray-600">Repayment Capacity/Month:</span>
                                <span className="col-span-2 font-medium">{"\u20B9"}{application.repayment_capacity.toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Training & Support */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Training & Support Needs</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {application.support_required && application.support_required.length > 0 && (
                            <div className="grid grid-cols-3 col-span-2">
                                <span className="font-semibold text-gray-600">Support Required:</span>
                                <span className="col-span-2 font-medium">{application.support_required.join(", ")}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">EDP Training Attended:</span>
                            <span className="col-span-2 font-medium">{application.has_edp_training ? "Yes" : "No"}</span>
                        </div>
                    </div>
                </section>

                {/* Entrepreneurial Competency */}
                {(application.competency_risk_taking || application.competency_leadership || application.competency_communication || application.competency_financial_mgmt || application.competency_problem_solving || application.competency_willingness_to_learn) && (
                    <section>
                        <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Entrepreneurial Competency (1-5)</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {application.competency_risk_taking != null && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Risk-taking Ability:</span>
                                    <span className="col-span-2 font-medium">{application.competency_risk_taking} / 5</span>
                                </div>
                            )}
                            {application.competency_leadership != null && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Leadership Skills:</span>
                                    <span className="col-span-2 font-medium">{application.competency_leadership} / 5</span>
                                </div>
                            )}
                            {application.competency_communication != null && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Communication Skills:</span>
                                    <span className="col-span-2 font-medium">{application.competency_communication} / 5</span>
                                </div>
                            )}
                            {application.competency_financial_mgmt != null && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Financial Management:</span>
                                    <span className="col-span-2 font-medium">{application.competency_financial_mgmt} / 5</span>
                                </div>
                            )}
                            {application.competency_problem_solving != null && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Problem-solving Ability:</span>
                                    <span className="col-span-2 font-medium">{application.competency_problem_solving} / 5</span>
                                </div>
                            )}
                            {application.competency_willingness_to_learn != null && (
                                <div className="grid grid-cols-3">
                                    <span className="font-semibold text-gray-600">Willingness to Learn:</span>
                                    <span className="col-span-2 font-medium">{application.competency_willingness_to_learn} / 5</span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Commitment & Declaration */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Commitment & Declaration</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Willing Full-Time:</span>
                            <span className="col-span-2 font-medium">{application.willing_full_time ? "Yes" : "No"}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="font-semibold text-gray-600">Willing 15-30 Day Training:</span>
                            <span className="col-span-2 font-medium">{application.willing_attend_training ? "Yes" : "No"}</span>
                        </div>
                    </div>
                </section>

                {/* Verification Checklist */}
                <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 uppercase">Documents Submitted</h2>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 border border-black flex items-center justify-center`}>
                                {application.has_aadhaar && "✓"}
                            </div>
                            <span>Aadhaar Card</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 border border-black flex items-center justify-center`}>
                                {application.has_photo && "✓"}
                            </div>
                            <span>Passport Photo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 border border-black flex items-center justify-center`}>
                                {application.has_bank_passbook && "✓"}
                            </div>
                            <span>Bank Passbook</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 border border-black flex items-center justify-center`}>
                                {application.has_income_proof && "✓"}
                            </div>
                            <span>Income Proof</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 border border-black flex items-center justify-center`}>
                                {application.has_pan && "✓"}
                            </div>
                            <span>PAN Card</span>
                        </div>
                    </div>
                </section>

                {/* Declaration */}
                <section className="border border-gray-400 p-4 rounded">
                    <h2 className="text-lg font-bold mb-2 uppercase">Declaration</h2>
                    <p className="text-sm leading-relaxed">
                        I hereby declare that the information furnished is true and I am committed to establishing the enterprise.
                    </p>
                </section>

            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-300 flex justify-between text-sm text-gray-500">
                <div>
                    <p>Printed on: {new Date().toLocaleString()}</p>
                    <p>TDP Cadre Empowerment Portal</p>
                </div>
                <div className="text-right">
                    {application.signature_data ? (
                        <div>
                            <img
                                src={application.signature_data}
                                alt="Applicant Signature"
                                className="h-16 ml-auto mb-1"
                            />
                            <p className="border-t border-black w-48 pt-1 text-center text-black">Signature</p>
                        </div>
                    ) : (
                        <p className="border-t border-black w-48 mt-8 pt-1 text-center text-black">Signature</p>
                    )}
                </div>
            </div>
        </div>
    );
}
