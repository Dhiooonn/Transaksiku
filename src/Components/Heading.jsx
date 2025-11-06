export default function Heading({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
      {subtitle && (
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
}
