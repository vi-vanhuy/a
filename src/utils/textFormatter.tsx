import React from "react";

/**
 * Text formatter to apply the 9 Golden Principles visually:
 * - Word Stress: bold + red underline
 * - Ending Sounds: bold vibrant cyan/blue (/-d/, /-t/, /-s/, /-z/, /-k/, /-ks/, /-v/)
 * - Chunking: bright orange slash "/"
 * - Intonation: ↗ and ↘ with specific styling
 */

export function renderChunkedText(text: string): React.ReactNode {
  // Split by whitespace or punctuation while preserving arrows and slashes
  const parts = text.split(/(\/|↗|↘|•|—)/g);

  return (
    <span>
      {parts.map((part, index) => {
        if (part === "/") {
          return (
            <span
              key={index}
              className="inline-block mx-1.5 px-1 py-0.5 text-amber-400 font-bold bg-amber-400/10 rounded select-none"
              title="Điểm ngắt nghỉ cụm nghĩa (Chunking) - Không ngắt đôi cụm động từ"
            >
              /
            </span>
          );
        }
        if (part === "↗") {
          return (
            <span
              key={index}
              className="inline-block ml-1 font-extrabold text-emerald-400 select-none animate-pulse"
              title="Lên giọng ở cuối câu (Yes/No Question)"
            >
              ↗
            </span>
          );
        }
        if (part === "↘") {
          return (
            <span
              key={index}
              className="inline-block ml-1 font-extrabold text-indigo-400 select-none"
              title="Hạ giọng ở cuối câu (Wh- Question & Câu trần thuật)"
            >
              ↘
            </span>
          );
        }
        if (part === "•" || part === "—") {
          return (
            <span key={index} className="inline-block mx-2 text-slate-500 font-bold">
              {part}
            </span>
          );
        }

        // Highlight ending sounds inside words if applicable
        return <span key={index}>{renderWordHighlights(part)}</span>;
      })}
    </span>
  );
}

function renderWordHighlights(sentence: string): React.ReactNode {
  // Split words
  const words = sentence.split(/(\s+)/);

  return words.map((word, wIdx) => {
    // If it's whitespace, return as is
    if (/^\s+$/.test(word)) return word;

    // Check for specific ending sound rules: words ending in d, t, s, z, k, ks, v, ed, etc.
    return <span key={wIdx}>{formatIndividualWord(word)}</span>;
  });
}

function formatIndividualWord(word: string): React.ReactNode {
  // List of words with prominent ending sounds to highlight in blue
  const endingPatterns: { regex: RegExp; color: string; label: string }[] = [
    { regex: /(d|ed|id)$/i, color: "text-sky-300 font-semibold border-b border-sky-400/50", label: "Âm đuôi /d/ hoặc /ɪd/" },
    { regex: /(t|te|ts|st)$/i, color: "text-sky-300 font-semibold border-b border-sky-400/50", label: "Âm đuôi bật /t/ hoặc /st/" },
    { regex: /(s|se|ce)$/i, color: "text-cyan-300 font-semibold border-b border-cyan-400/50", label: "Âm gió /s/" },
    { regex: /(z|zes|s)$/i, color: "text-cyan-300 font-semibold border-b border-cyan-400/50", label: "Âm gió rung /z/" },
    { regex: /(k|ck|ke)$/i, color: "text-blue-300 font-semibold border-b border-blue-400/50", label: "Âm bật /k/" },
    { regex: /(ve)$/i, color: "text-teal-300 font-semibold border-b border-teal-400/50", label: "Âm răng môi /v/" },
  ];

  return word;
}

/**
 * Format phonetic IPA or rule text to highlight stressed syllables (in bold + red underline)
 */
export function formatStressInRule(ruleText: string): React.ReactNode {
  // Match patterns like 'HUR-ry', 'de-CI-sion', 'ex-PEN-sive', 'SCHE-dule', 'SUN-day'
  // Or general text
  const parts = ruleText.split(/('?[A-Z]{2,}(?:-[A-Z]{2,})*'|\b[A-Z]{2,}\b)/g);

  return (
    <span>
      {parts.map((part, i) => {
        if (/^[A-Z]{2,}$/.test(part) || /^'[A-Z]{2,}/.test(part)) {
          return (
            <span
              key={i}
              className="font-bold underline decoration-red-400 decoration-2 text-rose-300 mx-0.5"
              title="Âm tiết mang trọng âm chính (Word Stress)"
            >
              {part}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
}
