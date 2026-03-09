"use client";

import { useCallback, useEffect, useState } from "react";
import DisclaimerBanner from "components/DisclaimerBanner";
import EmergencyMode from "components/EmergencyMode";
import KnowledgeBasePreview from "components/KnowledgeBasePreview";
import NearbyHelp from "components/NearbyHelp";
import ResponseSections from "components/ResponseSections";
import RoutineAssistant from "components/RoutineAssistant";
import SymptomInput from "components/SymptomInput";
import { getCprGuide, analyzeSymptoms } from "lib/api";
import { useVoiceEmergency } from "hooks/useVoiceEmergency";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [cprGuide, setCprGuide] = useState(null);

  const triggerEmergency = useCallback(async () => {
    setEmergencyMode(true);
    const guide = await getCprGuide();
    setCprGuide(guide);
  }, []);

  const voice = useVoiceEmergency(async () => {
    await triggerEmergency();
  });

  useEffect(() => {
    if (response?.emergency) {
      triggerEmergency();
    }
  }, [response, triggerEmergency]);

  const submitSymptoms = async (query) => {
    setLoading(true);
    setError("");

    try {
      const result = await analyzeSymptoms(query);
      setResponse(result);
    } catch (_error) {
      setError("Unable to analyze symptoms now. Please retry in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
      <header className="rounded-2xl bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-med-blue">LifeAssist AI</p>
        <h1 className="mt-2 text-3xl font-bold text-med-slate sm:text-4xl">AI-powered health guidance and emergency support</h1>
        <p className="mt-2 max-w-3xl text-sm text-med-slate/90">
          Get first-aid oriented informational guidance for symptoms, OTC medicine references, daily routines, and nearby clinics/pharmacies.
        </p>
      </header>

      <DisclaimerBanner emergency={emergencyMode} />

      <SymptomInput onSubmit={submitSymptoms} loading={loading} onEmergencyClick={triggerEmergency} voice={voice} />

      {error ? <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      {emergencyMode ? <EmergencyMode cprGuide={cprGuide} onClose={() => setEmergencyMode(false)} /> : null}

      <ResponseSections response={response} />

      <NearbyHelp />

      <RoutineAssistant />

      <KnowledgeBasePreview />
    </main>
  );
}
