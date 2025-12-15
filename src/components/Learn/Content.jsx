import React from "react"
import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";
import { RiMenuFoldLine } from "react-icons/ri";
import { LuPartyPopper } from "react-icons/lu";
import { PiFileSqlDuotone } from "react-icons/pi";
import json from "../../JsonFile/content.json"
import Table from "./Table"
// import Chatbotanime from "../../component2/chatbotAnime";

const Content = () => {


  // card2
  const cardnames = [
    { name: "WINDOWS FUNCTION" },
    { name: "ORDER BY" },
    { name: "CASE" },
    { name: "AGGREGATION" }
  ]

  const numberIcons =
  {
    icon: <Bs1CircleFill />,
    icon1: <Bs2CircleFill />,
    icon2: <Bs3CircleFill />
  }
  return (
    <>
      <div className="grid gap-5 kumbh-sans-font">

        {/* content HEAD */}


        <div className=" w-full ">
          <div className="text-center text-5xl mx-auto lg:w-170 font-semibold">
            <h1>{json.title}</h1>
          </div>
          <div className="text-2xl text-center py-10 text-pink-400">
            <h1>{json.subtitle1}</h1>
            <h1>{json.subtitle2}</h1>
          </div>
        </div>


        {/* content card1 */}

        <div className="bg-white p-4 border border-gray-200 rounded-xl ">
          <div className="">
            <h1 className="text-2xl font-semibold">{json.cardhead}</h1>
            <h1 className="text-gray-600 text-lg  mt-2">{json.cardcontent}</h1>
          </div>
        </div>

        {/* content card2 */}

        <div className="bg-blue-200 p-4 border border-blue-400 rounded-xl ">
          <div className="lg:grid gap-2">
            <h1 className="text-2xl font-semibold text-blue-500">{json.card2head}</h1>
            <h1 className="text-gray-600">{json.card2content}</h1>
            <div className="lg:flex gap-5 ">
              {
                cardnames.map((cardname, index) => (
                  <div key={index} className="border  border-blue-500 rounded-3xl p-2 bg-white text-blue-500 font-medium">
                    <h1 >{cardname.name}</h1>
                  </div>
                ))
              }
            </div>
          </div>
        </div>



        {/* content cardtable */}





        <div className="border bg-white rounded-xl p-5  ">
          <div>
            <h1 className="text-2xl font-semibold">{json.content1}</h1>
            <h1 className="text-gray-500 text-lg mt-1 mb-2">{json.content2}</h1>
            <h1 className="text-lg font-bold">{json.content3}</h1>
          </div>

          <Table content={json.table} />

          <div className="" >
            <h1 className="font-bold mt-3 mb-3">
              Table: train_capacity
            </h1>
            <table className="w-full">
              <thead className=" bg-blue-200  text-black  ">
                <tr className="text-2xl">
                  <th className="p-5  rounded-tl-2xl rounded-bl-2xl font-small " >Premium_total</th>
                  <th className="p-5  rounded-tr-2xl rounded-br-2xl font-small " >Premium_expected_noshow</th>
                </tr>
              </thead>
              <tbody>
                <tr className=" border-b-1  border-gray-400 rounded-xl text-gray-600 text-center " >
                  <td className=" pt-9 pb-3">{json.pretotal}</td>
                  <td className=" pt-9 pb-3">{json.preexpecte}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>


        {/* card4 ->1 */}


        <div className=" grid gap-6 " >
          {
            json.contcard1.map((cardinfo, index4) => (
              <div key={index4} className="bg-white border border-gray-200 rounded-xl ">


                {/* heading with icons */}
                <div className=" flex gap-2 bg-blue-500 p-8 text-2xl text-white rounded-tl-xl rounded-tr-xl">


                  <h1 className="text-4xl bg-blue-500  rounded-4xl" >{numberIcons[cardinfo.icons]}</h1>
                  <h1 className="mt-1"> {cardinfo.title}</h1>


                </div>


                {/* content */}

                <div className="p-5 grid gap-3 p-4">
                  <h1 className=" font-semibold">{cardinfo.subtitle}</h1>

                  {/* code */}

                  <div className="bg-black/70 text-white p-4 rounded-xl">
                    <h1 style={{ whiteSpace: "pre-wrap" }}>{cardinfo.code}</h1>
                  </div>



                  <div >
                    {
                      cardinfo.multicont.map((innerinfo, index5) => (
                        <div key={index5} className="bg-blue-100 p-5 rounded-xl border-l-7 border-blue-500  inset-shadow-sm inset-shadow-black/60  text-gray-500 " >
                          <ul className="list-disc list-inside">
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
                </div>
                <div className="p-4">
                  {
                    (Array.isArray(cardinfo.table2) ? cardinfo.table2 : [cardinfo.table2]).map((conttable, index6) => (
                      <div key={index6}>
                        <Table content={conttable} />
                      </div>
                    )
                    )
                  }
                </div>

              </div>
            ))
          }


        </div>




        {/* complete Query */}


        <div className="bg-blue-100 border-2 border-blue-400 p-4 rounded-xl">
          <div>
            <h1 className="text-blue-600 font-semibold text-2xl">Complete Query</h1>
          </div>

          <div className="bg-black/70 text-white p-4 rounded-xl mt-5">
            <h1 style={{ whiteSpace: 'pre-wrap' }}>{json.codeComQuery} </h1>
          </div>
        </div>

        {/* now you try */}

        <div className="bg-white p-4 rounded-xl grid gap-2 ">

          <h1 className="font-semibold text-2xl">Now You Try!</h1>

          <h1 className="text-gray-500 text-md">Practice the query in the editor below and run it</h1>


          <div className="bg-green-500 w-full flex gap-2 justify-center p-3 text-2xl rounded-xl text-white font-semibold">
            <h1 className="text-3xl"><PiFileSqlDuotone /></h1>
            Query Editor</div>

          <div className=" border-1 border-gray-400 bg-white text-gray-400 p-3 rounded-xl mt-5">
            <h1 style={{ whiteSpace: 'pre-wrap' }}>{json.codeComQuery} </h1>
          </div>

          {/* 2 buttons */}

          <div className="p-3">
            <div className="grid gap-6">
              <div className="flex flex-row gap-5 text-2xl text-center">
                <div className="bg- white basis-2/3 border-1 border-red-300  rounded-xl text-red-300 p-5 ">
                  <button >Clear Qurey</button>
                </div>
                <div className="bg-green-500 basis-2/3   rounded-xl text-white p-5">
                  <div className="flex gap-2 justify-center   " >
                    <h1 className="rotate-180 mb-1"> <RiMenuFoldLine /> </h1>
                    Run Qurey</div>
                </div>
              </div>

              <div className=" text-center text-white bg-green-500 text-2xl p-4 rounded-xl">
                <div className="flex gap-2 justify-center">
                  <h1 className="text-3xl"><PiFileSqlDuotone /></h1>
                  Qurey Result</div>
              </div>


              <div className="border-1 border-green-700 bg-green-100 text-green-600 p-5  rounded-xl font-semibold ">
                <h1 className="text-2xl mt-3 mb-2 ">Perfect! Your Qurey is correct!</h1>
                <h1 className="text-md">Your output matches the expected result. Question completed!</h1>
              </div>

            </div>
            <div>
              <Table content={json.Lasttable} />
            </div>

            <div className=" border-2 text-center border-dashed border-gray-7 00 p-5 bg-pink-50 rounded-xl mt-4">
              <h1 className="text-3xl">Finished Practice</h1>
              <h1 className="m-2">Mark this question as complete to track your learning progress and earn badges!</h1>

              <div className="flex justify-center">
                <div className="bg-green-600 text-2xl p-4 rounded-xl text-white w-1/3 ">
                  <div className="flex gap-2 justify-center ">
                    <h1 >
                      <LuPartyPopper className="text-3xl" /></h1>
                    <h1>Mark as Complete</h1>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>









      </div>
      {/* <Chatbotanime /> */}
    </>
  )
}

export default Content