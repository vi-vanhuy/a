/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { LessonLibrary } from "./components/LessonLibrary";
import { PracticeHub } from "./components/PracticeHub";
import { RulesGuide } from "./components/RulesGuide";
import { ExportHtmlModal } from "./components/ExportHtmlModal";

type ActiveTab = "practice" | "library" | "rules";

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>("practice");
  const [practiceDayFilter, setPracticeDayFilter] = useState<number | "all">("all");
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handleStartPracticeDay = (day: number) => {
    setPracticeDayFilter(day);
    setCurrentTab("practice");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation Contract: 3 Zones */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <i className="fa-solid fa-volume-high text-sm" />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white font-['Fraunces',serif]">
            EchoEnglish
          </span>
        </div>

        {/* Zone 2: Navigation Links / Segmented Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <button
            type="button"
            onClick={() => setCurrentTab("practice")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentTab === "practice"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <i className="fa-solid fa-dumbbell text-xs" />
            <span>Luyện Tập Toàn Diện</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab("library")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentTab === "library"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <i className="fa-solid fa-book-open text-xs" />
            <span>Thư Viện Bài Học</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab("rules")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer hidden md:flex ${
              currentTab === "rules"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <i className="fa-solid fa-lightbulb text-xs" />
            <span>9 Quy Tắc Vàng</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            title="Đóng gói và tải về Single-File HTML chạy offline"
          >
            <i className="fa-solid fa-download text-xs text-indigo-400" />
            <span className="hidden sm:inline">Xuất HTML</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Banner Hero Giới thiệu phương pháp 6 ngày */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-800/90 to-slate-900 border border-indigo-500/25 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <span>Phương Pháp Đột Phá 6 Ngày</span>
              <span aria-hidden="true">·</span>
              <span>Chuẩn Quốc Tế</span>
              <span aria-hidden="true">·</span>
              <span>Web Speech API Shadowing</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug font-['Fraunces',serif]">
              Luyện Phát Âm & Tiếng Anh Giao Tiếp Toàn Diện
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Áp dụng triệt để <strong>9 quy tắc vàng</strong>: Shadowing 1.0x & 0.7x, bóc tách trọng
              âm, chú thích khẩu hình phụ âm khó (/ð/, /θ/, /ʒ/, /dʒ/), bật dứt khoát âm cuối, ngắt
              nghỉ cụm (Chunking) và làm chủ hệ thống bài tập thực chiến 4 dạng.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-slate-400 border-t border-slate-700/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-slate-200">6 Ngày</span>
                <span>Lộ trình toàn diện</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="font-semibold text-slate-200">37 Bài học</span>
                <span>kèm hình ảnh & ngữ cảnh</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-semibold text-slate-200">4 Dạng bài tập</span>
                <span>tương tác có chấm điểm & giải thích</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab switcher trên mobile nếu cần xem 9 quy tắc */}
        <div className="flex md:hidden items-center justify-center">
          <button
            type="button"
            onClick={() => setCurrentTab(currentTab === "rules" ? "practice" : "rules")}
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 underline"
          >
            <i className="fa-solid fa-lightbulb text-xs" />
            <span>{currentTab === "rules" ? "Quay lại luyện tập" : "Xem 9 quy tắc vàng phát âm"}</span>
          </button>
        </div>

        {/* Render Tab tương ứng */}
        {currentTab === "practice" && (
          <PracticeHub initialDayFilter={practiceDayFilter} />
        )}

        {currentTab === "library" && (
          <LessonLibrary onStartPracticeDay={handleStartPracticeDay} />
        )}

        {currentTab === "rules" && <RulesGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 EchoEnglish. Hệ thống học phát âm & bài tập toàn diện 6 ngày.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Shadowing 1.0x & 0.7x</span>
            <span>·</span>
            <span>Word Stress</span>
            <span>·</span>
            <span>Ending Sounds</span>
            <span>·</span>
            <span>Chunking</span>
          </div>
        </div>
      </footer>

      {/* Modal Xuất File HTML Đơn Lẻ */}
      <ExportHtmlModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
