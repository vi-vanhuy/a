import React, { useState } from "react";
import { speechService } from "../utils/speech";

interface AudioPlayerButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "subtle" | "ghost";
  showSlowOption?: boolean;
  label?: string;
  className?: string;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  text,
  size = "md",
  variant = "primary",
  showSlowOption = true,
  label,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentRate, setCurrentRate] = useState<number>(1.0);

  const handlePlay = (rate: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentRate(rate);
    setIsPlaying(true);
    speechService.speak(
      text,
      rate,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  const handleStop = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    speechService.stop();
    setIsPlaying(false);
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-sm gap-2",
    lg: "px-4 py-2.5 text-base gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-sm active:scale-95",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 font-medium active:scale-95",
    subtle:
      "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95",
    ghost:
      "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white active:scale-95",
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {/* Nút Nghe Chuẩn 1.0x */}
      <button
        type="button"
        onClick={(e) => (isPlaying && currentRate === 1.0 ? handleStop(e) : handlePlay(1.0, e))}
        className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer ${
          sizeClasses[size]
        } ${variantClasses[variant]} ${
          isPlaying && currentRate === 1.0 ? "ring-2 ring-indigo-400 animate-pulse" : ""
        }`}
        title="Nghe tốc độ chuẩn (1.0x)"
      >
        <i
          className={`fa-solid ${
            isPlaying && currentRate === 1.0 ? "fa-volume-high text-indigo-200" : "fa-volume-high"
          }`}
        />
        <span>{label || (isPlaying && currentRate === 1.0 ? "Đang đọc..." : "Nghe 1.0x")}</span>
      </button>

      {/* Nút Nghe Chậm 0.7x (Shadowing) */}
      {showSlowOption && (
        <button
          type="button"
          onClick={(e) => (isPlaying && currentRate === 0.7 ? handleStop(e) : handlePlay(0.7, e))}
          className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer bg-slate-800/80 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 ${
            sizeClasses[size]
          } ${isPlaying && currentRate === 0.7 ? "ring-2 ring-amber-400 animate-pulse" : ""}`}
          title="Luyện nghe & nhại giọng chậm (0.7x Shadowing)"
        >
          <i className="fa-solid fa-person-walking text-xs" />
          <span>0.7x Chậm</span>
        </button>
      )}
    </div>
  );
};
