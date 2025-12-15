import React, { useState } from 'react'
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaComments } from "react-icons/fa";

const Faq = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    const Questions=[
        {
            question:"Is this really free?",
            answer:"Yes, totally free."
        },
        {
            question:"Do I need to install anything?",
            answer:"No installation needed."
        },
        {
            question:"What if I'm a beginner?",
            answer:"It's beginner friendly."
        },
        {
            question:"Is my resume data safe when I upload it?",
            answer:"Your data is safe."
        }
    ];

    return (
        <div>
            <p className='text-center font-semibold text-black text-3xl mb-5'>FREQUENTLY ASKED<br></br>QUESTIONS</p>
            <div className="grid grid-cols-2 shadow-2xl rounded-2xl p-3 space-x-5 relative left-50 right-50 mr-100 ">
                    <div className="rounded-2xl text-center shadow-2xl py-30 px-5">
                        <div className='flex justify-center items-center h-15 rounded-2xl shadow-2xl w-15 mx-auto mb-5 mt-15 '>
                            <FaComments size="35" className='flex justify-center items-center ' />
                         </div>
                        <p className='text-gray-500 font-semibold text-xl'>Got Questions?</p>
                        <p className='text-gray-500 font-semibold text-xl'>We've Got Answers</p>
                    </div>
                    <div className="space-y-5 rounded-2xl py-30 px-5 shadow-2xl">
                        {
                          Questions.map((item,index) =>(
                            <div key={index} className='flex rounded-2xl justify-between  p-5 shadow-2xl cursor-pointer' onClick={() => toggle(index)}>
                                <div className='w-full'>
                                    <p>{item.question}</p>
                                    {openIndex === index && (
                                        <p className="mt-3 text-sm text-gray-500">{item.answer}</p>
                                    )}
                                </div>
                                <div>
                                    {openIndex === index ? <IoMdRemove size="25" /> : <IoMdAdd size="25" />}
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    )
}
export default Faq