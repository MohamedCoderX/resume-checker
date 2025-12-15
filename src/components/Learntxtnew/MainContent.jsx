import React, { useState, useRef } from "react";
// import {  useNavigate } from "react-router-dom";
// import json from "../../JsonFile/content1.json"
import Table from "../Learn/Table";
import Content1 from "./Content1";
import Content2 from "./Content2";
import Content3 from "./Content3";
import Content4 from "./Content4";
import LastContent from "./LastContent";
import { useParams } from "react-router-dom";
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

  // const navigate = useNavigate();
  // Current visible page
  const [currentPage, setCurrentPage] = useState(1);

  // Track which pages are unlocked
  const [unlockedPages, setUnlockedPages] = useState([1]);

  // Track if LastContent should be shown
  const [showLastContent, setShowLastContent] = useState(false);

  const contentRef = useRef(null);

  const { name } = useParams(); // get name from URL
  const course = courses.find(c => c.url.replace(/\s+/g, '-').toLowerCase() === name);
  const jsons = [json1, json2, json3, json4, json5, json6, json7, json8];
  const state = course ? jsons[courses.indexOf(course)] : null; // get json based on course index

  // Total pages
  const totalPages = 4;

  // Page content (you can replace with real content)
  const pageContent = {
    1:   <Content1 state={state}/>,
    2:  <Content2 state={state}/>,
    3: <Content3 state={state}/>,
    4: <Content4 state={state}/>,
  };

  // const numberIcons =
  // {
  //   icon1: <Bs1CircleFill />,
  //   icon2: <Bs2CircleFill />,
  //   icon3: <Bs3CircleFill />,
  //   icon4: <Bs4CircleFill />
  // }

  // When clicking "Mark as Read"
  const handleMarkAsRead = () => {
    const nextPage = currentPage + 1;
  
    if (currentPage === 4) {
      setShowLastContent(true);
    }
  
    // Unlock next page if not unlocked
    if (nextPage <= totalPages && !unlockedPages.includes(nextPage)) {
      setUnlockedPages((prev) => [...prev, nextPage]);
    }
  
    // Automatically go to next page if available
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
  
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto pt-10">

      {/* PAGE CONTENT */}
      <div className="">



        <div className="grid gap-5 kumbh-sans-font" >
          <div className=" w-full ">
            <div className="text-center text-5xl mx-auto lg:w-170 font-semibold">
              <h1>Learn SQL with Step-by-Step Visual Execution</h1>
            </div>
            <div className="text-2xl text-center py-10 text-pink-400">
              <h1>{state?.subtitle1}</h1>
              <h1>{state?.subtitle2}</h1>
            </div>
          </div>

          {/* content card1 */}

          <div className="bg-white p-4 border border-gray-200 rounded-xl " ref={contentRef}>
            <div className="">
              <h1 className="text-2xl font-semibold">{state.cardhead}</h1>
              <p className="text-gray-600 text-md tracking-tight mt-2 ml-6 text-base/6">{state.cardcontent}</p>
            </div>
          </div>
          {/* table2 */}

          <div className="border bg-white rounded-xl p-5  ">

            <div>
              <h1 className="text-2xl font-semibold">{state.content1}</h1>
              <h1 className="text-gray-500 text-lg mt-1 mb-2">{state.content2}</h1>
              <h1 className="text-lg font-bold">{state.content3}</h1>
            </div>

            <Table content={state.table} />
          </div>

          {/* step by step */}
          <div className="bg-red-50 border border-red-600 p-4 text-center rounded-xl">
            <h1 className="text-2xl font-semibold">{state.card2head}</h1>
            <div className="">
              <h1 className="text-gray-600 text-xl mt-3 px-20">{state.card2content}</h1>
            </div>

          </div>

          {/* content table2 */}
          <div className="grid gap-5 kumbh-sans-font" >
                

                {/* content table2 */}
                
        {pageContent[currentPage]}


            </div>
        </div>




      </div>

      {/* MARK AS READ BUTTON */}
      <div className="mt-6 text-center">
        <button
          onClick={handleMarkAsRead}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Mark as Read
        </button>
      </div>

      {/* PAGE NUMBER BUTTONS */}
      <div className="flex gap-6 justify-center mt-8">

        {[1, 2, 3, 4].map(number => {

          const isUnlocked = unlockedPages.includes(number);
          const isActive = number === currentPage;

          return (
            <button
              key={number}
              disabled={!isUnlocked}
              onClick={() => { if (isUnlocked) { setCurrentPage(number); contentRef.current.scrollTo(0,0); } }}

              className={`px-4 py-2 rounded-full text-white text-lg
                ${isActive ? "bg-blue-700" : "bg-gray-500"}
                ${!isUnlocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {number}
            </button>
          );
        })}

      </div>

      {showLastContent && <LastContent state={state} />}


    </div>
  );
};

export default PageNavigation;
