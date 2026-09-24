import React from "react";
import { trickyPhonetics } from "../data/courseData";
import { AudioPlayerButton } from "./AudioPlayerButton";

interface PhoneticDetailModalProps {
  symbol: string | null;
  onClose: () => void;
}

export const PhoneticDetailModal: React.FC<PhoneticDetailModalProps> = ({
  symbol,
  onClose,
}) => {
  if (!symbol) return null;
  const guide = trickyPhonetics[symbol];
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition"
          aria-label="Đóng"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-mono font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/30">
            {guide.symbol}
          </span>
          <div>
            <h3 className="text-lg font-bold text-white">{guide.name}</h3>
            <span className="text-xs text-slate-400">Quy tắc số 3: Nguyên âm & Phụ âm khó</span>
          </div>
        </div>

        {/* Khẩu hình chi tiết */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 mb-4">
          <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <i className="fa-solid fa-head-side-cough text-amber-400" />
            Hướng dẫn khẩu hình & đặt lưỡi
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">{guide.mouthGuide}</p>
        </div>

        {/* Từ vựng ví dụ */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Từ vựng tiêu biểu trong 6 ngày:
          </h4>
          <div className="flex flex-wrap gap-2">
            {guide.examples.map((ex, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono font-semibold bg-slate-700/80 text-emerald-300 rounded-md border border-slate-600"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>

        {/* Câu mẫu luyện phát âm */}
        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-indigo-300 block mb-1 font-medium">Câu luyện nhại mẫu:</span>
            <p className="text-sm font-semibold text-white">"{guide.audioSample}"</p>
          </div>
          <AudioPlayerButton text={guide.audioSample} size="sm" variant="primary" />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition"
          >
            Đã hiểu khẩu hình
          </button>
        </div>
      </div>
    </div>
  );
};
