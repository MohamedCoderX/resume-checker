import React from "react";
import { Bs4CircleFill } from "react-icons/bs";

const Content1 = ({ state }) => {
  const numberIcons = {
    icon4: <Bs4CircleFill />,
  };

  const content = state?.table4;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Card Wrapper */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-6 sm:p-8">
          <div className="text-3xl sm:text-4xl">
            {numberIcons[content?.icons]}
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold">
            {content?.title}
          </h2>
        </div>

        {/* Word Description */}
        {content?.word && (
          <div className="mt-5 mx-5 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-xl text-gray-700">
            <ul className="list-disc list-inside">
              <li>{content.word}</li>
            </ul>
          </div>
        )}

        {/* Code Block */}
        {content?.code && (
          <div className="mt-5 mx-5 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-sm overflow-x-auto border border-gray-800">
            <pre style={{ whiteSpace: "pre-wrap" }}>{content.code}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content1;
