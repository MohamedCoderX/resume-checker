import React, { useState } from "react";
import { RiMenuFoldLine } from "react-icons/ri";
import { PiFileSqlDuotone, PiPencilLineFill } from "react-icons/pi";
import { AiOutlineClear } from "react-icons/ai";
import { LuPartyPopper } from "react-icons/lu";
import { Play } from "lucide-react";
import Table from "../Learn/Table";
import axios from "axios";

const LastContent = ({ state }) => {
  const [showExpected, setShowExpected] = useState(false);
  const [query, setQuery] = useState("");
  const [ans, setAns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runQuery = async () => {
    if (!query.trim()) return alert("Please write a query first!");

    setLoading(true);
    setError("");
    setAns([]);

    try {
      const response = await axios.post(
        "https://fqrfdbfdo8.execute-api.us-east-1.amazonaws.com/execute",
        { query }
      );
      setAns(response.data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to run query. Please check your syntax.");
    } finally {
      setLoading(false);
    }
  };

  const clearQuery = () => {
    setQuery("");
    setAns([]);
    setError("");
    setShowExpected(false);
  };

  const renderTable = () => {
    if (!ans || ans.length === 0) {
      return (
        <div className="mt-4 bg-gray-50 text-gray-500 text-center rounded-xl py-12 text-base border border-gray-200">
          {error || "Your query result will appear here..."}
        </div>
      );
    }

    const columns = Object.keys(ans[0]);
    return (
      <div className="mt-4 overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-gradient-to-r from-indigo-100 to-pink-100 text-gray-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 border border-gray-200 text-left font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ans.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 text-gray-700">
                    {String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="mt-10 space-y-8">
      {/* 🧩 Complete Query */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-indigo-600 font-semibold text-2xl mb-4">
          Complete Query
        </h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
          <pre style={{ whiteSpace: "pre-wrap" }}>{state?.codeComQuery}</pre>
        </div>
      </div>

      {/* 🧠 Practice Area */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-2xl mb-2">Now You Try!</h2>
        <p className="text-gray-500 mb-4">
          Practice the query below and run it to see real-time results.
        </p>

        {/* Editor Header */}
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl text-lg shadow">
          <PiFileSqlDuotone size={26} /> Query Editor
        </div>

        {/* Hints */}
        <div className="mt-4 bg-green-50 rounded-xl border border-green-200">
          {state?.multicont?.map((info, idx) => (
            <div
              key={idx}
              className="text-gray-700 text-base p-4 border-b border-green-100 last:border-none"
            >
              <div className="flex items-center gap-2 mb-2">
                <PiPencilLineFill className="text-green-600" />
                <h3 className="font-semibold text-gray-800">Query Hint</h3>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {[info.word1, info.word2, info.word3, info.word4, info.word5]
                  .filter(Boolean)
                  .map((word, i) => (
                    <li key={i}>{word}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          className="mt-5 w-full p-5 h-44 border border-gray-300 rounded-xl font-mono text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          placeholder={state?.codeComQuery1}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex flex-wrap justify-between gap-3 mt-5">
          <button
            onClick={clearQuery}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-blue-700 border border-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all"
          >
            <AiOutlineClear /> Clear Query
          </button>

          <button
            onClick={runQuery}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all"
          >
            <Play />
            {loading ? "Running..." : "Run Query"}
          </button>

          <button
            onClick={() => setShowExpected(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
          >
            <RiMenuFoldLine className="rotate-180" /> Expected Output
          </button>
        </div>

        {/* Query Result */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2 text-white bg-green-600 py-3 rounded-xl text-lg font-semibold shadow">
            <PiFileSqlDuotone size={26} /> Query Result
          </div>
          {loading ? (
            <p className="text-center text-blue-600 mt-4 font-medium">
              Running query...
            </p>
          ) : (
            renderTable()
          )}
        </div>

        {/* Expected Output */}
        {showExpected && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Expected Output
            </h3>
            {state?.ExpOutput && <Table content={state.ExpOutput} />}
          </div>
        )}

        {/* Last Table */}
        {state?.Lasttable && (
          <div className="mt-10">
            <Table content={state.Lasttable} />
          </div>
        )}

        {/* Completion Section */}
        <div className="mt-8 border-2 border-dashed border-gray-300 bg-pink-50 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🎉 Finished Practice
          </h2>
          <p className="text-gray-600 mb-5">
            Mark this question as complete to track progress and earn badges!
          </p>

          <button className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold text-lg py-3 px-6 rounded-xl hover:bg-green-700 transition-all mx-auto shadow">
            <LuPartyPopper className="text-2xl" />
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastContent;
