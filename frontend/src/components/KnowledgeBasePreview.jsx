"use client";

export default function KnowledgeBasePreview() {
  const conditions = ["fever", "cold", "headache", "burn", "minor injury", "food poisoning", "acidity", "cough"];

  return (
    <section className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-xl font-semibold">Home Remedy Knowledge Base</h2>
      <p className="mt-2 text-sm text-med-slate">Structured support for common conditions and safe OTC guidance.</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {conditions.map((condition) => (
          <span key={condition} className="rounded-lg bg-med-sky/40 px-3 py-2 text-center text-sm font-medium capitalize">
            {condition}
          </span>
        ))}
      </div>
    </section>
  );
}
