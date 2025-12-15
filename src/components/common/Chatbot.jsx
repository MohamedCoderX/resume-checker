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
  const messagesEndRef = useRef(null);

  // Observer to trigger animations when chatbot comes into view
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

  // Typing animation
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
        }, 200);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [currentIndex, isVisible]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, currentText]);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-16 bg-gray-50 min-h-screen"
    >
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-10 text-indigo-600">
        Stuck in the Job Hunt Cycle?
      </h2>

      {/* Chat Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 overflow-hidden">
        <div className="space-y-4 overflow-y-auto h-[500px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Render Messages */}
          {visibleMessages.map((message, index) => (
            <div key={index} className="flex items-start gap-3">
              {message.type === "user" && (
                <>
                  <div className="bg-indigo-200 p-3 rounded-xl flex items-center justify-center">
                    <IoPerson size={20} />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3 text-gray-700 max-w-[85%]">
                    {message.text}
                  </div>
                </>
              )}

              {message.type === "bot" && (
                <div className="flex ml-auto items-start gap-3">
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3 text-gray-700 max-w-[85%]">
                    {message.text}
                  </div>
                  <div className="bg-pink-200 p-3 rounded-xl flex items-center justify-center">
                    <BsStars size={20} />
                  </div>
                </div>
              )}

              {message.type === "send" && (
                <div className="flex mt-4">
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-md px-5 py-4 w-full flex justify-between items-center text-gray-800 font-medium">
                    {message.text}
                    <div className="bg-indigo-600 text-white p-2 rounded-xl hover:scale-105 transition-transform">
                      <RiSendPlaneFill size={20} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Animation */}
          {currentText && currentIndex < messages.length && (
            <div className={`flex gap-3 ${messages[currentIndex].type === "bot" ? "ml-auto" : ""}`}>
              {messages[currentIndex].type === "user" ? (
                <>
                  <div className="bg-indigo-200 p-3 rounded-xl flex items-center justify-center">
                    <IoPerson size={20} />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3 text-gray-700 max-w-[85%]">
                    {currentText}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3 text-gray-700 max-w-[85%]">
                    {currentText}
                  </div>
                  <div className="bg-pink-200 p-3 rounded-xl flex items-center justify-center">
                    <BsStars size={20} />
                  </div>
                </>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
