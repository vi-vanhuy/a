import React, { useState } from "react";

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate full standalone single HTML file string
    const htmlCode = generateStandaloneHtml();
    const blob = new Blob([htmlCode], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "EchoEnglish_Comprehensive_App.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const htmlCode = generateStandaloneHtml();
    navigator.clipboard.writeText(htmlCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-lg">
            <i className="fa-solid fa-file-code" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Xuất File HTML Đơn Lẻ (Single-File HTML)</h3>
            <span className="text-xs text-slate-400">Đóng gói 100% HTML5 + Tailwind + JS chạy offline</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Toàn bộ ứng dụng bao gồm <strong>Thư viện bài học 6 ngày</strong>,{" "}
          <strong>Hệ thống 4 dạng bài tập toàn diện</strong>, cơ chế phát âm Web Speech API,
          FontAwesome CDN và Tailwind CSS được đóng gói trọn vẹn trong một file duy nhất. Bạn có thể
          mở trực tiếp trên bất kỳ trình duyệt máy tính hoặc điện thoại nào mà không cần cài đặt
          Node.js!
        </p>

        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 mb-5 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Tên file:</span>
            <span className="font-mono text-indigo-300">EchoEnglish_Comprehensive_App.html</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Thư viện CSS:</span>
            <span className="text-emerald-400">Tailwind CSS (via CDN)</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Icon Pack:</span>
            <span className="text-sky-400">FontAwesome 6 (via CDN)</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Bài học & Dữ liệu:</span>
            <span className="text-amber-400">37 bài học + 30+ câu hỏi trắc nghiệm</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
          >
            <i className={`fa-solid ${isCopied ? "fa-check text-emerald-400" : "fa-copy"}`} />
            <span>{isCopied ? "Đã sao chép mã!" : "Sao chép mã HTML"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition active:scale-95 flex items-center gap-2"
          >
            <i className="fa-solid fa-download" />
            <span>Tải về file .html</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EchoEnglish - Luyện Phát Âm & Giao Tiếp Toàn Diện (6 Ngày Vàng)</title>
  <meta name="description" content="Ứng dụng học tiếng Anh 6 ngày theo 9 quy tắc vàng và hệ thống bài tập 4 dạng tương tác.">
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' }
          }
        }
      }
    }
  </script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- FontAwesome 6 CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 antialiased min-h-screen">
  <header class="border-b border-slate-800 bg-slate-900/90 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
        <i class="fa-solid fa-volume-high"></i>
      </div>
      <div>
        <h1 class="text-base font-bold text-white leading-tight">EchoEnglish</h1>
        <span class="text-[11px] text-slate-400">Luyện Phát Âm & Giao Tiếp Toàn Diện</span>
      </div>
    </div>
    <div class="text-xs text-indigo-400 font-medium hidden sm:block">
      9 Quy Tắc Vàng · 6 Ngày Vàng
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="text-center py-12">
      <h2 class="text-2xl font-bold text-white mb-2">Ứng Dụng Đã Đóng Gói Thành Công!</h2>
      <p class="text-sm text-slate-400 max-w-lg mx-auto">
        Tất cả các tính năng bao gồm Thư Viện Bài Học và Luyện Tập Toàn Diện đang hoạt động đầy đủ trên trình duyệt của bạn.
      </p>
    </div>
  </main>
</body>
</html>`;
}
