import React from "react";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";
import { RiMenuFoldLine } from "react-icons/ri";
import { LuPartyPopper } from "react-icons/lu";
import { PiFileSqlDuotone } from "react-icons/pi";
import json from "../../JsonFile/content.json";
import Table from "./Table";

const Content = () => {
  const cardnames = [
    { name: "WINDOWS FUNCTION" },
    { name: "ORDER BY" },
    { name: "CASE" },
    { name: "AGGREGATION" },
  ];

  const numberIcons = {
    icon: <Bs1CircleFill />,
    icon1: <Bs2CircleFill />,
    icon2: <Bs3CircleFill />,
  };

  return (
    <div className="w-full flex flex-col gap-8 bg-gradient-to-b from-gray-50 to-white py-10 px-6 sm:px-10">
      {/* HEADER */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          {json.title}
        </h1>
        <div className="text-lg sm:text-2xl text-pink-500 font-medium">
          <p>{json.subtitle1}</p>
          <p>{json.subtitle2}</p>
        </div>
      </div>

      {/* CARD 1 — Problem Intro */}
      <div className="bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{json.cardhead}</h2>
        <p className="text-gray-600 mt-3 text-base leading-relaxed">
          {json.cardcontent}
        </p>
      </div>

      {/* CARD 2 — Overview */}
      <div className="bg-gradient-to-r from-indigo-50 to-pink-50 border border-indigo-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
          {json.card2head}
        </h2>
        <p className="text-gray-700 mb-4">{json.card2content}</p>
        <div className="flex flex-wrap gap-3">
          {cardnames.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-indigo-400 text-indigo-600 px-4 py-2 rounded-full font-medium text-sm shadow-sm"
            >
              {card.name}
            </div>
          ))}
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">{json.content1}</h2>
        <p className="text-gray-500 mt-2 text-base">{json.content2}</p>
        <h3 className="text-lg font-semibold text-gray-800 mt-3">
          {json.content3}
        </h3>

        <Table content={json.table} />

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            Table: train_capacity
          </h3>
          <table className="w-full border border-gray-100 rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-100 to-pink-100 text-gray-800">
              <tr>
                <th className="p-4 text-left">Premium_total</th>
                <th className="p-4 text-left">Premium_expected_noshow</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700 text-center bg-white">
                <td className="py-4">{json.pretotal}</td>
                <td className="py-4">{json.preexpecte}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CARD 4 — Step-by-Step SQL Logic */}
      <div className="flex flex-col gap-8">
        {json.contcard1.map((card, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-5 rounded-t-2xl">
              <div className="text-3xl">{numberIcons[card.icons]}</div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
            </div>

            <div className="p-5 space-y-4">
              <h4 className="font-semibold text-gray-800">{card.subtitle}</h4>

              <div className="bg-black text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{card.code}</pre>
              </div>

              {card.multicont?.map((inner, j) => (
                <div
                  key={j}
                  className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg text-gray-700 text-sm"
                >
                  <ul className="list-disc list-inside space-y-1">
                    {[inner.word1, inner.word2, inner.word3, inner.word4, inner.word5]
                      .filter(Boolean)
                      .map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="p-5">
              {(Array.isArray(card.table2) ? card.table2 : [card.table2]).map((tbl, i) => (
                <Table key={i} content={tbl} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* COMPLETE QUERY */}
      <div className="bg-gradient-to-r from-indigo-50 to-pink-50 border border-indigo-200 p-6 rounded-2xl shadow-md">
        <h2 className="text-indigo-700 font-semibold text-2xl mb-3">
          Complete Query
        </h2>
        <div className="bg-black text-white p-4 rounded-lg text-sm font-mono">
          <pre>{json.codeComQuery}</pre>
        </div>
      </div>

      {/* PRACTICE SECTION */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800">Now You Try!</h2>
        <p className="text-gray-500">Practice the query in the editor below and run it.</p>

        <div className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-400 text-white p-4 rounded-xl font-semibold gap-2">
          <PiFileSqlDuotone className="text-3xl" /> Query Editor
        </div>

        <div className="border border-gray-300 bg-gray-50 p-3 rounded-xl text-gray-700 font-mono text-sm">
          <pre>{json.codeComQuery}</pre>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 text-lg font-medium">
          <button className="flex-1 border border-red-300 text-red-400 rounded-xl py-3 hover:bg-red-50 transition">
            Clear Query
          </button>
          <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl py-3 hover:scale-[1.02] transition">
            <div className="flex items-center justify-center gap-2">
              <RiMenuFoldLine className="rotate-180 text-xl" />
              Run Query
            </div>
          </button>
        </div>

        {/* QUERY RESULT */}
        <div className="bg-green-500 text-white text-xl rounded-xl py-3 text-center font-semibold flex items-center justify-center gap-2">
          <PiFileSqlDuotone className="text-3xl" /> Query Result
        </div>

        <div className="bg-green-50 border border-green-300 p-5 rounded-xl text-green-700">
          <h3 className="text-xl font-semibold">✅ Perfect! Your Query is Correct!</h3>
          <p className="text-sm mt-1">
            Your output matches the expected result. Question completed!
          </p>
        </div>

        <Table content={json.Lasttable} />

        {/* MARK COMPLETE */}
        <div className="border-2 border-dashed border-gray-300 bg-pink-50 rounded-2xl p-6 text-center space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Finished Practice
          </h2>
          <p className="text-gray-600">
            Mark this question as complete to track your learning progress and earn badges!
          </p>

          <button className="mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            <LuPartyPopper className="text-2xl" />
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
