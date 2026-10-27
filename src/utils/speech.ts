/**
 * Browser-based Speech Playback and Speech Recognition Utility
 * Uses Web Speech API (window.speechSynthesis & SpeechRecognition / webkitSpeechRecognition)
 * with support for English & Arabic voices, rate/pitch modulation, and seamless fallback
 * to server-side TTS if browser voices are unavailable.
 */

let activeUtterance: SpeechSynthesisUtterance | null = null;

export interface SpeechOptions {
  lang?: 'en' | 'ar';
  rate?: number; // 0.8 - 1.2
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

/**
 * Plays speech using the browser's native SpeechSynthesis voices.
 */
export async function playBrowserSpeech(
  text: string,
  options: SpeechOptions = {}
): Promise<boolean> {
  if (!text || typeof window === 'undefined') return false;

  const targetLang = options.lang === 'ar' ? 'ar-SA' : 'en-US';
  const rate = options.rate ?? (options.lang === 'ar' ? 0.95 : 0.9);

  if ('speechSynthesis' in window) {
    stopSpeech();

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLang;
      utterance.rate = rate;
      utterance.pitch = options.pitch ?? 1.0;

      // Select suitable voice
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = options.lang === 'ar' ? 'ar' : 'en';
        const matchedVoice =
          voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix)) ||
          voices.find((v) => v.lang.includes(langPrefix.toUpperCase()));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      utterance.onstart = () => {
        options.onStart?.();
      };

      utterance.onend = () => {
        activeUtterance = null;
        options.onEnd?.();
        resolve(true);
      };

      utterance.onerror = (e) => {
        console.warn('Browser SpeechSynthesis error, trying server fallback:', e);
        activeUtterance = null;
        // Fallback to server TTS
        playServerTts(text, options).then(resolve);
      };

      activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }

  // If speechSynthesis not in window, use server-side TTS directly
  return playServerTts(text, options);
}

/**
 * Fallback to server-side Gemini TTS if browser synthesis is disabled or voice is missing.
 */
async function playServerTts(text: string, options: SpeechOptions): Promise<boolean> {
  try {
    options.onStart?.();
    const res = await fetch('/api/ai/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        speaker: options.lang === 'ar' ? 'Kore' : 'Puck',
      }),
    });
    if (!res.ok) throw new Error(`Server TTS error ${res.status}`);
    const data = await res.json();
    if (data.audioBase64) {
      const audio = new Audio(`data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`);
      audio.onended = () => options.onEnd?.();
      audio.onerror = (err) => {
        options.onError?.(err);
        options.onEnd?.();
      };
      await audio.play();
      return true;
    }
  } catch (err) {
    console.error('Audio playback fallback error:', err);
    options.onError?.(err);
    options.onEnd?.();
  }
  return false;
}

/**
 * Starts speech recognition from user's microphone for oral speaking practice.
 */
export function startSpeechRecognition({
  lang = 'en-US',
  onResult,
  onError,
  onEnd,
}: {
  lang?: string;
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}): { stop: () => void } | null {
  if (typeof window === 'undefined') return null;

  const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRec) {
    onError?.('Speech recognition is not supported in this browser.');
    return null;
  }

  try {
    const recognition = new SpeechRec();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript || '';
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      onError?.(event.error || 'Speech recognition error');
    };

    recognition.onend = () => {
      onEnd?.();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      },
    };
  } catch (err: any) {
    onError?.(err?.message || 'Failed to start microphone');
    return null;
  }
}

/**
 * Calculates similarity percentage between spoken text and target teacher phrase.
 */
export function calculateSimilarity(target: string, spoken: string): number {
  const cleanTarget = target.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  if (!cleanTarget || !cleanSpoken) return 0;
  if (cleanTarget === cleanSpoken) return 100;

  const targetWords = cleanTarget.split(/\s+/);
  const spokenWords = cleanSpoken.split(/\s+/);

  let matches = 0;
  for (const word of targetWords) {
    if (spokenWords.includes(word)) {
      matches++;
    }
  }

  const score = Math.round((matches / Math.max(targetWords.length, spokenWords.length)) * 100);
  return Math.min(100, Math.max(0, score));
}
