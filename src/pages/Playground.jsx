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
  FileChartColumnIncreasing
} from "lucide-react";

export default function Playground() {
  const [query, setQuery] = useState("");
  const [ans, setAns] = useState([]); // store API result
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
    { title: "Select", icon:  <Menu size={16}/>, items: ["SELECT", "DISTINCT", "AS", "*"] },
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

  // 🧠 Run the query using Axios
  const runquery = async () => {
    if (!query.trim()) return alert("Please write a query first!");

    setLoading(true);
    setError("");
    setAns([]);

    try {
      const response = await axios.post("https://fqrfdbfdo8.execute-api.us-east-1.amazonaws.com/execute", 
        {
        query: query,});

      console.log("Query response: ", response.data);
      setAns(response.data);
    } catch (err) {
      console.error("Query error: ", err);
      setError("Failed to run query. Please check your syntax or server.");
    } finally {
      setLoading(false);
    }
  };


  const renderTable = () => {
    if (!ans || ans.length === 0) {
      return (
        <div className="mt-2 bg-rose-100 text-gray-500 text-center rounded-xl py-28 text-sm">
          {error ? error : "Your Query Result Will appear Here..."}
        </div>
      );
    }

    // Get column headers from first row
    const columns = Object.keys(ans[0]);

    return (
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-xl shadow">
          <thead className="bg-rose-200 text-gray-800">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-2 border border-gray-300 text-left text-sm font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ans.map((row, index) => (
              <tr key={index} className="hover:bg-rose-50 transition">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 border border-gray-200 text-sm">
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
    <div className="min-h-screen">
      <div className="w-full text-center pt-10 ">
        <h2 className="text-black text-5xl m-2 font-medium">
          From Syntax to Insight in Seconds
        </h2>
        <p className="w-2/4 mx-auto text-lg text-gray-400 font-medium">
          Write, execute, and refine your SQL statements instantly in a dynamic,
          sandboxed environment—designed to accelerate learning with live results, guided examples,
          and intuitive feedback.
        </p>
      </div>

      <div className="flex text-gray-800 p-4 space-x-4 select-none ">
        {/* LEFT PANEL */}
        <div className="w-1/5 bg-sky-100 rounded-2xl p-4 shadow-md overflow-y-auto">
          <h2 className=" text-black bg-white font-bold text-lg text-center py-2 rounded-md mb-4">
            SQL Keywords
          </h2>
        
      

          <div className="space-y-6">
            {sections.map(({ title, icon, items }) => (
              <div key={title}>
                <div className="flex items-center gap-2 px-3 py-1.5  mb-2">
                  <span className="text-gray-500">{icon}</span>
                  <h3 className="text-sm text-gray-500">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <button
                      key={item}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text", item)}
                      onClick={() => handleInsert(item)}
                      className="bg-blue-800 text-white px-4 py-2 rounded-md text-xs transition hover:bg-blue-900"
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
          <h2 className="bg-[#FF8F8F] text-white text-lg flex justify-center gap-2 text-center py-3 rounded-xl mb-3">
            <span className="text-2xl"><FileChartColumnIncreasing /></span> Query Editor
          </h2>

          <textarea
            className="h-150 border border-red-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-sm font-medium"
            placeholder="Write Your Query or Drag SQL Keywords Here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />

          {/* Buttons */}
          <div className="flex mt-6 space-x-4">
            <button
              className="flex-1 flex items-center justify-center gap-2 border-2 border-blue-800 text-blue-800  font-semibold px-4 py-4 rounded-xl  text-lg transition"
              onClick={() => setQuery("")}
            >
              <span className="text-2xl"><Paintbrush /></span> Clear Query
            </button>

            <button
              className="flex-1 flex items-center justify-center gap-2 bg-blue-800 text-white font-semibold px-4 py-4 rounded-xl text-lg transition"
              onClick={runquery}
              disabled={loading}
            >
              <span className="text-2xl"><Play /></span>
              {loading ? "Running..." : "Run Query"}
            </button>
          </div>

          {/* Results */}
          <div className="mt-6 bg-blue-800 text-white text-center rounded-xl py-4 text-xl font-semibold flex items-center justify-center gap-2">
            <span className="text-2xl"><FileChartColumnIncreasing /></span> Query Result
          </div>

          {renderTable()}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/5 bg-sky-100 rounded-2xl p-4 shadow-md overflow-y-auto">
          <h2 className="bg-white text-black font-bold text-lg text-center py-2 rounded-md mb-4">
            Sample Tables
          </h2>

          <div className="space-y-4">
            {/* Employees Table */}
              <h3
                onClick={() => handleInsert("Employees")}
                className="text-sm mb-2  cursor-pointer hover:text-blue-700"
              >
                Employees
              </h3>
            <div className="bg-white rounded-xl p-2">
            
              <div className="space-y-2 text-xs">
                {employees.map((col) => (
                  <p
                    key={col}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text", col.split(" ")[0])}
                    onClick={() => handleInsert(col.split(" ")[0])}
                    className=" flex justify-between  px-2 py-1 rounded-md cursor-pointer"
                  >
                    <span className="text-gray-700 ">{col.split(" ")[0]}</span>
                    <span className="text-gray-500 rounded-xl p-1.5 bg-sky-200">{col.split(" ")[1]}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Orders Table */}
             <h3
                onClick={() => handleInsert("Orders")}
                className="text-sm mb-2 mt-4 cursor-pointer hover:text-blue-700"
              >
                Orders
              </h3>
            <div className="bg-white rounded-xl p-2">
             
              <div className="space-y-2 text-xs">
                {orders.map((col) => (
                  <p
                    key={col}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text", col.split(" ")[0])}
                    onClick={() => handleInsert(col.split(" ")[0])}
                    className=" flex justify-between  px-2 py-1 rounded-md cursor-pointer"
                  >
                    <span className="text-gray-700 ">{col.split(" ")[0]}</span>
                    <span className="text-gray-500 rounded-xl p-1.5 bg-sky-200">{col.split(" ")[1]}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}