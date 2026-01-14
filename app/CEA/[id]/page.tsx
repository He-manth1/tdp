"use client";

import { useEffect, useState } from "react";
import { Wizard } from "../../components/form/Wizard";
import { fetchApplication, Application } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function EditApplicationPage({ params }: { params: { id: string } }) {
    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadApplication = async () => {
            try {
                const id = parseInt(params.id);
                const data = await fetchApplication(id);
                setApplication(data);
            } catch (err) {
                console.error("Error loading application:", err);
                setError("Failed to load application details.");
            } finally {
                setLoading(false);
            }
        };
        loadApplication();
    }, [params.id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </main>
        );
    }

    if (error || !application) {
        return (
            <main className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="text-red-500 font-medium">{error || "Application not found"}</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50/50">
            <Wizard initialData={application} />
        </main>
    );
}
