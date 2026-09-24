export type PracticeType = "multiple_choice" | "listening" | "pronunciation_trap" | "unscramble";

export interface PracticeQuestion {
  id: string;
  day: number;
  type: PracticeType;
  title: string;
  contextPrompt: string; // Tình huống / Ngữ cảnh hoặc câu hỏi
  audioText: string; // Câu tiếng Anh đầy đủ để phát âm (Web Speech API)
  options?: string[]; // Dùng cho MCQ, Listening, Pronunciation Trap
  correctAnswer: string | number | string[]; // Đáp án đúng
  unscrambleWords?: string[]; // Danh sách từ bị xáo trộn (dành cho unscramble)
  chunkedSolution?: string; // Câu hoàn chỉnh có phân tách chunking và intonation
  explanation: {
    overview: string; // Tóm tắt đáp án
    ruleBreakdown: string; // Chi tiết sư phạm theo 9 quy tắc vàng
    keyPoints: string[]; // Điểm mấu chốt (stress, ending sound, chunking)
  };
}

export const practiceQuestions: PracticeQuestion[] = [
  // ================= DẠNG 1: TRẮC NGHIỆM NGHĨA & THÀNH NGỮ THEO NGỮ CẢNH =================
  {
    id: "q-mcq-1",
    day: 2,
    type: "multiple_choice",
    title: "Trắc nghiệm tình huống: Giữ máy điện thoại",
    contextPrompt: "Bạn đang nhận cuộc gọi văn phòng và muốn nói với người đang gọi điện thoại rằng hãy chờ máy một lát để bạn chuyển máy cho người khác, bạn nói câu nào lịch sự và tự nhiên nhất?",
    audioText: "Can I put you on hold for a minute?",
    options: [
      "Can I put you on hold for a minute?",
      "Can you keep off the telephone?",
      "Please stop talking for one hour.",
      "Are you still alive on the phone?"
    ],
    correctAnswer: "Can I put you on hold for a minute?",
    explanation: {
      overview: "'Put someone on hold' là cụm thành ngữ tiêu chuẩn quốc tế khi nhờ người gọi giữ máy.",
      ruleBreakdown: "Theo Quy tắc số 6 (Chunking) và Quy tắc số 5 (Ngữ điệu): 'Can I put you on hold / for a minute? ↗'. Đây là câu hỏi xin phép Yes/No nên bắt buộc lên giọng ở cuối câu (minute↗), cụm động từ 'put you on hold' không được bẻ đôi.",
      keyPoints: [
        "Thành ngữ cố định: 'put on hold' = giữ máy điện thoại.",
        "Ngữ điệu: Lên giọng ở cuối câu hỏi Yes/No (minute↗).",
        "Âm cuối: Bật nhẹ âm /t/ ở 'put' và /d/ ở 'hold'."
      ]
    }
  },
  {
    id: "q-mcq-2",
    day: 2,
    type: "multiple_choice",
    title: "Trắc nghiệm tình huống: Sắp hết thời gian làm bài",
    contextPrompt: "Hạn chót sắp tới và nhóm của bạn chỉ còn vài phút để nộp báo cáo. Bạn muốn hối thúc mọi người rằng: 'Chúng ta sắp hết thời gian rồi!', bạn dùng câu nào chuẩn xác nhất?",
    audioText: "We're running short on time.",
    options: [
      "We're running short on time.",
      "We are running low of time.",
      "We have dead time right now.",
      "We run late from the hour."
    ],
    correctAnswer: "We're running short on time.",
    explanation: {
      overview: "'Run short on time' là thành ngữ chuẩn xác nhất chỉ việc cạn kiệt thời gian trước hạn chót (deadline).",
      ruleBreakdown: "Theo Quy tắc số 6 (Chunking) và Quy tắc số 4 (Âm cuối): Cụm 'running short / on time ↘'. Âm /t/ ở 'short' phải được chặn và bật sắc nét, không nói lướt mất âm cuối.",
      keyPoints: [
        "Cụm thành ngữ: 'run short on [something]' (ví dụ: short on cash, short on time).",
        "Âm cuối quan trọng: /t/ ở 'short' và /m/ ngậm môi ở 'time'.",
        "Ngữ điệu: Câu trần thuật hạ giọng cuối câu (time↘)."
      ]
    }
  },
  {
    id: "q-mcq-3",
    day: 5,
    type: "multiple_choice",
    title: "Trắc nghiệm tình huống: Lịch sự từ chối vì bận việc",
    contextPrompt: "Đồng nghiệp rủ bạn đi ăn trưa hôm nay nhưng bạn đang bận ngập đầu với các đầu việc tồn đọng. Bạn muốn nói 'Tôi bận ngập đầu mất rồi, để ngày mai được không?', bạn nói thế nào?",
    audioText: "Sorry, I'm tied up. How about tomorrow?",
    options: [
      "Sorry, I'm tied up. How about tomorrow?",
      "Sorry, I am locked down. How about later?",
      "No, I am behind work. Let's see off tomorrow.",
      "Sorry, my time is dead. Can you drop by?"
    ],
    correctAnswer: "Sorry, I'm tied up. How about tomorrow?",
    explanation: {
      overview: "'Tied up' (nghĩa đen: bị trói buộc) là thành ngữ bản xứ cực kỳ phổ biến thể hiện việc 'bận rộn không dứt ra được'.",
      ruleBreakdown: "Nối âm tự nhiên: 'I'm tied up' -> /aɪm taɪ-dʌp/. Nối âm phụ âm /d/ ở 'tied' sang nguyên âm /ʌ/ ở 'up'.",
      keyPoints: [
        "Thành ngữ: 'tied up' = extremely busy / occupied.",
        "Hiện tượng nối âm: /taɪ-dʌp/ tạo nhịp điệu trôi chảy tự nhiên.",
        "Cấu trúc rủ rê/đề xuất: 'How about + thời gian / V-ing?'."
      ]
    }
  },
  {
    id: "q-mcq-4",
    day: 6,
    type: "multiple_choice",
    title: "Trắc nghiệm tình huống: Tranh trả tiền trong bữa ăn",
    contextPrompt: "Bạn đi ăn cùng bạn thân và bạn muốn chủ động mời bữa này vì lần trước người bạn đó đã trả rồi. Bạn nói câu giao tiếp tự nhiên nào?",
    audioText: "Let's split the check. No, it's on me. You paid last time.",
    options: [
      "No, it's on me. You paid last time.",
      "No, it's in my hand. You paid yesterday.",
      "Let me flip the bill for your stomach.",
      "It is my check-in. Don't worry."
    ],
    correctAnswer: "No, it's on me. You paid last time.",
    explanation: {
      overview: "'It's on me' mang nghĩa 'Tôi bao / Bữa này tôi đãi'. Đối lập với 'split the check' (cưa đôi hóa đơn).",
      ruleBreakdown: "Bật rõ âm đuôi /d/ ở động từ quá khứ 'paid' (/peɪd/) và cụm âm đuôi /st/ ở 'last' (/lɑːst/).",
      keyPoints: [
        "Thành ngữ: 'It's on me' = My treat (Tôi bao).",
        "Cụm từ liên quan: 'Split the check' = Chia đều tiền.",
        "Âm cuối: Âm /d/ ở 'paid' cần bật dứt khoát để phân biệt với 'pay'."
      ]
    }
  },
  {
    id: "q-mcq-5",
    day: 5,
    type: "multiple_choice",
    title: "Trắc nghiệm tình huống: Lý do đến trễ do kẹt xe",
    contextPrompt: "Bạn đến cuộc họp muộn 20 phút vì đường phố tắc nghẽn nghiêm trọng. Khi sếp hỏi 'Why are you so late?', bạn trả lời chuẩn văn phong quốc tế thế nào?",
    audioText: "The heavy traffic held me up.",
    options: [
      "The heavy traffic held me up.",
      "The big cars locked my street.",
      "Many motors stood on my car.",
      "The crowd way made me stop."
    ],
    correctAnswer: "The heavy traffic held me up.",
    explanation: {
      overview: "'Hold someone up' (dạng quá khứ: held me up) là phrasal verb tự nhiên nhất chỉ việc 'bị kẹt xe hoặc tắc nghẽn giữ chân làm trễ giờ'.",
      ruleBreakdown: "Trọng âm và từ vựng: 'heavy traffic' (trọng âm nhấn âm 1: HEA-vy TRAF-fic), không nói 'crowded traffic' hay 'big traffic'.",
      keyPoints: [
        "Phrasal verb: 'hold up' = delay (làm trễ, giữ chân).",
        "Kết hợp từ (Collocation): 'heavy traffic' (kẹt xe nghiêm trọng).",
        "Âm cuối: Bật /d/ ở 'held' và /k/ ở 'traffic'."
      ]
    }
  },
  {
    id: "q-mcq-6",
    day: 1,
    type: "multiple_choice",
    title: "Trắc nghiệm tình huống: Đặt bàn ăn tối tại nhà hàng",
    contextPrompt: "Bạn gọi điện thoại tới một nhà hàng sang trọng để đặt bàn cho 4 người vào tối thứ Sáu. Câu mở đầu chuẩn phong cách lịch sự là gì?",
    audioText: "Could I make a reservation?",
    options: [
      "Could I make a reservation?",
      "Can I buy a seat right now?",
      "Do I drop by your dinner table?",
      "Make me a decision for tonight."
    ],
    correctAnswer: "Could I make a reservation?",
    explanation: {
      overview: "'Make a reservation' là cụm từ chuẩn mực khi đặt chỗ trước tại nhà hàng hoặc khách sạn.",
      ruleBreakdown: "Ngữ điệu câu hỏi Yes/No: Bắt buộc lên giọng ở cuối câu (reservation↗). Hiện tượng nối âm mượt mà giữa 'Could' và 'I': /kʊ-daɪ/.",
      keyPoints: [
        "Cấu trúc: 'Could I + V' lịch sự hơn 'Can I'.",
        "Ngữ điệu: Lên giọng cuối câu hỏi Yes/No (↗).",
        "Trọng âm từ: re-ser-VA-tion (trọng âm rơi vào âm tiết thứ 3)."
      ]
    }
  },

  // ================= DẠNG 2: LUYỆN NGHE ĐIỀN KHUYẾT (LISTENING QUIZ - BLIND AUDIO) =================
  {
    id: "q-listen-1",
    day: 2,
    type: "listening",
    title: "Luyện nghe điền khuyết: Tốc độ & Thành ngữ thời gian",
    contextPrompt: "Nghe audio (không có chữ hiển thị) và chọn cụm từ chính xác bị khuyết trong câu:",
    audioText: "When is the deadline? 1 pm. We're running short on time.",
    options: [
      "short",
      "low",
      "late",
      "out"
    ],
    correctAnswer: "short",
    explanation: {
      overview: "Từ nghe được là 'short' trong cụm 'running short on time'.",
      ruleBreakdown: "Cụm 'run short on time' có âm cuối /t/ ở 'short' nối liền với giới từ 'on'. Người bản xứ phát âm bật dứt khoát không kéo dài.",
      keyPoints: [
        "Thành ngữ: running short on time.",
        "Âm cần bóc tách: /ʃɔːt/ có âm gió /ʃ/ đầu và /t/ đuôi.",
        "Quy tắc nghe chậm 0.7x giúp phân biệt 'short' với 'shot'."
      ]
    }
  },
  {
    id: "q-listen-2",
    day: 1,
    type: "listening",
    title: "Luyện nghe điền khuyết: Động từ đi kèm giới từ",
    contextPrompt: "Nghe audio và chọn giới từ chính xác đi cùng động từ trong câu:",
    audioText: "Tom concentrated on his work.",
    options: [
      "on",
      "at",
      "in",
      "with"
    ],
    correctAnswer: "on",
    explanation: {
      overview: "Giới từ chính xác là 'on' trong cụm cố định 'concentrate on' (tập trung vào).",
      ruleBreakdown: "Quy tắc Chunking: Cụm 'concentrated on' nối âm thành /ˈkɒn.sən.treɪ.tɪ-dɒn/, đuôi -ed phát âm là /ɪd/ vì đi sau chữ 't'.",
      keyPoints: [
        "Phát âm đuôi -ed: 'concentrated' kết thúc bằng /tɪd/.",
        "Nối âm: /tɪd/ + /ɒn/ tạo thành chuỗi âm liên tục.",
        "Không được tách rời 'concentrated' và 'on'."
      ]
    }
  },
  {
    id: "q-listen-3",
    day: 4,
    type: "listening",
    title: "Luyện nghe điền khuyết: Thời gian & Âm câm",
    contextPrompt: "Nghe câu thoại trả lời về thời gian quay lại và điền từ vào chỗ trống: \"I'll be back in an ______\"",
    audioText: "When will you be back? I'll be back in an hour.",
    options: [
      "hour",
      "our",
      "house",
      "outside"
    ],
    correctAnswer: "hour",
    explanation: {
      overview: "Từ chính xác là 'hour' (/ˈaʊ.ər/) với mạo từ 'an'.",
      ruleBreakdown: "Quy tắc 7 (Trường hợp đặc biệt - Âm câm): Chữ 'h' trong 'hour' là âm câm hoàn toàn, bắt đầu bằng nguyên âm đôi /aʊ/, do đó đi kèm mạo từ 'an' -> 'an hour'.",
      keyPoints: [
        "Âm câm: chữ 'h' trong 'hour' không được phát âm.",
        "Nối âm: 'in an hour' -> /ɪn ən ˈaʊ.ər/.",
        "Tránh nhầm với 'house' (/haʊs/ có âm h và âm s đuôi)."
      ]
    }
  },
  {
    id: "q-listen-4",
    day: 6,
    type: "listening",
    title: "Luyện nghe điền khuyết: Động từ chia hóa đơn",
    contextPrompt: "Nghe đoạn hội thoại thanh toán và chọn từ còn thiếu: \"Let's ______ the check\"",
    audioText: "Let's split the check. No, it's on me.",
    options: [
      "split",
      "spend",
      "share",
      "cut"
    ],
    correctAnswer: "split",
    explanation: {
      overview: "Từ phát âm trong câu là 'split' (/splɪt/) nghĩa là chia đôi/chia đều.",
      ruleBreakdown: "Cụm phụ âm 3 âm đầu /spl/ đòi hỏi trượt nhanh từ /s/ sang /p/ sang /l/, âm cuối /t/ bật dứt khoát: /splɪt/.",
      keyPoints: [
        "Cụm thành ngữ: 'split the check' = chia đôi hóa đơn.",
        "Âm cuối: /t/ trong 'split' và /k/ trong 'check'.",
        "Không dùng 'cut the check' (nghĩa là viết séc thanh toán)."
      ]
    }
  },
  {
    id: "q-listen-5",
    day: 1,
    type: "listening",
    title: "Luyện nghe điền khuyết: Lối vào bất ngờ",
    contextPrompt: "Nghe audio và chọn giới từ mô tả cách người này lẻn vào nhà: \"He came in ______ the window\"",
    audioText: "He came in through the window.",
    options: [
      "through",
      "though",
      "thought",
      "tough"
    ],
    correctAnswer: "through",
    explanation: {
      overview: "Từ phát âm là 'through' (/θruː/) mang nghĩa 'xuyên qua, qua đường'.",
      ruleBreakdown: "Quy tắc 3 (Phụ âm khó): Phụ âm /θ/ trong 'through' yêu cầu đặt đầu lưỡi giữa hai hàm răng và thổi luồng hơi ra, nguyên âm /uː/ tròn môi kéo dài.",
      keyPoints: [
        "Phụ âm /θ/: đặt lưỡi giữa răng (khác với /t/ trong tough hay /ð/ trong though).",
        "Nối âm phía trước: 'came in' -> /keɪ-mɪn/.",
        "Nghĩa: 'through the window' = chui qua cửa sổ."
      ]
    }
  },
  {
    id: "q-listen-6",
    day: 4,
    type: "listening",
    title: "Luyện nghe điền khuyết: Ba trạng thái tiến độ",
    contextPrompt: "Nghe câu trả lời về tiến độ dự án: \"Great, I'm ______ schedule!\"",
    audioText: "How's the project coming along? Great, I'm ahead of schedule.",
    options: [
      "ahead of",
      "on",
      "behind",
      "out of"
    ],
    correctAnswer: "ahead of",
    explanation: {
      overview: "Cụm từ phát âm là 'ahead of' nghĩa là 'vượt trước tiến độ'.",
      ruleBreakdown: "Nối âm: 'ahead of' nối âm /ə-he-dəv/ với âm /d/ nối sang âm /ə/. Trọng âm từ 'schedule' nhấn vào âm tiết 1 /ˈskedʒ.uːl/.",
      keyPoints: [
        "Ahead of schedule = Sớm hơn dự kiến.",
        "On schedule = Đúng tiến độ.",
        "Behind schedule = Trễ hạn tiến độ."
      ]
    }
  },

  // ================= DẠNG 3: BẪY ÂM CUỐI & TRỌNG ÂM (PRONUNCIATION TRAP QUIZ) =================
  {
    id: "q-trap-1",
    day: 4,
    type: "pronunciation_trap",
    title: "Bẫy âm câm (Silent Letter Trap)",
    contextPrompt: "Trong các từ sau đây, từ nào có chữ cái 'h' là ÂM CÂM (hoàn toàn không được phát âm thành tiếng)?",
    audioText: "Hour, House, Horse, Hurry",
    options: [
      "Hour (/ˈaʊ.ər/)",
      "House (/haʊs/)",
      "Horse (/hɔːs/)",
      "Hurry (/ˈhɜːr.i/)"
    ],
    correctAnswer: "Hour (/ˈaʊ.ər/)",
    explanation: {
      overview: "Từ 'Hour' có âm 'h' là âm câm, bắt đầu bằng nguyên âm đôi /aʊ/. Do đó ta luôn nói 'an hour' chứ không bao giờ nói 'a hour'.",
      ruleBreakdown: "Quy tắc 7 (Trường hợp đặc biệt): Trong khi House, Horse, Hurry đều bật âm /h/ rõ ràng từ cuống họng, 'hour' (giờ giấc) là từ gốc Pháp du nhập vào tiếng Anh làm câm chữ 'h'.",
      keyPoints: [
        "Hour: /ˈaʊ.ər/ -> âm h câm, luôn đi với 'an' (an hour, half an hour).",
        "House: /haʊs/ -> âm h bật gió, kết thúc bằng âm /s/ xì.",
        "Horse: /hɔːs/ -> âm h bật gió, âm /ɔː/ dài.",
        "Hurry: /ˈhɜːr.i/ -> nhấn âm 1 HUR-ry."
      ]
    }
  },
  {
    id: "q-trap-2",
    day: 1,
    type: "pronunciation_trap",
    title: "Bẫy ngữ điệu câu (Intonation Rules)",
    contextPrompt: "Theo Quy tắc số 5 về Ngữ điệu chuẩn, câu nào sau đây BẮT BUỘC phải LÊN GIỌNG (↗) ở cuối câu?",
    audioText: "Could I make a reservation? When is the deadline? Who's in charge of deliveries? Tom concentrated on his work.",
    options: [
      "Could I make a reservation? ↗",
      "When is the deadline? ↘",
      "Who's in charge of deliveries? ↘",
      "Tom concentrated on his work. ↘"
    ],
    correctAnswer: "Could I make a reservation? ↗",
    explanation: {
      overview: "'Could I make a reservation?' là câu hỏi Yes/No nên bắt buộc phải lên giọng (rising intonation ↗) ở cuối câu.",
      ruleBreakdown: "Quy tắc 5: Câu hỏi Yes/No (bắt đầu bằng trợ động từ Do, Does, Can, Could, Are, Is...) luôn lên giọng ↗. Ngược lại, câu hỏi có từ để hỏi Wh- (When, Who, Why, What...) và câu trần thuật đều phải hạ giọng ↘.",
      keyPoints: [
        "Yes/No question: Lên giọng ở từ cuối (reservation↗, on his own↗).",
        "Wh- question: Xuống giọng dứt khoát (When is the deadline?↘).",
        "Câu trần thuật: Xuống giọng khẳng định (Tom concentrated on his work↘)."
      ]
    }
  },
  {
    id: "q-trap-3",
    day: 6,
    type: "pronunciation_trap",
    title: "Bẫy từ vựng & thành ngữ dễ nhầm: 'Pass away' vs 'See off'",
    contextPrompt: "Sự khác biệt cốt lõi giữa hai cụm động từ 'Pass away' và 'See someone off' trong thực tế giao tiếp là gì?",
    audioText: "His wife just passed away. Many friends came to see me off.",
    options: [
      "'Pass away' là qua đời / mất (nói giảm nói tránh của die); còn 'See off' là ra sân bay / nhà ga đưa tiễn ai đó.",
      "'Pass away' là đi ngang qua đường; còn 'See off' là tạm biệt khi chia tay người yêu.",
      "'Pass away' dùng cho động vật; còn 'See off' dùng cho con người.",
      "Cả hai cụm từ đều đồng nghĩa và có thể thay thế hoàn toàn cho nhau."
    ],
    correctAnswer: "'Pass away' là qua đời / mất (nói giảm nói tránh của die); còn 'See off' là ra sân bay / nhà ga đưa tiễn ai đó.",
    explanation: {
      overview: "'Pass away' là cách nói tế nhị, lịch sự chỉ việc một người qua đời. 'See off' mang nghĩa đưa tiễn một người đi xa (đi du học, công tác, du lịch).",
      ruleBreakdown: "Lỗi người học hay mắc: Tưởng 'pass away' là 'đi qua/tiễn biệt'. Khi nói về người thân qua đời (His wife just passed away), nếu dùng nhầm 'see off' sẽ gây hiểu lầm tai hại và thô lỗ.",
      keyPoints: [
        "Pass away = to die (cách nói trang trọng, đầy lòng trắc ẩn).",
        "See someone off = to accompany someone to the airport/station to say goodbye.",
        "Phát âm: 'passed away' có đuôi -ed phát âm là /t/ vì sau âm /s/."
      ]
    }
  },
  {
    id: "q-trap-4",
    day: 1,
    type: "pronunciation_trap",
    title: "Bẫy trọng âm từ 2 âm tiết trở lên (Word Stress)",
    contextPrompt: "Trong các từ vựng sau, từ nào có trọng âm chính rơi vào ÂM TIẾT THỨ HAI (âm tiết 2)?",
    audioText: "Decision, Hurry, Deadline, Manager",
    options: [
      "de-CI-sion (/dɪˈsɪʒ.ən/)",
      "HUR-ry (/ˈhɜːr.i/)",
      "DEAD-line (/ˈded.laɪn/)",
      "MAN-a-ger (/ˈmæn.ɪ.dʒər/)"
    ],
    correctAnswer: "de-CI-sion (/dɪˈsɪʒ.ən/)",
    explanation: {
      overview: "Từ 'Decision' có trọng âm rơi vào âm tiết thứ 2 (de-CI-sion). Các từ còn lại đều có trọng âm rơi vào âm tiết thứ 1.",
      ruleBreakdown: "Quy tắc 2: Từ có đuôi -sion, -tion thường có trọng âm rơi vào ngay âm tiết trước nó (de-CI-sion, re-ser-VA-tion). Âm tiết mang trọng âm cần phát âm cao hơn, to hơn và rõ nét hơn.",
      keyPoints: [
        "de-CI-sion: trọng âm âm 2 (CI), âm /ʒ/ rung nhẹ môi giữa.",
        "HUR-ry: trọng âm âm 1 (HUR).",
        "DEAD-line: trọng âm âm 1 (DEAD).",
        "MAN-a-ger: trọng âm âm 1 (MAN)."
      ]
    }
  },
  {
    id: "q-trap-5",
    day: 2,
    type: "pronunciation_trap",
    title: "Bẫy âm cuối (Ending Sounds): Từ 'alive'",
    contextPrompt: "Khi phát âm từ 'alive' trong câu 'He is still alive', khẩu hình và âm cuối /v/ phải được tạo ra như thế nào?",
    audioText: "He is still alive.",
    options: [
      "Răng cửa trên chạm nhẹ vào môi dưới, thổi luồng hơi đồng thời làm rung dây thanh quản (âm hữu thanh /v/).",
      "Hai môi mím chặt rồi bật mạnh tạo tiếng nổ không rung cổ họng.",
      "Đầu lưỡi kẹp chặt giữa hai răng và thổi gió xì /s/.",
      "Nuốt âm cuối, chỉ cần đọc là 'a-lai' là đủ hiểu."
    ],
    correctAnswer: "Răng cửa trên chạm nhẹ vào môi dưới, thổi luồng hơi đồng thời làm rung dây thanh quản (âm hữu thanh /v/).",
    explanation: {
      overview: "Âm /v/ là phụ âm răng - môi hữu thanh (voiced labiodental fricative): răng trên chạm môi dưới và rung dây thanh.",
      ruleBreakdown: "Quy tắc 4 (Không bỏ âm cuối): Nếu bỏ âm /v/ mà đọc thành 'a-lai' hoặc thổi không rung thành 'a-life', người bản xứ sẽ nghe thành từ 'a life' (một cuộc đời) thay vì tính từ 'alive' (còn sống).",
      keyPoints: [
        "Khẩu hình: Răng trên chạm môi dưới.",
        "Dây thanh: Bắt buộc phải rung (voiced /v/).",
        "Trọng âm: 'a-LIVE' nhấn âm tiết thứ hai."
      ]
    }
  },
  {
    id: "q-trap-6",
    day: 6,
    type: "pronunciation_trap",
    title: "Bẫy âm đuôi -ed: 'concentrated' vs 'passed'",
    contextPrompt: "Đuôi '-ed' trong từ 'concentrated' và trong từ 'passed' được phát âm lần lượt là những âm nào?",
    audioText: "Tom concentrated on his work. His wife just passed away.",
    options: [
      "'concentrated' phát âm là /ɪd/; 'passed' phát âm là /t/.",
      "'concentrated' phát âm là /d/; 'passed' phát âm là /ɪd/.",
      "Cả hai từ đều phát âm đuôi -ed là /ed/ giống chữ viết.",
      "'concentrated' phát âm là /t/; 'passed' phát âm là /d/."
    ],
    correctAnswer: "'concentrated' phát âm là /ɪd/; 'passed' phát âm là /t/.",
    explanation: {
      overview: "Đuôi -ed có 3 cách đọc: /ɪd/ sau âm /t, d/; /t/ sau âm vô thanh; /d/ sau âm hữu thanh.",
      ruleBreakdown: "Từ 'concentrate' tận cùng là âm /t/ nên khi thêm -ed đọc thành /ˈkɒn.sən.treɪ.tɪd/ (/ɪd/). Từ 'pass' tận cùng là âm gió vô thanh /s/ nên khi thêm -ed đọc thành /pɑːst/ (bật âm /t/).",
      keyPoints: [
        "-ed đọc là /ɪd/ khi động từ kết thúc bằng /t/ hoặc /d/.",
        "-ed đọc là /t/ khi động từ kết thúc bằng âm vô thanh (/s, k, p, f, ʃ, tʃ/).",
        "-ed đọc là /d/ cho các trường hợp nguyên âm và phụ âm hữu thanh còn lại."
      ]
    }
  },

  // ================= DẠNG 4: GHÉP CÂU HOÀN CHỈNH (SENTENCE UNSCRAMBLE) =================
  {
    id: "q-unscramble-1",
    day: 1,
    type: "unscramble",
    title: "Ghép câu hoàn chỉnh: Khả năng chi trả chiếc xe",
    contextPrompt: "Nhấp vào các từ để sắp xếp lại thành câu tiếng Anh hoàn chỉnh, đúng ngữ pháp và nhịp ngắt nghỉ:",
    audioText: "I can't afford to buy such an expensive car.",
    unscrambleWords: ["expensive", "buy", "can't", "such", "afford", "I", "to", "an", "car"],
    correctAnswer: ["I", "can't", "afford", "to", "buy", "such", "an", "expensive", "car"],
    chunkedSolution: "I can't afford / to buy / such an expensive car ↘",
    explanation: {
      overview: "Câu đúng: 'I can't afford to buy such an expensive car.' (Tôi không đủ tiền để mua chiếc xe đắt đến như vậy).",
      ruleBreakdown: "Theo Quy tắc số 6 (Chunking): Câu chia làm 3 cụm tự nhiên: 'I can't afford / to buy / such an expensive car ↘'. Trọng âm từ rơi vào 'af-FORD' và 'ex-PEN-sive'. Bật rõ âm /t/ ở 'can't' và /d/ ở 'afford'.",
      keyPoints: [
        "Cấu trúc: 'afford to + V' = đủ khả năng tài chính để làm gì.",
        "Cấu trúc nhấn mạnh: 'such + a/an + tính từ + danh từ'.",
        "Ngắt nghỉ: Đúng 3 nhịp ngắt không bị ngắt vụn vặt."
      ]
    }
  },
  {
    id: "q-unscramble-2",
    day: 2,
    type: "unscramble",
    title: "Ghép câu hoàn chỉnh: Giữ máy điện thoại một lát",
    contextPrompt: "Nhấp vào các thẻ từ để ghép thành câu xin phép giữ máy điện thoại đúng chuẩn lịch sự:",
    audioText: "Can I put you on hold for a minute?",
    unscrambleWords: ["on", "put", "a", "Can", "minute", "I", "hold", "for", "you"],
    correctAnswer: ["Can", "I", "put", "you", "on", "hold", "for", "a", "minute"],
    chunkedSolution: "Can I put you on hold / for a minute? ↗",
    explanation: {
      overview: "Câu đúng: 'Can I put you on hold for a minute?' (Tôi có thể xin phép giữ máy một lát được không?).",
      ruleBreakdown: "Không bao giờ tách rời cụm 'put you on hold'. Đây là câu hỏi Yes/No nên lên giọng ở cuối câu (minute↗). Nối âm nhẹ giữa 'for' và 'a' (/fɔːr-ə/).",
      keyPoints: [
        "Cụm từ: 'put [someone] on hold'.",
        "Trợ động từ 'Can I' đảo lên đầu câu.",
        "Ngữ điệu: Lên giọng ở từ cuối (minute↗)."
      ]
    }
  },
  {
    id: "q-unscramble-3",
    day: 1,
    type: "unscramble",
    title: "Ghép câu hoàn chỉnh: Đặt bàn ăn tối trước",
    contextPrompt: "Sắp xếp các từ để tạo thành câu hỏi lịch sự khi muốn đặt chỗ trước tại nhà hàng:",
    audioText: "Could I make a reservation?",
    unscrambleWords: ["reservation", "Could", "a", "make", "I"],
    correctAnswer: ["Could", "I", "make", "a", "reservation"],
    chunkedSolution: "Could I make a reservation? ↗",
    explanation: {
      overview: "Câu đúng: 'Could I make a reservation?' (Tôi có thể đặt chỗ trước được không?).",
      ruleBreakdown: "Nối âm: 'Could I' nối thành /kʊ-daɪ/. Trọng âm từ: 're-ser-VA-tion'. Ngữ điệu lên giọng cuối câu hỏi Yes/No (↗).",
      keyPoints: [
        "Cụm collocation: 'make a reservation' (không dùng do a reservation).",
        "Nối âm phụ âm sang nguyên âm: Could + I -> /kʊ-daɪ/.",
        "Ngữ điệu: Rising intonation ↗."
      ]
    }
  },
  {
    id: "q-unscramble-4",
    day: 3,
    type: "unscramble",
    title: "Ghép câu hoàn chỉnh: Bạn bè đến tiễn ở sân bay",
    contextPrompt: "Sắp xếp lại các từ để thành câu: 'Rất nhiều người bạn đã đến để đưa tiễn tôi.'",
    audioText: "Many friends came to see me off.",
    unscrambleWords: ["came", "Many", "me", "see", "to", "off", "friends"],
    correctAnswer: ["Many", "friends", "came", "to", "see", "me", "off"],
    chunkedSolution: "Many friends / came to see me off ↘",
    explanation: {
      overview: "Câu đúng: 'Many friends came to see me off.' (Nhiều người bạn đã đến để tiễn tôi).",
      ruleBreakdown: "Cụm phrasal verb 'see someone off' không được ngắt đôi. Âm cuối /dz/ ở 'friends' phát âm rung rõ nét. Xuống giọng ở từ cuối 'off↘'.",
      keyPoints: [
        "Phrasal verb: 'see [someone] off' = đưa tiễn.",
        "Âm cuối: /dz/ trong friends.",
        "Phân biệt rõ với 'pass away' (qua đời)."
      ]
    }
  },
  {
    id: "q-unscramble-5",
    day: 6,
    type: "unscramble",
    title: "Ghép câu hoàn chỉnh: Tôi bị kẹt xe cả tiếng",
    contextPrompt: "Sắp xếp lại các từ để tạo thành câu trần thuật giải thích lý do bị trễ: 'Tôi đã bị kẹt xe suốt một tiếng đồng hồ.'",
    audioText: "I was stuck in traffic for an hour.",
    unscrambleWords: ["an", "stuck", "hour", "I", "in", "for", "was", "traffic"],
    correctAnswer: ["I", "was", "stuck", "in", "traffic", "for", "an", "hour"],
    chunkedSolution: "I was stuck in traffic / for an hour ↘",
    explanation: {
      overview: "Câu đúng: 'I was stuck in traffic for an hour.'",
      ruleBreakdown: "Cụm 'stuck in traffic' có âm /k/ ở 'stuck' nối sang 'in' -> /stʌ-kɪn/. 'Hour' có âm 'h' là âm câm nên đi với mạo từ 'an'.",
      keyPoints: [
        "Thành ngữ: 'be stuck in traffic' = bị kẹt xe.",
        "Âm câm: 'an hour' (/ən ˈaʊ.ər/).",
        "Âm cuối: /k/ ở 'traffic' và 'stuck'."
      ]
    }
  },
  {
    id: "q-unscramble-6",
    day: 5,
    type: "unscramble",
    title: "Ghép câu hoàn chỉnh: Giao tiếp chia hóa đơn bữa ăn",
    contextPrompt: "Sắp xếp các từ để tạo thành lời đề nghị chia tiền bữa ăn: 'Hãy cùng cưa đôi hóa đơn nào!'",
    audioText: "Let's split the check.",
    unscrambleWords: ["split", "the", "Let's", "check"],
    correctAnswer: ["Let's", "split", "the", "check"],
    chunkedSolution: "Let's split the check ↘",
    explanation: {
      overview: "Câu đúng: 'Let's split the check.' (Hãy cưa đôi hóa đơn nhé).",
      ruleBreakdown: "Bật rõ âm đuôi /ts/ ở 'Let's', âm /t/ ở 'split' và âm /k/ ở 'check'. Ngữ điệu câu rủ rê dứt khoát hạ giọng cuối câu.",
      keyPoints: [
        "Let's = Let us (đề nghị cùng làm gì).",
        "Split the check = Chia đều tiền bữa ăn.",
        "Âm cuối: /ts/, /t/, /k/ tuyệt đối không bỏ âm."
      ]
    }
  }
];
