import React from "react";
 import upzureImg from "../../assets/about.png"; // Replace this with your own image
import { Link } from "react-router-dom";
const AboutUpzure = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 via-pink-100/30 to-transparent blur-3xl opacity-60 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            A <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"> New Way </span>  
             to Learn and Practice.
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            <span className="font-semibold text-indigo-600">Upzure</span> by{" "}
            <span className="font-semibold text-gray-800">SkillRefill</span> transforms learning from passive reading  
            into an active, hands-on experience.  
            We believe real learning doesn’t come from memorizing — it comes from doing.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            Upzure brings a <span className="text-pink-600 font-medium">visual-first, interactive</span> approach to education.  
            Each concept is explained step-by-step with real-world examples,  
            allowing learners to <strong>see</strong> how code runs, <strong>practice</strong> instantly, and <strong>retain</strong> knowledge deeply.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 mt-8">
            <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">Learn by Doing</h3>
              <p className="text-gray-600 text-sm">
                Each topic includes interactive exercises, visuals, and live execution flow — not just theory.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">Smart Visuals</h3>
              <p className="text-gray-600 text-sm">
                Concepts are explained visually — helping you understand complex logic with clarity and confidence.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-10">
           <Link to='/courses'>
           <button className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all">
              Start Learning
            </button>
           </Link>
            <a
              href="https://skillrefill.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium hover:text-pink-600 transition-all"
            >
              Powered by SkillRefill →
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-pink-500 blur-3xl opacity-25 rounded-full -z-10"></div>
          <img
            src={upzureImg}
            alt="Upzure Visual Learning Preview"
            className="w-full rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUpzure;
