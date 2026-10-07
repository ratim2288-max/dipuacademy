"use client";

import * as React from "react";
import { Download, ZoomIn, Calendar, Sparkles, X, Eye } from "lucide-react";

export interface RoutineBannerProps {
  routineImageUrl?: string;
  courseTitle?: string;
  downloadFilename?: string;
  className?: string;
}

export const DEFAULT_ROUTINE_BANNER_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675' width='1200' height='675'><defs><linearGradient id='bg_rt' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%230A0D1A'/><stop offset='50%25' stop-color='%2313172E'/><stop offset='100%25' stop-color='%23070A12'/></linearGradient><linearGradient id='acc_glow' x1='0%25' y1='0%25' x2='100%25' y2='0%25'><stop offset='0%25' stop-color='%23FF7A1A'/><stop offset='100%25' stop-color='%23FFB347'/></linearGradient><filter id='glow' x='-20%25' y='-20%25' width='140%25' height='140%25'><feGaussianBlur stdDeviation='12' result='blur'/><feComposite in='SourceGraphic' in2='blur' operator='over'/></filter></defs><rect width='1200' height='675' rx='24' fill='url(%23bg_rt)' stroke='%23334155' stroke-width='2'/><circle cx='1050' cy='120' r='220' fill='%236366F1' opacity='0.08'/><circle cx='150' cy='560' r='200' fill='%23FF7A1A' opacity='0.06'/><rect x='60' y='50' width='320' height='40' rx='20' fill='rgba(255,122,26,0.15)' stroke='%23FF7A1A' stroke-width='1.5'/><text x='85' y='76' fill='%23FF923C' font-family='sans-serif' font-weight='800' font-size='16' letter-spacing='1.5'>DIPU'S EDU • OFFICIAL ROUTINE</text><text x='60' y='145' fill='%23FFFFFF' font-family='sans-serif' font-weight='900' font-size='38'>সাপ্তাহিক ক্লাস রুটিন ও সময়সূচী</text><text x='60' y='185' fill='%2394A3B8' font-family='sans-serif' font-weight='500' font-size='18'>বুয়েট মেন্টর প্যানেল • লাইভ ইন্টারঅ্যাক্টিভ ক্লাস ও মডেল টেস্ট</text><g transform='translate(60, 230)'><rect width='250' height='360' rx='18' fill='%23111827' stroke='%23374151' stroke-width='1.5'/><rect x='20' y='20' width='100' height='30' rx='15' fill='%231F2937'/><text x='35' y='41' fill='%23FF7A1A' font-family='sans-serif' font-weight='800' font-size='15'>রবিবার</text><text x='20' y='95' fill='%23F59E0B' font-family='monospace' font-weight='700' font-size='17'>রাত ৮:০০ - ৯:৩০</text><line x1='20' y1='120' x2='230' y2='120' stroke='%23374151' stroke-width='1'/><text x='20' y='160' fill='%23E5E7EB' font-family='sans-serif' font-weight='700' font-size='18'>পদার্থবিজ্ঞান</text><text x='20' y='195' fill='%239CA3AF' font-family='sans-serif' font-size='15'>ভেক্টর ও গতিবিদ্যা থিওরি</text><rect x='20' y='290' width='140' height='34' rx='17' fill='rgba(16,185,129,0.15)' stroke='%2310B981'/><text x='36' y='312' fill='%2334D399' font-family='sans-serif' font-weight='700' font-size='13'>🎥 লাইভ ক্লাস</text></g><g transform='translate(330, 230)'><rect width='250' height='360' rx='18' fill='%23111827' stroke='%23374151' stroke-width='1.5'/><rect x='20' y='20' width='100' height='30' rx='15' fill='%231F2937'/><text x='35' y='41' fill='%23FF7A1A' font-family='sans-serif' font-weight='800' font-size='15'>মঙ্গলবার</text><text x='20' y='95' fill='%23F59E0B' font-family='monospace' font-weight='700' font-size='17'>রাত ৮:০০ - ৯:৩০</text><line x1='20' y1='120' x2='230' y2='120' stroke='%23374151' stroke-width='1'/><text x='20' y='160' fill='%23E5E7EB' font-family='sans-serif' font-weight='700' font-size='18'>রসায়ন ১ম পত্র</text><text x='20' y='195' fill='%239CA3AF' font-family='sans-serif' font-size='15'>গুণগত রসায়ন ও পর্যায়বৃত্ত</text><rect x='20' y='290' width='140' height='34' rx='17' fill='rgba(16,185,129,0.15)' stroke='%2310B981'/><text x='36' y='312' fill='%2334D399' font-family='sans-serif' font-weight='700' font-size='13'>🎥 লাইভ ক্লাস</text></g><g transform='translate(600, 230)'><rect width='250' height='360' rx='18' fill='%23111827' stroke='%23374151' stroke-width='1.5'/><rect x='20' y='20' width='120' height='30' rx='15' fill='%231F2937'/><text x='35' y='41' fill='%23FF7A1A' font-family='sans-serif' font-weight='800' font-size='15'>বৃহস্পতিবার</text><text x='20' y='95' fill='%23F59E0B' font-family='monospace' font-weight='700' font-size='17'>রাত ৮:০০ - ৯:৩০</text><line x1='20' y1='120' x2='230' y2='120' stroke='%23374151' stroke-width='1'/><text x='20' y='160' fill='%23E5E7EB' font-family='sans-serif' font-weight='700' font-size='18'>উচ্চতর গণিত</text><text x='20' y='195' fill='%239CA3AF' font-family='sans-serif' font-size='15'>ম্যাট্রিক্স ও ক্যালকুলাস হ্যাকস</text><rect x='20' y='290' width='140' height='34' rx='17' fill='rgba(16,185,129,0.15)' stroke='%2310B981'/><text x='36' y='312' fill='%2334D399' font-family='sans-serif' font-weight='700' font-size='13'>🎥 লাইভ ক্লাস</text></g><g transform='translate(870, 230)'><rect width='250' height='360' rx='18' fill='%2318181B' stroke='%23EA580C' stroke-width='1.5'/><rect x='20' y='20' width='100' height='30' rx='15' fill='%237C2D12'/><text x='35' y='41' fill='%23FED7AA' font-family='sans-serif' font-weight='800' font-size='15'>শুক্রবার</text><text x='20' y='95' fill='%23F59E0B' font-family='monospace' font-weight='700' font-size='17'>সন্ধ্যা ৭:০০ - ৮:৩০</text><line x1='20' y1='120' x2='230' y2='120' stroke='%23EA580C' stroke-width='1'/><text x='20' y='160' fill='%23FFFFFF' font-family='sans-serif' font-weight='700' font-size='18'>উইকলি এক্সাম</text><text x='20' y='195' fill='%23CBD5E1' font-family='sans-serif' font-size='15'>বোর্ড ও এডমিশন মডেল টেস্ট</text><rect x='20' y='290' width='140' height='34' rx='17' fill='rgba(245,158,11,0.2)' stroke='%23F59E0B'/><text x='36' y='312' fill='%23FDE68A' font-family='sans-serif' font-weight='700' font-size='13'>🏆 এক্সাম পোর্টাল</text></g></svg>`;

export const RoutineBanner: React.FC<RoutineBannerProps> = ({
  routineImageUrl,
  courseTitle = "কোর্স রুটিন",
  downloadFilename = "Class-Routine.jpg",
  className = ""
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = React.useState<boolean>(false);
  const activeImage = routineImageUrl || DEFAULT_ROUTINE_BANNER_SVG;

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = activeImage;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`routine-banner-wrapper ${className}`}>
      {/* Top action header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">সাপ্তাহিক ক্লাস রুটিন ও সময়সূচী</h3>
            <p className="text-xs text-slate-400">প্রতি সপ্তাহের লাইভ ক্লাস, বিষয়ভিত্তিক সেশন ও মডেল টেস্ট সূচি</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            title="রুটিন বড় করে দেখুন"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>জুম করে দেখুন</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 hover:text-emerald-300 transition-all cursor-pointer shadow-[0_2px_12px_-2px_rgba(16,185,129,0.3)]"
            title="রুটিন ডাউনলোড করুন (ফ্রি)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>রুটিন ডাউনলোড (ফ্রি)</span>
          </button>
        </div>
      </div>

      {/* Routine Image Display Container */}
      <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-slate-950/60 shadow-2xl transition-all duration-300 hover:border-amber-500/40">
        <img
          src={activeImage}
          alt={`${courseTitle} - সাপ্তাহিক ক্লাস রুটিন`}
          className="w-full h-auto object-cover max-h-[520px] transition-transform duration-500 group-hover:scale-[1.015]"
          loading="lazy"
        />

        {/* Hover Gradient Overlay with quick-actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div className="text-white text-xs font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>অফিসিয়াল অনুমোদিত রুটিন</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1 hover:bg-white/30 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>ফুল স্ক্রিন প্রিভিউ</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-emerald-400 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ডাউনলোড</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 mb-2">
              <span className="text-sm font-semibold text-white">সাপ্তাহিক ক্লাস রুটিন - ফুল স্ক্রিন প্রিভিউ</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1 text-xs font-bold rounded-md bg-emerald-500 text-slate-950 flex items-center gap-1 hover:bg-emerald-400 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> ডাউনলোড
                </button>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="max-h-[80vh] overflow-auto flex items-center justify-center p-2 bg-slate-950/80 rounded-xl">
              <img
                src={activeImage}
                alt="Full Size Routine"
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineBanner;
