import React, { useState } from "react";

const Table = ({ content }) => {
  if (!content) return null;
  const [activeButton, setActiveButton] = useState("tablebox1");

  const tableBox = ["tablebox1", "tablebox2", "tablebox3"].filter(
    (tablebox) => content[tablebox]
  );

  const activeTableData =
    activeButton === "tablebox1"
      ? content?.person1 || content?.person
      : activeButton === "tablebox2"
      ? content?.person2
      : activeButton === "tablebox3"
      ? content?.person3
      : [];

  return (
    <div className="mt-6 w-full">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg  overflow-hidden transition-all duration-500 hover:shadow-2xl">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gradient-to-r from-indigo-500/10 to-pink-500/10">
          {tableBox.map((tablebox, index) => (
            <button
              key={index}
              onClick={() => setActiveButton(tablebox)}
              className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 ${
                activeButton === tablebox
                  ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:text-indigo-600"
              }`}
            >
              {content[tablebox]}
            </button>
          ))}
        </div>

        {/* Conditional Custom Blocks */}
        {activeButton === "tablebox2" && (
          <div className="p-6 text-center text-gray-600">
            <h1 className="text-2xl font-medium">📊 Comparison Data Coming Soon</h1>
            <p className="text-gray-500 mt-2">
              This section will display real-time analytical insights.
            </p>
          </div>
        )}
        {activeButton === "tablebox3" && (
          <div className="p-6 text-center text-gray-600">
            <h1 className="text-2xl font-medium">💡 Expected Results Section</h1>
            <p className="text-gray-500 mt-2">
              Explore new outcomes and predictions here.
            </p>
          </div>
        )}

        {/* Main Table */}
        {activeButton === "tablebox1" && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gradient-to-r from-indigo-100 to-pink-100">
                <tr className="text-gray-700 text-sm sm:text-base">
                  <th className="p-4 font-semibold">{content.head1}</th>
                  <th className="p-4 font-semibold">{content.head2}</th>
                  <th className="p-4 font-semibold">{content.head3}</th>
                  <th className="p-4 font-semibold">{content.head4}</th>
                  <th className="p-4 font-semibold">{content.head5}</th>
                </tr>
              </thead>
              <tbody>
                {activeTableData?.map((details, index2) => (
                  <tr
                    key={index2}
                    className={`transition-all duration-300 hover:bg-indigo-50 ${
                      index2 % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-700 font-medium">{details.id}</td>
                    <td className="py-3 px-4 text-gray-700">{details.username}</td>
                    <td className="py-3 px-4 text-gray-700">{details.loyaltier}</td>
                    <td className="py-3 px-4 text-gray-700">{details.booktime}</td>
                    <td className="py-3 px-4 text-gray-700">{details.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
