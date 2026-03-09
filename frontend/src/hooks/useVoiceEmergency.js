"use client";

import { useEffect, useRef, useState } from "react";

const emergencyTerms = ["collapsed", "not breathing", "heart attack", "unconscious", "help", "cpr"];

export function useVoiceEmergency(onDetected) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const spokenText = event.results?.[0]?.[0]?.transcript?.toLowerCase() || "";
      setTranscript(spokenText);

      if (emergencyTerms.some((word) => spokenText.includes(word))) {
        onDetected(spokenText);
      }
    };

    recognitionRef.current = recognition;
  }, [onDetected]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    isSupported
  };
}
