import React from "react";
import Table from "../Learn/Table";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill, Bs4CircleFill } from "react-icons/bs";

const Content1 = ({ state }) => {
  const numberIcons = {
    icon1: <Bs1CircleFill />,
    icon2: <Bs2CircleFill />,
    icon3: <Bs3CircleFill />,
    icon4: <Bs4CircleFill />,
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-6 sm:p-8">
          <div className="text-3xl sm:text-4xl">{numberIcons[state?.table1?.icons]}</div>
          <h2 className="text-xl sm:text-2xl font-semibold">{state?.table1?.title}</h2>
        </div>

        {/* Code Block */}
        <div className="bg-gray-900 text-gray-100 font-mono text-sm sm:text-base p-4 sm:p-5 rounded-lg m-5 overflow-x-auto border border-gray-800">
          <pre style={{ whiteSpace: "pre-wrap" }}>{state?.table1?.code}</pre>
        </div>

        {/* Output Heading */}
        <h3 className="ml-6 text-lg sm:text-xl font-semibold text-gray-800 mb-3">
          {state?.table1?.output}
        </h3>

        {/* Table */}
        <div className="px-5 pb-6">
          <Table content={state?.table1} />
        </div>
      </div>
    </div>
  );
};

export default Content1;
