export default function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  textarea = false,
  error = "",
  className = "",
}) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none ${
            error ? "border-red-400" : "border-gray-300"
          } ${className}`}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none ${
            error ? "border-red-400" : "border-gray-300"
          } ${className}`}
        />
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
