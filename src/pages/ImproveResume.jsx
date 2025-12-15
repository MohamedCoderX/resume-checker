import React from 'react';
import { CheckCircle, Lightbulb, Download } from 'lucide-react';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const keywordsData = [
  { id: 1, currentText: "Worked on projects", recommendedText: "Led cross-functional team projects" },
  { id: 2, currentText: "Good communication skills", recommendedText: "Excellent verbal and written communication" },
];

const achievementsData = [
  { id: 1, currentText: "Improved sales", recommendedText: "Increased quarterly sales by 35% through strategic initiatives" },
  { id: 2, currentText: "Managed team", recommendedText: "Managed and mentored team of 8 developers" },
];

const formattingData = [
  { id: 1, currentText: "Skills: HTML, CSS, JS", recommendedText: "Technical Skills: HTML5, CSS3, JavaScript (ES6+), React, Node.js" },
];

const atsTips = [
  "Use standard section headings (Experience, Education, Skills)",
  "Include relevant keywords from the job description",
  "Use simple, clean formatting without tables or graphics",
  "Save as .docx or PDF format",
  "Quantify achievements with numbers and percentages",
  "Avoid headers and footers for important information",
];

const OptimizationSection = ({ title, recommendations }) => (
  <div className="mb-8 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lg">
    <h2 className="bg-[#1DBC1D] p-3 text-xl md:p-4 md:text-2xl font-semibold text-white text-center md:text-left">
      {title}
    </h2>
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-2">
        {recommendations.map((item) => (
          <React.Fragment key={item.id}>
            {/* Current */}
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 md:p-4 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <MdCancel className="h-6 w-6 md:h-7 md:w-7 flex-shrink-0 text-red-500" />
                <span className="font-semibold text-red-700 text-base md:text-lg">Current</span>
              </div>
              <p className="mt-2 text-gray-700 text-sm md:text-base">{item.currentText}</p>
            </div>

            {/* Recommended */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 md:p-4 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <IoMdCheckmarkCircle className="h-6 w-6 md:h-7 md:w-7 flex-shrink-0 text-[#03A750]" />
                <span className="font-semibold text-[#03A750] text-base md:text-lg">Recommended</span>
              </div>
              <p className="mt-2 text-gray-700 text-sm md:text-base">{item.recommendedText}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

const AtsTipsSection = ({ tips }) => (
  <div className="mb-8 overflow-hidden rounded-xl border border-[#035D54] bg-[#E5FFF7] shadow-md">
    <div className="flex items-center space-x-2 md:space-x-3 p-3 md:p-4">
      <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-orange-400" />
      <h2 className="text-base md:text-lg font-semibold text-emerald-800">Quick Tips for ATS Optimization</h2>
    </div>
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-2 text-sm md:text-base">
            <CheckCircle className="mt-1 h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-emerald-500" />
            <p className="text-gray-700 text-md">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function ImproveResume() {
  return (
    <div className="bg-transparent py-8 md:py-12 font-sans text-gray-900 antialiased">
      <div className="mx-auto max-w-4xl md:max-w-4xl px-3 md:px-6">
        <header className="mb-8 md:mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#035D54] px-3 py-1 text-xs md:text-sm font-medium text-white">
            Actionable Recommendations
          </span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
            Improve Your Resume
          </h1>
          <p className="mt-2 md:mt-3 text-sm md:text-lg text-gray-600">
            Compare your current resume with our optimized recommendations
          </p>
        </header>

        <main>
          <OptimizationSection title="Keywords Optimization" recommendations={keywordsData} />
          <OptimizationSection title="Achievements Optimization" recommendations={achievementsData} />
          <OptimizationSection title="Formatting Optimization" recommendations={formattingData} />
          <AtsTipsSection tips={atsTips} />

          <div className="mt-10 text-center">
            <button className="inline-flex items-center justify-center rounded-lg bg-[#035D54] px-5 md:px-8 py-2.5 md:py-3 text-sm md:text-lg font-semibold text-white shadow-md hover:bg-[#027a6f] transition-all">
              <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Download Improved Resume
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
