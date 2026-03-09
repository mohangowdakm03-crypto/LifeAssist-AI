export default function DisclaimerBanner({ emergency = false }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm shadow-soft ${
        emergency
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-blue-100 bg-white text-med-slate"
      }`}
    >
      <p className="font-semibold">This system provides informational guidance only and is not a substitute for professional medical advice.</p>
      {emergency ? <p className="mt-1 font-bold">Call emergency services immediately.</p> : null}
    </div>
  );
}
