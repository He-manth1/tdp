"use client";

import { Button } from "./ui/button";
import { Language } from "@/lib/translations";

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 mb-4 justify-end">
      <Button
        type="button"
        variant={currentLanguage === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => onLanguageChange("en")}
        className="min-w-[80px]"
      >
        English
      </Button>
      <Button
        type="button"
        variant={currentLanguage === "te" ? "default" : "outline"}
        size="sm"
        onClick={() => onLanguageChange("te")}
        className="min-w-[80px]"
      >
        తెలుగు
      </Button>
    </div>
  );
}


