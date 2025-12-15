import card1 from "../../assets/keyword.svg";
import card2 from "../../assets/content.svg";
import card3 from "../../assets/format.svg";
import card4 from "../../assets/section.svg";
import card2_last from "../../assets/card2_last.svg";
import danger from "../../assets/danger.svg";
import danger_last from "../../assets/danger_last.svg";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import { PiDownloadBold } from "react-icons/pi";
import CircularProgressbar from "./CircularProgress.jsx";
import LineProgress from "./LineProgress.jsx";
import Imporoved from "./Imporoved.jsx";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScoreDashboard = ({ analysis ,name}) => {
  const [result, setResult] = useState(false);
  const improvedRef = useRef(null);

  useEffect(() => {
    if (result && improvedRef.current) {
      setTimeout(() => {
        improvedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, [result]);

  // ✅ Safely extract from API
  const {
    ats_score = 0,
    keyword_match = 0,
    content_quality = 0,
    format_compatibility = 0,
    section_optimization = 0,
    strengths = [],
    areas_to_improve = [],
    keyword_optimizations = [],
    achievement_optimizations = [],
    formatting_optimizations = [],
    quick_tips = [],
  } = analysis || {};

  return (
    <div className="mt-9 mx-auto max-w-7xl px-2 md:px-6 lg:px-5 lg:py-3">
      {/* headlines */}
      <div className="flex flex-col justify-center items-center space-y-1 sm:space-y-2 lg:space-y-1">
        <p className="bg-[#4E56C0] text-sm text-white p-2.5 lg:px-5 border rounded-lg font-[Outfit] font-extralight tracking-wide">
          Analysis Complete
        </p>
        <h1 className="font-[League Spartan] font-medium lg:text-[40px] sm:text-2xl text-center text-xl">
          ATS Score Dashboard
        </h1>
        <p className="text-[#00000066] font-[Outfit] text-[16px] sm:text-sm lg:text-base">
          Results for : ({name}'s Resume)
        </p>
      </div>

      {/* progress bar */}
      <div className="max-w-[1200px] w-full mx-auto px-2.5 sm:px-5 lg:px-0">
        <div className="px-2.5 pt-3 lg:pt-10 sm:px-5 lg:px-16 font-[Outfit]">
          <div className="w-full space-y-2.5">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#4E56C0] px-2 py-5 lg:py-5 w-full lg:px-6 shadow-[0_4px_35px_0_rgba(0,0,0,0.25)]">
              <div className="p-2 sm:p-3 lg:p-3 flex justify-between">
                <div className="flex flex-col justify-start items-start space-y-2 lg:pt-5">
                  <h1 className="font-[Outfit] font-medium lg:text-[40px] sm:text-2xl text-base">
                    Overall ATS Score
                  </h1>
                  <p className="text-[13px] sm:text-sm lg:text-[23px] w-[145px] sm:w-full text-[#000000] font-light">
                    Your resume has a good ATS compatibility score
                  </p>
                  <button className="bg-[#4E56C0] text-[9px] sm:text-[11px] lg:text-[13px] text-[#FFFFFF] p-1.5 sm:p-2 lg:p-2.5 rounded-lg">
                    Score: {ats_score >= 80 ? "Excellent" : ats_score >= 60 ? "Good" : "Needs Work"}
                  </button>
                </div>
                <div className="w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] lg:w-[188px] lg:h-[188px]">
                  <CircularProgressbar value={ats_score} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 cards */}
        <div className="px-2.5 pt-8 sm:pt-8 sm:px-5 lg:pt-12 xl:px-16 max-w-[1200px] mx-auto font-[Outfit]">
          <div className="flex flex-col gap-y-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-x-12 lg:gap-y-10 xl:gap-x-24">
            <div className="flex items-center shadow-[0_4px_20px_0_#00000040] p-4 rounded-2xl gap-6">
              <img src={card1} alt="Keyword" className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
              <LineProgress label="Keyword Match" value={keyword_match} color="#7CBD1E" />
            </div>
            <div className="flex items-center shadow-[0_4px_20px_0_#00000040] p-4 rounded-2xl gap-6">
              <img src={card2} alt="Content" className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
              <LineProgress label="Content Quality" value={content_quality} color="#0088FF" />
            </div>
            <div className="flex items-center shadow-[0_4px_20px_0_#00000040] p-4 rounded-2xl gap-6">
              <img src={card3} alt="Format" className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
              <LineProgress label="Format Compatibility" value={format_compatibility} color="#6800BC" />
            </div>
            <div className="flex items-center shadow-[0_4px_20px_0_#00000040] p-4 rounded-2xl gap-6">
              <img src={card4} alt="Section" className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
              <LineProgress label="Section Optimization" value={section_optimization} color="#00992D" />
            </div>
          </div>
        </div>

        {/* Strengths + Areas to Improve */}
        <div className="flex flex-col pt-8 lg:pt-14 font-[Outfit] space-y-5 px-2.5 sm:px-5 xl:px-16 max-w-[1200px] mx-auto sm:grid sm:grid-cols-2 sm:gap-5 lg:gap-x-12 xl:gap-x-24">
          {/* Strengths */}
          <div className="flex flex-col border border-[#8FCBFF] rounded-2xl shadow-[0_4px_20px_0_#00000040] p-5">
            <div className="flex space-x-4 items-center lg:pt-3">
              <img src={card2} alt="strengths" className="w-[45px] h-[45px]" />
              <p className="text-lg font-normal lg:text-[32px]">Strengths</p>
            </div>
            <div className="pt-5 space-y-2.5 text-[13px] lg:text-[16px]">
              {strengths.map((point, index) => (
                <p key={index} className="flex items-center">
                  <span className="w-[30px] h-[30px]"><img src={card2_last} alt="icon" /></span>
                  {point}
                </p>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="flex flex-col border border-[#8FCBFF] rounded-2xl shadow-[0_4px_20px_0_#00000040] p-5">
            <div className="flex space-x-4 items-center lg:pt-3">
              <img src={danger} alt="danger" className="w-[45px] h-[45px]" />
              <p className="text-lg font-normal lg:text-[32px]">Areas to Improve</p>
            </div>
            <div className="pt-5 space-y-2.5 text-[13px] lg:text-[16px]">
              {areas_to_improve.map((area, index) => (
                <p key={index} className="flex items-center">
                  <span className="w-[30px] h-[30px]"><img src={danger_last} alt="icon" /></span>
                  {area}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center items-center pt-5 lg:pt-9 space-y-4 font-[Outfit] sm:flex-row sm:space-y-0 sm:space-x-5">
          <button
            onClick={() => setResult(true)}
            className="rounded-lg bg-[#454cb3] font-extralight text-white p-3 lg:px-4"
          >
            <p className="flex gap-1.5 text-sm sm:text-base lg:text-[24px] items-center">
              View Recommendations
              <span className="pt-0.5 text-[#FFFFFF]"><HiOutlineArrowSmDown /></span>
            </p>
          </button>

          {/* <button className="border border-[#4E56C0] rounded-lg bg-white text-[#4E56C0] p-3 lg:px-4">
            <p className="flex gap-2 text-sm sm:text-base lg:text-[22px] items-center">
              <PiDownloadBold /> Download Reports
            </p>
          </button> */}
        </div>

        {/* Animated Improved Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={improvedRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-10"
            >
              <Imporoved analysis={analysis} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScoreDashboard;
