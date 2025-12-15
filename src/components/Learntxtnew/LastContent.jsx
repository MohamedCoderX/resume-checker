import React from "react";
// import json from "../../JsonFile/content1.json"
import { RiMenuFoldLine } from "react-icons/ri";
import { PiFileSqlDuotone } from "react-icons/pi";
import { AiOutlineClear } from "react-icons/ai";
import { LuPartyPopper } from "react-icons/lu";
import Table from "../Learn/Table";
import { PiPencilLineFill } from "react-icons/pi";
// import { LuPartyPopper } from "react-icons/lu";
import { Play } from "lucide-react";
import { useState } from "react";
// import {
//      Play,
//      FileChartColumnIncreasing
//    } from "lucide-react";
import axios from "axios";

// import { useLocation } from "react-router-dom";


const LastContent = ({ state }) => {
    const [showContent, SetShowContent] = useState(false);
    const [query, setQuery] = useState("");
    const [ans, setAns] = useState([]); // store API result
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const { state } = useLocation(); // get json
    //  handleClear()={
    // }

    // handleRun()={
    //}

    // handleExpOutput()={

    // }

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     const text = e.dataTransfer.getData("text");
    //     setQuery((prev) => prev + " " + text);
    //   };

    //   const handleDragOver = (e) => e.preventDefault();
    //   const handleInsert = (text) => setQuery((prev) => prev + " " + text);


    const runQuery = async () => {
        if (!query.trim()) return alert("Please write a query first!");

        setLoading(true);
        setError("");
        setAns([]);

        try {
            const response = await axios.post("https://fqrfdbfdo8.execute-api.us-east-1.amazonaws.com/execute",
                {
                    query: query,
                });

            console.log("Query response: ", response.data);
            setAns(response.data);
        } catch (err) {
            console.error("Query error: ", err);
            setError("Failed to run query. Please check your syntax or server.");
        } finally {
            setLoading(false);
        }
    };


    const renderTable = () => {
        if (!ans || ans.length === 0) {
            return (
                <div className="mt-2 bg-rose-100 text-gray-500 text-center rounded-xl py-28 text-sm">
                    {error ? error : "Your Query Result Will appear Here..."}
                </div>
            );
        }

        // Get column headers from first row
        const columns = Object.keys(ans[0]);

        return (
            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white rounded-xl shadow">
                    <thead className="bg-rose-200 text-gray-800">
                        <tr>
                            {columns.map((col) => (
                                <th key={col} className="px-4 py-2 border border-gray-300 text-left text-sm font-semibold">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {ans.map((row, index) => (
                            <tr key={index} className="hover:bg-rose-50 transition">
                                {columns.map((col) => (
                                    <td key={col} className="px-4 py-2 border border-gray-200 text-sm">
                                        {String(row[col])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };





    return (
        <>
            <div className="mt-7">
                {/* complete Query */}


                <div className="bg-blue-100 border-2 border-blue-400 p-4 rounded-xl">
                    <div>
                        <h1 className="text-blue-600 font-semibold text-2xl">Complete Query</h1>
                    </div>

                    <div className="bg-black/70 text-white p-4 rounded-xl mt-5">
                        <h1 style={{ whiteSpace: 'pre-wrap' }}>{state?.codeComQuery} </h1>
                    </div>
                </div>

                {/* now you try */}

                <div className="bg-white p-4 rounded-xl grid gap-2 border border-gray-200 mt-4">

                    <h1 className="font-semibold text-2xl">Now You Try!</h1>

                    <h1 className="text-gray-500 text-md">Practice the query in the editor below and run it</h1>


                    <button className=" bg-green-500 w-full flex gap-2 justify-center p-3 text-2xl rounded-xl text-white font-semibold cursor-pointer hover:bg-green-600 ">
                        <h1 className="text-3xl"><PiFileSqlDuotone /></h1>
                        Query Editor</button>

                    {/* Query Editior */}
                    <div className="bg-gray-100 rounded-xl ">

                        <div >
                            {
                                state?.multicont?.map((innerinfo, index5) => (
                                    <div key={index5} className="text-md p-5 rounded-xl  border-gray-300   text-gray-500 " >
                                        <div className="flex gap-2"><PiPencilLineFill />
                                            <h1 className="text-black font-semibold mt-[-2px]">Query Editor</h1>
                                        </div>
                                        <ul className="list-disc list-inside ml-4">

                                            <li>{innerinfo.word1}</li>
                                            <li>{innerinfo.word2}</li>
                                            <li>{innerinfo.word3}</li>
                                            <li>{innerinfo.word4}</li>
                                            <li>{innerinfo.word5}</li>
                                        </ul>

                                    </div>
                                ))
                            }
                        </div>


                        <div className="p-3">
                            {/* <textarea className=" border-1 border-gray-400 bg-white text-gray-400 p-5 rounded-xl mt-5 w-full h-50  "
                                placeholder={state?.codeComQuery1}
                                // value={query}
                                // onChange={(e) => setQuery(e.target.value)}

                            >
                            </textarea> */}
                            <textarea
                                className="border border-gray-400 bg-white p-5 rounded-xl mt-5 w-full h-50"
                                placeholder={state?.codeComQuery1}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />

                        </div>

                        {/* result */}
                        {/* <div>
                            <div className="mt-6 bg-blue-800 text-white text-center rounded-xl py-4 text-xl font-semibold flex items-center justify-center gap-2">
                                <span className="text-2xl"><FileChartColumnIncreasing /></span> Query Result
                            </div>

                            {renderTable()}
                        </div> */}
                        <div className="mt-4">
                            {loading && (
                                <div className="text-center text-blue-600 font-semibold">
                                    Executing query...
                                </div>
                            )}

                            {!loading && ans.length > 0 && (
                                renderTable()
                            )}

                            {!loading && error && (
                                <div className="text-red-500 text-center">{error}</div>
                            )}
                        </div>


                        {/* Expected output */}
                        {showContent && (
                            <div className="p-3">
                                <h1>Expected Output</h1>
                                {state?.ExpOutput && <Table content={state.ExpOutput} />}

                            </div>
                        )
                        }

                    </div>



                    {/* 2 buttons */}

                    <div className="p-3">
                        <div className="grid gap-6">
                            <div className="flex flex-row gap-5 text-2xl text-center">
                                <button
                                    className="bg-white basis-2/3 border-1 border-blue-800  rounded-xl text-blue-800 font-semibold p-5  cursor-pointer "
                                // onClick={handleClear()}
                                >
                                    <div className="flex gap-2 justify-center hover:text-blue-900 " >
                                        <h1 className=" mt-1"> <AiOutlineClear /> </h1>
                                        <h1 >Clear Qurey</h1>
                                    </div>
                                </button>
                                {/* <button
                                    className="bg-blue-800 basis-2/3   rounded-xl text-white p-5 hover:bg-blue-900 cursor-pointer"
                                //onClick={handleRun()}
                                >
                                    <div className="flex gap-2 justify-center   " >
                                        <h1 className=" mt-1"> <Play /> </h1>
                                        <h1>Run</h1>
                                      <span className="text-2xl"><Play /></span>
                                        {loading ? "Running..." : "Run Query"}
                                    </div>
                                </button> */}
                                <button
                                    className="bg-blue-800 basis-2/3 rounded-xl text-white p-5 hover:bg-blue-900 cursor-pointer flex justify-center gap-2"
                                    onClick={runQuery}
                                    disabled={loading}
                                >
                                    <Play />
                                    {loading ? "Running..." : "Run"}
                                </button>



                                <button
                                    className="bg-blue-800 basis-2/3   rounded-xl text-white p-5 hover:bg-blue-900 cursor-pointer"
                                    onClick={() => { SetShowContent(true) }}
                                >
                                    <div className="flex gap-2 justify-center   " >
                                        <h1 className="rotate-180 mb-1"> <RiMenuFoldLine /> </h1>
                                        Expected Output</div>
                                </button>
                            </div>




                            <div className="border-1 border-green-700 bg-green-100 text-green-600 p-5  rounded-xl font-semibold ">
                                <h1 className="text-2xl mt-3 mb-2 ">Perfect! Your Qurey is correct!</h1>
                                <h1 className="text-md">Your output matches the expected result. Question completed!</h1>
                            </div>

                        </div>

                        <button className=" text-center text-white bg-green-600 text-2xl p-4 rounded-xl mt-3 w-full cursor-pointer hover:bg-green-700">
                            <div className="flex gap-2 justify-center">
                                <h1 className="text-3xl"><PiFileSqlDuotone /></h1>
                                Qurey Result</div>
                        </button>

                    </div>

                    {/* table */}
                    {state?.ExpOutput && <Table content={state.Lasttable} />}



                    <div className=" border-2 text-center border-dashed border-gray-7 00 p-5 bg-pink-50 rounded-xl mt-4">
                        <h1 className="text-3xl">Finished Practice</h1>
                        <h1 className="m-2">Mark this question as complete to track your learning progress and earn badges!</h1>

                        <div className="flex justify-center">
                            <button className="bg-green-600 text-2xl p-4 rounded-xl text-white w-1/3  hover:bg-green-700 cursor-pointer ">
                                <div className="flex gap-2 justify-center ">
                                    <h1 >
                                        <LuPartyPopper className="text-3xl" /></h1>
                                    <h1>Mark as Complete</h1>
                                </div>
                            </button>
                        </div>
                    </div>


                </div>




            </div>
        </>
    )
}
export default LastContent;