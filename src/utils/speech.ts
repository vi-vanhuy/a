/**
 * Web Speech API Utility for Pronunciation & Shadowing
 */

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.isSupported = true;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize natural English voices (US, GB)
    const enVoices = voices.filter(
      (v) => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB") || v.lang.startsWith("en")
    );

    // Look for Google US English or Natural/Premium voices
    this.selectedVoice =
      enVoices.find((v) => v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha")) ||
      enVoices[0] ||
      voices[0] ||
      null;
  }

  public speak(
    text: string,
    rate: number = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    if (!this.isSupported || !this.synth) {
      console.warn("Speech Synthesis is not supported in this environment.");
      return;
    }

    // Stop current speech
    this.synth.cancel();

    // Clean text of phonetic markers or chunking arrows for clean pronunciation
    const cleanText = text
      .replace(/[↗↘]/g, "")
      .replace(/[\/•—]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    utterance.rate = Math.max(0.5, Math.min(rate, 2.0));
    utterance.pitch = 1.0;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      // Ignore canceled errors from calling cancel()
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.warn("Speech error:", e);
        onError?.(e);
      }
      onEnd?.();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public getSupported(): boolean {
    return this.isSupported;
  }
}

export const speechService = new SpeechService();
