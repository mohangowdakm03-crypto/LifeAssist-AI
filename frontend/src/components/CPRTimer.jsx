"use client";

import { useEffect, useMemo, useState } from "react";

export default function CPRTimer({ bpm = 110 }) {
  const intervalMs = useMemo(() => Math.round(60000 / bpm), [bpm]);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    const id = setInterval(() => {
      setCount((value) => value + 1);
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs, running]);

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-800">CPR Rhythm Timer</p>
      <div className="mt-3 flex items-center gap-4">
        <div className={`h-14 w-14 rounded-full bg-red-600 ${running ? "animate-pulseStrong" : ""}`} />
        <div>
          <p className="text-lg font-bold text-red-900">{count} compressions</p>
          <p className="text-sm text-red-800">Target: {bpm} compressions/min</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setRunning((value) => !value)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setCount(0);
          }}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
