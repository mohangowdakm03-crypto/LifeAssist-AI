import SectionCard from "./SectionCard";

function List({ items }) {
  return (
    <ul className="space-y-2">
      {items?.map((item) => (
        <li key={item} className="rounded-lg bg-med-sky/40 px-3 py-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

function MedicineList({ medicines }) {
  if (!medicines?.length) {
    return <p>No OTC medicines suggested for this query.</p>;
  }

  return (
    <div className="space-y-3">
      {medicines.map((med) => (
        <div key={med.name} className="rounded-xl border border-blue-100 p-3">
          <p className="font-semibold">{med.name}</p>
          <p className="mt-1 text-sm">Usage: {med.usage}</p>
          <p className="text-sm">Safe dosage: {med.safeDosage}</p>
          <p className="text-sm">Warnings: {(med.warnings || []).join(", ") || "None listed"}</p>
          <p className="text-sm">Avoid when: {(med.avoidWhen || []).join(", ") || "General caution"}</p>
        </div>
      ))}
    </div>
  );
}

export default function ResponseSections({ response }) {
  if (!response) {
    return null;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <SectionCard title="Possible Causes">
        <List items={response.sections?.possibleCauses || []} />
      </SectionCard>

      <SectionCard title="Home Remedies">
        <List items={response.sections?.homeRemedies || []} />
      </SectionCard>

      <SectionCard title="Over-the-counter Medicines">
        <MedicineList medicines={response.sections?.otcMedicines || []} />
      </SectionCard>

      <SectionCard title="When to See a Doctor">
        <List items={response.sections?.whenToSeeDoctor || []} />
      </SectionCard>

      <SectionCard title="Emergency Warning Signs">
        <List items={response.sections?.emergencyWarningSigns || []} />
      </SectionCard>

      <SectionCard title="Matched Conditions">
        <List items={response.matchedConditions || ["No direct condition match"]} />
      </SectionCard>
    </section>
  );
}
