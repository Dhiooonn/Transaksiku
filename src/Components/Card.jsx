export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all ${className}`}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}
