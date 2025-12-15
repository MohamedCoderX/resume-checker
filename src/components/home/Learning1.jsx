import React from "react";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiVideo } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import bgImage from "../../assets/home-bg.jpg";

const Learning1 = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10">
        <div className="mb-6 w-fit mx-auto">
          <span className="flex items-center gap-2  border border-indigo-800 rounded-full px-4 sm:px-5 py-2 sm:py-2 text-sm sm:text-lg font-medium bg-transparent shadow-sm relative">
            <span className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-[40px] rounded-full bg-indigo-600 absolute -left-0 top-1/2 -translate-y-1/2">
              <BsGraphUpArrow className="text-pink-200 w-4 h-4 sm:w-4 sm:h-6" />
            </span>
            <span className="pl-12 sm:pl-10 pr-2 sm:pr-4 font-light text-black text-sm">
              Learn. Grow. Evolve.
            </span>
          </span>
        </div>
        <div className="flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium text-gray-900 leading-tight max-w-4xl">
          Empower your mind with knowledge that shapes your future.
        </h1>

        <p className="text-pink-500 text-lg sm:text-xl text-center flex font-light justify-center items-center mt-6 max-w-3xl">
          Designed by hiring managers, our AI instantly scores your resume and
          gives you actionable feedback — so you can fix it before the recruiter
          sees it.
        </p>
        </div>
       

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button className="flex text-md items-center justify-center gap-2 bg-pink-200 hover:bg-pink-300 text-indigo-600 font-light py-3 px-6 rounded-full shadow-md transition-all">
            <PiVideo className="w-6 h-6" /> Explore Courses
          </button>

          <button className="flex text-md items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-pink-200 font-light py-3 px-6 rounded-full shadow-md transition-all">
            <BsStars className="w-6 h-6" /> Start Learning Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Learning1;
