export default function SectionCard({ title, children }) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-soft sm:p-5">
      <h3 className="text-base font-semibold text-med-slate">{title}</h3>
      <div className="mt-3 text-sm text-med-slate">{children}</div>
    </article>
  );
}
