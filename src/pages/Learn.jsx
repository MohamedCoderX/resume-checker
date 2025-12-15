import React, { useEffect } from "react";
import { FaBookOpen, FaPlay, FaBookmark, FaCheckCircle, FaListUl } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import {  Link } from "react-router-dom";
import { useState } from "react";
import json1 from "../JsonFile/content1.json";
import json2 from "../JsonFile/card2.json";
import json3 from "../JsonFile/card3.json";
import json4 from "../JsonFile/card4.json";
import json5 from "../JsonFile/card5.json";
import json6 from "../JsonFile/card6.json";
import json7 from "../JsonFile/card7.json";
import json8 from "../JsonFile/card8.json";

export const courses = [
  {
    id: 1,
    title: "Categorize Cloud Accounts by Resource Usage Tier",
    url:"Learn interactively, visualize data, and grow your real-world skills step by step.",
    difficulty: "Easy",
    type: "Free",
    steps: "5 Steps",
    data: json1
  },
  {
    id: 2,
    title: "Find Affordable Flight Tickets using WHERE Condition",
    url:"Learn how to arrange data ascending or descending.",
    difficulty: "Hard",
    type: "Free",
    steps: "6 Steps",
    data: json2
  },
  {
    id: 3,
    title: "Emotion-Based Ad Targeting — Who Gets Which Ad?",
    url:"Learn how to return only the required number of rows.",
    difficulty: "Easy",
    type: "Free",
    steps: "4 Steps",
    data: json3
  },
  {
    id: 4,
    title: "Is Your Product Code a Palindrome?",
    url:"Learn how to remove duplicates and get unique values.",
    difficulty: "Medium",
    type: "Paid",
    steps: "3 Steps",
    data: json4
  },
  {
    id: 5,
    title: "Emotion-Based Ad Targeting — Who Gets Which Ad?",
    url:"Learn how to combine data from two related tables",
    difficulty: "Learn",
    type: "Paid",
    steps: "4 Steps",
    data: json5
  },
  {
    id: 6,
    title: "Is Your Product Code a Palindrome?",
    url:"Learn how to keep all rows from the left table even if no match exists.",
    difficulty: "Learn",
    type: "Paid",
    steps: "3 Steps",
    data: json6
  },
  {
    id: 7,
    title: "Categorize Cloud Accounts by Resource Usage Tier",
    url:"Use one query inside another to solve complex problems",
    difficulty: "Easy",
    type: "Free",
    steps: "5 Steps",
    data: json7
  },
  {
    id: 8,
    title: "Find Affordable Flight Tickets using WHERE Condition",
    url:"Create conditional logic inside queries.",
    difficulty: "Hard",
    type: "Free",
    steps: "6 Steps",
    data: json8
   }
  //,
  // {
  //   title: "Emotion-Based Ad Targeting — Who Gets Which Ad?",
  //   url:"Learn how to combine data from two related tables",
   
  //   difficulty: "Easy",
  //   type: "Free",
  //   steps: "4 Steps",
  //   data: json8
  // },
  // {
  //   title: "Is Your Product Code a Palindrome?",
  //   url:"Learn how to keep all rows from the left table even if no match exists.",
  
  //   difficulty: "Medium",
  //   type: "Paid",
  //   steps: "3 Steps",
  //   data: json8
  // },
  // {
  //   title: "Emotion-Based Ad Targeting — Who Gets Which Ad?",
  //   url:"Learn how to combine data from two related tables",
   
  //   difficulty: "Learn",
  //   type: "Paid",
  //   steps: "4 Steps",
  //   data: json8
  // },
  // {
  //   title: "Is Your Product Code a Palindrome?",
  //   url:"Learn how to keep all rows from the left table even if no match exists.",
  
  //   difficulty: "Learn",
  //   type: "Paid",
  //   steps: "4 Steps",
  //   data: json8
  // },
];




const Learn = () => {
  const [postperpage, setpostperpage] = useState(6);
  const [currentpage, setcurrentpage] = useState(1);
const[tit,setit] = useState(true);
  const lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;

  const data = courses.slice(firstpostindex, lastpostindex);

  const pages = Math.ceil(courses.length / postperpage);

  // const navigate = useNavigate();

  useEffect(()=>{
    //getlocation and if location is dashboard set tit to false
    const checkLocation = () => {
      const currentLocation = window.location.pathname;
      if (currentLocation === '/dashboard') {
      setit(false);
      }
    };
    checkLocation();
  })
  return (
    <div className="flex flex-col items-center w-full  ">
      {/* Header Section */}
     {tit && (<div className="pt-20 pb-20 text-center">
        <h1 className="text-5xl font-semibold text-gray-800">
          Expand Your <br />
          <span className="text-black">Database Knowledge</span>
        </h1>
        <p className="text-pink-400 mt-6 text-2xl font-medium">
          Master the fundamentals of SQL — from basics to advanced concepts. <br />
          Learn interactively, visualize data, and grow your real-world skills step by step.
        </p>
      </div>)}

      {/* Stats Section */}
      <div className="bg-white w-[90%] rounded-2xl shadow-sm py-6 ">
       

        <div className="flex justify-between items-center mx-6 mt-6">
          <p className="text-gray-600 text-sm font-light">
            Build SQL skills through dynamic stories—watch your code execute visually, one step at a time.
          </p>
          <span className="bg-[#C7F7FD] text-gray-700 text-sm px-4 py-2 rounded-2xl">
            Powered by Nexitence Technology
          </span>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
          {data.map((course, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl shadow-sm border border-gray-100 ${index % 2 === 0 ? "bg-[#EEF9FF]" : "bg-white"
                }`}
            >
              <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                <span className="bg-yellow-100 text-black px-2 py-0.5 rounded-lg font-medium">
                  {course.difficulty}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-lg font-medium ${course.type === "Free" ? "bg-purple-100" : "bg-pink-100"
                    } text-black`}
                >
                  {course.type}
                </span>
                <span className="bg-red-100 text-black px-2 py-0.5 rounded-lg font-medium">
                  {course.steps}
                </span>
              </div>
              <p className="text-gray-500 mt-2 text-sm flex items-center gap-1">
                <FaBookOpen /> Story – Based SQL Learning
              </p>

              {/* use button not a link content */}
              {/* <button
                onClick={() => navigate("/learn", { state: course.data })}
                className="flex items-center gap-2 bg-pink-200 hover:bg-pink-300 text-black px-4 py-2 mt-4 rounded-xl border border-purple-400 transition text-base font-light"
              >
                <FaPlay /> Start Learning
              </button> */}

              <button
                onClick={() => window.location.href = `/learn/${course.url.replace(/\s+/g, '-').toLowerCase()}`}
                className="flex items-center gap-2 bg-pink-200 hover:bg-pink-300 text-black px-4 py-2 mt-4 rounded-xl border border-purple-400 transition text-base font-light"
              >
                <FaPlay /> Start Learning
              </button>


              {/* <Link to={`/learn/${course.title.replace(/\s+/g, '-').toLowerCase()}`}>
                <button className="flex items-center gap-2 bg-pink-200 hover:bg-pink-300 text-black px-4 py-2 mt-4 rounded-xl border border-purple-400 transition text-base font-light">
                  <FaPlay /> Start Learning
                </button>
              </Link> */}
            </div>
          ))}

        </div>
        <div className="flex justify-center mt-6 gap-2 mx-auto">
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              onClick={() => setcurrentpage(index + 1)}
              className={`px-4 py-2 rounded-md border text-sm font-medium ${currentpage === index + 1
                ? "bg-pink-300 text-black border-pink-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;

