"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchApplications, Application } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function RecordPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const handleLogout = () => {
    router.push("/login");
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchApplications();
      setApplications(data);
    } catch (err) {
      setError("Failed to load applications. Please try again.");
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8" style={{ backgroundColor: "#fffefa" }}>
        <div className="max-w-7xl mx-auto relative">
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 text-sm text-destructive hover:underline cursor-pointer"
          >
            Logout
          </button>
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-muted-foreground">Loading applications...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8" style={{ backgroundColor: "#fffefa" }}>
        <div className="max-w-7xl mx-auto relative">
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 text-sm text-destructive hover:underline cursor-pointer"
          >
            Logout
          </button>
          <Card>
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
              <Button onClick={loadApplications} className="mt-4">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: "#fffefa" }}>
      <div className="max-w-7xl mx-auto space-y-6 relative">
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 text-sm text-destructive hover:underline cursor-pointer"
        >
          Logout
        </button>

        <div>
          <h1 className="text-3xl font-bold">Application Manager</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all submitted applications
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Applications</CardTitle>
                <CardDescription>
                  Total: {applications.length} application{applications.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>
              <Button onClick={loadApplications} variant="outline">
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No applications found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">ID</th>
                      <th className="text-left p-4 font-semibold">Name</th>
                      <th className="text-left p-4 font-semibold">Phone</th>
                      <th className="text-left p-4 font-semibold">Village</th>
                      <th className="text-left p-4 font-semibold">Mandal</th>
                      <th className="text-left p-4 font-semibold">Project Interest</th>
                      <th className="text-left p-4 font-semibold">Submitted On</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">{app.id}</td>
                        <td className="p-4 font-medium">{app.full_name}</td>
                        <td className="p-4">{app.phone}</td>
                        <td className="p-4">{app.village}</td>
                        <td className="p-4">{app.mandal}</td>
                        <td className="p-4">{app.project_interest}</td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatDate(app.created_at)}
                        </td>
                        <td className="p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedApplication(app)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedApplication && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Application Details - ID: {selectedApplication.id}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedApplication.full_name}</p>
                      <p><span className="font-medium">Age:</span> {selectedApplication.age}</p>
                      <p><span className="font-medium">Gender:</span> {selectedApplication.gender}</p>
                      <p><span className="font-medium">Caste:</span> {selectedApplication.caste_category}</p>
                      <p><span className="font-medium">Education:</span> {selectedApplication.education}</p>
                      <p><span className="font-medium">Phone:</span> {selectedApplication.phone}</p>
                      <p><span className="font-medium">Address:</span> {selectedApplication.address}</p>
                      <p><span className="font-medium">Village:</span> {selectedApplication.village}</p>
                      <p><span className="font-medium">Mandal:</span> {selectedApplication.mandal}</p>
                      {selectedApplication.booth_no && (
                        <p><span className="font-medium">Booth No:</span> {selectedApplication.booth_no}</p>
                      )}
                      {selectedApplication.membership_id && (
                        <p><span className="font-medium">Membership ID:</span> {selectedApplication.membership_id}</p>
                      )}
                    </div>
                  </div>

                  {selectedApplication.gender === "Female" && (
                    <div>
                      <h3 className="font-semibold mb-2">SHG Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">SHG Member:</span> {selectedApplication.is_shg_member ? "Yes" : "No"}</p>
                        {selectedApplication.is_shg_member && (
                          <>
                            <p><span className="font-medium">Organization:</span> {selectedApplication.organization_type}</p>
                            <p><span className="font-medium">Group Name:</span> {selectedApplication.group_name}</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedApplication.is_handicapped && (
                    <div>
                      <h3 className="font-semibold mb-2">Disability Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Handicap Type:</span> {selectedApplication.handicap_type}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Business Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Current Business:</span> {selectedApplication.current_business ? "Yes" : "No"}</p>
                      {selectedApplication.current_business && (
                        <>
                          <p><span className="font-medium">Business Nature:</span> {selectedApplication.business_nature}</p>
                          <p><span className="font-medium">Experience:</span> {selectedApplication.experience} years</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Financial Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Bank Account:</span> {selectedApplication.has_bank_account ? "Yes" : "No"}</p>
                      {selectedApplication.has_bank_account && (
                        <>
                          <p><span className="font-medium">Bank:</span> {selectedApplication.bank_name}</p>
                          <p><span className="font-medium">Branch:</span> {selectedApplication.branch_name}</p>
                        </>
                      )}
                      {selectedApplication.annual_income && (
                        <p><span className="font-medium">Annual Income:</span> ₹{selectedApplication.annual_income.toLocaleString()}</p>
                      )}
                      {selectedApplication.investment_amount && (
                        <p><span className="font-medium">Investment Amount:</span> ₹{selectedApplication.investment_amount.toLocaleString()}</p>
                      )}
                      <p><span className="font-medium">Existing Loans:</span> {selectedApplication.existing_loans ? "Yes" : "No"}</p>
                      {selectedApplication.existing_loans && selectedApplication.loan_amount && (
                        <p><span className="font-medium">Loan Amount:</span> ₹{selectedApplication.loan_amount.toLocaleString()}</p>
                      )}
                      <p><span className="font-medium">Family Support:</span> {selectedApplication.family_support ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Project Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Project Interest:</span> {selectedApplication.project_interest}</p>
                      <p><span className="font-medium">Reason:</span> {selectedApplication.reason_for_interest}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Land Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Land Status:</span> {selectedApplication.land_status}</p>
                      {selectedApplication.land_location && (
                        <p><span className="font-medium">Location:</span> {selectedApplication.land_location}</p>
                      )}
                      {selectedApplication.survey_details && (
                        <p><span className="font-medium">Survey Details:</span> {selectedApplication.survey_details}</p>
                      )}
                    </div>
                  </div>

                  {selectedApplication.support_required && selectedApplication.support_required.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Support Required</h3>
                      <div className="text-sm">
                        <p>{selectedApplication.support_required.join(", ")}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-2">Documents</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Aadhaar:</span> {selectedApplication.has_aadhaar ? "Yes" : "No"}</p>
                      <p><span className="font-medium">Bank Passbook:</span> {selectedApplication.has_bank_passbook ? "Yes" : "No"}</p>
                      <p><span className="font-medium">Photo:</span> {selectedApplication.has_photo ? "Yes" : "No"}</p>
                      <p><span className="font-medium">Income Proof:</span> {selectedApplication.has_income_proof ? "Yes" : "No"}</p>
                      <p><span className="font-medium">PAN:</span> {selectedApplication.has_pan ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Submission Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Submitted On:</span> {formatDate(selectedApplication.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

