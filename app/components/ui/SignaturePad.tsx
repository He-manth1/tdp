"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SignaturePadProps {
  value?: string; // base64 data URL
  onChange: (dataUrl: string) => void;
  fullName: string;
}

const SIGNATURE_FONTS = [
  { name: "Dancing Script", css: "'Dancing Script', cursive" },
  { name: "Great Vibes", css: "'Great Vibes', cursive" },
  { name: "Satisfy", css: "'Satisfy', cursive" },
  { name: "Pacifico", css: "'Pacifico', cursive" },
];

type Mode = "draw" | "type";

export function SignaturePad({ value, onChange, fullName }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [selectedFont, setSelectedFont] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load Google Fonts for signature styles
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Satisfy&family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    link.onload = () => {
      // Give fonts a moment to render
      setTimeout(() => setFontsLoaded(true), 300);
    };

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Set drawing style
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, [mode]);

  // Restore existing drawing if switching back to draw mode
  useEffect(() => {
    if (mode === "draw" && value && hasDrawn) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new window.Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
      };
      img.src = value;
    }
  }, [mode]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setHasDrawn(true);
    // Save canvas to data URL
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      onChange(dataUrl);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
    onChange("");
  };

  // Generate typed signature as canvas image
  const generateTypedSignature = useCallback(
    (fontIndex: number) => {
      if (!fullName.trim()) return;

      const offscreen = document.createElement("canvas");
      offscreen.width = 600;
      offscreen.height = 150;
      const ctx = offscreen.getContext("2d");
      if (!ctx) return;

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 600, 150);

      // Draw text
      ctx.fillStyle = "#1a1a2e";
      ctx.font = `48px ${SIGNATURE_FONTS[fontIndex].css}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(fullName, 300, 75);

      const dataUrl = offscreen.toDataURL("image/png");
      onChange(dataUrl);
    },
    [fullName, onChange]
  );

  const handleFontSelect = (index: number) => {
    setSelectedFont(index);
    generateTypedSignature(index);
  };

  // Auto-generate when switching to type mode
  useEffect(() => {
    if (mode === "type" && fontsLoaded && fullName.trim()) {
      generateTypedSignature(selectedFont);
    }
  }, [mode, fontsLoaded, fullName, selectedFont, generateTypedSignature]);

  return (
    <div className="space-y-3">
      {/* Mode Tabs */}
      <div className="flex border border-slate-200 rounded-lg overflow-hidden w-fit">
        <button
          type="button"
          onClick={() => {
            setMode("draw");
            onChange("");
          }}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            mode === "draw"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          ✏️ Draw / చేతితో గీయండి
        </button>
        <button
          type="button"
          onClick={() => setMode("type")}
          className={`px-5 py-2 text-sm font-medium transition-colors border-l border-slate-200 ${
            mode === "type"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          ⌨️ Type Name / పేరు టైప్ చేయండి
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === "draw" ? (
          <motion.div
            key="draw"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative border-2 border-dashed border-slate-300 rounded-xl overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                className="w-full cursor-crosshair touch-none"
                style={{ height: "150px" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              {!hasDrawn && !value && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-slate-400 text-sm">
                    Sign here / ఇక్కడ సంతకం చేయండి
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={clearCanvas}
              className="mt-2 text-xs text-slate-500 hover:text-red-600 transition-colors underline"
            >
              Clear / తుడిచివేయండి
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="type"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {!fullName.trim() ? (
              <div className="border-2 border-dashed border-amber-300 rounded-xl p-6 bg-amber-50 text-center">
                <p className="text-amber-700 text-sm font-medium">
                  Please enter your full name first / దయచేసి ముందు మీ పూర్తి పేరును నమోదు చేయండి
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-500">
                  Select a signature style / సంతకం శైలిని ఎంచుకోండి
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SIGNATURE_FONTS.map((font, index) => (
                    <button
                      key={font.name}
                      type="button"
                      onClick={() => handleFontSelect(index)}
                      className={`relative p-4 rounded-xl border-2 transition-all text-center ${
                        selectedFont === index
                          ? "border-slate-900 bg-slate-50 shadow-md ring-2 ring-slate-900/10"
                          : "border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm"
                      }`}
                    >
                      {selectedFont === index && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <span
                        className="text-2xl sm:text-3xl text-slate-900 block truncate"
                        style={{ fontFamily: font.css }}
                      >
                        {fullName}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {font.name}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview */}
      {value && (
        <div className="mt-2 p-2 border border-green-200 bg-green-50 rounded-lg">
          <p className="text-[10px] text-green-700 font-medium mb-1">Signature Preview / సంతకం ప్రివ్యూ</p>
          <img
            src={value}
            alt="Signature"
            className="max-h-16 mx-auto"
          />
        </div>
      )}
    </div>
  );
}

