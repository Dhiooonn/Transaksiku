import { useEffect } from "react";

export default function Modal({ show, onClose, title, children, width = "520px" }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-xl border border-gray-100 w-[90%] md:w-max-w-full animate-scaleUp relative overflow-hidden"
        style={{ maxWidth: width }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/40">
          <h2 className="text-lg md:text-xl font-semibold text-blue-600">
            {title}
          </h2>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-xl font-bold leading-none
                       flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
