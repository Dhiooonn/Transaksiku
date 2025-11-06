export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const base = "rounded-lg font-medium transition focus:outline-none focus:ring-2 text-sm";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300 px-4 py-2",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-300 px-4 py-2",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-red-300 px-4 py-2",
    outline:
      "border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-200 px-4 py-2",
    edit:
      "bg-yellow-400 hover:bg-yellow-500 text-white focus:ring-yellow-200 px-4 py-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
