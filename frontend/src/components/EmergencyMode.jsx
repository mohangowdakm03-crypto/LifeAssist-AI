"use client";

import CPRTimer from "./CPRTimer";

export default function EmergencyMode({ cprGuide, onClose }) {
  if (!cprGuide) {
    return null;
  }

  return (
    <section className="rounded-2xl border-2 border-red-300 bg-red-100 p-5 shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-red-700">Emergency Mode</p>
          <h2 className="text-2xl font-bold text-red-900">Call emergency services immediately.</h2>
          <p className="mt-1 text-sm text-red-800">Follow CPR steps below while waiting for trained help.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-red-300 px-3 py-1 text-sm font-semibold text-red-800"
        >
          Exit
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {cprGuide.steps?.map((step) => (
          <article key={step.step} className="rounded-xl bg-white p-3">
            <img src={step.image} alt={step.title} className="h-32 w-full rounded-lg object-cover" />
            <p className="mt-2 text-sm font-semibold text-red-900">
              {step.step}. {step.title}
            </p>
            <p className="text-sm text-red-800">{step.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-4">
        <CPRTimer bpm={110} />
      </div>
    </section>
  );
}
