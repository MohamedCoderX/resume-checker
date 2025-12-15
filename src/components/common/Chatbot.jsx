import React, { useState, useEffect, useRef } from "react";
import { IoPerson } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import jsoncont from "../../JsonFile/jsoncont.json";

const Chatbot = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer — start animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Prepare messages
  const messages = [];
  jsoncont.content.forEach((content) => {
    messages.push({ type: "user", text: content.word1 });
    messages.push({ type: "bot", text: content.word2 });
  });
  messages.push({ type: "send", text: jsoncont.send });

  // Typing effect
  useEffect(() => {
    if (!isVisible || currentIndex >= messages.length) return;

    const message = messages[currentIndex];
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < message.text.length) {
        setCurrentText((prev) => prev + message.text[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, message]);
          setCurrentText("");
          setCurrentIndex((prev) => prev + 1);
        }, 150);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [currentIndex, isVisible]);

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-10 md:py-20 scroll-mt-20"
    >
      {/* Background gradient + subtle perspective */}
      <div className="absolute inset-0  -z-10"></div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold mb-10 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent drop-shadow-md">
        Stuck in the Job Hunt Cycle?
      </h2>

      {/* 3D Chat Card */}
      <div
        className="relative w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 sm:p-6 md:p-8
                   transform perspective-[1000px] hover:rotate-x-1 hover:rotate-y-1 transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="space-y-4 overflow-hidden h-230">
          {/* Displayed messages */}
          {visibleMessages.map((message, index) => (
            <div key={index} className="relative">
              {/* USER MESSAGE */}
              {message.type === "user" && (
                <div className="flex items-start gap-3 justify-start p-3 sm:p-4 transform transition-transform hover:scale-[1.02]">
                  <div className="bg-gradient-to-br from-indigo-200 to-indigo-400 text-black p-3 sm:p-4 rounded-xl shadow-lg">
                    <IoPerson size={20} />
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-[85%]">
                    {message.text}
                  </div>
                </div>
              )}

              {/* BOT MESSAGE */}
              {message.type === "bot" && (
                <div className="flex items-start gap-3 justify-end p-3 sm:p-4 transform transition-transform hover:scale-[1.02]">
                  <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-[85%]">
                    {message.text}
                  </div>
                  <div className="bg-gradient-to-br from-pink-200 to-pink-400 text-black p-3 sm:p-4 rounded-xl shadow-lg">
                    <BsStars size={20} />
                  </div>
                </div>
              )}

              {/* SEND BUTTON */}
              {message.type === "send" && (
                <div className="flex items-center justify-between p-4 sm:p-6 mt-2">
                  <div className="bg-white rounded-2xl shadow-md px-4 py-3 sm:px-6 sm:py-4 w-full text-sm sm:text-base lg:text-lg font-medium text-gray-800 flex items-center justify-between">
                    {message.text}
                    <div className="bg-black text-white rounded-xl p-2 sm:p-3 shadow-lg ml-3 hover:scale-105 transition-transform">
                      <RiSendPlaneFill size={22} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing animation bubble */}
          {currentText && currentIndex < messages.length && (
            <div className="p-3 sm:p-5">
              {messages[currentIndex].type === "user" ? (
                <div className="flex gap-3 justify-start">
                  <div className="bg-gradient-to-br from-indigo-200 to-indigo-400 p-3 sm:p-4 rounded-xl shadow-lg">
                    <IoPerson size={20} />
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4 text-sm sm:text-base text-gray-700 max-w-[85%]">
                    {currentText}
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 justify-end">
                  <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4 text-sm sm:text-base text-gray-700 max-w-[85%]">
                    {currentText}
                  </div>
                  <div className="bg-gradient-to-br from-pink-200 to-pink-400 p-3 sm:p-4 rounded-xl shadow-lg">
                    <BsStars size={20} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Soft floating 3D glow layer */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default Chatbot;
