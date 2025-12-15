import React from "react";
// import { useState } from "react";
// import json from "../../JsonFile/content1.json"
import Table from "../Learn/Table";
import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill, Bs3CircleFill ,Bs4CircleFill} from "react-icons/bs";
// import { useLocation } from "react-router-dom";

const Content1 = ({ state }) => {
    // const [DarkMood, setDakMood] = useState(1);
    // const { state } = useLocation(); // get json


    const numberIcons =
    {
        icon1: <Bs1CircleFill />,
        icon2: <Bs2CircleFill />,
        icon3: <Bs3CircleFill />,
        icon4:<Bs4CircleFill />
    }

    // const numbers = [1, 2, 3, 4];
    // const handlebg=()=>{
    //     setDakMood(number.idno);
    // }



    // const pageContent = {
    //     1: "page 1 content",
    //     2: "This is page 2 content",
    //     3: "This is page 3 content",
    //     4: "This is page 4 content",
    //   };
 

    return (
        <>
            <div className="grid gap-5 kumbh-sans-font">
                

                {/* content table2 */}
                <div className=" bg-white rounded-xl p-5  border-l-7 border-blue-500  inset-shadow-sm border-1 ">

                    <div>
                        {/* heading with icons */}
                        <div className=" flex gap-2 bg-blue-500 p-8 text-2xl text-white rounded-tl-xl rounded-tr-xl">
                            <h1 className="text-4xl bg-blue-500  rounded-4xl" >{numberIcons[state?.table1?.icons]}</h1>
                            <h1 className="mt-1"> {state?.table1?.title}</h1>


                        </div>

                        {/* code */}
                      

                        <div className="mt-3 bg-black/70 text-white p-4 rounded-xl">
                            <h1 style={{ whiteSpace: "pre-wrap" }}>{state?.table1?.code}</h1>
                        </div>


                    </div>

                    <h1 className="ml-3 font-semibold text-xl mt-2">{state?.table1?.output}</h1>


                    <Table content={state?.table1} />

                </div>


            </div>
        </>
    )
}
export default Content1;