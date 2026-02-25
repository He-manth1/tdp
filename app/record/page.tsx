"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchApplications, Application } from "@/lib/api";
import { Button } from "../components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  Menu,
  Plus,
  Pencil,
  X,
  ChevronRight,
  Shield,
  Database,
  Loader2,
  Save,
  Printer
} from "lucide-react";
import { cn } from "@/lib/utils";

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const displayStatus = status === "Completed" ? "Grounded" : status;
  const styles: Record<string, string> = {
    "Approved": "bg-emerald-100 text-emerald-700",
    "Grounded": "bg-emerald-100 text-emerald-700",
    "Completed": "bg-emerald-100 text-emerald-700",
    "Pending": "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "In Review": "bg-blue-100 text-blue-700",
    "Not Interested": "bg-slate-200 text-slate-700",
    "Rejected": "bg-red-100 text-red-700",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[displayStatus] || "bg-gray-100 text-gray-700"}`}>
      {displayStatus}
    </span>
  );
}

// Nav Item Component
function NavItem({ icon, label, active = false, collapsed = false, onClick }: { icon: any, label: string, active?: boolean, collapsed?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
        ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
        ${collapsed ? 'justify-center' : ''}
      `}
    >
      <span className={`${active ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`}>
        {icon}
      </span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
          {label}
        </div>
      )}
    </button>
  );
}

export default function RecordPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [newStatusRecipient, setNewStatusRecipient] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizeRecipient = (value?: string | null) => {
    if (!value) return "";
    return value === "Name" ? "Department" : value;
  };

  const filteredApplications = applications.filter((app) => {
    const query = searchQuery.toLowerCase();
    return (
      app.full_name?.toLowerCase().includes(query) ||
      app.phone?.toLowerCase().includes(query) ||
      app.id.toString().includes(query)
    );
  });

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await fetchApplications();
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedApplication || !newStatus || !newStatusRecipient) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8000/api/applications/${selectedApplication.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, status_recipient: newStatusRecipient }),
      });

      if (response.ok) {
        // Update local state
        const updatedApp = await response.json();
        setApplications(apps => apps.map(app => app.id === updatedApp.id ? updatedApp : app));
        setSelectedApplication(updatedApp);
        alert("Status updated successfully!");
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const openEditModal = (app: Application) => {
    setSelectedApplication(app);
    setNewStatus(app.status === "Completed" ? "Grounded" : (app.status || "Pending"));
    setNewStatusRecipient(normalizeRecipient(app.status_recipient) || "Applicant");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-20 lg:translate-x-0"}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative shrink-0">
                <Image
                  src="/Assets/TDPBADGEAsset2_1024x1024.webp"
                  alt="TDP Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className={`font-bold text-lg text-slate-900 transition-opacity duration-300 ${!isSidebarOpen && "lg:hidden"}`}>
                TDP Portal
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" collapsed={!isSidebarOpen} onClick={() => router.push("/")} />
            <NavItem icon={<FileText />} label="Applications" collapsed={!isSidebarOpen} onClick={() => router.push("/CEA")} />
            <NavItem icon={<Database />} label="Records" active collapsed={!isSidebarOpen} onClick={() => { }} />
            <NavItem icon={<Settings />} label="Settings" collapsed={!isSidebarOpen} onClick={() => { }} />
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-100">
            <div className={`flex items-center gap-3 ${!isSidebarOpen && "lg:justify-center"}`}>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <User className="h-5 w-5" />
              </div>
              <div className={`flex-1 transition-opacity duration-300 ${!isSidebarOpen && "lg:hidden"}`}>
                <p className="text-sm font-medium text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">admin@tdp.org</p>
              </div>
              <Button variant="ghost" size="icon" className={`text-slate-400 hover:text-red-500 ${!isSidebarOpen && "lg:hidden"}`} onClick={() => router.push("/login")}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-64 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search by ID, Name, or Phone..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Application Records</h1>
                <p className="text-slate-500 mt-1">Manage and update application status.</p>
              </div>
              <Button onClick={loadApplications} variant="outline" className="gap-2">
                Refresh List
              </Button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase">ID</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Name</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Phone</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Project</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Status</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase">With Department</th>
                      <th className="text-right py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                          Loading records...
                        </td>
                      </tr>
                    ) : filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500">No applications found matching your search.</td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6 text-sm text-slate-600">#{app.id}</td>
                          <td className="py-4 px-6 text-sm font-medium text-slate-900">{app.full_name}</td>
                          <td className="py-4 px-6 text-sm text-slate-600">{app.phone}</td>
                          <td className="py-4 px-6 text-sm text-slate-600">{app.project_interest}</td>
                          <td className="py-4 px-6">
                            <button onClick={() => openEditModal(app)} className="hover:opacity-80 transition-opacity">
                              <StatusBadge status={app.status || "Pending"} />
                            </button>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">{normalizeRecipient(app.status_recipient) || "-"}</td>
                          <td className="py-4 px-6 text-right">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                              onClick={() => window.open(`/print-record/${app.id}`, '_blank')}
                              title="Print Application"
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => router.push(`/CEA/${app.id}`)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Edit Application #{selectedApplication.id}</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Update Section */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <label className="block text-sm font-semibold text-slate-900 mb-2">Update Status</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="flex-1 rounded-lg border-slate-200 text-sm focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Grounded">Grounded</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <select
                    value={newStatusRecipient}
                    onChange={(e) => setNewStatusRecipient(e.target.value)}
                    className="flex-1 rounded-lg border-slate-200 text-sm focus:ring-2 focus:ring-blue-500/20"
                    aria-label="With Department"
                  >
                    <option value="Applicant">Applicant</option>
                    <option value="Bank">Bank</option>
                    <option value="Department">Department</option>
                  </select>
                  <Button
                    onClick={handleUpdateStatus}
                    disabled={isUpdating || !newStatus || !newStatusRecipient}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Status
                  </Button>
                </div>
              </div>

              {/* Details Read-only View */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Applicant Details</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-medium text-slate-700">Name:</span> {selectedApplication.full_name}</p>
                    <p><span className="font-medium text-slate-700">Phone:</span> {selectedApplication.phone}</p>
                    <p><span className="font-medium text-slate-700">Village:</span> {selectedApplication.village}</p>
                    <p><span className="font-medium text-slate-700">Mandal:</span> {selectedApplication.mandal}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Project Details</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-medium text-slate-700">Interest:</span> {selectedApplication.project_interest}</p>
                    <p><span className="font-medium text-slate-700">Reason:</span> {selectedApplication.reason_for_interest}</p>
                    <p><span className="font-medium text-slate-700">Submitted:</span> {new Date(selectedApplication.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Status History</h3>
                {selectedApplication.status_history && selectedApplication.status_history.length > 0 ? (
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {[...selectedApplication.status_history].reverse().map((entry, idx) => (
                      <div key={`${entry.changed_at || entry.timestamp || idx}-${idx}`} className="border-l-2 border-blue-200 pl-3">
                        {entry.change ? (
                          <>
                            <p className="text-sm font-medium text-slate-900">
                              {(entry.change.status_to === "Completed" ? "Grounded" : entry.change.status_to) || "-"}
                              {entry.change.with_department_to ? ` -> ${normalizeRecipient(entry.change.with_department_to)}` : ""}
                            </p>
                            <p className="text-xs text-slate-500">
                              {entry.changed_at ? new Date(entry.changed_at).toLocaleString() : "-"}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">
                              Status: {(entry.change.status_from === "Completed" ? "Grounded" : entry.change.status_from) || "None"} -> {(entry.change.status_to === "Completed" ? "Grounded" : entry.change.status_to) || "None"}
                              {" | "}
                              With Department: {normalizeRecipient(entry.change.with_department_from) || "None"} -> {normalizeRecipient(entry.change.with_department_to) || "None"}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-slate-900">
                              {entry.status === "Completed" ? "Grounded" : entry.status}
                              {entry.status_recipient ? ` -> ${normalizeRecipient(entry.status_recipient)}` : ""}
                            </p>
                            <p className="text-xs text-slate-500">
                              {entry.timestamp ? new Date(entry.timestamp).toLocaleString() : "-"}
                            </p>
                            {entry.changes && entry.changes.length > 0 && (
                              <p className="text-xs text-slate-600 mt-1">{entry.changes.join(" | ")}</p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No status updates yet.</p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
              <Button variant="outline" onClick={() => setSelectedApplication(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

