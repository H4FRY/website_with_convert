import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConvertPage from "./ConvertPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        {/* Центрированный заголовок */}
        <h1 className="text-4xl font-bold mb-10 text-center">Unit Converter</h1>

        {/* Кнопки выбора категории */}
        <div className="flex gap-6 justify-center mb-12">
          <Link
            to="/length"
            className="w-36 text-center px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            Length
          </Link>
          <Link
            to="/weight"
            className="w-36 text-center px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            Weight
          </Link>
          <Link
            to="/temperature"
            className="w-36 text-center px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            Temperature
          </Link>
        </div>

        {/* Страница конвертации */}
        <div className="w-full max-w-xl px-4">
          <Routes>
            <Route path="/length" element={<ConvertPage category="length" />} />
            <Route path="/weight" element={<ConvertPage category="weight" />} />
            <Route path="/temperature" element={<ConvertPage category="temperature" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;