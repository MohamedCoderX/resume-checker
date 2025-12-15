import React from "react";
// import json from "../../JsonFile/content1.json"
import { RiMenuFoldLine } from "react-icons/ri";
import { PiFileSqlDuotone } from "react-icons/pi";
import { AiOutlineClear } from "react-icons/ai";
import { LuPartyPopper } from "react-icons/lu";
import Table from "../Learn/Table";
import { PiPencilLineFill } from "react-icons/pi";
// import { LuPartyPopper } from "react-icons/lu";
import { useLocation } from "react-router-dom";


const FinalQuery = ({ state }) => {
    // const { state } = useLocation(); // get json
    return (
        <>
            <div className="mt-7">
                {/* complete Query */}


                <div className="bg-blue-100 border-2 border-blue-400 p-4 rounded-xl">
                    <div>
                        <h1 className="text-blue-600 font-semibold text-2xl">Complete Query</h1>
                    </div>

                    <div className="bg-black/70 text-white p-4 rounded-xl mt-5">
                        <h1 style={{ whiteSpace: 'pre-wrap' }}>{state.codeComQuery} </h1>
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
                            <div className=" border-1 border-gray-400 bg-white text-gray-400 p-3 rounded-xl mt-5 ">
                                <h1 style={{ whiteSpace: 'pre-wrap' }}>{state.codeComQuery1} </h1>
                            </div>
                        </div>
                    </div>



                    {/* 2 buttons */}

                    <div className="p-3">
                        <div className="grid gap-6">
                            <div className="flex flex-row gap-5 text-2xl text-center">
                                <button className="bg-white basis-2/3 border-1 border-blue-800  rounded-xl text-blue-800 font-semibold p-5  cursor-pointer ">
                                    <div className="flex gap-2 justify-center hover:text-blue-900 " >
                                        <h1 className=" mt-1"> <AiOutlineClear /> </h1>
                                        <h1 >Clear Qurey</h1>
                                    </div>
                                </button>
                                <button className="bg-blue-800 basis-2/3   rounded-xl text-white p-5 hover:bg-blue-900 cursor-pointer">
                                    <div className="flex gap-2 justify-center   " >
                                        <h1 className="rotate-180 mb-1"> <RiMenuFoldLine /> </h1>
                                        Run Qurey</div>
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

                    <Table content={state?.Lasttable} />


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
export default FinalQuery;