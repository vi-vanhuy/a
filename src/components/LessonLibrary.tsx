import React, { useState, useMemo } from "react";
import { courseData, CourseItem } from "../data/courseData";
import { AudioPlayerButton } from "./AudioPlayerButton";
import { renderChunkedText, formatStressInRule } from "../utils/textFormatter";
import { PhoneticDetailModal } from "./PhoneticDetailModal";

interface LessonLibraryProps {
  onStartPracticeDay?: (day: number) => void;
}

export const LessonLibrary: React.FC<LessonLibraryProps> = ({ onStartPracticeDay }) => {
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePhonetic, setActivePhonetic] = useState<string | null>(null);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    return courseData.filter((item) => {
      const matchDay = selectedDay === "all" || item.day === selectedDay;
      const matchType = selectedType === "all" || item.type === selectedType;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.en.toLowerCase().includes(query) ||
        item.vn.toLowerCase().includes(query) ||
        item.chunked.toLowerCase().includes(query) ||
        item.rule.toLowerCase().includes(query);

      return matchDay && matchType && matchSearch;
    });
  }, [selectedDay, selectedType, searchQuery]);

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const getTrickySymbolsInItem = (item: CourseItem): string[] => {
    const found: string[] = [];
    if (item.ipa.includes("ð") || item.rule.includes("/ð/")) found.push("/ð/");
    if (item.ipa.includes("θ") || item.rule.includes("/θ/")) found.push("/θ/");
    if (item.ipa.includes("ʒ") || item.rule.includes("/ʒ/")) found.push("/ʒ/");
    if (item.ipa.includes("dʒ") || item.rule.includes("/dʒ/")) found.push("/dʒ/");
    return found;
  };

  return (
    <div className="space-y-6">
      {/* Thanh điều khiển lọc & Tìm kiếm */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Hàng 1: Tabs chọn Ngày (Day 1 - Day 6) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Chọn ngày học (Lộ trình 6 ngày)
            </span>
            <span className="text-xs text-indigo-400 font-medium">
              Hiển thị {filteredItems.length}/{courseData.length} bài học
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedDay("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedDay === "all"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              Tất cả 6 ngày
            </button>
            {[1, 2, 3, 4, 5, 6].map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDay === day
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                Ngày {day}
              </button>
            ))}
          </div>
        </div>

        {/* Hàng 2: Bộ lọc thể loại & Ô tìm kiếm */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-700/60">
          {/* Segmented type filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/60 rounded-xl border border-slate-700/60 self-start">
            <button
              type="button"
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedType === "all"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Tất cả loại
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("common")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedType === "common"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Câu thông dụng
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("vocab")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedType === "vocab"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Từ vựng
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("dialogue")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedType === "dialogue"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Hội thoại
            </button>
          </div>

          {/* Search box */}
          <div className="relative flex-1 sm:max-w-xs">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ vựng, câu tiếng Anh hoặc tiếng Việt..."
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <i className="fa-solid fa-xmark text-xs" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Danh sách thẻ bài học */}
      {filteredItems.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-12 text-center">
          <i className="fa-solid fa-magnifying-glass text-4xl text-slate-600 mb-3" />
          <h3 className="text-base font-semibold text-slate-300">Không tìm thấy bài học phù hợp</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Vui lòng thử tìm với từ khóa khác hoặc đặt lại bộ lọc để xem toàn bộ 6 ngày học.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDay("all");
              setSelectedType("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredItems.map((item) => {
            const trickySymbols = getTrickySymbolsInItem(item);
            const isImgError = imageErrorMap[item.id];

            return (
              <div
                key={item.id}
                className="group relative bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Ảnh minh họa bối cảnh (Unsplash hoặc Fallback) */}
                  <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                    {!isImgError && item.img ? (
                      <img
                        src={item.img}
                        alt={item.en}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 flex items-center justify-center p-4">
                        <div className="text-center">
                          <i className="fa-solid fa-graduation-cap text-2xl text-indigo-400/60 mb-1" />
                          <span className="block text-xs font-medium text-slate-400">
                            {item.raw.slice(0, 35)}...
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Badge Ngày & Loại bài */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs font-bold bg-indigo-600/90 text-white rounded-md backdrop-blur-md shadow-sm">
                        Ngày {item.day}
                      </span>
                      <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-900/80 text-slate-300 rounded border border-slate-700/80 backdrop-blur-md">
                        {item.type === "common"
                          ? "Giao tiếp thông dụng"
                          : item.type === "vocab"
                          ? "Từ vựng trọng tâm"
                          : "Hội thoại thực tế"}
                      </span>
                    </div>

                    {/* Action buttons góc phải trên ảnh */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {/* Tra khẩu hình trên Google Search */}
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(
                          `how to pronounce ${item.raw}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 text-[11px] font-medium bg-slate-900/80 hover:bg-slate-900 text-sky-300 hover:text-sky-200 rounded border border-sky-500/40 backdrop-blur-md transition flex items-center gap-1"
                        title="1-Click: Tra khẩu hình chuyển động 3D trên Google"
                      >
                        <i className="fa-brands fa-google text-xs" />
                        <span className="hidden sm:inline">Khẩu hình 3D</span>
                      </a>

                      {/* Tra bối cảnh trên Google Images */}
                      <a
                        href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
                          item.raw
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 text-[11px] font-medium bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white rounded border border-slate-700 backdrop-blur-md transition flex items-center gap-1"
                        title="1-Click: Tra ngữ cảnh thực tế trên Google Images"
                      >
                        <i className="fa-solid fa-image text-xs" />
                        <span className="hidden sm:inline">Ngữ cảnh</span>
                      </a>
                    </div>

                    {/* Câu tiếng Anh hiển thị trên chân ảnh */}
                    <div className="absolute bottom-2 left-3 right-3">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-md">
                        {item.en}
                      </h3>
                    </div>
                  </div>

                  {/* Nội dung chi tiết bài học */}
                  <div className="p-4 sm:p-5 space-y-3.5">
                    {/* Phiên âm IPA */}
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/20 px-2.5 py-1 rounded-md border border-emerald-500/20 w-fit">
                      <i className="fa-solid fa-language text-emerald-400/80" />
                      <span>{item.ipa}</span>
                    </div>

                    {/* Phân tách cụm (Chunking & Intonation) */}
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <i className="fa-solid fa-scissors text-amber-400" />
                        <span>Ngắt nghỉ chuẩn (Chunking) & Ngữ điệu (Intonation):</span>
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                        {renderChunkedText(item.chunked)}
                      </div>
                    </div>

                    {/* Nghĩa tiếng Việt */}
                    <div className="text-xs text-slate-300 font-medium leading-relaxed">
                      <span className="text-slate-400 font-semibold">Nghĩa tiếng Việt: </span>
                      {item.vn}
                    </div>

                    {/* Giải thích theo 9 quy tắc vàng */}
                    <div className="text-xs text-amber-200/90 bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-lg leading-relaxed">
                      <div className="font-semibold text-amber-400 mb-0.5 flex items-center gap-1.5">
                        <i className="fa-solid fa-lightbulb text-xs" />
                        <span>Quy tắc cốt lõi:</span>
                      </div>
                      <p>{formatStressInRule(item.rule)}</p>
                    </div>

                    {/* Bẫy âm đuôi & Phụ âm khó */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {item.focusEnding && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium bg-sky-950/40 text-sky-300 border border-sky-500/30 rounded-md">
                          <i className="fa-solid fa-wind text-xs" />
                          <span>Bật âm cuối: </span>
                          <strong className="text-sky-200 font-bold">{item.focusEnding}</strong>
                        </div>
                      )}

                      {trickySymbols.map((sym) => (
                        <button
                          key={sym}
                          type="button"
                          onClick={() => setActivePhonetic(sym)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 rounded-md transition cursor-pointer"
                          title={`Xem khẩu hình phụ âm khó ${sym}`}
                        >
                          <i className="fa-solid fa-head-side-cough text-xs" />
                          <span>Khẩu hình {sym}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer với các nút phát âm Web Speech API & Nút Luyện tập nhanh */}
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2.5 mt-2">
                  {/* Nút phát âm 1.0x và 0.7x */}
                  <AudioPlayerButton text={item.raw} size="sm" variant="secondary" />

                  {onStartPracticeDay && (
                    <button
                      type="button"
                      onClick={() => onStartPracticeDay(item.day)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg transition active:scale-95"
                    >
                      <i className="fa-solid fa-dumbbell text-xs" />
                      <span>Luyện bài Ngày {item.day}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal khẩu hình chi tiết */}
      <PhoneticDetailModal
        symbol={activePhonetic}
        onClose={() => setActivePhonetic(null)}
      />
    </div>
  );
};
