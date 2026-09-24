import React, { useState, useEffect, useMemo, useRef } from "react";
import { practiceQuestions, PracticeQuestion, PracticeType } from "../data/practiceQuestions";
import { speechService } from "../utils/speech";
import { AudioPlayerButton } from "./AudioPlayerButton";
import { renderChunkedText, formatStressInRule } from "../utils/textFormatter";

interface PracticeHubProps {
  initialDayFilter?: number | "all";
}

export const PracticeHub: React.FC<PracticeHubProps> = ({ initialDayFilter = "all" }) => {
  // Bộ lọc
  const [selectedDay, setSelectedDay] = useState<number | "all">(initialDayFilter);
  const [selectedType, setSelectedType] = useState<PracticeType | "all">("all");

  // Bộ câu hỏi đang làm
  const [activeQuestions, setActiveQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Trạng thái trả lời của câu hỏi hiện tại
  const [userSelection, setUserSelection] = useState<string | null>(null);
  const [unscrambleChosen, setUnscrambleChosen] = useState<string[]>([]);
  const [unscrambleAvailable, setUnscrambleAvailable] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Thống kê & Điểm số
  const [score, setScore] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>([]);

  // Tùy chọn audio tự động
  const [autoPlayAudio, setAutoPlayAudio] = useState<boolean>(true);
  const hasAutoPlayedRef = useRef<boolean>(false);

  // Khởi tạo danh sách câu hỏi dựa vào bộ lọc
  const filterAndShuffleQuestions = (day: number | "all", type: PracticeType | "all") => {
    let pool = practiceQuestions.filter((q) => {
      const matchDay = day === "all" || q.day === day;
      const matchType = type === "all" || q.type === type;
      return matchDay && matchType;
    });

    if (pool.length === 0) {
      pool = [...practiceQuestions];
    }

    // Shuffle mượt mà
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    resetQuestionState(shuffled[0]);
    setIsFinished(false);
    setScore(0);
    setTotalAnswered(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setIncorrectQuestionIds([]);
  };

  useEffect(() => {
    filterAndShuffleQuestions(selectedDay, selectedType);
  }, [selectedDay, selectedType]);

  const currentQ: PracticeQuestion | undefined = activeQuestions[currentIndex];

  const resetQuestionState = (question?: PracticeQuestion) => {
    const q = question || currentQ;
    setUserSelection(null);
    setIsAnswered(false);
    setIsCorrect(false);
    hasAutoPlayedRef.current = false;

    if (q && q.type === "unscramble" && q.unscrambleWords) {
      // Xáo trộn các từ cần xếp
      const words = [...q.unscrambleWords].sort(() => 0.5 - Math.random());
      setUnscrambleAvailable(words);
      setUnscrambleChosen([]);
    } else {
      setUnscrambleAvailable([]);
      setUnscrambleChosen([]);
    }
  };

  // Tự động phát âm khi chuyển sang câu mới nếu là dạng Listening Quiz hoặc bật autoPlayAudio
  useEffect(() => {
    if (!currentQ || isAnswered || hasAutoPlayedRef.current) return;

    if (currentQ.type === "listening" || autoPlayAudio) {
      hasAutoPlayedRef.current = true;
      const timer = setTimeout(() => {
        speechService.speak(currentQ.audioText, 1.0);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentQ, isAnswered, autoPlayAudio]);

  // Xử lý nộp bài cho Multiple Choice, Listening và Pronunciation Trap
  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentQ) return;
    setUserSelection(option);

    const correct = option.trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
    setIsAnswered(true);
    setIsCorrect(correct);
    setTotalAnswered((prev) => prev + 1);

    if (correct) {
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
      setIncorrectQuestionIds((prev) => [...prev, currentQ.id]);
    }
  };

  // Xử lý ghép câu (Unscramble)
  const handleWordClickFromAvailable = (word: string, index: number) => {
    if (isAnswered) return;
    const newAvail = [...unscrambleAvailable];
    newAvail.splice(index, 1);
    setUnscrambleAvailable(newAvail);
    setUnscrambleChosen((prev) => [...prev, word]);
  };

  const handleWordClickFromChosen = (word: string, index: number) => {
    if (isAnswered) return;
    const newChosen = [...unscrambleChosen];
    newChosen.splice(index, 1);
    setUnscrambleChosen(newChosen);
    setUnscrambleAvailable((prev) => [...prev, word]);
  };

  const handleResetUnscramble = () => {
    if (isAnswered || !currentQ || !currentQ.unscrambleWords) return;
    const words = [...currentQ.unscrambleWords].sort(() => 0.5 - Math.random());
    setUnscrambleAvailable(words);
    setUnscrambleChosen([]);
  };

  const handleCheckUnscramble = () => {
    if (isAnswered || !currentQ || unscrambleChosen.length === 0) return;

    const userSentence = unscrambleChosen.join(" ").trim().toLowerCase();
    const targetArr = Array.isArray(currentQ.correctAnswer)
      ? currentQ.correctAnswer
      : [String(currentQ.correctAnswer)];
    const correctSentence = targetArr.join(" ").trim().toLowerCase();

    const correct = userSentence === correctSentence;
    setIsAnswered(true);
    setIsCorrect(correct);
    setTotalAnswered((prev) => prev + 1);

    if (correct) {
      setScore((prev) => prev + 15);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
      setIncorrectQuestionIds((prev) => [...prev, currentQ.id]);
    }
  };

  // Chuyển sang câu tiếp theo
  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      resetQuestionState(activeQuestions[nextIdx]);
    } else {
      setIsFinished(true);
    }
  };

  // Làm lại bài tập cho các câu đã làm sai
  const handleRetryMissedQuestions = () => {
    const missed = practiceQuestions.filter((q) => incorrectQuestionIds.includes(q.id));
    if (missed.length > 0) {
      setActiveQuestions(missed);
      setCurrentIndex(0);
      resetQuestionState(missed[0]);
      setIsFinished(false);
      setScore(0);
      setTotalAnswered(0);
      setCorrectCount(0);
      setStreak(0);
      setIncorrectQuestionIds([]);
    } else {
      filterAndShuffleQuestions(selectedDay, selectedType);
    }
  };

  // Tính toán % chính xác
  const accuracyPercent =
    totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 100;

  // Đánh giá huy hiệu kết quả
  const getBadgeResult = (acc: number) => {
    if (acc >= 85) {
      return {
        tier: "excellent",
        title: "Xuất Sắc — Master of Pronunciation",
        desc: "Tuyệt vời! Bạn nắm cực kỳ vững 9 quy tắc vàng, bắt trúng trọng âm và không bỏ sót âm cuối.",
        color: "text-amber-300 border-amber-400 bg-amber-400/10",
        icon: "fa-award text-amber-400",
      };
    }
    if (acc >= 60) {
      return {
        tier: "good",
        title: "Khá Tốt — Good Progress",
        desc: "Bạn có phản xạ nghe và ngữ điệu khá tốt. Hãy chú ý thêm các bẫy âm câm và nối âm để đạt điểm tuyệt đối!",
        color: "text-sky-300 border-sky-400 bg-sky-400/10",
        icon: "fa-medal text-sky-400",
      };
    }
    return {
      tier: "review",
      title: "Cần Ôn Lại — Needs Review",
      desc: "Đừng nản chí! Hãy mở Thư viện bài học, nghe kỹ lại bằng chế độ 0.7x Chậm (Shadowing) và luyện tập lại.",
      color: "text-rose-300 border-rose-400 bg-rose-400/10",
      icon: "fa-book-open-reader text-rose-400",
    };
  };

  const badgeInfo = getBadgeResult(accuracyPercent);

  const getTypeName = (type: PracticeType) => {
    switch (type) {
      case "multiple_choice":
        return "Dạng 1: Trắc nghiệm Nghĩa & Thành ngữ";
      case "listening":
        return "Dạng 2: Luyện Nghe Điền Khuyết (Giấu chữ)";
      case "pronunciation_trap":
        return "Dạng 3: Bẫy Âm Cuối & Trọng Âm";
      case "unscramble":
        return "Dạng 4: Ghép câu hoàn chỉnh (Word Unscramble)";
    }
  };

  const getTypeIcon = (type: PracticeType) => {
    switch (type) {
      case "multiple_choice":
        return "fa-list-check text-indigo-400";
      case "listening":
        return "fa-headphones text-emerald-400";
      case "pronunciation_trap":
        return "fa-bolt text-amber-400";
      case "unscramble":
        return "fa-puzzle-piece text-sky-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header điều khiển luyện tập: Thanh tiến độ & Score counter */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Hàng 1: Bộ lọc nhanh & Tùy chọn âm thanh */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Lọc bài tập:
            </span>
            {/* Lọc theo ngày */}
            <select
              value={selectedDay}
              onChange={(e) =>
                setSelectedDay(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">Tất cả 6 ngày</option>
              {[1, 2, 3, 4, 5, 6].map((d) => (
                <option key={d} value={d}>
                  Ngày {d}
                </option>
              ))}
            </select>

            {/* Lọc theo dạng câu hỏi */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">Tất cả 4 dạng bài</option>
              <option value="multiple_choice">Dạng 1: Trắc nghiệm ngữ cảnh</option>
              <option value="listening">Dạng 2: Nghe điền khuyết</option>
              <option value="pronunciation_trap">Dạng 3: Bẫy âm & Trọng âm</option>
              <option value="unscramble">Dạng 4: Ghép câu hoàn chỉnh</option>
            </select>
          </div>

          {/* Toggle tự động phát âm */}
          <button
            type="button"
            onClick={() => setAutoPlayAudio(!autoPlayAudio)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              autoPlayAudio
                ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/40"
                : "bg-slate-900 text-slate-400 border border-slate-700"
            }`}
            title="Tự động phát âm câu hỏi khi bắt đầu câu mới"
          >
            <i className={`fa-solid ${autoPlayAudio ? "fa-volume-high" : "fa-volume-xmark"}`} />
            <span>Tự phát âm: {autoPlayAudio ? "BẬT" : "TẮT"}</span>
          </button>
        </div>

        {/* Hàng 2: Progress bar & Live Score Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          {/* Cột 1: Tiến độ câu hỏi */}
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <i className="fa-solid fa-flag-checkered text-indigo-400" />
                <span>Tiến độ:</span>
                <span className="font-mono text-indigo-300 font-bold">
                  Câu {Math.min(currentIndex + 1, activeQuestions.length)} / {activeQuestions.length}
                </span>
              </span>
              <span className="font-mono text-slate-400">
                {Math.round(((currentIndex + 1) / activeQuestions.length) * 100)}%
              </span>
            </div>
            {/* Visual Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700/60">
              <div
                className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentIndex + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Cột 2: Bảng điểm trực tiếp */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
            {/* Streak */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                streak > 1
                  ? "bg-amber-950/40 border-amber-500/50 text-amber-300 animate-bounce"
                  : "bg-slate-900 border-slate-700 text-slate-400"
              }`}
              title="Chuỗi trả lời đúng liên tiếp"
            >
              <i className="fa-solid fa-fire text-amber-400" />
              <span className="font-mono font-bold">{streak}</span>
              <span className="text-[11px]">chuỗi</span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-indigo-300">
              <i className="fa-solid fa-star text-amber-400" />
              <span className="font-mono font-bold text-white">{score}</span>
              <span className="text-[11px] text-slate-400">điểm</span>
            </div>

            {/* Độ chính xác */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300">
              <i className="fa-solid fa-bullseye text-emerald-400" />
              <span className="font-mono font-bold text-white">{accuracyPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Màn hình kết thúc Quiz nếu hoàn thành */}
      {isFinished ? (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-xl animate-fade-in">
          <div
            className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl border-2 shadow-lg ${badgeInfo.color}`}
          >
            <i className={`fa-solid ${badgeInfo.icon}`} />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {badgeInfo.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {badgeInfo.desc}
            </p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-2">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80">
              <span className="text-[11px] text-slate-400 block mb-1">Tổng điểm đạt</span>
              <span className="text-xl font-bold font-mono text-indigo-400">{score}</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80">
              <span className="text-[11px] text-slate-400 block mb-1">Độ chính xác</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {accuracyPercent}%
              </span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80">
              <span className="text-[11px] text-slate-400 block mb-1">Số câu đúng</span>
              <span className="text-xl font-bold font-mono text-white">
                {correctCount} / {totalAnswered}
              </span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80">
              <span className="text-[11px] text-slate-400 block mb-1">Chuỗi cao nhất</span>
              <span className="text-xl font-bold font-mono text-amber-400">
                {maxStreak} <i className="fa-solid fa-fire text-xs" />
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-700/60">
            <button
              type="button"
              onClick={() => filterAndShuffleQuestions(selectedDay, selectedType)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition active:scale-95 flex items-center gap-2"
            >
              <i className="fa-solid fa-rotate-right" />
              <span>Làm lại bộ đề này</span>
            </button>

            {incorrectQuestionIds.length > 0 && (
              <button
                type="button"
                onClick={handleRetryMissedQuestions}
                className="px-5 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white font-semibold text-xs rounded-xl shadow-md transition active:scale-95 flex items-center gap-2"
              >
                <i className="fa-solid fa-triangle-exclamation" />
                <span>Luyện lại {incorrectQuestionIds.length} câu làm sai</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setSelectedDay("all");
                setSelectedType("all");
              }}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs rounded-xl transition active:scale-95 flex items-center gap-2"
            >
              <i className="fa-solid fa-sliders" />
              <span>Đổi bộ lọc bài tập</span>
            </button>
          </div>
        </div>
      ) : currentQ ? (
        /* Màn hình câu hỏi đang làm */
        <div className="bg-slate-800/95 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-lg space-y-6">
          {/* Header câu hỏi: Dạng bài, Ngày & Nút "Nghe lại câu này" bắt buộc ở mọi câu */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 text-xs font-bold bg-indigo-600 text-white rounded-lg">
                Ngày {currentQ.day}
              </span>
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <i className={`fa-solid ${getTypeIcon(currentQ.type)} text-sm`} />
                <span>{getTypeName(currentQ.type)}</span>
              </span>
            </div>

            {/* Nút "Nghe lại câu này" ở mọi câu hỏi bài tập */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden sm:inline font-medium">
                Phát âm chuẩn:
              </span>
              <AudioPlayerButton
                text={currentQ.audioText}
                size="sm"
                variant="primary"
                label="Nghe lại câu này"
              />
            </div>
          </div>

          {/* Tình huống ngữ cảnh / Đề bài */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
              {currentQ.contextPrompt}
            </h3>

            {/* Giao diện đặc thù cho Dạng 2: Listening Quiz (Khung âm thanh giấu chữ) */}
            {currentQ.type === "listening" && (
              <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl animate-pulse">
                    <i className="fa-solid fa-headphones" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Chế độ nghe giấu chữ (Blind Audio Test)
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Hãy lắng nghe cẩn thận và chọn từ/cụm từ bị khuyết bên dưới.
                    </p>
                  </div>
                </div>

                <AudioPlayerButton
                  text={currentQ.audioText}
                  size="md"
                  variant="primary"
                  label="Nghe lại (1.0x)"
                  showSlowOption={true}
                />
              </div>
            )}
          </div>

          {/* Vùng tương tác chọn đáp án (Options hoặc Unscramble) */}
          {currentQ.type === "unscramble" ? (
            /* Dạng 4: Ghép câu hoàn chỉnh (Sentence Unscramble) */
            <div className="space-y-4 pt-1">
              {/* Khu vực câu đang được ghép */}
              <div className="min-h-[70px] p-4 bg-slate-900/90 border-2 border-dashed border-indigo-500/40 rounded-xl flex flex-wrap items-center gap-2">
                {unscrambleChosen.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">
                    Nhấp vào các từ bên dưới theo thứ tự để ghép thành câu đúng ngữ pháp và nhịp ngắt nghỉ...
                  </span>
                ) : (
                  unscrambleChosen.map((word, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleWordClickFromChosen(word, idx)}
                      className="px-3 py-1.5 text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                      title="Nhấp để gỡ từ này"
                    >
                      <span>{word}</span>
                      {!isAnswered && <i className="fa-solid fa-xmark text-[10px] text-indigo-200" />}
                    </button>
                  ))
                )}
              </div>

              {/* Các từ còn lại để chọn */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-medium block">
                  Từ vựng có sẵn (nhấp để chọn):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {unscrambleAvailable.map((word, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleWordClickFromAvailable(word, idx)}
                      className="px-3.5 py-2 text-xs sm:text-sm font-semibold bg-slate-700/80 hover:bg-slate-600 text-slate-100 border border-slate-600 rounded-lg shadow-sm transition active:scale-95 cursor-pointer"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nút Kiểm tra và Đặt lại */}
              {!isAnswered && (
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCheckUnscramble}
                    disabled={unscrambleChosen.length === 0}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <i className="fa-solid fa-check" />
                    <span>Kiểm tra câu này</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetUnscramble}
                    disabled={unscrambleChosen.length === 0}
                    className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-rotate-left" />
                    <span>Xếp lại từ đầu</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Dạng 1, 2, 3: Trắc nghiệm lựa chọn (Multiple Choice / Listening / Pronunciation Trap) */
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {currentQ.options?.map((option, idx) => {
                const isSelected = userSelection === option;
                const isTargetCorrect =
                  option.trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();

                let btnStyle = "bg-slate-900/80 hover:bg-slate-700/80 text-slate-200 border-slate-700";

                if (isAnswered) {
                  if (isTargetCorrect) {
                    btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500";
                  } else if (isSelected && !isTargetCorrect) {
                    btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500";
                  } else {
                    btnStyle = "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60";
                  }
                } else if (isSelected) {
                  btnStyle = "bg-indigo-900/60 border-indigo-500 text-white";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border font-medium text-xs sm:text-sm transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-400 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswered && (
                      <div className="shrink-0">
                        {isTargetCorrect && (
                          <i className="fa-solid fa-circle-check text-emerald-400 text-base" />
                        )}
                        {isSelected && !isTargetCorrect && (
                          <i className="fa-solid fa-circle-xmark text-rose-400 text-base" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Bảng Giải thích Sư Phạm theo 9 quy tắc vàng khi đã trả lời */}
          {isAnswered && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 space-y-3.5 ${
                isCorrect
                  ? "bg-emerald-950/30 border-emerald-500/40"
                  : "bg-rose-950/30 border-rose-500/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                      isCorrect
                        ? "bg-emerald-500 text-white"
                        : "bg-rose-500 text-white"
                    }`}
                  >
                    <i className={`fa-solid ${isCorrect ? "fa-check" : "fa-xmark"}`} />
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {isCorrect ? "Chính xác! (+ Điểm)" : "Chưa chính xác — Xem phân tích chi tiết"}
                  </h4>
                </div>

                <span className="text-xs font-mono font-semibold text-slate-300">
                  {isCorrect ? "+10 Điểm" : "+0 Điểm"}
                </span>
              </div>

              {/* Tóm tắt đáp án */}
              <div className="text-xs sm:text-sm text-slate-200 font-medium">
                {currentQ.explanation.overview}
              </div>

              {/* Hiển thị câu đúng với đầy đủ Chunking và Intonation nếu là dạng unscramble hoặc listening */}
              {currentQ.chunkedSolution && (
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Cấu trúc ngắt nghỉ (Chunking) & Ngữ điệu chuẩn:
                  </span>
                  <div className="text-sm sm:text-base font-semibold text-white">
                    {renderChunkedText(currentQ.chunkedSolution)}
                  </div>
                </div>
              )}

              {/* Chi tiết sư phạm theo 9 quy tắc */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-graduation-cap" />
                  <span>Giải thích sư phạm theo 9 quy tắc vàng:</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {formatStressInRule(currentQ.explanation.ruleBreakdown)}
                </p>

                {/* Danh sách các điểm mấu chốt */}
                <ul className="text-xs text-slate-300 space-y-1 pt-1 border-t border-slate-800">
                  {currentQ.explanation.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <i className="fa-solid fa-circle-dot text-[9px] text-indigo-400 mt-1 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nút sang câu tiếp theo */}
              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentIndex + 1 < activeQuestions.length
                      ? "Câu tiếp theo"
                      : "Xem kết quả bài tập"}
                  </span>
                  <i className="fa-solid fa-arrow-right text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
