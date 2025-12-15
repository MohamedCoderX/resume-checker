import React, { useEffect, useState } from "react";
import { FaBookOpen, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import json1 from "../JsonFile/content1.json";
import json2 from "../JsonFile/card2.json";
import json3 from "../JsonFile/card3.json";
import json4 from "../JsonFile/card4.json";
import json5 from "../JsonFile/card5.json";
import json6 from "../JsonFile/card6.json";
import json7 from "../JsonFile/card7.json";
import json8 from "../JsonFile/card8.json";

export const courses = [
  { id: 1, title: "Prepare a report card summary", url: "sql-stories-1", difficulty: "Easy", type: "Free", steps: "5 Steps", data: json1 },
  { id: 2, title: "How to arrange data ascending or descending.", url: "sql-stories-2", difficulty: "Hard", type: "Free", steps: "6 Steps", data: json2 },
  { id: 3, title: "Learn how to return only the required number of rows.", url: "sql-stories-3", difficulty: "Easy", type: "Free", steps: "4 Steps", data: json3 },
  { id: 4, title: "Learn how to remove duplicates and get unique values.", url: "sql-stories-4", difficulty: "Medium", type: "Paid", steps: "3 Steps", data: json4 },
  { id: 5, title: "Learn how to combine data from two related tables", url: "sql-stories-5", difficulty: "Learn", type: "Paid", steps: "4 Steps", data: json5 },
  { id: 6, title: "Learn how to keep all rows from the left table even if no match exists.", url: "sql-stories-6", difficulty: "Learn", type: "Paid", steps: "3 Steps", data: json6 },
  { id: 7, title: "Use one query inside another to solve complex problems", url: "sql-stories-7", difficulty: "Easy", type: "Free", steps: "5 Steps", data: json7 },
  { id: 8, title: "Create conditional logic inside queries.", url: "sql-stories-8", difficulty: "Hard", type: "Free", steps: "6 Steps", data: json8 },
];

const Learn = () => {
  const [postperpage] = useState(6);
  const [currentpage, setcurrentpage] = useState(1);
  const [tit, setit] = useState(true);
  const navigate = useNavigate();

  const lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;
  const data = courses.slice(firstpostindex, lastpostindex);
  const pages = Math.ceil(courses.length / postperpage);

  useEffect(() => {
    if (window.location.pathname === "/dashboard") setit(false);
  }, []);

  return (
    <div className="min-h-screen w-full  flex flex-col items-center pt-16 pb-20">
      {/* Header Section */}
      {tit && (
        <div className="text-center py-12 px-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-snug">
            Expand Your <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Database Knowledge</span>
          </h1>
          <p className="text-gray-500 mt-5 text-lg">
            Master SQL — from basics to advanced topics. Learn visually through real, interactive, story-based examples.
          </p>
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-md w-[90%] md:w-4/5 lg:w-3/4 p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-gray-600 text-sm md:text-base font-light text-center md:text-left">
          Build SQL skills through dynamic stories — watch your code execute visually, one step at a time.
        </p>
        <span className="bg-gradient-to-r from-indigo-100 to-pink-100 text-gray-700 text-sm px-4 py-2 rounded-xl font-medium">
          Powered by SkillRefill
        </span>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] md:w-4/5 lg:w-3/4">
        {data.map((course, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-pink-500/10 to-transparent opacity-0 hover:opacity-100 transition-all duration-700 -z-10"></div>

            <h2 className="text-lg font-semibold text-gray-900">{course.title}</h2>

            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-medium">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md">{course.difficulty}</span>
              <span
                className={`px-2 py-1 rounded-md ${course.type === "Free" ? "bg-indigo-100 text-indigo-800" : "bg-pink-100 text-pink-800"}`}
              >
                {course.type}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md">{course.steps}</span>
            </div>

            <p className="text-gray-500 mt-3 text-sm flex items-center gap-2">
              <FaBookOpen className="text-indigo-500" /> Story-Based SQL Learning
            </p>

            <button
              onClick={() => navigate(`/learn/${course.url.replace(/\s+/g, "-").toLowerCase()}`)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 mt-5 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <FaPlay /> Start Learning
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            onClick={() => setcurrentpage(index + 1)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              currentpage === index + 1
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-none shadow-md"
                : "bg-white/80 text-gray-600 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Learn;
