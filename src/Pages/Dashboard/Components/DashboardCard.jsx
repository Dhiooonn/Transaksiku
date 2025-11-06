import { useEffect, useState } from "react";

export default function Card({ title, value, color = "blue" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const colorClasses = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <div
      className={`transition-all duration-500 ease-out transform rounded-2xl shadow-sm border border-gray-100 bg-white hover:shadow-md hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="p-5 flex flex-col justify-between min-h-[90px]">
        <p className="text-gray-700 font-semibold">{title}</p>
        <h3
          className={`text-xl font-bold ${colorClasses[color]} rounded-lg mt-2 px-2 py-1 inline-block`}
        >
          {value || "-"}
        </h3>
      </div>
    </div>
  );
}
