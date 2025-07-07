import { useState, useEffect } from "react";
import axios from "axios";

const units = {
  length: ["millimeter", "centimeter", "meter", "kilometer", "inch", "foot", "yard", "mile"],
  weight: ["milligram", "gram", "kilogram", "ounce", "pound"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
};

function ConvertPage({ category }) {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  // 🔁 Сброс состояния при смене категории
  useEffect(() => {
    setValue("");
    setFromUnit("");
    setToUnit("");
    setResult(null);
    setError(null);
  }, [category]);

  const handleConvert = async () => {
    if (!value || !fromUnit || !toUnit) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/${category}`, {
        params: { value, from_unit: fromUnit, to_unit: toUnit },
      });

      if (res.data.result !== undefined || res.data.Result !== undefined) {
        setResult(res.data.result ?? res.data.Result);
        setError(null);
      } else {
        setError(res.data.error || res.data.Error || "Conversion failed");
      }
    } catch {
      setError("Connection failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <label className="block font-semibold mb-2">
        Enter the {category} to convert:
      </label>
      <input
        type="number"
        placeholder="Enter a value"
        className="w-full p-2 border border-black rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* From dropdown */}
      <div className="mb-4 relative">
        <button
          onClick={() => setShowFrom(!showFrom)}
          className="w-full p-2 border border-black rounded bg-white text-left flex justify-between items-center"
        >
          {fromUnit || "Select unit"}
          <span className="text-gray-400">▼</span>
        </button>
        {showFrom && (
          <ul className="absolute w-full z-10 bg-white border mt-1 rounded max-h-40 overflow-y-auto transition-all duration-200 shadow">
            {units[category].map((unit) => (
              <li
                key={unit}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setFromUnit(unit);
                  setShowFrom(false);
                }}
              >
                {unit}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* To dropdown */}
      <div className="mb-4 relative">
        <button
          onClick={() => setShowTo(!showTo)}
          className="w-full p-2 border border-black rounded bg-white text-left flex justify-between items-center"
        >
          {toUnit || "Select unit"}
          <span className="text-gray-400">▼</span>
        </button>
        {showTo && (
          <ul className="absolute w-full z-10 bg-white border mt-1 rounded max-h-40 overflow-y-auto transition-all duration-200 shadow">
            {units[category].map((unit) => (
              <li
                key={unit}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setToUnit(unit);
                  setShowTo(false);
                }}
              >
                {unit}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleConvert}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Convert
      </button>

      {result !== null && (
        <div className="mt-4 text-green-700 font-semibold text-lg">
          Result: {result}
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600 font-medium">Error: {error}</div>
      )}
    </div>
  );
}

export default ConvertPage;