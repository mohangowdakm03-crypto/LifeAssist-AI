"use client";

import { useState } from "react";
import { generateRoutine } from "lib/api";

const sections = [
  ["morningRoutine", "Morning Routine"],
  ["exercise", "Exercise"],
  ["hydration", "Hydration"],
  ["sleepSchedule", "Sleep Schedule"],
  ["dietSuggestions", "Diet Suggestions"]
];

export default function RoutineAssistant() {
  const [loading, setLoading] = useState(false);
  const [requestText, setRequestText] = useState("Create healthy routine");
  const [routine, setRoutine] = useState(null);

  const buildRoutine = async () => {
    setLoading(true);
    try {
      const data = await generateRoutine(requestText);
      setRoutine(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-xl font-semibold">Daily Health Routine Assistant</h2>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          className="w-full rounded-lg border border-blue-100 px-3 py-2 text-sm"
          value={requestText}
          onChange={(event) => setRequestText(event.target.value)}
        />
        <button
          type="button"
          onClick={buildRoutine}
          disabled={loading}
          className="rounded-lg bg-med-blue px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {routine ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {sections.map(([key, title]) => (
            <article key={key} className="rounded-xl border border-blue-100 p-3">
              <p className="font-semibold">{title}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {(routine[key] || []).map((item) => (
                  <li key={item} className="rounded bg-med-sky/40 px-2 py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
