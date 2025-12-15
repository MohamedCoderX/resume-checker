import React, { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaComments } from "react-icons/fa";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const Questions = [
    {
      question: "Is it free to use?",
      answer:
        "You can start absolutely free! After signing up, you’ll receive 3 credits to try out our tools before choosing a plan.",
    },
    {
      question: "Do I need to download or install anything?",
      answer:
        "No installation required. Everything runs directly in your browser — fully cloud-based and accessible 24/7.",
    },
    {
      question: "What happens after I use my free credits?",
      answer:
        "Once your 3 free credits are used, you can upgrade to a premium plan to continue accessing all learning and project features.",
    },
    {
      question: "Is my data and project information safe?",
      answer:
        "Absolutely. We use secure cloud storage and encryption to keep your projects and personal data protected at all times.",
    },
    {
      question: "Can I access my account on multiple devices?",
      answer:
        "Yes! Your progress and data sync automatically, so you can continue learning or building from any device seamlessly.",
    },
  ];

  return (
    <div className=" py-10 px-6 md:px-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-10">
     Frequently <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent font-semibold md:text-5xl mb-6">Asked</span> Questions
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Icon and Text */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center border border-gray-100 hover:shadow-2xl transition-all">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-5">
            <FaComments size={40} />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-2">
            Got Questions?
          </h3>
          <p className="text-gray-500 text-center text-sm">
            We’re here to help you understand how our credit system and tools
            work — so you can make the most out of your learning journey.
          </p>
        </div>

        {/* Right Side - FAQ List */}
        <div className="space-y-4">
          {Questions.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer p-5 ${
                openIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-medium">{item.question}</p>
                {openIndex === index ? (
                  <IoMdRemove size={22} className="text-blue-600" />
                ) : (
                  <IoMdAdd size={22} className="text-gray-500" />
                )}
              </div>

              {openIndex === index && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
