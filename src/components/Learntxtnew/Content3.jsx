import React from "react";
// import { useState } from "react";
// import json from "../../JsonFile/content1.json"
import Table from "../Learn/Table";
import { Bs3CircleFill } from "react-icons/bs";
// import { useLocation } from "react-router-dom";


const Content1 = ({ state }) => {
    // const [DarkMood, setDakMood] = useState(1);
    // const { state } = useLocation(); // get json


    const numberIcons =
    {
        icon3: <Bs3CircleFill />,  
    }

    return (
        <>
            <div className="grid gap-5 kumbh-sans-font">
                

                {/* content table2 */}
                <div className="border bg-white rounded-xl p-5 border-l-7 border-blue-500  inset-shadow-sm border-1   ">

                    <div>
                        {/* heading with icons */}
                        <div className=" flex gap-2 bg-blue-500 p-8 text-2xl text-white rounded-tl-xl rounded-tr-xl">


                            <h1 className="text-4xl bg-blue-500  rounded-4xl" >{numberIcons[state?.table3?.icons]}</h1>
                            <h1 className="mt-1"> {state?.table3?.title}</h1>


                        </div>

                        {/* words */}
                        <div className="mt-3">
                        <div className="bg-blue-100 p-5 rounded-xl border-l-7 border-blue-500  inset-shadow-sm inset-shadow-black/60  text-gray-500 ">
                            <ul className="list-disc list-inside">
                                <li>{state?.table3?.word}</li>
                            </ul>

                        </div>
                        </div>


                        {/* code */}
                      

                        <div className="mt-3 bg-black/70 text-white p-4 rounded-xl">
                            <h1 style={{ whiteSpace: "pre-wrap" }}>{state?.table3?.code}</h1>
                        </div>


                    </div>

                    <h1 className="ml-3 font-semibold text-xl mt-2">{state?.table1?.output}</h1>
                    <Table content={state?.table3} />
                </div>
            </div>
        </>
    )
}
export default Content1;