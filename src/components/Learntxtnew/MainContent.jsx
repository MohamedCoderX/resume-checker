import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../Learn/Table";
import Content1 from "./Content1";
import Content2 from "./Content2";
import Content3 from "./Content3";
import Content4 from "./Content4";
import LastContent from "./LastContent";

import json1 from "../../JsonFile/content1.json";
import json2 from "../../JsonFile/card2.json";
import json3 from "../../JsonFile/card3.json";
import json4 from "../../JsonFile/card4.json";
import json5 from "../../JsonFile/card5.json";
import json6 from "../../JsonFile/card6.json";
import json7 from "../../JsonFile/card7.json";
import json8 from "../../JsonFile/card8.json";
import { courses } from "../../pages/Learn";

const PageNavigation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [unlockedPages, setUnlockedPages] = useState([1]);
  const [showLastContent, setShowLastContent] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const { name } = useParams();
  const course = courses.find(c => c.url.replace(/\s+/g, '-').toLowerCase() === name);
  const jsons = [json1, json2, json3, json4, json5, json6, json7, json8];
  const state = course ? jsons[courses.indexOf(course)] : null;

  const totalPages = 4;

  const pageContent = {
    1: <Content1 state={state} />,
    2: <Content2 state={state} />,
    3: <Content3 state={state} />,
    4: <Content4 state={state} />,
  };

  // Smooth fade-in animation
  useEffect(() => {
    setFadeIn(true);
    const timeout = setTimeout(() => setFadeIn(false), 500);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  const handleMarkAsRead = () => {
    const nextPage = currentPage + 1;
    if (currentPage === totalPages) setShowLastContent(true);

    if (nextPage <= totalPages && !unlockedPages.includes(nextPage)) {
      setUnlockedPages(prev => [...prev, nextPage]);
    }

    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-10 px-4 transition-all duration-500">
      {/* PAGE HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
          Learn SQL with Step-by-Step Visual Execution
        </h1>
        <p className="text-pink-500 text-xl mt-4">
          {state?.subtitle1} <br /> {state?.subtitle2}
        </p>
      </div>

      {/* MAIN PAGE CONTENT */}
      <div
        className={`transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-80"}`}
      >
        {/* Problem Card */}
        <div className="bg-white shadow-md rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{state?.cardhead}</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">{state?.cardcontent}</p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">{state?.content1}</h3>
          <p className="text-gray-500 text-lg mt-2 mb-3">{state?.content2}</p>
          <p className="text-lg font-semibold text-gray-700">{state?.content3}</p>
          <Table content={state?.table} />
        </div>

        {/* Step-by-Step Visual Card */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-pink-300 p-6 rounded-xl text-center mb-6">
          <h3 className="text-2xl font-semibold text-pink-600">{state?.card2head}</h3>
          <p className="text-gray-600 text-lg mt-3">{state?.card2content}</p>
        </div>

        {/* DYNAMIC PAGE */}
        {pageContent[currentPage]}
      </div>

      {/* ACTION BUTTON */}
      <div className="mt-8 text-center">
        <button
          onClick={handleMarkAsRead}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-xl"
        >
          Mark as Read & Next →
        </button>
      </div>

      {/* PAGE NAVIGATION NUMBERS */}
      <div className="flex justify-center gap-3 mt-10">
        {[1, 2, 3, 4].map((num) => {
          const isUnlocked = unlockedPages.includes(num);
          const isActive = num === currentPage;
          return (
            <button
              key={num}
              disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  setCurrentPage(num);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`px-4 py-2 rounded-full text-lg transition-all duration-300 ${
                isActive
                  ? "bg-blue-700 text-white"
                  : isUnlocked
                  ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* LAST CONTENT */}
      {showLastContent && <LastContent state={state} />}
    </div>
  );
};

export default PageNavigation;
