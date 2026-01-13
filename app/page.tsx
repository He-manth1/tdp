"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";
import { Menu, X, LogOut, PlusCircle, Play, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";

// Animated counter component
function AnimatedCounter({ targetValue }: { targetValue: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(
        Math.floor(increment * currentStep),
        targetValue
      );
      setCount(nextValue);

      if (currentStep >= steps || nextValue >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetValue]);

  return <span>{count.toString().padStart(3, "0")}</span>;
}

export default function Dashboard() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Generate random 3-digit numbers for statistics
  const [stats] = useState(() => ({
    newRecords: Math.floor(Math.random() * 900) + 100,
    initiated: Math.floor(Math.random() * 900) + 100,
    inProgress: Math.floor(Math.random() * 900) + 100,
    completed: Math.floor(Math.random() * 900) + 100,
  }));

  const handleLogout = () => {
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  // Get current date for welcome message
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: "#fffefa" }}>
      {/* Burger Menu Button - Fixed at leftmost edge */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 p-2 rounded-lg hover:bg-white/50 backdrop-blur-sm transition-colors z-50"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Glassmorphic Menu Dropdown */}
      {isMenuOpen && (
        <div className="fixed top-16 left-4 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl shadow-gray-200/50 z-50 min-w-[280px] overflow-hidden">
          <div className="py-2">
            <button
              onClick={() => handleNavigate("/CEA")}
              className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-sm font-medium"
            >
              Cadre Empowerment Application
            </button>
            <button
              onClick={() => handleNavigate("/record")}
              className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-sm font-medium"
            >
              Application Manager
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-8 relative">
        {/* Logout Button - Top Right */}
        <div className="absolute top-0 right-0 z-40">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center space-y-4 pt-8">
          <div className="mb-2">
            <Image
              src="/Assets/TDPBADGEAsset2_1024x1024.webp"
              alt="TDP Logo"
              width={140}
              height={140}
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-xl font-medium">
              Welcome back
            </p>
            <p className="text-muted-foreground text-base mt-1">{currentDate}</p>
          </div>
        </div>

        {/* Statistics Section with Container */}
        <section className="bg-gray-50/50 rounded-3xl p-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* New Records Card - Blue */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 border border-white/20 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden">
              <div className="relative z-10">
                <div className="text-4xl font-bold mb-2 text-gray-900">
                  <AnimatedCounter targetValue={stats.newRecords} />
                </div>
                <div className="text-muted-foreground text-sm font-medium">New Records</div>
              </div>
              <PlusCircle className="absolute top-4 right-4 h-12 w-12 text-blue-400/30" />
            </div>

            {/* Initiated Card - Orange/Amber */}
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-100/50 border border-white/20 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden">
              <div className="relative z-10">
                <div className="text-4xl font-bold mb-2 text-gray-900">
                  <AnimatedCounter targetValue={stats.initiated} />
                </div>
                <div className="text-muted-foreground text-sm font-medium">Initiated</div>
              </div>
              <Play className="absolute top-4 right-4 h-12 w-12 text-amber-400/30" />
            </div>

            {/* In Progress Card - Purple/Indigo */}
            <div className="relative bg-gradient-to-br from-indigo-50 to-purple-100/50 border border-white/20 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden">
              <div className="relative z-10">
                <div className="text-4xl font-bold mb-2 text-gray-900">
                  <AnimatedCounter targetValue={stats.inProgress} />
                </div>
                <div className="text-muted-foreground text-sm font-medium">In Progress</div>
              </div>
              <Loader2 className="absolute top-4 right-4 h-12 w-12 text-indigo-400/30" />
            </div>

            {/* Completed Card - Teal/Emerald */}
            <div className="relative bg-gradient-to-br from-emerald-50 to-teal-100/50 border border-white/20 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden">
              <div className="relative z-10">
                <div className="text-4xl font-bold mb-2 text-gray-900">
                  <AnimatedCounter targetValue={stats.completed} />
                </div>
                <div className="text-muted-foreground text-sm font-medium">Completed</div>
              </div>
              <CheckCircle2 className="absolute top-4 right-4 h-12 w-12 text-emerald-400/30" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
