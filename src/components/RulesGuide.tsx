import React, { useState } from "react";
import { AudioPlayerButton } from "./AudioPlayerButton";
import { PhoneticDetailModal } from "./PhoneticDetailModal";

export const RulesGuide: React.FC = () => {
  const [activePhonetic, setActivePhonetic] = useState<string | null>(null);

  const rules = [
    {
      num: 1,
      title: "Luyện nghe & Nhại giọng (Shadowing Technique)",
      icon: "fa-headphones text-indigo-400",
      desc: "Nghe câu mẫu ở 2 chế độ: 1.0x (Tốc độ giao tiếp tự nhiên) và 0.7x (Tốc độ chậm bóc tách từng âm). Hãy phát âm đuổi theo ngay sau người bản xứ từ 0.5s đến 1s để cơ miệng quen với phản xạ ngữ điệu.",
      sampleText: "She made me hurry",
      highlight: "Nút nghe 1.0x & 0.7x luôn sẵn sàng trên từng câu bài học.",
    },
    {
      num: 2,
      title: "Trọng âm từ (Word Stress)",
      icon: "fa-arrow-up-right-dots text-rose-400",
      desc: "Từ có 2 âm tiết trở lên bắt buộc phải có trọng âm chính. Âm tiết mang trọng âm được đọc cao hơn, dài hơn và to hơn (thể hiện bằng IN ĐẬM VÀ GẠCH CHÂN ĐỎ). Âm không mang trọng âm thường suy biến thành âm lướt schwa /ə/.",
      sampleText: "Decision - I made my decision",
      highlight: "Ví dụ: de-SI-sion, ex-PEN-sive, SCHE-dule, HUR-ry.",
    },
    {
      num: 3,
      title: "Nguyên âm & Phụ âm khó (Tricky Consonants)",
      icon: "fa-head-side-cough text-amber-400",
      desc: "Chú thích khẩu hình rõ ràng cho các phụ âm người Việt hay phát âm nhầm: /ð/ (răng kẹp lưỡi có rung), /θ/ (răng kẹp lưỡi thổi gió không rung), /ʒ/ (môi tròn rung nhẹ giữa), /dʒ/ (bật mạnh gờ nướu rung).",
      sampleText: "They agreed to work together",
      highlight: "Nhấp vào các ký hiệu IPA bên dưới để xem khẩu hình chi tiết.",
      hasInteractivePhonics: true,
    },
    {
      num: 4,
      title: "Không bỏ âm cuối (Ending Sounds)",
      icon: "fa-wind text-sky-400",
      desc: "Tiếng Việt là ngôn ngữ đơn âm tiết không có âm đuôi gió; tiếng Anh BẮT BUỘC phải bật rõ các âm chặn, âm xì: /-d/, /-t/, /-s/, /-z/, /-k/, /-ks/, /-v/. Bỏ âm cuối sẽ làm biến đổi hoàn toàn nghĩa của từ (như 'alive' vs 'a life', 'sick' vs 'six').",
      sampleText: "He is still alive",
      highlight: "Tô màu xanh dương nổi bật các âm đuôi trong toàn bộ bài học.",
    },
    {
      num: 5,
      title: "Ngữ điệu chuẩn (Intonation)",
      icon: "fa-arrow-trend-up text-emerald-400",
      desc: "Đánh dấu mũi tên chuẩn: Lên giọng (↗) ở cuối câu hỏi Yes/No (Could I make a reservation?↗, Do you have a part-time job?↗). Xuống giọng (↘) ở câu hỏi Wh- và câu trần thuật (When is the deadline?↘, That's what I thought↘).",
      sampleText: "Could I make a reservation?",
      highlight: "Lên giọng tạo sự thân thiện, cầu thị; Xuống giọng tạo sự dứt khoát, tin cậy.",
    },
    {
      num: 6,
      title: "Ngắt nghỉ đúng cụm (Chunking)",
      icon: "fa-scissors text-orange-400",
      desc: "Chia câu thành các cụm nghĩa (ngăn cách bằng ký hiệu gạch chéo '/' màu cam). TUYỆT ĐỐI không ngắt đôi các cụm động từ cố định (như: come in, get on, put on hold, run short on).",
      sampleText: "I can't afford / to buy / such an expensive car ↘",
      highlight: "Nói theo cụm giúp người bản xứ bắt trọn ý và không bị ngắt vụn hụt hơi.",
    },
    {
      num: 7,
      title: "Trường hợp đặc biệt: Âm câm & Biến âm",
      icon: "fa-star text-amber-300",
      desc: "Nắm vững các trường hợp chữ viết có nhưng âm câm hoàn toàn (ví dụ: 'an hour' - âm 'h' là âm câm, bắt đầu bằng nguyên âm đôi /aʊ/), hoặc hiện tượng nuốt âm/nối âm ('want to' -> wanna, 'did you' -> /dɪ-dʒu/).",
      sampleText: "I'll be back in an hour",
      highlight: "Luôn nói 'an hour', không bao giờ nói 'a hour'.",
    },
    {
      num: 8,
      title: "Học theo ngữ cảnh & Hình ảnh thực tế",
      icon: "fa-image text-purple-400",
      desc: "Mỗi mẫu câu giao tiếp đều đi kèm hình ảnh chụp bối cảnh chân thực (văn phòng, gọi điện thoại, trả tiền ăn, bắt xe buýt) giúp não bộ ghi nhớ bằng tư duy hình ảnh thay vì dịch từ tiếng Việt sang tiếng Anh.",
      sampleText: "Let's split the check. No, it's on me.",
      highlight: "Kích hoạt vùng hồi hải mã để ghi nhớ sâu thông qua liên tưởng thị giác.",
    },
    {
      num: 9,
      title: "Tích hợp Google tra cứu 1-Click",
      icon: "fa-brands fa-google text-blue-400",
      desc: "Nút 1-click tra khẩu hình phát âm chuyển động 3D trên Google Search ('how to pronounce...') và tra hình ảnh tình huống thực tế trên Google Images ngay tại từng thẻ bài học.",
      sampleText: "How's the project coming along? Ahead of schedule.",
      highlight: "Chủ động kiểm chứng ngữ điệu và khẩu hình từ nguồn dữ liệu mở toàn cầu.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header cẩm nang */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-800 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-lg">
            <i className="fa-solid fa-graduation-cap" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              9 Nguyên Tắc Vàng Phát Âm & Giao Tiếp Chuẩn Quốc Tế
            </h2>
            <span className="text-xs text-slate-400">
              Kim chỉ nam xuyên suốt toàn bộ chương trình học và hệ thống bài tập 6 ngày
            </span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl mt-2">
          Nền tảng giúp bạn phá vỡ rào cản "phát âm tiếng Anh giọng Việt", nói có nhịp điệu bản xứ,
          chấm dứt tình trạng nuốt âm cuối và sai trọng âm từ.
        </p>
      </div>

      {/* Danh sách 9 quy tắc */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rules.map((r) => (
          <div
            key={r.num}
            className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-mono font-bold text-indigo-300">
                  0{r.num}
                </span>
                <i className={`fa-solid ${r.icon} text-lg`} />
              </div>

              <h3 className="text-sm font-bold text-white mb-2 leading-snug">{r.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{r.desc}</p>

              {/* Phonics clickable badges for rule 3 */}
              {r.hasInteractivePhonics && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["/ð/", "/θ/", "/ʒ/", "/dʒ/"].map((sym) => (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => setActivePhonetic(sym)}
                      className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-lg transition cursor-pointer"
                      title={`Xem khẩu hình chi tiết âm ${sym}`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-700/60 space-y-2">
              <div className="text-[11px] text-amber-300/90 bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <i className="fa-solid fa-check-double text-amber-400 mr-1.5" />
                <span>{r.highlight}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-slate-400 italic truncate">
                  "{r.sampleText}"
                </span>
                <AudioPlayerButton text={r.sampleText} size="sm" variant="ghost" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <PhoneticDetailModal
        symbol={activePhonetic}
        onClose={() => setActivePhonetic(null)}
      />
    </div>
  );
};
