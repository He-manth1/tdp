"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  Clock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Shield,
  Database
} from "lucide-react";
import Image from "next/image";

// Types
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  color: "blue" | "purple" | "amber" | "emerald";
}

interface Application {
  id: number;
  full_name: string;
  project_interest: string;
  created_at: string;
  has_aadhaar: boolean;
  status: string; // Real status from DB
}

// ... existing code ...

// Use the real status from the API
const getStatus = (app: Application) => {
  return app.status;
};

// ... existing code ...



// Components
function AnimatedCounter({ targetValue }: { targetValue: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(Math.floor(increment * currentStep), targetValue);
      setCount(nextValue);
      if (currentStep >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetValue]);

  return <span>{count.toLocaleString()}</span>;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorStyles[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">
          <AnimatedCounter targetValue={value} />
        </h3>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Data State
  const [stats, setStats] = useState({
    newRecords: 0,
    initiated: 0,
    inProgress: 0,
    completed: 0,
  });
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Stats
      const statsRes = await fetch("http://localhost:8000/api/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch Recent Applications
      const appsRes = await fetch("http://localhost:8000/api/applications?limit=5");
      if (appsRes.ok) {
        const appsData = await appsRes.json();
        setRecentApplications(appsData);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  // Calculate generic status based on document completion for display
  const getStatus = (app: Application) => {
    return app.has_aadhaar ? "Completed" : "In Progress";
  };

  // Format relative time (basic implementation)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-20 lg:translate-x-0"
          }`}
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
            <NavItem
              icon={<LayoutDashboard />}
              label="Dashboard"
              active
              collapsed={!isSidebarOpen}
              onClick={() => { }}
            />
            <NavItem
              icon={<FileText />}
              label="Applications"
              collapsed={!isSidebarOpen}
              onClick={() => router.push("/CEA")}
            />
            <NavItem
              icon={<Database />}
              label="Records"
              collapsed={!isSidebarOpen}
              onClick={() => router.push("/record")}
            />
            <NavItem
              icon={<Settings />}
              label="Settings"
              collapsed={!isSidebarOpen}
              onClick={() => { }}
            />
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
              <Button
                variant="ghost"
                size="icon"
                className={`text-slate-400 hover:text-red-500 ${!isSidebarOpen && "lg:hidden"}`}
                onClick={() => router.push("/login")}
              >
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
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hidden lg:block"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-64 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search records..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-slate-500 mt-1">
                  {currentDate}
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200">
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="New Records"
                value={stats.newRecords}
                icon={<Plus className="h-6 w-6" />}
                color="blue"
                trend="12%"
              />
              <StatCard
                title="Initiated"
                value={stats.initiated}
                icon={<ArrowUpRight className="h-6 w-6" />}
                color="amber"
                trend="5%"
              />
              <StatCard
                title="In Progress"
                value={stats.inProgress}
                icon={<Clock className="h-6 w-6" />}
                color="purple"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={<CheckCircle2 className="h-6 w-6" />}
                color="emerald"
                trend="18%"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity Table */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Recent Applications</h2>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicant</th>
                        <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Program</th>
                        <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="text-right py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6 text-sm font-medium text-slate-900">{app.full_name}</td>
                          <td className="py-4 px-6 text-sm text-slate-500">{app.project_interest}</td>
                          <td className="py-4 px-6">
                            <StatusBadge status={getStatus(app)} />
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-500 text-right">{formatTime(app.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions / Notifications */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={<Plus className="h-5 w-5" />} label="New Record" />
                    <ActionButton icon={<FileText className="h-5 w-5" />} label="Generate Report" />
                    <ActionButton icon={<User className="h-5 w-5" />} label="Add User" />
                    <ActionButton icon={<Settings className="h-5 w-5" />} label="Settings" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
                    <p className="text-blue-100 text-sm mb-4">
                      You can now export all application records directly to CSV from the records page.
                    </p>
                    <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0">
                      Learn More
                    </Button>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-components
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Approved": "bg-emerald-100 text-emerald-700",
    "Completed": "bg-emerald-100 text-emerald-700",
    "Pending": "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Rejected": "bg-red-100 text-red-700",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {(status === "Approved" || status === "Completed") && <CheckCircle2 className="w-3 h-3 mr-1" />}
      {status === "Pending" && <Clock className="w-3 h-3 mr-1" />}
      {status === "In Progress" && <Loader2 className="w-3 h-3 mr-1" />}
      {status}
    </span>
  );
}

function ActionButton({ icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all text-slate-600 hover:text-blue-600 group">
      <div className="mb-2 p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

