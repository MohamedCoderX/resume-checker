import React, { useState } from 'react';

const Table = ({ content }) => {
  if (!content) return null; 
  const [activeButton, setActiveButton] = useState("tablebox1");

  const tableBox = ["tablebox1", "tablebox2", "tablebox3"].filter(
    (tablebox) => content[tablebox]
  );

  const activeTableData =
    activeButton === "tablebox1"
      ? content?.person1 || content?.person
      : activeButton === "tablebox2"
        ? content?.person2
        : activeButton === "tablebox3"
          ? content?.person3
          : [];

  return (
    <div className='mt-4'>
      
    <div className=" text-center rounded-xl">
      {/* mt-4 */}
      {/* ====== Table Tabs ====== */}
      <div className="flex gap-3 ">
        {tableBox.map((tablebox, index) => (
          <button
            key={index}
            onClick={() => setActiveButton(tablebox)}
            className={`p-3 text-xl rounded-tl-xl rounded-tr-xl transition-all duration-200 ${activeButton === tablebox
                ? "bg-blue-600 text-white shadow-md"
                : "bg-blue-400 text-white hover:bg-blue-500"
              }`}
          >
            {content[tablebox]}
          </button>
        ))}
      </div>

      {activeButton === "tablebox2" && (
        <div>
          <h1>helooooo</h1>
        </div>
      )}
      {activeButton === "tablebox3" && (
        <div>
          <h1>new Expected</h1>
        </div>
      )}

      {/* ====== Table Content ====== */}
      <div className="">
        {activeButton !== "tablebox2" && (
          <table className="w-full rounded-xl">
            <thead className="bg-blue-200 text-black">
              <tr className="text-lg font-light">
                <th className="p-3">{content.head1}</th>
                <th>{content.head2}</th>
                <th>{content.head3}</th>
                <th >{content.head4}</th>
                <th  className="">{content.head5}</th>
              </tr>
            </thead>

            <tbody className="text-xl">
              {activeTableData?.map((details, index2) => (
                <tr
                  key={index2}
                  className="border-b border-gray-400 rounded-xl text-gray-600 text-lg"
                >
                  <td className="pt-9 pb-3">{details.id}</td>
                  <td className="pt-9 pb-3">{details.username}</td>
                  <td className="pt-9 pb-3">{details.loyaltier}</td>
                  <td className="pt-9 pb-3">{details.booktime}</td>
                  <td className="pt-9 pb-3">{details.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      </div>
    </div>
    </div>
  );
};

export default Table;
