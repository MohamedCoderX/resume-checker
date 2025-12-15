import React, { useState } from "react";
import axios from "axios";
import {
  Menu,
  Database,
  Filter,
  SignalHigh,
  GitBranch,
  Code2,
  SortDesc,
  Play,
  Paintbrush,
  FileChartColumnIncreasing,
} from "lucide-react";

export default function Playground() {
  const [query, setQuery] = useState("");
  const [ans, setAns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text");
    setQuery((prev) => prev + " " + text);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleInsert = (text) => setQuery((prev) => prev + " " + text);

  const sections = [
    { title: "Select", icon: <Menu size={16} />, items: ["SELECT", "DISTINCT", "AS", "*"] },
    { title: "From", icon: <Database size={16} />, items: ["FROM"] },
    { title: "Joins", icon: <GitBranch size={16} />, items: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON"] },
    { title: "Where", icon: <Filter size={16} />, items: ["WHERE", "AND", "OR", "NOT", "IN", "LIKE", "BETWEEN"] },
    { title: "Aggregation", icon: <SignalHigh size={16} />, items: ["COUNT()", "SUM()", "AVG()", "MIN()", "MAX()", "GROUP BY", "HAVING"] },
    { title: "Logic", icon: <Code2 size={16} />, items: ["CASE WHEN", "THEN", "ELSE", "END"] },
    { title: "Ordering", icon: <SortDesc size={16} />, items: ["ORDER BY", "DESC", "ASC", "LIMIT"] },
  ];

  const employees = [
    "id INTEGER",
    "name VARCHAR",
    "department VARCHAR",
    "position VARCHAR",
    "salary INTEGER",
    "join_date DATE",
    "city VARCHAR",
    "manager_id INTEGER",
  ];

  const orders = [
    "order_id INTEGER",
    "customer_name VARCHAR",
    "product_id INTEGER",
    "quantity INTEGER",
    "order_date DATE",
    "status VARCHAR",
    "total_amount INTEGER",
    "city VARCHAR",
  ];

  const runquery = async () => {
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
      setError("Failed to run query. Please check your syntax or server.");
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (!ans || ans.length === 0) {
      return (
        <div className="mt-6 bg-gray-50 border border-gray-200 text-gray-500 text-center rounded-xl py-20 text-sm font-medium">
          {error || "Your query result will appear here..."}
        </div>
      );
    }

    const columns = Object.keys(ans[0]);
    return (
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md text-sm">
          <thead className="bg-gradient-to-r from-indigo-100 to-pink-100 text-gray-700">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 border-b border-gray-200 text-left font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ans.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 border-t border-gray-100 text-gray-700">
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Header */}
      <div className="text-center pt-10 pb-8 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          From <span className="text-indigo-600">Syntax</span> to <span className="text-pink-500">Insight</span> in Seconds
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-gray-500 text-lg">
          Write, execute, and refine SQL instantly in a dynamic playground — with live results, guided examples, and intuitive feedback.
        </p>
      </div>

      {/* Playground Layout */}
      <div className="flex gap-4 p-4">
        {/* LEFT PANEL */}
        <div className="w-1/5 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 shadow-lg overflow-y-auto">
          <h2 className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold text-lg text-center py-2 rounded-xl mb-4 shadow">
            SQL Keywords
          </h2>

          <div className="space-y-6">
            {sections.map(({ title, icon, items }) => (
              <div key={title}>
                <div className="flex items-center gap-2 px-2 mb-2 text-gray-600 font-medium">
                  {icon}
                  <h3 className="text-sm">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <button
                      key={item}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text", item)}
                      onClick={() => handleInsert(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className="flex-1 flex flex-col">
          <h2 className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold text-lg text-center py-3 rounded-xl shadow mb-3 flex items-center justify-center gap-2">
            <FileChartColumnIncreasing className="text-white" /> Query Editor
          </h2>

          <textarea
            className="h-64 border border-gray-300 rounded-xl p-4 bg-white shadow-sm font-mono text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
            placeholder="Write your SQL query or drag keywords here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />

          {/* Buttons */}
          <div className="flex gap-4 mt-5">
            <button
              className="flex-1 flex items-center justify-center gap-2 border border-indigo-700 text-indigo-700 bg-white hover:bg-indigo-50 font-semibold py-3 rounded-xl shadow-sm transition-all"
              onClick={() => setQuery("")}
            >
              <Paintbrush /> Clear Query
            </button>

            <button
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-700 text-white font-semibold py-3 rounded-xl hover:bg-indigo-800 shadow-md transition-all"
              onClick={runquery}
              disabled={loading}
            >
              <Play />
              {loading ? "Running..." : "Run Query"}
            </button>
          </div>

          {/* Results */}
          <div className="mt-8 bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-center rounded-xl py-3 text-lg font-semibold flex items-center justify-center gap-2 shadow-md">
            <FileChartColumnIncreasing /> Query Result
          </div>

          {renderTable()}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/5 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 shadow-lg overflow-y-auto">
          <h2 className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold text-lg text-center py-2 rounded-xl mb-4 shadow">
            Sample Tables
          </h2>

          <div className="space-y-6">
            {/* Employees Table */}
            <div>
              <h3
                onClick={() => handleInsert("Employees")}
                className="text-sm font-semibold mb-2 cursor-pointer text-gray-800 hover:text-indigo-600"
              >
                Employees
              </h3>
              <div className="bg-gray-50 rounded-xl p-2 border border-gray-100 shadow-inner">
                <div className="space-y-2 text-xs">
                  {employees.map((col) => (
                    <p
                      key={col}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text", col.split(" ")[0])}
                      onClick={() => handleInsert(col.split(" ")[0])}
                      className="flex justify-between px-2 py-1 rounded-md hover:bg-indigo-50 cursor-pointer transition"
                    >
                      <span className="text-gray-800">{col.split(" ")[0]}</span>
                      <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md">
                        {col.split(" ")[1]}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div>
              <h3
                onClick={() => handleInsert("Orders")}
                className="text-sm font-semibold mb-2 cursor-pointer text-gray-800 hover:text-indigo-600"
              >
                Orders
              </h3>
              <div className="bg-gray-50 rounded-xl p-2 border border-gray-100 shadow-inner">
                <div className="space-y-2 text-xs">
                  {orders.map((col) => (
                    <p
                      key={col}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text", col.split(" ")[0])}
                      onClick={() => handleInsert(col.split(" ")[0])}
                      className="flex justify-between px-2 py-1 rounded-md hover:bg-indigo-50 cursor-pointer transition"
                    >
                      <span className="text-gray-800">{col.split(" ")[0]}</span>
                      <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md">
                        {col.split(" ")[1]}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
