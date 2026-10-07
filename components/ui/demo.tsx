"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  OtpInput,
  type OtpInputHandle,
  type OtpStatus,
} from "./otp-input";
import { Sparkles, Eye, Bookmark, Share2, Star, CheckCircle2 } from "lucide-react";

export function Cards() {
  return (
    <Card className="min-w-[300px] bg-slate-900/80 border-white/10 text-white shadow-xl backdrop-blur-md">
      <CardHeader>
        <Skeleton className="h-4 w-4/5 bg-slate-800" />
        <Skeleton className="h-4 w-2/3 bg-slate-800" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-72 w-full rounded bg-slate-800" />
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-8 w-20 bg-slate-800" />
        <Skeleton className="h-8 w-20 bg-slate-800" />
      </CardFooter>
    </Card>
  );
}

// Live card demonstrating populated state with Unsplash image & lucide-react icons
export function LoadedCard() {
  return (
    <Card className="min-w-[300px] max-w-[360px] bg-slate-900/80 border-white/10 text-white shadow-2xl backdrop-blur-md transition-all hover:border-orange-500/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> HSC 2026 Special
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9 (1.2k)
          </span>
        </div>
        <CardTitle className="text-xl font-bold text-white tracking-tight">
          Physics 1st Paper: Mechanics & Waves
        </CardTitle>
        <CardDescription className="text-xs text-slate-400">
          By Dipu Sir • BUET CSE Faculty • 42 Live Interactive Classes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative overflow-hidden rounded-lg group">
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=720&q=80"
            alt="Physics Lecture Masterclass"
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-xs font-mono bg-orange-500/90 text-white px-2 py-0.5 rounded-full font-bold backdrop-blur-sm">
              Full Syllabus Coverage
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 pt-0 justify-between">
        <div className="flex gap-2">
          <button className="h-8 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition shadow-lg shadow-orange-500/20">
            <Eye className="w-3.5 h-3.5" /> Enroll Now
          </button>
          <button className="h-8 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium flex items-center gap-1 transition">
            <Bookmark className="w-3.5 h-3.5" /> Save
          </button>
        </div>
        <button className="h-8 w-8 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded flex items-center justify-center transition">
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </CardFooter>
    </Card>
  );
}

// Master Interactive UI Demo Showcase (Cards + OTP)
export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = React.useState<"skeleton" | "loaded" | "otp">("skeleton");
  const field = React.useRef<OtpInputHandle>(null);
  const [status, setStatus] = React.useState<OtpStatus>("idle");
  const CODE = "204815";

  React.useEffect(() => {
    if (status === "idle") return;
    const back = setTimeout(() => {
      field.current?.clear();
      setStatus("idle");
    }, 1600);
    return () => clearTimeout(back);
  }, [status]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Switcher Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-white/10 rounded-xl">
        <button
          onClick={() => setActiveTab("skeleton")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "skeleton"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/25"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Skeleton Loader
          </span>
        </button>
        <button
          onClick={() => setActiveTab("loaded")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "loaded"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/25"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Loaded Card (Unsplash)
          </span>
        </button>
        <button
          onClick={() => setActiveTab("otp")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "otp"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/25"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <span>OTP Input Component</span>
        </button>
      </div>

      {/* Dynamic View Stage */}
      <div className="w-full flex justify-center py-4">
        {activeTab === "skeleton" && (
          <div className="flex flex-col items-center gap-3">
            <div className="text-xs font-mono text-slate-400">
              State: <span className="text-amber-400 animate-pulse">Loading Simulation (Pulse Animation Active)</span>
            </div>
            <Cards />
          </div>
        )}

        {activeTab === "loaded" && (
          <div className="flex flex-col items-center gap-3">
            <div className="text-xs font-mono text-emerald-400">
              State: Content Loaded (Unsplash Image + Lucide Icons)
            </div>
            <LoadedCard />
          </div>
        )}

        {activeTab === "otp" && (
          <div className="flex flex-col items-center gap-4">
            <OtpInput
              ref={field}
              status={status}
              onComplete={(value) => setStatus(value === CODE ? "success" : "error")}
              hint={`Try code: ${CODE}`}
              successMessage="Code verified successfully!"
              errorMessage="Invalid OTP code. Please retry."
            />
          </div>
        )}
      </div>
    </div>
  );
}
