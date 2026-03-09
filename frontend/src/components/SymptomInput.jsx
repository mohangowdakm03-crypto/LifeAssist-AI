"use client";

import { useState } from "react";

export default function SymptomInput({ onSubmit, loading, onEmergencyClick, voice }) {
  const [query, setQuery] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!query.trim() || loading) {
      return;
    }

    onSubmit(query.trim());
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-med-slate">Describe Symptoms</h2>
        <button
          type="button"
          onClick={onEmergencyClick}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Emergency
        </button>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <textarea
          className="min-h-28 w-full rounded-xl border border-blue-100 bg-med-sky/30 p-3 text-sm outline-none focus:border-med-blue"
          placeholder='Try: "I have fever and headache" or "How to treat burn?"'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-med-blue px-5 py-2 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Symptoms"}
          </button>

          {voice.isSupported ? (
            <button
              type="button"
              onClick={voice.startListening}
              className="rounded-lg border border-med-green px-4 py-2 text-sm font-semibold text-med-green hover:bg-med-green hover:text-white"
            >
              {voice.isListening ? "Listening..." : "Voice Mode"}
            </button>
          ) : (
            <span className="text-xs text-med-slate/80">Voice mode unavailable in this browser.</span>
          )}

          {voice.transcript ? <span className="text-xs text-med-slate">Heard: {voice.transcript}</span> : null}
        </div>
      </form>
    </section>
  );
}
